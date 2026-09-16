# AiAnchor Next.js website

Bilingual React / Next.js App Router and TypeScript migration.

Run `npm ci` and `npm run dev`, then open http://localhost:5174/en/ or http://localhost:5174/gr/.

See [MIGRATION.md](MIGRATION.md) for the audit, routes and verification, and [OPERATIONS.md](OPERATIONS.md) for environment configuration, deployment, rollback and factual gaps.

`npm run build`, `npm run typecheck`, `npm run lint`, `npm test` and `npm run test:preview` provide local checks. No production deployment was performed.

Run `npm run test:seo` to check the raw HTML, complete FAQ content, metadata, bilingual canonical/hreflang links, crawler responses, sitemap and robots. Set `PREVIEW_URL` to check a different local server. See [SEO.md](SEO.md) for the findings and production verification.

Next.js generates HTML during the build: the homepages are `.next/server/app/en.html` and `.next/server/app/gr.html`, with detail pages in their corresponding locale directories. These are generated artifacts; edit the source components. The SEO check also saves copies with scripts removed in `validation/seo/en.html` and `validation/seo/gr.html` so the actual HTML content is easy to inspect.
