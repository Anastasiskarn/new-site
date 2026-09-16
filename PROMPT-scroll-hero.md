# Prompt — Clean whole-homepage redesign (AI Automation Society direction)

> Paste this into Claude Code. Reference for *feel and interaction only* — never
> for copy or colors:
> - Primary direction (clean/minimal, whole page): https://aiautomationsociety.ai/
> - Secondary (shrink/rise-into-frame mockup idea): the attached TwelveMei screenshots
>
> Study the AI Automation Society homepage end to end first. That restraint,
> spacing, and rhythm across **every** section is the target — not just the hero.

---

## Goal

Redesign the **entire AiAnchor homepage** to feel as clean, minimal, and
expensive as `aiautomationsociety.ai` — top to bottom, including nav and footer —
while keeping our identity, our content, and our components.

This is a **visual + interaction redesign, not a content rewrite.** The homepage
already has six sections wired in `components/homepage.tsx` (`OperationsHome`) with
copy in `lib/homepage.ts`. Keep that structure and copy; restyle how it looks,
spaces, and moves.

## What makes the reference feel clean (apply these across the whole page)

1. **Deep near-black canvas, huge negative space.** Every section breathes. Big
   vertical rhythm, generous margins, nothing crammed.
2. **A consistent section intro pattern:** a small **pill eyebrow with a cyan
   status dot + short label**, then a **large tight headline** (often two lines),
   then **one muted gray supporting line**. Reuse this exact pattern for every
   section so the page reads as one system.
3. **Editorial feature rows over busy cards.** Where we list things (lead stages,
   capabilities, managed steps, dashboard points), prefer calm rows/cards with:
   a small category label, a short bold statement, one supporting line, and an
   optional tiny muted caption. Thin `rgba(255,255,255,0.1)` borders, dark
   surface, restrained — no heavy glows stacked on glows.
4. **One subtle glow per section at most.** In the reference it's a single cool
   horizon haze; for us that's a soft **cyan** ambient glow used sparingly, not on
   every element.
5. **Scroll-linked text reveal:** longer paragraph/statement blocks start **muted
   gray and brighten toward white line-by-line as they enter the viewport.**
   Understated.
6. **The product mockup rises into a rounded, bordered app-window frame** on
   scroll in the hero (see interaction below).

Render all of this in **AiAnchor's identity** — do NOT copy the reference's
blue-mountain photo, its wording, its pricing, or its logo.

## Hard rules

- **No AI-generated copy.** Reuse the exact strings already in `lib/homepage.ts`
  for every section (`t.hero.*`, `t.process.*`, `t.capabilities.*`, `t.dashboard.*`,
  `t.setup.*`, `t.final.*`) in both `en` and `gr`. If you need a new short label
  (e.g. a section eyebrow), add it to `lib/homepage.ts` in **both** locales — do
  not write marketing sentences yourself.
- **Match our colorway exactly** (`DESIGN.md` + `tailwind.config.js`):
  - Background `#050507` (`dark-900`), surface `#0a0a12` (`dark-800`), raised
    `#12121f` (`dark-700`), `#1a1a2b` (`dark-600`). Borders `rgba(255,255,255,0.1)`.
  - Primary cyan `#00f0ff` (`primary`), secondary purple `#7000ff` (`secondary`).
  - Display font **Space Grotesk** (`font-display`), body **DM Sans** (`font-sans`).
    No serif, no new fonts.
  - Keep our gradient/glow vocabulary (`bg-hero-glow`, cyan→purple translucent
    gradients, white-to-gray clipped gradient headings).
- **Preserve the identity, don't replace it.** Same near-black luminous
  cyan/purple system from `DESIGN.md`; follow the "Existing Identity Rule." Goal is
  *cleaner and more confident*, not a new brand and not the navy palette.
- **The mockup is our coded dashboard, not an image.** Reuse
  `components/dashboard-preview.tsx` (`DashboardPreview`). No screenshots.
- **Accessibility & motion:** honor `prefers-reduced-motion` everywhere — when
  reduced, skip scroll animations and text-brighten reveals and render the final
  resting state at full contrast. One `<h1>` (the hero). Keep keyboard focus
  styles and 44px (`min-h-12`) tap targets. Keep the existing `<details>` FAQ
  keyboard behavior if you touch it.

## Skills & tooling

- Invoke the **impeccable** skill and **ui-ux-pro-max** skill. Treat this as a
  hero-quality, whole-page craft pass. Restraint is the bar: when in doubt, remove.
  Keep spacing, type scale, and the eyebrow/headline/subtitle pattern consistent
  across all sections so it reads as one system.
- Use the **21st.dev MCP toolkit** (`21st` skill / MCP `search`, `get_component`)
  to source building blocks — a scroll-pinned/parallax hero container, an
  app-window/browser-frame wrapper, a glass pill eyebrow, a scroll-progress hook,
  a scroll-linked text reveal, clean editorial feature rows, a minimal pricing/
  tier row if useful, a clean FAQ/accordion. **Adapt everything to our tokens**
  (palette, fonts, spacing) rather than pasting a foreign theme. Prefer existing
  `components/ui/*` primitives where they already cover the need.

## Files

- `components/homepage.tsx` — `OperationsHome` assembles the six sections; also
  holds `SectionHeading`, `ProcessSteps`, `CapabilityCards`, `ClosingLine`,
  `ProductIcon`. Restyle these shared helpers so the whole page updates coherently.
- `components/scroll-hero.tsx` — the hero (imported at the top of `OperationsHome`).
- `components/dashboard-preview.tsx` — the coded mockup.
- `lib/homepage.ts` — all copy (en + gr). Copy source of truth.
- `components/section-motion.tsx` — existing reveal/motion controller; extend it
  (or add a sibling) for the scroll-linked text brighten + reduced-motion gating.
- `templates/layout.mjs` — navigation + footer; restyle these to match (clean
  blurred nav, quiet links, cyan hover, language switch; calm multi-column footer).
- `assets/css/input.css` / `app/globals.css` — shared styles/utilities.

## Section-by-section (keep structure & copy; restyle to the clean direction)

1. **Hero — `scroll-hero.tsx`** (`t.hero.*`, `t.demo`)
   - Near-empty: pill eyebrow with cyan dot, giant tight `<h1>` (`t.hero.title`),
     one muted subtitle (`t.hero.body` / `t.hero.support`), our two CTAs kept but
     restrained (white pill primary `Book a Demo`, quiet text button
     `See How It Works`). Keep `t.hero.integration` as a small line.
   - One soft cyan horizon glow low in the hero. Only the top edge of the framed
     `DashboardPreview` peeks in from the bottom at rest.
2. **How it works — `#how-it-works`** (`t.process.*`, 4 lead stages)
   - Section eyebrow + `t.process.title` + `t.process.body`. Render the four steps
     as calm editorial rows (number/label, `title`, `body`), not busy bordered
     boxes stacked with glows. `t.process.close` as a quiet closing line.
3. **What AiAnchor handles — `#services`** (`t.capabilities.*`, 6 capabilities)
   - Eyebrow + centered `t.capabilities.title`. Six capabilities as a clean,
     even grid of minimal cards (icon in a quiet well, `title`, `lead`, `body`).
     Keep the voice waveform accent but make it subtle. Drop the heavy grid+blur
     background to one restrained glow.
4. **Dashboard — `#features`** (`t.dashboard.*`)
   - Eyebrow + `t.dashboard.title` + `t.dashboard.body`. Show `DashboardPreview`
     in the same rounded app-window frame language as the hero. Four
     `t.dashboard.points` as quiet supporting items. `t.dashboard.close` closing.
5. **How AiAnchor works with clients — `#setup`** (`t.setup.*`, 4 managed steps)
   - Eyebrow + centered `t.setup.title` + `t.setup.body`. Four managed steps as
     clean numbered rows. Tone down the particle background to a single subtle
     ambient treatment. `t.setup.close` closing.
6. **Final CTA — `#contact`** (`t.final.*`, `t.demo`)
   - Big calm headline `t.final.title`, one muted line `t.final.body`, single
     confident white `Book a Demo` pill, small `t.final.note`. Keep it spacious;
     the panel can stay but lighten it — one soft cyan glow, no clutter.
- **Nav & footer (`templates/layout.mjs`)** — clean blurred nav, quiet links with
  cyan hover, the anchor wordmark, language switch and demo action; a calm
  multi-column footer. Match the page's spacing and restraint.

## The hero interaction, precisely

Use Framer Motion (`useScroll` + `useTransform`) or GSAP ScrollTrigger — pick what
fits this Next build; check `node_modules/next/dist/docs/` for framework specifics
before adding client components. Animate **only** `transform`, `opacity`,
`border-radius` for 60fps; no layout thrash; `will-change` sparingly.

1. **Entry (scroll = 0):** headline at full scale, faint cyan horizon glow, only
   the top edge of the framed mockup peeking from the bottom.
2. **Scrub:** the `DashboardPreview` **translates upward and settles** with a gentle
   scale; a thin translucent border + soft cyan ambient glow fade in around the
   rounded app-window frame (reuse the `DESIGN.md` product-frame shadow); the
   headline/subtitle ease down and slightly recede so focus hands off to the
   mockup — subtle, linked, no jumps.
3. **Rest:** framed mockup dominant, compact headline above, CTAs reachable, mockup
   bottom cropped by the frame; hand off cleanly to `#how-it-works`.

## Responsive

- Heading ramp stays `text-4xl` → `sm:text-6xl` → `lg:text-7xl`; 24px (`px-6`)
  gutters; `max-w-8xl` rhythm. Section padding stays roughly `py-24 md:py-32`.
- On phones, simplify motion: the mockup slides up with a light reveal (no heavy
  pinning) so touch scrolling never janks. All mockups and text stay fully legible
  at every breakpoint.

## Definition of done

- Whole homepage (hero → final CTA, plus nav & footer) reads as one clean, minimal
  system in the AIS direction, in our colors and fonts.
- Consistent eyebrow/headline/subtitle pattern and spacing across all six sections.
- Hero rising-into-frame mockup effect + scroll-linked gray→white text reveal.
- All copy from `lib/homepage.ts` (en + gr); nothing AI-written.
- Reduced-motion + keyboard verified; single `<h1>`; 44px targets.
- No new fonts, no navy/foreign palette, no screenshot mockups.
- Run the dev server, confirm every section and both locales, and report what you
  saw.
