/*
 * POST /api/chat — "Anchor", the site support assistant (Vercel serverless function).
 *
 * Streams a reply from the Anthropic Messages API back to the widget as Server-Sent
 * Events, so the answer appears word by word instead of after a long blank pause.
 *
 * The assistant only knows what content/knowledge-base.mjs assembles from the site's own
 * copy — there are no tools and no database access, which is what keeps a public,
 * unauthenticated endpoint safe to expose.
 *
 * Required env var: ANTHROPIC_API_KEY.
 * Optional: ANTHROPIC_MODEL (defaults to claude-opus-5).
 */
import Anthropic from '@anthropic-ai/sdk';

import { systemPrompt } from '../content/knowledge-base.mjs';

const DEFAULT_MODEL = 'claude-opus-5';
const MAX_TOKENS = 1024;

// Input caps. A support question is a sentence or two; anything past these limits is
// someone trying to use the endpoint as free inference rather than asking about AiAnchor.
const LIMITS = {
  messageChars: 1500,
  totalChars: 16000,
  turns: 24,
};

// Best-effort abuse brake. Serverless instances are ephemeral and there may be several at
// once, so this is a speed bump on a single warm instance, not a guarantee — it exists so
// one tab hammering the endpoint can't run up a bill before anything else notices.
const RATE = { windowMs: 60_000, maxRequests: 12 };
const hits = new Map();

function rateLimited(key) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((ts) => now - ts < RATE.windowMs);
  recent.push(now);
  hits.set(key, recent);

  // The map would otherwise grow for the life of the instance.
  if (hits.size > 500) {
    for (const [k, stamps] of hits) {
      if (!stamps.length || now - stamps[stamps.length - 1] > RATE.windowMs) hits.delete(k);
    }
  }
  return recent.length > RATE.maxRequests;
}

function clientKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim();
  return ip || req.socket?.remoteAddress || 'unknown';
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  if (typeof req?.[Symbol.asyncIterator] !== 'function') return null;
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 64 * 1024) return null;
      chunks.push(chunk);
    }
    if (!chunks.length) return null;
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return null;
  }
}

/**
 * Rebuild the transcript from scratch rather than trusting what the client sent: the
 * browser holds the history, so the payload is untrusted input, not session state.
 * Anything that isn't a plain user/assistant text turn is dropped.
 */
function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return null;

  const messages = [];
  let total = 0;
  for (const entry of raw.slice(-LIMITS.turns)) {
    if (!entry || typeof entry !== 'object') continue;
    const role = entry.role === 'assistant' ? 'assistant' : 'user';
    const text = String(entry.content ?? '').trim().slice(0, LIMITS.messageChars);
    if (!text) continue;
    total += text.length;
    if (total > LIMITS.totalChars) break;
    messages.push({ role, content: text });
  }

  // A conversation has to open with the visitor, and end with the turn we are answering.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  while (messages.length && messages[messages.length - 1].role !== 'user') messages.pop();
  return messages.length ? messages : null;
}

/*
 * Latency is the whole experience in a chat widget, and every answer here is a lookup in a
 * fixed knowledge base rather than a reasoning problem — so thinking is off and effort is
 * low. Disabling thinking is only valid at effort `high` or below, which this satisfies.
 * Raise both (thinking `adaptive`, effort `medium`) if answers ever need more judgement.
 *
 * Effort is rejected by models that don't implement it (Haiku 4.5), so a swapped-in
 * ANTHROPIC_MODEL doesn't silently 400 every request.
 */
function tuning(model) {
  if (/haiku/.test(model)) return {};
  return { thinking: { type: 'disabled' }, output_config: { effort: 'low' } };
}

function sse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY is not set');
    return res.status(503).json({ error: 'assistant_not_configured' });
  }

  if (rateLimited(clientKey(req))) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const body = await readBody(req);
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'invalid_body' });
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages) {
    return res.status(400).json({ error: 'invalid_messages' });
  }
  const lang = body.lang === 'gr' ? 'gr' : 'en';
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

  const client = new Anthropic({ timeout: 30_000, maxRetries: 1 });

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  try {
    const stream = client.messages.stream({
      model,
      max_tokens: MAX_TOKENS,
      ...tuning(model),
      // One stable block per language, so every conversation on the site reads the
      // knowledge base from cache instead of paying to re-process it.
      system: [{ type: 'text', text: systemPrompt(lang), cache_control: { type: 'ephemeral' } }],
      messages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        sse(res, { type: 'delta', text: event.delta.text });
      }
    }

    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') {
      // Classifier declined; content is empty or partial, so don't present it as an answer.
      console.warn('[chat] refusal:', final.stop_details?.category ?? 'unknown');
      sse(res, { type: 'error', code: 'refused' });
    } else {
      sse(res, { type: 'done', stopReason: final.stop_reason });
    }
  } catch (err) {
    console.error('[chat] stream failed:', err);
    // Headers are already out, so the failure has to travel down the stream itself.
    sse(res, { type: 'error', code: err?.status === 429 ? 'rate_limited' : 'upstream_failed' });
  }

  res.end();
}
