# AiAnchor homepage content update

Implemented with frontend-design, UI/UX Pro Max and Impeccable guidance. The supplied brief governs the product positioning and copy. The user's follow-up governs the visual scope: preserve the previous aesthetic.

## Final structure and copy

The homepage contains exactly six sections. Navigation and the footer sit outside that sequence. English copy below is implemented in `lib/homepage.ts`; the same module includes the Greek version.

### 1. Hero

**Turn more enquiries into booked appointments.**

AiAnchor helps real estate teams respond to leads, qualify prospects, follow up and book appointments automatically.

We set it up and manage it, so your team stays focused on conversations that actually need a person.

Primary: **Book a Demo**

Secondary: **See How It Works**

Works with your existing CRM, calendar and lead sources.

### 2. How it works

**From new enquiry to booked appointment**

AiAnchor handles the repetitive steps between someone showing interest and your team speaking with a qualified prospect.

1. **Capture:** Bring enquiries from website forms, ads, calls, WhatsApp and existing systems into one process.
2. **Qualify:** Ask the questions your team already uses: budget, area, timeline, property type and financing.
3. **Follow Up:** Continue the conversation when prospects do not respond immediately.
4. **Book:** Move qualified prospects into a viewing, callback or consultation.

Your team gets the lead when there is something worth acting on.

### 3. What AiAnchor handles

**One system for the repetitive work around your leads**

| Capability | Copy |
|---|---|
| AI Voice Agents | Answer calls and handle common enquiries. Use your qualifying questions and pass conversations to your team when a person is needed. |
| Lead Follow-Up | Keep conversations moving. Follow up on the schedule you agree, with the conversation recorded for your team. |
| CRM Sync | Keep your records updated. Send lead details, conversation notes and next steps to the CRM you already use. |
| Missed Call Recovery | Follow up when nobody answers. Reconnect with the caller and help them take the next step. |
| Knowledge Base | Give your agents the right information. Keep answers grounded in your listings, services and approved business information. |
| Appointment Booking | Let prospects book without the back and forth. Arrange viewings, callbacks and consultations around your team's calendar. |

CTA: **Explore the Platform**

### 4. Dashboard

**See what is happening without digging through different tools**

One dashboard for your leads, calls, bookings, pipeline stages, follow-up activity and hours saved.

Large product visual: `components/dashboard-preview.tsx`, a coded bilingual recreation of the AI Operations Overview dashboard (no image).

| Point | Copy |
|---|---|
| Lead Pipeline | See how many leads are captured, contacted, qualified and booked. |
| Calls and Activity | See recent conversations and what happened next. |
| Bookings | See appointments created through the system. |
| Time Saved | Understand how much repetitive work is being handled automatically. |

You do not need to wonder whether the system is running. You can see it.

Image caption: AiAnchor dashboard. Displayed figures illustrate the interface, not promised results.

Image action: **View full dashboard**

### 5. How AiAnchor works with clients

**We set it up around the way your business already works**

You do not need to build workflows or figure out integrations. We configure and manage the system with your team.

1. **Understand:** We look at how your team currently handles leads.
2. **Build:** We configure AiAnchor around your current workflow.
3. **Launch:** We test the system before it goes live.
4. **Improve:** We keep adjusting it as the business changes.

We stay involved after launch, managing and improving the system with your team.

### 6. Final CTA

**See where AiAnchor could fit into your lead process**

Show us how your team currently handles enquiries. We will walk through where time is being lost, where leads can slip through, and what AiAnchor could handle for you.

Primary: **Book a Demo**

No long presentation. We will show you the system using a workflow relevant to your business.

## Desktop layout

The user's correction is the visual authority: preserve the previous version's aesthetic. The initial navy layout proposal has been withdrawn.

- Keep the existing centered, full-height Aether particle hero, purple pill, gradient heading, typography scale and white primary button. Only its message and CTA destinations change.
- Keep the original max-w-8xl containers and 24px side gutters.
- Use the original process card/connector treatment for four lead stages.
- Use the existing automation spotlight cards, gradient icon containers and voice waveform for the six capabilities.
- Show the coded dashboard preview, followed by four concise activity points.
- Use the original consulting stage badges, colored markers and rounded cards for managed setup.
- Keep the original contact CTA panel's gradient surface, rounded corners, subtle glow and white button.
- Keep the original blurred navigation bar, uppercase anchor logo, cyan accents, language pill and four-column footer.

## Mobile layout

Preserve the existing mobile design language and responsive classes. Hero typography remains 36px at the smallest breakpoint, increasing to 60px at sm, 72px at lg and 96px at xl. Navigation switches to the original menu below xl. Processes stack on phones, use two columns from md and four from lg. Capabilities use one column on phones, two from sm and three from lg. Dashboard details use one column on phones, two from sm and four from lg.

The dashboard screenshot stays complete at all sizes and links to the original image. The original menu's keyboard/Escape behavior, language switch, reduced motion and button feedback remain.

## CTA hierarchy

1. **Book a Demo:** the original filled white action treatment, in navigation, hero and the final panel; opens the existing localized booking page.
2. **See How It Works:** the original bordered hero button; scrolls to the lead process.
3. **Explore the Platform:** the existing bordered button with cyan hover treatment; opens the Platform page.
4. **View full dashboard:** a quiet cyan text link.
5. **Client Login:** the original navigation text treatment, opening the client application.

Navigation content: **Platform · How It Works · Pricing · About**, then login, demo and language switch. Its aesthetic is preserved.

## Exact spacing

| Element | Current implementation |
|---|---|
| Navigation height | Original 80px |
| Horizontal section gutters | Original 24px |
| Hero padding | Original top 160px / bottom 96px; md top 176px / bottom 112px |
| Hero pill bottom margin | Original 32px |
| Hero heading to body | Original 32px |
| Body to actions | Original 40px |
| Action gap | Original 16px |
| Ordinary section padding | Original 96px top/bottom; md 128px |
| Section title to introduction | Original 16px |
| Process introduction to cards | Original 64px |
| Process card padding / gaps | Original 32px / 40px, adapted to four steps |
| Capability heading to cards | Original 56px |
| Capability padding / gaps | Original 24px / 16px |
| Dashboard image top margin | 56px, using existing spacing scale |
| Dashboard points top margin / gaps | 48px / 16px |
| Closing line margin / padding | 48px / 32px |
| Final panel padding | Original 32px; md 40px |
| Footer spacing | Original template |

## Typography hierarchy

Retain the existing Space Grotesk display and DM Sans body font stacks from tailwind.config.js, including their existing fallbacks. No new font-face declarations or typography tokens are added.

- Hero: original 36 / 60 / 72 / 96px responsive scale, bold, 1.08 line height.
- Section headings: original 36px, increasing to 48px from sm; bold and tight tracking.
- Capability headings: existing 18px semibold.
- Process headings: existing 20px semibold/bold.
- Hero and body copy: existing 16px, increasing to 18px where the original uses md:text-lg.
- Supporting card text: existing 14px with relaxed line height.
- Caption: existing 12px utility text.

The original palette remains #050507 / #0a0a12 / #12121f / #1a1a2b for surfaces, #00f0ff primary and #7000ff secondary. Original gradient headings, spotlight effects, particles, connector motion and button interactions remain.

## Screenshot placement

The dashboard appears in the Dashboard section and the Platform page as a coded React component (`components/dashboard-preview.tsx`), replacing the former screenshot. Its labels live in `lib/homepage.ts` under `dashboard.preview`; figures are illustrative and captioned as such. The hero is `components/horizon-hero.tsx`.

Additional verified product captures can be placed on the existing detail pages. The interface figures are identified as example figures, not advertised outcomes.

## Removed or moved homepage content

These are content changes from the supplied brief, not permission to replace the visual identity.

| Previous content | Destination / replacement |
|---|---|
| Consulting-led hero message | Enquiry-to-appointment headline in the same particle hero |
| Audit-to-ROI process | Four lead stages in the existing process styling |
| Long business-gap / solution explanations | Six concise capability cards using existing card treatments |
| Consulting deliverables and timelines | Existing AI Consulting page |
| Detailed voice/chatbot/automation content | Platform links to existing detail pages |
| Dense Command Hub feature explanations | Concise dashboard section using actual product image |
| Pricing table | Existing Pricing page; controls preserved |
| Comparison table | Pricing page, with its illustrative notice |
| General FAQ | Platform page; service FAQs stay on detail pages |
| Company narrative | Existing About page |
| Homepage contact form | Existing Book a Demo page |

Footer destinations and structured data reflect where the content now lives.

## Verification

See validation/preview.txt for localized page, metadata, link, redirect and API checks. Browser surfaces are unavailable in this session, so no desktop/mobile screenshot review is claimed.
