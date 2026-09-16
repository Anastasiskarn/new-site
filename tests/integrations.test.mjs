import test from "node:test";
import assert from "node:assert/strict";
import booking from "../server/book-demo.js";
import chat from "../server/chat.js";
import { invokeHandler } from "../lib/legacy-handler.ts";
import { indexableRoutes, pathFor, locales, slugs } from "../lib/routes.ts";
import en from "../content/en.mjs";
import gr from "../content/gr.mjs";
import { knowledgeBase, systemPrompt } from "../content/knowledge-base.mjs";
function response() {
  return {
    code: 200,
    headers: {},
    payload: null,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
    writeHead(code, headers) {
      this.code = code;
      Object.assign(this.headers, headers);
    },
    write(value) {
      this.output = (this.output || "") + value;
    },
    end() {
      this.ended = true;
    },
  };
}
const lead = {
  firstName: "Test",
  lastName: "Preview",
  email: "test@example.invalid",
  message: "Safe local test",
  lang: "en",
};
test("booking validation and honeypot never send emails", async () => {
  const previous = process.env.RESEND_API_KEY,
    fetchOriginal = globalThis.fetch;
  process.env.RESEND_API_KEY = "local-test-only";
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("Unexpected outbound call");
  };
  try {
    let res = response();
    await booking({ method: "POST", body: { ...lead, email: "invalid" } }, res);
    assert.equal(res.code, 400);
    res = response();
    await booking(
      { method: "POST", body: { ...lead, companyUrl: "bot" } },
      res,
    );
    assert.equal(res.code, 200);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = fetchOriginal;
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  }
});
test("booking reports notification failure and distinguishes confirmation failure", async () => {
  const previous = process.env.RESEND_API_KEY,
    fetchOriginal = globalThis.fetch;
  process.env.RESEND_API_KEY = "local-test-only";
  try {
    let count = 0;
    globalThis.fetch = async () => {
      count++;
      return new Response(JSON.stringify({ id: "mock" }), { status: 200 });
    };
    let res = response();
    await booking({ method: "POST", body: lead }, res);
    assert.equal(count, 2);
    assert.deepEqual(res.payload, { ok: true, confirmationSent: true });
    globalThis.fetch = async (url, options) => {
      const payload = JSON.parse(options.body);
      return new Response("{}", {
        status: payload.to.includes("info@aianchor.online") ? 500 : 200,
      });
    };
    res = response();
    await booking({ method: "POST", body: lead }, res);
    assert.equal(res.code, 502);
    assert.equal(res.payload.error, "send_failed");
    globalThis.fetch = async (url, options) => {
      const payload = JSON.parse(options.body);
      return new Response("{}", {
        status: payload.to.includes(lead.email) ? 500 : 200,
      });
    };
    res = response();
    await booking({ method: "POST", body: lead }, res);
    assert.equal(res.code, 200);
    assert.equal(res.payload.confirmationSent, false);
  } finally {
    globalThis.fetch = fetchOriginal;
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  }
});
test("booking lists every selected interest area in the lead notification", async () => {
  const previous = process.env.RESEND_API_KEY,
    fetchOriginal = globalThis.fetch;
  process.env.RESEND_API_KEY = "local-test-only";
  const sent = [];
  globalThis.fetch = async (url, options) => {
    sent.push(JSON.parse(options.body));
    return new Response(JSON.stringify({ id: "mock" }), { status: 200 });
  };
  try {
    const res = response();
    await booking(
      { method: "POST", body: { ...lead, interest: ["Leads & follow-up", " ", "Disconnected tools"] } },
      res,
    );
    assert.equal(res.code, 200);
    const notification = sent.find((email) => email.to.includes("info@aianchor.online"));
    assert.match(notification.text, /Areas: Leads & follow-up, Disconnected tools/);
  } finally {
    globalThis.fetch = fetchOriginal;
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  }
});
test("chat rejects invalid payloads and enforces existing per-instance rate limit without inference", async () => {
  const previous = process.env.ANTHROPIC_API_KEY,
    fetchOriginal = globalThis.fetch;
  process.env.ANTHROPIC_API_KEY = "local-test-only";
  globalThis.fetch = async () => {
    throw new Error("Unexpected inference");
  };
  try {
    let res = response();
    await chat({ method: "GET", headers: {} }, res);
    assert.equal(res.code, 405);
    res = response();
    await chat(
      {
        method: "POST",
        headers: { "x-forwarded-for": "unit-invalid" },
        body: { messages: [] },
      },
      res,
    );
    assert.equal(res.code, 400);
    for (let i = 0; i < 13; i++) {
      res = response();
      await chat(
        {
          method: "POST",
          headers: { "x-forwarded-for": "unit-rate" },
          body: { messages: [] },
        },
        res,
      );
    }
    assert.equal(res.code, 429);
  } finally {
    globalThis.fetch = fetchOriginal;
    if (previous === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = previous;
  }
});
test("App Router adapter preserves JSON status, streamed frames and rejects oversized/cross-origin bodies", async () => {
  const req = new Request("http://localhost/api/chat/", {
    method: "POST",
    body: "{}",
  });
  const result = await invokeHandler(req, async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/event-stream" });
    res.write('data: {"type":"delta","text":"test"}\n\n');
    res.write('data: {"type":"done"}\n\n');
    res.end();
  });
  assert.match(result.headers.get("content-type"), /event-stream/);
  assert.match(await result.text(), /"type":"done"/);
  const error = await invokeHandler(
    new Request("http://localhost/api/", { method: "POST", body: "invalid" }),
    async (req, res) => res.status(400).json({ error: "invalid_body" }),
  );
  assert.equal(error.status, 400);
  const large = await invokeHandler(
    new Request("http://localhost/api/", {
      method: "POST",
      body: "x".repeat(65537),
    }),
    async () => assert.fail("Handler should not run"),
  );
  assert.equal(large.status, 413);
  const foreign = await invokeHandler(
    new Request("http://localhost/api/", {
      method: "POST",
      headers: { Origin: "https://unrelated.example" },
      body: "{}",
    }),
    async () => assert.fail("Handler should not run"),
  );
  assert.equal(foreign.status, 403);
});
test("route inventory and bilingual prices stay consistent", () => {
  assert.equal(indexableRoutes.length, 30);
  assert.equal(new Set(indexableRoutes.map((r) => r.path)).size, 30);
  assert.ok(indexableRoutes.every((r) => r.slug !== "coming-soon"));
  for (const lang of locales)
    for (const slug of slugs) assert.ok(pathFor(lang, slug).endsWith("/"));
  const amounts = (plans) => plans.map((plan) => plan.price.match(/\d+/)?.[0] || null);
  assert.deepEqual(amounts(en.pricing.plans), amounts(gr.pricing.plans));
});
test("chat knowledge base builds in both languages with the current pricing plans", () => {
  for (const [lang, content] of [["en", en], ["gr", gr]]) {
    const reference = knowledgeBase(lang);
    for (const plan of content.pricing.plans) {
      assert.ok(reference.includes(plan.name));
      assert.ok(reference.includes(plan.price));
      for (const item of plan.items) assert.ok(reference.includes(item));
    }
    assert.ok(reference.includes(content.pricing.vatNote));
    assert.ok(reference.includes(content.pricing.note));
    assert.ok(!reference.includes("€149–699+"));
    assert.ok(!reference.includes("undefined"));
    assert.ok(systemPrompt(lang).includes(reference));
  }
});
test("chat streams a sanitized transcript using a mocked Anthropic response", async () => {
  const previous = process.env.ANTHROPIC_API_KEY,
    fetchOriginal = globalThis.fetch;
  process.env.ANTHROPIC_API_KEY = "local-test-only";
  let submitted;
  const events = [
    {
      type: "message_start",
      message: {
        id: "msg_mock",
        type: "message",
        role: "assistant",
        content: [],
        model: "mock",
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 1, output_tokens: 0 },
      },
    },
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "Safe mock reply." },
    },
    { type: "content_block_stop", index: 0 },
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 4 },
    },
    { type: "message_stop" },
  ];
  globalThis.fetch = async (url, options) => {
    submitted = JSON.parse(options.body);
    return new Response(
      events
        .map(
          (event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`,
        )
        .join(""),
      { headers: { "Content-Type": "text/event-stream" } },
    );
  };
  try {
    const res = response();
    await chat(
      {
        method: "POST",
        headers: { "x-forwarded-for": "unit-stream" },
        body: {
          lang: "gr",
          messages: [
            { role: "assistant", content: "Discard leading assistant" },
            { role: "user", content: "  Pricing?  " },
          ],
        },
      },
      res,
    );
    assert.equal(submitted.messages.length, 1);
    assert.equal(submitted.messages[0].content, "Pricing?");
    assert.match(res.output, /Safe mock reply/);
    assert.match(res.output, /"type":"done"/);
    assert.equal(res.ended, true);
  } finally {
    globalThis.fetch = fetchOriginal;
    if (previous === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = previous;
  }
});
