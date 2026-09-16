/*
 * POST /api/book-demo — free-demo request handler (Vercel serverless function).
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

const MAX = { name: 100, email: 200, phone: 60, company: 150, website: 300, interest: 120, message: 4000 };

const COPY = {
  en: {
    subject: 'We received your free demo request — AiAnchor',
    heading: 'Your demo request is in',
    greeting: (name) => `Hi ${name},`,
    body: 'Our team has received your request for a free demo. We will contact you shortly to arrange a time that suits you.',
    body2:
      'On the call we run the AI agent live on a real call flow for your business, so you hear exactly how it answers, qualifies and books — and what Command Hub reports back.',
    recapLabel: 'What you sent us',
    signoff: 'Talk soon,',
    team: 'The AiAnchor team',
    footer: 'You are receiving this because you requested a demo at aianchor.online.',
  },
  gr: {
    subject: 'Λάβαμε το αίτημά σας για δωρεάν demo — AiAnchor',
    heading: 'Το αίτημά σας καταχωρήθηκε',
    greeting: (name) => `Γεια σας ${name},`,
    body: 'Η ομάδα μας έλαβε το αίτημά σας για δωρεάν demo. Θα επικοινωνήσουμε μαζί σας σύντομα για να κανονίσουμε μια ώρα που σας βολεύει.',
    body2:
      'Στην κλήση τρέχουμε τον AI agent ζωντανά σε πραγματικό σενάριο για την επιχείρησή σας, ώστε να ακούσετε πώς απαντά, προκρίνει και κλείνει ραντεβού — και τι αναφέρει το Command Hub.',
    recapLabel: 'Τι μας στείλατε',
    signoff: 'Τα λέμε σύντομα,',
    team: 'Η ομάδα της AiAnchor',
    footer: 'Λαμβάνετε αυτό το email επειδή ζητήσατε demo στο aianchor.online.',
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
    subject: `New free demo request — ${lead.firstName} ${lead.lastName}${lead.company ? ` (${lead.company})` : ''}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;">
      <h2 style="margin:0 0 4px;font-size:18px;color:#0f1117;">New free demo request</h2>
      <p style="margin:0 0 20px;color:#8b93a7;font-size:13px;">Submitted from the ${escapeHtml(lead.lang.toUpperCase())} site${lead.pagePath ? ` (${escapeHtml(lead.pagePath)})` : ''}.</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row('Name', escapeHtml(`${lead.firstName} ${lead.lastName}`))}
        ${row('Email', `<a href="mailto:${escapeHtml(lead.email)}" style="color:#0071a4;">${escapeHtml(lead.email)}</a>`)}
        ${row('Phone', escapeHtml(lead.phone))}
        ${row('Company', escapeHtml(lead.company))}
        ${row('Website', websiteCell)}
        ${row('Interest', escapeHtml(lead.interest))}
        ${row('Needs', escapeHtml(lead.message).replace(/\n/g, '<br />'))}
      </table>
    </div>`,
    text: [
      'New free demo request',
      `Site: ${lead.lang.toUpperCase()}${lead.pagePath ? ` (${lead.pagePath})` : ''}`,
      `Name: ${lead.firstName} ${lead.lastName}`,
      `Email: ${lead.email}`,
      lead.phone ? `Phone: ${lead.phone}` : '',
      lead.company ? `Company: ${lead.company}` : '',
      lead.website ? `Website: ${lead.website}` : '',
      lead.interest ? `Interest: ${lead.interest}` : '',
      '',
      'Needs:',
      lead.message,
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

function confirmationEmail(lead) {
  const c = COPY[lead.lang] || COPY.en;
  const recap = [
    lead.company ? ['—', lead.company] : null,
    lead.interest ? ['—', lead.interest] : null,
  ].filter(Boolean);
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
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3f4d;">${escapeHtml(c.greeting(lead.firstName))}</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3f4d;">${escapeHtml(c.body)}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3a3f4d;">${escapeHtml(c.body2)}</p>
          ${
            recap.length
              ? `<div style="border-left:3px solid #00c8d7;padding:4px 0 4px 16px;margin:0 0 24px;">
            <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8b93a7;">${escapeHtml(c.recapLabel)}</p>
            ${recap.map(([, v]) => `<p style="margin:0;font-size:14px;color:#3a3f4d;">${escapeHtml(v)}</p>`).join('')}
          </div>`
              : ''
          }
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
      c.body2,
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
    return res.status(200).json({ ok: true });
  }

  const lead = {
    firstName: clean(body.firstName, MAX.name),
    lastName: clean(body.lastName, MAX.name),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    company: clean(body.company, MAX.company),
    website: normalizeWebsite(body.website),
    interest: clean(body.interest, MAX.interest),
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
