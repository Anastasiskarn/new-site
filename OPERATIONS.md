# AiAnchor website

Bilingual React / Next.js App Router marketing website with TypeScript and the existing Tailwind 3 design tokens. English lives at `/en/`, Greek at `/gr/` with HTML language `el`. Marketing pages are generated at build time; only navigation, pricing, forms, consent and chat need client interaction.

Run with Node 22 (verified locally with 22.15.0):

```sh
npm ci
npm run dev
```

Preview: http://localhost:5174/en/ and http://localhost:5174/gr/. Port 5174 allows the original static preview on 5173 to remain available.

```sh
npm run build
npm start
npm run typecheck
npm run lint
npm test
npm run test:preview
```

`test:preview` expects a running preview on 5174; override with `PREVIEW_URL`. `lint` is a local TypeScript AST/JSX check, not ESLint (the original project had no ESLint setup). Tests mock Resend and Anthropic and use dummy keys; no real emails, calls or bookings are created. Node 22's type-stripping flag is used only for tests of the TypeScript adapter.

## Content and routes

See [MIGRATION.md](MIGRATION.md) for the complete audit, route inventory and validation. Both locales preserve home, book-demo, coming-soon and all six legal pages. New pages: ai-consulting, ai-voice-agents, chatbots, crm-automation, about and pricing. Old gdpr links permanently redirect to dpa. All existing homepage anchors remain.

Existing business and legal content remains in `content/*.mjs`, shared with the assistant knowledge base. `lib/content.ts` supplies typed content; `lib/details.ts` adds matched English/Greek service explanations and limitations. React components live in `components/`; `lib/routes.ts` is the route inventory for metadata and sitemap. `server/` holds the migrated API logic; `app/api/` exposes it through App Router adapters. Legal rich text is trusted repository content and stays verbatim.

The existing dark surfaces, cyan/violet brand, font-family declarations and dashboard direction remain. Numeric dashboard claims were replaced by a labeled workflow illustration. No remote fonts are fetched during builds: existing font-family names use system fallbacks unless those fonts are installed. Exact DM Sans / Space Grotesk rendering requires local font files to self-host; none were present in the repository. Original social images and assets remain available locally.

## Server configuration

Use the existing `.env` locally or copy `.env.example` to `.env.local`. Keep real environment files out of Git. Never prefix these server keys with `NEXT_PUBLIC_`.

| Variable          | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| RESEND_API_KEY    | Demo lead notification and optional prospect confirmation |
| DEMO_NOTIFY_EMAIL | Optional lead inbox; defaults to info@aianchor.online     |
| ANTHROPIC_API_KEY | Streaming support assistant                               |
| ANTHROPIC_MODEL   | Optional model override; existing default retained        |

Resend requires the sender domain to be verified. The existing contact form retains `https://formspree.io/f/xnnzezlo`. Missing or rejected integrations produce visible errors. A received demo request is not a calendar reservation. Confirmation email failure is reported separately from successful lead receipt.

Consent keeps `aianchor-consent` version 1, necessary storage on and optional analytics/marketing off until chosen. Vercel Analytics loads only after analytics opt-in; its `beforeSend` cancels events after withdrawal. No marketing tracker was present. Existing language preference storage and the root English-browser redirect remain.

## Deployment (not performed)

1. Review the local result and factual gaps below. Use a Vercel preview before production release.
2. In Vercel, choose Next.js, build `npm run build`, and remove any dashboard override that still publishes `dist`. `vercel.json` now selects the Next.js framework. The repository configuration cannot override every pre-existing dashboard setting.
3. Configure the server environment variables for the intended environment; verify Resend's sender domain, the existing Formspree endpoint, the chosen Anthropic model and the separate portal domain.
4. Map both `aianchor.online` and `www.aianchor.online` to the project. Next's permanent host redirect prefers non-www, preserving paths and query strings. Validate TLS/domain mapping and 30-second API runtime support in the hosting plan.
5. If Vercel Web Analytics is required, enable it on the project and verify consent-gated events on a preview. Complete browser accessibility/mobile checks listed in MIGRATION.md.
6. Deploy only after authorization. Then check production redirects, metadata, legal content and integrations without using real submissions as smoke tests.

Local build/HTTP checks do not establish production speed, provider availability, search indexing, rankings or AI citations.

## Rollback

The original `build.mjs`, templates, scripts, assets, content and generated `dist` remain. Original API files and Vercel configuration are preserved in `legacy/api/` and `legacy/vercel.json`. The original dependency manifest and scripts are saved in `legacy/package.json` from the clean pre-migration Git revision.

For a local static fallback, run `npm run build:legacy` and `node dev-server.mjs`; the legacy CSS and static builder still use the original templates. For a hosting rollback, restore the prior deployment in Vercel, or use a separate rollback branch that restores `legacy/vercel.json` to `vercel.json` and `legacy/api/` to root `api/`, sets build to `npm run build:legacy` and output to `dist`, and retains the server environment. Avoid running the old builder against `dist` until you intend to regenerate the preserved output. Rollback of code does not undo provider events or data.

## Remaining factual gaps

- Standalone consulting price, additional-language scope, provider/channel approval requirements, third-party charges and plan-specific human transfer/callback availability need business confirmation.
- Existing annual amounts (€124 / €289 / €579 per month billed annually) are preserved. They do not precisely equal “two months free”; that savings claim was removed, and annual invoice totals are displayed.
- Existing legal drafts include unresolved company registration, database region, RLS/MFA/webhook/audit implementation, retention/deletion windows, subprocessors, breach timing and legal review. The migration preserves their wording and draft notices; it does not validate those assertions or introduce compliance guarantees.
- No verified customer results, testimonials or performance evidence were supplied. Product and competitor comparisons are illustrative.
- The separate portal is outside this repository. Its deployment, login behavior and actual account reporting cannot be verified locally.
