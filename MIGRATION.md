# Migration plan and audit

## Evidence before implementation

Git status is clean (after OneDrive hydration). No applicable AGENTS.md found. Existing graph queried without rebuilding; its build/render/legal/demo/handler/pricing/vercel/schema vocabulary identifies build.mjs, content modules, templates and the booking handler. The graph predates the current chat code; source verification takes precedence.

Confirmed: custom Node static builder, Tailwind 3, bilingual content, services mainly homepage sections; non-www canonical host; commented verification placeholder; unsupported hero 0.4s/+42%; comparison booleans rendered as icons; Resend booking, Formspree contact, Anthropic SSE chat; consent version 1 in localStorage, analytics gated by opt-in. Root serves Greek with browser-language switching. Legal content contains substantive draft notices and unresolved provider/security/business placeholders. Pricing's “two months free” does not exactly match stored annual amounts.

## Checklist and architecture (before edits)

- Preserve /en/, /gr/, book-demo, coming-soon, terms, privacy, dpa, cookies, ai-policy, trust, and gdpr redirects.
- Add ai-consulting, ai-voice-agents, chatbots, crm-automation, about and pricing in both languages, with corresponding localized prose and FAQs. Keep existing homepage anchors.
- App Router, TypeScript, server-rendered/shared React marketing components; interactive islands for navigation, pricing, forms, consent and chat. Reuse existing content and Tailwind tokens.
- Keep the old builder/templates and generated dist for rollback. Relocate legacy API implementations behind Next route adapters; preserve SSE and notification error semantics.
- Absolute non-www canonical and reciprocal en/el/x-default alternates; route-driven sitemap/robots; noindex coming-soon; schema tied to visible facts. Root is a canonical Greek duplicate and omitted from sitemap.
- Remove commented verification placeholder. Label mock dashboard figures as illustrative; make comparison text readable and qualify alternatives as illustrative. Keep annual prices, replace inaccurate savings wording.
- Preserve substantive legal wording and draft notices. Document gaps rather than inventing legal facts or compliance guarantees.
- Production build, strict typecheck, local source lint, mocked integration tests, local HTTP SEO/link checks and representative browser review. No real outbound submissions, deployment, push or production settings changes.

## Route inventory

Each slug exists beneath both /en/ and /gr/ (Greek HTML/hreflang uses el):

| Slug                                                                     | Status                    | Indexing |
| ------------------------------------------------------------------------ | ------------------------- | -------- |
| (home)                                                                   | preserved                 | index    |
| book-demo                                                                | preserved                 | index    |
| coming-soon                                                              | preserved                 | noindex  |
| terms, privacy, dpa, cookies, ai-policy, trust                           | preserved                 | index    |
| ai-consulting, ai-voice-agents, chatbots, crm-automation, about, pricing | new                       | index    |
| gdpr                                                                     | permanent redirect to dpa | excluded |

/ serves Greek content with canonical /gr/ and an English browser-language switch. Host redirect www.aianchor.online → aianchor.online preserves paths. Slash normalization uses Next trailingSlash. Unknown locales/slugs return 404.

Validation results, hosting requirements and rollback instructions will be recorded after implementation.

## Final implementation and validation — 16 September 2026

Implemented Next.js 16.3.4, React 19.2.8 and TypeScript 5.9.3 from the local npm cache, retaining Tailwind 3. App Router marketing pages use shared React components with static HTML and narrow interactive props. Root language, home anchors, the portal link, booking, multipart Formspree submissions, streaming chat, consent preferences and substantive legal text remain. Original API files moved to legacy/api; migrated logic lives in server/. No deployment, push or external submissions were performed.

| Check | Result |
| --- | --- |
| Production build and strict TypeScript | Passed; 31 known marketing/utility URLs including root generated statically; APIs dynamic |
| Local JSX/TypeScript AST lint | Passed |
| Six integration tests | Passed: booking validation/honeypot and mocked email outcomes; chat validation/rate limit and mocked Anthropic streaming/sanitization; adapter JSON/SSE, size/origin rejection; bilingual prices and route inventory |
| Production HTTP preview | Passed for 28 indexable pages, noindex utilities, root canonical, branded 404s, initial content, alternates, metadata, internal links, sitemap, robots and redirects |
| Structured data | 24 schemas parsed; FAQ questions checked against visible HTML; SoftwareApplication only for Command Hub; no ratings |
| Canonical host | Permanent www-to-non-www redirect verified with a local HTTP Host header; slash/query retained |
| 21st deterministic UI review | Zero errors, four minimum-width warnings for comparison/legal tables; both use keyboard-focusable horizontal scrolling regions |
| Git whitespace and legal source | Diff check passed; substantive legal source unchanged |
| Credentials in browser JavaScript | None detected by a non-disclosing local check; environment files untracked |

Reports: validation/preview.txt and validation/21st-review.json. Production preview: http://localhost:5174/en/ and /gr/. The existing legacy preview on 5173 remains running.

### Limits of local verification

The browser automation provider returned an empty browser/app inventory. Real browser screenshots, mobile overflow, keyboard/screen-reader behavior, pricing clicks, consent persistence/revocation and client-side form/chat interaction could not be exercised. Source review covers responsive grids, touch targets, native FAQs, labeled forms, required validation, visible focus, menu Escape/focus handling, the native consent dialog and reduced motion. This does not replace browser runtime checks. Server and streaming contracts are tested with mocked providers.

Provider delivery, WhatsApp/telephony behavior, portal functionality, production analytics/TLS/runtime limits and dashboard overrides cannot be verified locally. Font-family declarations remain with system fallbacks because no local font binaries were supplied. No online references or live-site requests were used. Check the four table warnings and exact typography during browser review.

See OPERATIONS.md for environment/hosting setup, deployment, rollback and factual gaps. Standalone consulting pricing, plan-specific handoff, extra languages/channel requirements, third-party charges and existing legal placeholders need business confirmation. Annual prices are preserved with invoice totals; “two months free” was removed. No production performance or indexing result is claimed.

## Design restoration — 16 September 2026

The initial migration simplified the homepage excessively. The approved local section layouts are now compiled into native JSX by scripts/restore-design.mjs: process cards, problem/solution panels, consulting steps and waves, voice orb and equalizers, integration logos and marquee, Command Hub bento tiles, FAQ, about, contact and the original four-column footer. The newer Aether Flow hero is retained. Pricing uses React controls with the original four-card styling, expand buttons, annual totals and Growth trial. Contact uses the existing React form inside the original panel. Decorative particles, spotlight coordinates, scroll connectors and reveals use a React effect with observer/event/animation cleanup and reduced-motion handling.

Run npm run design:sync after changes to the original section templates or bilingual content. The dev/build scripts synchronize automatically. Generated JSX ships without a runtime HTML parser or the old browser event handlers. The 21st source review now reports zero errors and 36 warnings: the four existing scrollable-table warnings plus inherited decorative fixed-size glow and hover/transition warnings in both localized layout branches. The decorative glow stays inside an overflow-hidden section; reduced motion disables animations/transitions. Browser visual and interaction verification remains unavailable, as described above. Production HTTP checks additionally verify the restored design signatures, unique section IDs and a single contact form inside the homepage.
