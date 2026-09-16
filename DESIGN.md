---
name: AiAnchor
description: Existing luminous dark identity for managed AI operations
colors:
  primary: "#00f0ff"
  secondary: "#7000ff"
  background: "#050507"
  surface: "#0a0a12"
  raised: "#12121f"
  text: "#ffffff"
  body: "#d1d5db"
  muted: "#9ca3af"
  border: "rgba(255,255,255,0.1)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: "2.5rem"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: "1.75rem"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  supporting:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  control: "8px"
  inset: "12px"
  card: "16px"
spacing:
  small: "12px"
  gap: "16px"
  inset: "24px"
  roomy: "32px"
  group: "48px"
  section: "96px"
  section-desktop: "128px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#021115"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  capability-card:
    backgroundColor: "rgba(10,10,18,0.4)"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: AiAnchor

## Overview

**Creative North Star: "Existing luminous dark identity"**

Preserve the established near-black, cyan and purple identity. The centered particle hero, gradient display text, translucent cards and rounded action panel remain the visual authority. The current work changes positioning and content within that aesthetic.

This record is grounded in source: `components/homepage.tsx`, `components/aether-flow-hero.tsx`, navigation and marketing components, `components/ui.tsx`, `templates/layout.mjs`, `assets/css/input.css`, `app/globals.css` and `tailwind.config.js`. Scope covers homepage, shared navigation/footer and reused Platform patterns. It does not establish a new system for pricing, legal pages, forms, consent or chat. Desktop/mobile screenshot review remains outstanding; source inspection is not a visual approval pass.

**Key Characteristics:**

- Near-black layers with luminous cyan and purple accents.
- Bold display type and compact, practical supporting copy.
- Spacious sections and rounded translucent cards.
- Particle, spotlight, waveform and connector motion retained from the existing identity.

## Colors

The palette places luminous accents over near-black surfaces and white-to-gray text.

### Primary

- **Cyan:** brand wordmark, icons, dashboard borders and links, connector gradients, button hover and keyboard focus.

### Secondary

- **Purple:** gradient endpoints, particle atmosphere and established decorative treatments. Existing Tailwind purple and blue shades also color managed-stage badges; these are local variants, not additional brand primitives.

### Neutral

- **Background:** page foundation.
- **Surface:** alternating section backgrounds and translucent cards.
- **Raised:** managed-step containers and the final action panel gradient.
- **Text / Body / Muted:** heading, reading and supporting hierarchy.
- **Border:** quiet white translucent card and section outlines.

### Named Rules

**The Existing Identity Rule.** Preserve the cyan/purple and near-black vocabulary when changing content; a new palette requires an explicit identity change.

## Typography

**Display Font:** Space Grotesk with the fallback stack in the frontmatter.

**Body Font:** DM Sans with the fallback stack in the frontmatter.

**Character:** Bold geometric headings contrast with straightforward sans-serif reading text. Font families are configured in Tailwind; the template loads Google Fonts. There are no new self-hosted font declarations. Unsupported glyphs or unavailable webfonts use fallback.

### Hierarchy

- **Display:** centered hero, bold, tight tracking, 1.08 line height. Starts at 36px, becomes 60px at 640px, 72px at 1024px and 96px at 1280px. A white-to-gray clipped gradient is the established hero treatment.
- **Headline:** ordinary homepage section headings start at 36px and become 48px at 640px. Platform sections can use the shared Section component's 30px to 48px ramp.
- **Title:** capability/dashboard cards use 18px semibold display type; process titles use 20px.
- **Body:** 16px relaxed reading text; introductions use 18px, and hero/final supporting text reaches 18px at 768px. Copy measures commonly cap at 48rem.
- **Supporting:** 14px card details and notes; dashboard captions are 12px. Desktop navigation uses 13px.

## Layout

Ordinary homepage sections use a centered 90rem maximum container with 24px gutters and 96px vertical padding, increasing to 128px at 768px. The hero centers content in a 72rem measure and has a minimum height of `min(900px,100svh)`, with fixed-header clearance supplied by 160px top padding, increasing to 176px at 768px.

Capabilities progress from one to two columns at 640px and three at 1024px, with 16px gaps. Dashboard explanation cards reach four columns at 1024px. Ordered process stages reach two columns at 768px and four at 1024px, with 40px gaps. Desktop connector tracks appear at 1024px. Mobile retains stacked cards and complete dashboard imagery; there is no custom mobile screenshot crop.

The fixed header has an 80px minimum height. Desktop links and login/demo actions appear at 1280px; the menu carries them below that breakpoint. The footer uses four columns at 768px and a stacked layout below it. Spacing follows the reused utility rhythm recorded above, not a newly introduced CSS scale.

## Elevation & Depth

Depth uses translucent dark layers, white outlines, gradient fills and diffuse cyan light. The retained spotlight follows pointer coordinates in capable environments. Dashboard framing carries Tailwind shadow-2xl and perspective tilt. The final panel has a local cyan ambient glow; it is an existing surface treatment, not a universal shadow token.

### Shadow Vocabulary

- **Action hover:** `0 0 0 1px rgba(0,240,255,0.3), 0 6px 16px rgba(0,240,255,0.18)` on fine-pointer hover.
- **Product frame:** `0 25px 50px -12px rgb(0 0 0 / 0.25)` beneath the dashboard.

## Shapes

Controls use softly rounded corners; icon wells and screenshot insets are more rounded, and recurring cards use 16px corners. Managed-stage markers are circles. The final action panel retains its larger 24px corner silhouette. Borders are thin and translucent, with brighter cyan on interactive hover.

## Components

### Buttons

Confident white actions with responsive cyan feedback. Primary actions use dark text, 12px by 24px padding and a 44px minimum height. Secondary actions retain white translucent borders; the hero secondary has a black translucent fill and purple hover treatment. Shared interaction physics scale to 1.01 on fine-pointer hover and 0.97 when pressed. The white primary receives a cyan gradient sweep. Keyboard focus has a 2px cyan outline with 4px offset.

### Cards / Containers

Translucent dark cards carry 16px corners, subtle borders and 24px padding. Capability icon wells use cyan-to-purple translucent gradients and inline SVG strokes. Spotlight hover introduces a radial cyan light and brighter border. The voice capability retains the animated waveform. Process cards use 32px padding, with oversized muted ordinal numbers or colored circular badges for managed setup.

### Navigation

Retain the gradient anchor mark and bold spaced AI ANCHOR wordmark. The fixed translucent header uses backdrop blur and a quiet divider. Desktop links turn cyan and grow an underline on hover. Current destination links expose `aria-current`. The mobile menu supports Escape, focus containment and scroll locking; the language switch remains visible.

### Product frame

The actual 1536 by 1024 dashboard is fully visible in its rounded bordered frame and links to the complete local image. The caption distinguishes interface figures from promised outcomes. Pointer tilt and cyan border feedback reuse the existing interaction system.

### Motion

Shared feedback uses the existing 180ms fast duration and ease-out curve. Spotlight transitions use 240ms. Hero text retains its 800ms fade-up sequence. Process connector progress and waveform loops remain established visual devices. Reduced motion removes animations/transitions and reveals content in its final state; particle work is disabled by its controller.

## Do's and Don'ts

### Do:

- **Do** preserve the established cyan/purple dark identity when updating content.
- **Do** reuse rounded cards, gradient icon wells and existing interaction feedback.
- **Do** keep actual product imagery legible and link to its complete image.
- **Do** retain keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** substitute the discarded navy palette or new typography system.
- **Don't** treat dashboard example figures as guaranteed results.
- **Don't** claim desktop/mobile visual approval without screenshot review.

Not canonized: the retained hero category pill is an incumbent eyebrow defect under the craft floor, and the shared Action's text-arrow glyph is an incumbent glyph-icon defect. Neither is a rule for future surfaces. Local ornamental values and legacy form/chat/pricing treatments are outside the reusable token set. Sidecar tonal ramps are synthesized panel previews, not additional shipped palette tokens.
