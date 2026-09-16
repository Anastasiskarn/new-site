# SEO and generative search verification

The site uses Next.js 16.3.4 static generation. HTML files are build output rather than source files: `.next/server/app/en.html`, `.next/server/app/gr.html` and `.next/server/app/{locale}/{slug}.html`. React hydration scripts and serialized Server Component data appear alongside real HTML; their presence does not mean the page is rendered only in JavaScript.

## Findings and changes

- The English homepage's initial HTML contained only 2 FAQ questions, but FAQPage structured data described 15. `FaqTabs` now renders every category, question and answer in the server HTML. Without JavaScript, all categories use native, keyboard accessible disclosures. After hydration, the existing tabs select categories while keeping the remaining answers in the DOM. Tabs also support arrow keys, Home and End and expose matching panel IDs and localized labels.
- Homepage scroll reveals previously hid pending text with opacity and blur after JavaScript started. They now preserve readable text while retaining their arrival movement, including the workflow sequence. A crawler that renders the page without scrolling can still read these sections.
- Added stable WebPage, AboutPage or ContactPage entities, a WebSite entity, language information and references to the organization. Existing software, service and FAQ data stays grounded in the site's supplied content. No reviews, ratings or performance claims were added.
- Added Google's large image and unrestricted text/video snippet preview directives to indexable pages. Coming-soon pages remain noindex.
- Added x-default language alternates to the sitemap, matching page metadata. Existing canonical URLs, English/Greek alternates and the 30-route indexable inventory were verified.
- Existing robots.txt permits public crawling for all user agents, including Googlebot and OAI-SearchBot, and excludes API/private paths. No extra bot-specific groups are necessary for that policy.

## Verification

`npm run test:seo` inspects HTTP HTML without running JavaScript and removes scripts/styles before checking main content. It verifies all 30 indexable routes, titles/descriptions in the initial head, canonical and reciprocal language links, a single h1, page entities, every structured FAQ question **and answer** in the main HTML, real 404 status codes, noindex exclusions and social images. Both homepages return the same readable main content for browser, Googlebot and OAI-SearchBot user agents.

Checks passed against both the development server on port 5174 and a separate production server on port 5175. `npm run build` succeeded and marked the marketing pages as SSG/static HTML. TypeScript, source lint and all 12 existing unit/integration tests passed. The latest per-route production results are in `validation/seo/results.json`; `validation/seo/en.html` and `validation/seo/gr.html` are script-free production HTML copies.

The older `npm run test:preview` stops at its stale `home-process` class assertion. The current homepage uses section IDs and no longer emits that class; its fixed English headline assertion also references older copy. Those existing visual assertions were preserved. The dedicated SEO check verifies the current HTML directly.

Live desktop/mobile screenshots and hydrated tab interaction could not be inspected because no browser was available through the browser tool. The hosted domain could not be fetched through the web tool, so these findings establish the local production build's behavior, not the current deployment's crawler access. No deployment was performed.

## Search visibility

Readable text, internal links, crawler access and structured data that matches visible content are the foundation for SEO and Google's AI search features. Google does not require special AI text files or a separate GEO schema. See [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features). OpenAI recommends allowing OAI-SearchBot for search inclusion; see [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

After deploying, inspect `/en/` and `/gr/` with Google Search Console's URL Inspection tool, submit `https://aianchor.online/sitemap.xml`, and verify that the hosting firewall allows search crawlers. Local HTML verification cannot establish indexing, ranking or inclusion in generated answers.
