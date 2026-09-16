# Screenshot shot list

| Filename | Used in | Exact pixel size | Status |
|---|---|---|---|
| `hero-dashboard.webp` | Hero, right-hand visual | 1280×800 (16:10) | **Real** — "AI Operations Overview" dashboard |

The Next.js homepage and Platform page render the dashboard as a coded component (`components/dashboard-preview.tsx`) instead of an image. The older `hero-dashboard.webp` is retained for legacy references. The screenshot remains uncropped on mobile and links to the complete image. The homepage retains the original particle hero.

To swap any file, **replace it with the same filename and same aspect ratio** —
no HTML/CSS changes needed.

Note: the `portal-*.webp` and `industry-real-estate-lead-card.webp` shots previously
listed here were dropped along with the Portal and Industries sections they
illustrated (see project history) and have been deleted from this folder.

## Notes for capture

- Capture at 2x/retina resolution then downscale to the sizes above for crisp
  rendering on high-DPI screens (e.g. shoot at 2560×1600 for the hero, then resize).
- Keep real customer data out of screenshots, or blur/replace names, phone numbers
  and emails with realistic placeholders before dropping the file in here.
- Placeholders are `.webp` (much smaller than PNG for gradient-heavy art, which is
  why real screenshots should stay WebP or JPEG too — avoid PNG for photographic
  screenshots, it roughly 10-15x's the file size for no visual benefit here).
  Keep the same filename/extension used above, or update the `file:` field in
  `content/en.mjs` / `content/gr.mjs` (and the one hardcoded path in
  `templates/sections.mjs` for the hero + real-estate images) if you switch formats.
- The OG/social preview images (`assets/img/og/og-image-en.png` and
  `og-image-gr.png`, 1200×630) were generated from the brand palette + the hero
  tagline. Swap them for a version that includes a real portal screenshot once
  you have one, if you want — same filenames, same folder.
