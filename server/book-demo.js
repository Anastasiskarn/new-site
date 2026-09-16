/*
 * POST /api/book-demo — discovery-call request handler (Vercel serverless function).
 *
 * Two emails go out per submission, both through Resend:
 *   1. an internal lead notification to the team inbox,
 *   2. a confirmation to the prospect ("we received your request").
 *
 * Resend is called over its REST API rather than the SDK so the site keeps zero
 * runtime dependencies (the build is a plain `node build.mjs` + Tailwind pass).
 *
 * Required env var: RESEND_API_KEY.
 * Optional: DEMO_NOTIFY_EMAIL (defaults to the info@ inbox).
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FROM = 'AiAnchor <info@aianchor.online>';
const NOTIFY_TO = process.env.DEMO_NOTIFY_EMAIL || 'info@aianchor.online';

const MAX = { name: 100, email: 200, phone: 60, company: 150, website: 300, interest: 400, message: 4000 };

const COPY = {
  en: {
    subject: 'Your discovery call request is in — AiAnchor',
    heading: 'Your discovery call request is in',
    greeting: (name) => `Hi ${name},`,
    body: 'Thanks for telling us where your team is losing time. We’ll be in touch shortly to arrange a free 30-minute discovery call at a time that suits you.',
    nextLabel: 'What happens next',
    next: [
      ['We review your setup', 'We read what you sent before the call.'],
      ['We map the problem', 'Together we find where the workflow breaks down or creates unnecessary work.'],
      ['We show you the options', 'We explain what could be improved and what we would actually implement.'],
    ],
    recapLabel: 'What you sent us',
    recap: { company: 'Company', interest: 'Areas', message: 'What slows you down' },
    replyNote: 'Want to add something before the call? Just reply to this email.',
    noPressure: 'No pressure to move forward. If we don’t see a useful project, we’ll tell you.',
    signoff: 'Talk soon,',
    team: 'The AiAnchor team',
    footer: 'You’re receiving this because you requested a discovery call at aianchor.online.',
  },
  gr: {
    subject: 'Λάβαμε το αίτημά σου για discovery call — AiAnchor',
    heading: 'Λάβαμε το αίτημά σου για discovery call',
    greeting: (name) => `Γεια σου ${name},`,
    body: 'Ευχαριστούμε που μας είπες πού χάνει χρόνο η ομάδα σου. Θα επικοινωνήσουμε σύντομα για να κανονίσουμε μια δωρεάν κλήση 30 λεπτών σε ώρα που σε βολεύει.',
    // Greek capitals drop accents; some clients keep them under text-transform, so write them out.
    nextLabel: 'ΤΙ ΓΙΝΕΤΑΙ ΜΕΤΑ',
    next: [
      ['Διαβάζουμε όσα μας στέλνεις', 'Ερχόμαστε στην κλήση με μια πρώτη εικόνα της δουλειάς σου.'],
      ['Βρίσκουμε πού κολλάει η ροή', 'Εντοπίζουμε καθυστερήσεις, διπλή δουλειά και βήματα που δεν χρειάζονται.'],
      ['Συζητάμε τα επόμενα βήματα', 'Σου εξηγούμε τις επιλογές και τι θα χρειαζόταν για να υλοποιηθούν.'],
    ],
    recapLabel: 'ΤΙ ΜΑΣ ΕΣΤΕΙΛΕΣ',
    recap: { company: 'Επιχείρηση', interest: 'Τομείς', message: 'Τι σε καθυστερεί' },
    replyNote: 'Θέλεις να προσθέσεις κάτι πριν την κλήση; Απλώς απάντησε σε αυτό το email.',
    noPressure: 'Η κλήση δεν σε δεσμεύει. Αν δεν βλέπουμε κάτι που αξίζει να φτιάξουμε, θα σου το πούμε.',
    signoff: 'Τα λέμε σύντομα,',
    team: 'Η ομάδα της AiAnchor',
    footer: 'Λαμβάνεις αυτό το email επειδή ζήτησες discovery call στο aianchor.online.',
  },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

// Prospects type "acme.gr" as often as a full URL; store something clickable either way.
function normalizeWebsite(value) {
  const site = clean(value, MAX.website);
  if (!site) return '';
  if (/^https?:\/\//i.test(site)) return site;
  return `https://${site.replace(/^\/+/, '')}`;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
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
  // Fallback for runtimes that hand over an unparsed stream. Anything else
  // (no body at all) is a malformed request, not a crash.
  if (typeof req?.[Symbol.asyncIterator] !== 'function') return null;
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (!chunks.length) return null;
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return null;
  }
}

async function sendEmail(payload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    signal: AbortSignal.timeout(15_000),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 500)}`);
  }
  return res.json();
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
      <td style="padding:8px 16px 8px 0;color:#8b93a7;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#0f1117;font-size:14px;vertical-align:top;">${value}</td>
    </tr>`;
}

function notificationEmail(lead) {
  const websiteCell = lead.website
    ? `<a href="${escapeHtml(lead.website)}" style="color:#0071a4;">${escapeHtml(lead.website)}</a>`
    : '';
  return {
    from: FROM,
    to: [NOTIFY_TO],
    reply_to: lead.email,
    subject: `New discovery call request — ${lead.firstName} ${lead.lastName}${lead.company ? ` (${lead.company})` : ''}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;">
      <h2 style="margin:0 0 4px;font-size:18px;color:#0f1117;">New discovery call request</h2>
      <p style="margin:0 0 20px;color:#8b93a7;font-size:13px;">Submitted from the ${escapeHtml(lead.lang.toUpperCase())} site${lead.pagePath ? ` (${escapeHtml(lead.pagePath)})` : ''}.</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row('Name', escapeHtml(`${lead.firstName} ${lead.lastName}`))}
        ${row('Email', `<a href="mailto:${escapeHtml(lead.email)}" style="color:#0071a4;">${escapeHtml(lead.email)}</a>`)}
        ${row('Phone', escapeHtml(lead.phone))}
        ${row('Company', escapeHtml(lead.company))}
        ${row('Website', websiteCell)}
        ${row('Areas', escapeHtml(lead.interest))}
        ${row('What slows them down', escapeHtml(lead.message).replace(/\n/g, '<br />'))}
      </table>
    </div>`,
    text: [
      'New discovery call request',
      `Site: ${lead.lang.toUpperCase()}${lead.pagePath ? ` (${lead.pagePath})` : ''}`,
      `Name: ${lead.firstName} ${lead.lastName}`,
      `Email: ${lead.email}`,
      lead.phone ? `Phone: ${lead.phone}` : '',
      lead.company ? `Company: ${lead.company}` : '',
      lead.website ? `Website: ${lead.website}` : '',
      lead.interest ? `Areas: ${lead.interest}` : '',
      '',
      'What slows them down:',
      lead.message,
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

// Long descriptions are trimmed in the prospect's recap; the team email keeps the full text.
function excerpt(value, max = 280) {
  return value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;
}

function confirmationEmail(lead) {
  const c = COPY[lead.lang] || COPY.en;
  const recap = [
    [c.recap.company, lead.company],
    [c.recap.interest, lead.interest],
    [c.recap.message, lead.message && excerpt(lead.message)],
  ].filter(([, value]) => value);
  const p = 'margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3f4d;';
  const label = 'margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8b93a7;';
  return {
    from: FROM,
    to: [lead.email],
    reply_to: NOTIFY_TO,
    subject: c.subject,
    html: `<div style="margin:0;padding:32px 16px;background:#f4f5f8;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e6ed;">
        <div style="background:#0a0a12;padding:28px 32px;">
          <span style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:1px;">AI <span style="color:#00c8d7;">ANCHOR</span></span>
        </div>
        <div style="padding:32px;">
          <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#0f1117;">${escapeHtml(c.heading)}</h1>
          <p style="${p}">${escapeHtml(c.greeting(lead.firstName))}</p>
          <p style="${p}margin-bottom:28px;">${escapeHtml(c.body)}</p>
          <p style="${label}">${escapeHtml(c.nextLabel)}</p>
          <table role="presentation" style="border-collapse:collapse;width:100%;margin:0 0 28px;">
            ${c.next
              .map(
                ([title, desc], i) => `<tr>
              <td style="width:28px;padding:0 12px 14px 0;vertical-align:top;">
                <span style="display:inline-block;width:24px;height:24px;border-radius:12px;border:1px solid #00c8d7;color:#0092a0;font-size:12px;font-weight:700;line-height:24px;text-align:center;">${i + 1}</span>
              </td>
              <td style="padding:2px 0 14px;vertical-align:top;">
                <p style="margin:0;font-size:15px;font-weight:600;color:#0f1117;">${escapeHtml(title)}</p>
                <p style="margin:2px 0 0;font-size:14px;line-height:1.5;color:#5a6070;">${escapeHtml(desc)}</p>
              </td>
            </tr>`,
              )
              .join('')}
          </table>
          ${
            recap.length
              ? `<div style="border-left:3px solid #00c8d7;padding:4px 0 4px 16px;margin:0 0 28px;">
            <p style="${label}margin-bottom:10px;">${escapeHtml(c.recapLabel)}</p>
            ${recap
              .map(
                ([name, value]) =>
                  `<p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:#3a3f4d;"><span style="color:#8b93a7;">${escapeHtml(name)}:</span> ${escapeHtml(value).replace(/\n/g, '<br />')}</p>`,
              )
              .join('')}
          </div>`
              : ''
          }
          <p style="${p}">${escapeHtml(c.replyNote)}</p>
          <p style="${p}margin-bottom:24px;font-size:14px;color:#5a6070;">${escapeHtml(c.noPressure)}</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#3a3f4d;">${escapeHtml(c.signoff)}<br /><strong>${escapeHtml(c.team)}</strong></p>
        </div>
        <div style="padding:18px 32px;background:#fafbfc;border-top:1px solid #e4e6ed;">
          <p style="margin:0;font-size:12px;line-height:1.5;color:#8b93a7;">${escapeHtml(c.footer)} · <a href="mailto:info@aianchor.online" style="color:#0071a4;">info@aianchor.online</a></p>
        </div>
      </div>
    </div>`,
    text: [
      c.heading,
      '',
      c.greeting(lead.firstName),
      '',
      c.body,
      '',
      `${c.nextLabel}:`,
      ...c.next.map(([title, desc], i) => `${i + 1}. ${title}: ${desc}`),
      '',
      ...(recap.length ? [`${c.recapLabel}:`, ...recap.map(([name, value]) => `${name}: ${value}`), ''] : []),
      c.replyNote,
      c.noPressure,
      '',
      c.signoff,
      c.team,
      '',
      c.footer,
    ].join('\n'),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[book-demo] RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'email_not_configured' });
  }

  const body = await readBody(req);
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'invalid_body' });
  }

  // Honeypot: bots fill every field they find. Answer 200 so they don't retry,
  // but send nothing.
  if (clean(body.companyUrl, 200)) {
    // Logged so a real visitor tripping the trap (e.g. via browser autofill) is visible.
    console.warn('[book-demo] honeypot filled; no emails sent', { pagePath: clean(body.pagePath, 200) });
    return res.status(200).json({ ok: true });
  }

  const lead = {
    firstName: clean(body.firstName, MAX.name),
    lastName: clean(body.lastName, MAX.name),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    company: clean(body.company, MAX.company),
    website: normalizeWebsite(body.website),
    // The discovery form sends several areas as an array; older clients send one string.
    interest: clean(Array.isArray(body.interest) ? body.interest.map((v) => clean(v, 120)).filter(Boolean).join(", ") : body.interest, MAX.interest),
    message: clean(body.message, MAX.message),
    lang: body.lang === 'gr' ? 'gr' : 'en',
    pagePath: clean(body.pagePath, 200),
  };

  const missing = ['firstName', 'lastName', 'email', 'message'].filter((k) => !lead[k]);
  if (missing.length || !isEmail(lead.email)) {
    return res.status(400).json({ error: 'validation_failed', fields: missing.length ? missing : ['email'] });
  }

  // The internal notification is what makes the lead real, so its failure is the
  // one the visitor needs to know about (they'd otherwise think we have their
  // details). A failed confirmation is logged but not surfaced.
  const [notify, confirm] = await Promise.allSettled([
    sendEmail(notificationEmail(lead)),
    sendEmail(confirmationEmail(lead)),
  ]);

  if (notify.status === 'rejected') {
    console.error('[book-demo] lead notification failed:', notify.reason);
    return res.status(502).json({ error: 'send_failed' });
  }
  if (confirm.status === 'rejected') {
    console.error('[book-demo] confirmation to prospect failed:', confirm.reason);
  }

  return res.status(200).json({ ok: true, confirmationSent: confirm.status === 'fulfilled' });
}
