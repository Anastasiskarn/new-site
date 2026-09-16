import type { CSSProperties, ReactNode } from "react";
import { getContent } from "../lib/content";
import { homepageCopy } from "../lib/homepage";
import { pathFor, type Locale } from "../lib/routes";
import { RobotCompanion } from "./robot-companion";
import { Arrow } from "./scroll-hero";
import { SectionMotion } from "./section-motion";
import { Action } from "./ui";
import { RevealText, SectionIntro } from "./ui/editorial";
import { LogoMarquee } from "./ui/logo-marquee";
import { FaqTabs } from "./faq-tabs";
import { LampContainer } from "./ui/lamp";

// Tools the automations connect to. Marks live in public/media/stack (svgl.app via 21st.dev, Simple Icons for
// Airtable, HubSpot, Make and Zapier). Brand names stay untranslated in both locales.
const stack = [
  ["meta", "Meta"], ["whatsapp", "WhatsApp"], ["instagram", "Instagram"], ["google-drive", "Google Drive"],
  ["gmail", "Gmail"], ["google-calendar", "Google Calendar"], ["google-sheets", "Google Sheets"], ["airtable", "Airtable"],
  ["hubspot", "HubSpot"], ["claude", "Claude"], ["openai", "OpenAI"], ["n8n", "n8n"], ["make", "Make"],
  ["zapier", "Zapier"], ["slack", "Slack"], ["notion", "Notion"], ["twilio", "Twilio"],
] as const;

// The integration line doubles as the strip's label, so the logos read as the answer to it
function StackStrip({ label }: { label: string }) {
  return <LogoMarquee className="mt-4" label={label} items={stack.map(([id, name]) => ({
    id,
    label: name,
    mark: <img src={`/media/stack/${id}.svg`} alt="" width={20} height={20} className="h-5 w-5 object-contain" decoding="async" />,
  }))} />;
}

export function ProductIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    voice: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></>,
    follow: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 2V11.5A8.5 8.5 0 0 1 9.5 3H13" /><path d="M16 2h6v6m0-6-8 8" /></>,
    sync: <><path d="M20 7a8 8 0 0 0-14-2L3 8m0-5v5h5M4 17a8 8 0 0 0 14 2l3-3m0 5v-5h-5" /></>,
    phone: <><path d="M16 3h5v5m0-5-6 6M9 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-4l-5-2-2 3a13 13 0 0 1-6-6l3-2-2-5Z" /></>,
    book: <><path d="M12 5v16M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V3Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18m-13 5 3 3 5-5" /></>,
    chart: <path d="M3 3v18h18M7 14l4-4 4 3 6-7" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}

export function DemoAction({ lang }: { lang: Locale }) {
  return <Action href={pathFor(lang, "book-demo")}>{homepageCopy(lang).demo}</Action>;
}

function DemoPill({ lang, className = "" }: { lang: Locale; className?: string }) {
  return <a className={`btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-dark-900 ${className}`} href={pathFor(lang, "book-demo")}>{homepageCopy(lang).demo}<Arrow /></a>;
}

type RobotSide = "left" | "right" | "off";

// The column a section's content gets on lg+: the half the robot companion is not standing in
function column(robot: RobotSide) {
  if (robot === "left") return "lg:ml-auto lg:w-1/2 lg:pl-10 xl:pl-16";
  if (robot === "right") return "lg:w-1/2 lg:pr-10 xl:pr-16";
  return "";
}

// One rhythm for every homepage section: same padding, gutter and measure. `robot` tells the companion where to
// stand while this section owns the middle of the viewport ("off" once it has stopped at the dashboard);
// `wide` renders full width underneath the section's column.
function HomeSection({ id, robot, className = "", children, wide, decoration, connector = false }: { id: string; robot: RobotSide; className?: string; children: ReactNode; wide?: ReactNode; decoration?: ReactNode; connector?: boolean }) {
  return <section id={id} data-robot={robot} className={`relative isolate py-24 md:py-32 ${className}`} {...(connector ? { "data-connector-section": "" } : {})}>
    {decoration}
    <div className={`relative mx-auto max-w-8xl px-6 ${decoration ? "z-10" : ""}`}>
      <div className={column(robot)}>{children}</div>
      {wide}
    </div>
  </section>;
}

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

// Split opening: the copy holds the left half and the robot stands in the right one. Below lg it's a calm,
// full-width statement under a single glow, since the 3D scene is desktop only.
function Hero({ lang }: { lang: Locale }) {
  const t = homepageCopy(lang);
  return <section data-robot="right" className="relative isolate overflow-clip">
    <div className="hero-split-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    <div className="relative mx-auto flex min-h-[100svh] max-w-8xl items-center px-6 pb-20 pt-36 lg:pb-24 lg:pt-28">
      <div className={`max-w-2xl lg:max-w-none ${column("right")}`}>
        <h1 style={delay(0)} className="scroll-hero-heading scroll-hero-enter font-display text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-[3.6rem] xl:text-7xl">{t.hero.title}</h1>
        <p style={delay(180)} className="scroll-hero-enter mt-7 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">{t.hero.body}</p>
        <div style={delay(260)} className="scroll-hero-enter mt-10 flex flex-wrap items-center gap-2">
          <DemoPill lang={lang} />
          <a className="link-hover inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-medium text-gray-300 hover:text-primary" href={lang === "gr" ? getContent(lang).hero.ctaSecondaryHref : "#how-it-works"}>{t.hero.secondary}</a>
        </div>
        <div style={delay(340)} className="scroll-hero-enter mt-12">
          <p className="flex items-center gap-3 text-sm text-gray-400"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_#00f0ff]" aria-hidden="true" />{t.hero.integration}</p>
          <StackStrip label={t.hero.integration} />
        </div>
      </div>
    </div>
  </section>;
}

// The ordered workflow method: numbered editorial rows sized for half the page.
function StageRows({ steps }: { steps: { title: string; body: string }[] }) {
  return <ol className="reveal-stagger mt-14 border-b border-white/10 md:mt-16">{steps.map((step, i) => <li key={step.title} className="editorial-row reveal relative grid grid-cols-[3rem_1fr] gap-x-4 border-t border-white/10 py-8 md:grid-cols-[4rem_1fr]">
    <span className="pt-2.5 font-display text-sm font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
    <div>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{step.title}</h3>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">{step.body}</p>
    </div>
  </li>)}</ol>;
}

// Managed setup: four columns on one quiet track that fills as the section scrolls past
function ManagedSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return <div className="relative mt-16 md:mt-20">
    <div className="connector-track absolute inset-x-0 top-4 hidden h-px lg:block" />
    <div className="connector-fill absolute inset-x-0 top-4 hidden h-px lg:block" data-connector-fill="" />
    <ol className={`reveal-stagger relative grid gap-x-8 gap-y-10 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>{steps.map((step, i) => <li key={step.title} className="reveal border-t border-white/10 pt-8 lg:border-0 lg:pt-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-dark-900 font-display text-sm font-medium tabular-nums text-white">{i + 1}</span>
      <h3 className="mt-6 font-display text-xl font-semibold text-white lg:mt-8">{step.title}</h3>
      <p className="mt-3 max-w-xs text-base leading-relaxed text-gray-400">{step.body}</p>
    </li>)}</ol>
  </div>;
}

// `compact` fits the grid to half the page (two columns at most) for the homepage split layout
export function CapabilityCards({ lang, linked = false, compact = false }: { lang: Locale; linked?: boolean; compact?: boolean }) {
  const items = lang === "gr" && linked
    ? getContent(lang).voiceSystems.automations.map((item, i) => ({
        icon: ["book", "follow", "sync", "phone", "follow", "calendar"][i],
        title: item.title, lead: "", body: item.desc,
        slug: ["chatbots", "crm-automation", "crm-automation", "ai-voice-agents", "crm-automation", "crm-automation"][i],
      }))
    : homepageCopy(lang).capabilities.items;
  // Hairline grid: cells share one 1px seam instead of each drawing its own box
  return <div className={`home-capabilities reveal mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 md:mt-20 ${compact ? "" : "lg:grid-cols-3"}`}>{items.map((item, i) => <article key={item.title} className={`spotlight-card relative flex flex-col bg-dark-900 ${compact ? "p-7 xl:p-8" : "p-8 md:p-10"}`}>
    <div className="relative flex items-center justify-between gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-primary"><ProductIcon name={item.icon} /></span>
      {i === 0 && <span className="feature-wave flex h-5 items-end gap-[3px] opacity-60" aria-hidden="true">{Array.from({ length: 12 }, (_, n) => <span key={n} className="wave-bar" style={{ animationDelay: `${n % 7 * 90}ms` }} />)}</span>}
    </div>
    <h3 className={`relative font-display text-xl font-semibold text-white ${compact ? "mt-6" : "mt-8"}`}>{linked ? <a className="link-hover inline-flex min-h-11 items-center gap-3 hover:text-primary" href={pathFor(lang, item.slug)}>{item.title}<ProductIcon name="arrow" /></a> : item.title}</h3>
    {item.lead && <p className="relative mt-3 text-base leading-relaxed text-gray-200">{item.lead}</p>}
    <p className="relative mt-2 text-sm leading-relaxed text-gray-400">{item.body}</p>
  </article>)}</div>;
}

// Closing statement: large type that brightens word by word as it scrolls in
function Statement({ text, wide = false }: { text: string; wide?: boolean }) {
  return <div className={`mt-16 md:mt-20 ${wide ? "max-w-4xl" : "max-w-2xl"}`}><RevealText text={text} className={`font-display font-medium leading-snug tracking-tight ${wide ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl sm:text-3xl"}`} /></div>;
}

export function AboutSection({ lang }: { lang: Locale }) {
  const t = getContent(lang);
  const copy = lang === "en" ? {
    eyebrow: "About AiAnchor",
    title: "We improve the way your business operates.",
    intro: "We start by mapping how work moves through your business and identifying where time, visibility or opportunities are being lost.",
    bridge: "Then we design and implement the right solution using automation, software, AI or a mix of them.",
    platform: "The AiAnchor Operations Platform gives you one place to track the systems we implement, the activity they generate and the progress they are making.",
    steps: [
      ["Understand the workflow", "We look at the process before deciding what should change."],
      ["Build the right system", "We design and implement the solution around the way your business actually works."],
      ["Track the impact", "Use the AiAnchor Operations Platform to see activity, results and how the system is performing over time."],
    ],
  } : {
    eyebrow: t.nav.about,
    title: t.about.heading,
    intro: t.about.lead,
    bridge: t.about.tagline,
    platform: t.about.mission,
    steps: t.consulting.steps.map(step => [step.title, step.deliverables]),
  };
  return <HomeSection id="about" robot="off" className="overflow-hidden">
    <div className="section-glow pointer-events-none absolute right-0 top-1/3 -z-10 h-[32rem] w-[min(48rem,100vw)] translate-x-1/3 -translate-y-1/2" aria-hidden="true" />
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <header className="reveal max-w-xl">
        <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base">{copy.eyebrow}</p>
        <h2 className="section-title font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">{copy.title}</h2>
        <p className="mt-7 text-lg leading-relaxed text-gray-300">{copy.intro}</p>
      </header>
      <div className="reveal self-end lg:pb-1">
        <p className="max-w-2xl text-lg leading-relaxed text-gray-400">{copy.bridge}</p>
        <div className="mt-8 border-l border-primary/50 bg-white/[0.03] px-6 py-5 sm:px-8">
          <p className="font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">{copy.platform}</p>
        </div>
      </div>
    </div>
    <div className="mt-20 border-t border-white/10 pt-8 md:mt-24">
      <div className="mb-8 flex items-center justify-between gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">{lang === "en" ? "Our method" : "Η μέθοδός μας"}</p>
        <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
        <p className="text-sm text-gray-500">03 {lang === "en" ? "steps" : "βήματα"}</p>
      </div>
      <ol className="reveal-stagger relative grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
        <span className="absolute left-[16.5%] right-[16.5%] top-12 hidden h-px bg-primary/30 md:block" aria-hidden="true" />
        {copy.steps.map(([title, body], index) => <li key={title} className="spotlight-card about-method-card reveal relative flex min-h-64 flex-col overflow-hidden bg-dark-900 p-7 sm:p-8">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-dark-900 font-mono text-sm tabular-nums text-primary">0{index + 1}</span>
          <h3 className="mt-auto pt-16 font-display text-xl font-semibold leading-tight text-white sm:text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{body}</p>
          {index < 2 && <span className="absolute right-6 top-8 hidden text-xl text-white/20 md:block" aria-hidden="true">→</span>}
        </li>)}
      </ol>
    </div>
  </HomeSection>;
}

// Compact FAQ, robot-free: two independent columns on desktop so opening one answer never reflows the other column.
// Native <details> keeps keyboard behavior; the shared name makes them an exclusive accordion where supported.
export function FaqSection({ lang }: { lang: Locale }) {
  const faq = getContent(lang).faq;
  const categories = lang === "en" ? [
    { label: "The big picture", note: "What AiAnchor does and how we think about solutions.", items: faq.items.slice(0, 2) },
    { label: "Workflow review", note: "How we understand the work before deciding what to change.", items: faq.items.slice(2, 4) },
    { label: "The platform", note: "How you track the systems, activity and results we implement.", items: faq.items.slice(4, 6) },
    { label: "Systems we build", note: "The tools, agents and custom systems that can support your operation.", items: faq.items.slice(6, 8) },
    { label: "Working together", note: "Common use cases, scope, timing, support and human handoff.", items: faq.items.slice(8) },
  ] : [
    { label: "Τι κάνουμε", note: "Τι αναλαμβάνει η AiAnchor και από πού ξεκινάμε.", items: faq.items.slice(0, 2) },
    { label: "Η διαδικασία σου", note: "Πώς βλέπουμε τη δουλειά σου πριν προτείνουμε αλλαγές.", items: faq.items.slice(2, 4) },
    { label: "Η πλατφόρμα", note: "Πώς βλέπεις τα συστήματά σου και τη δραστηριότητά τους.", items: faq.items.slice(4, 6) },
    { label: "Τι χτίζουμε", note: "Οι agents, οι αυτοματισμοί και τα συστήματα που μπορούμε να στήσουμε.", items: faq.items.slice(6, 8) },
    { label: "Η συνεργασία", note: "Τι συμφωνούμε, πόσο διαρκεί και πώς συνεχίζουμε μετά την έναρξη.", items: faq.items.slice(8) },
  ];
  return <HomeSection id="faq" robot="off">
    <p className="mb-5 text-center text-sm font-medium text-gray-400">{lang === "en" ? "Let's answer some questions" : faq.subhead}</p>
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="section-title font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">{faq.heading}</h2>
    </div>
    <FaqTabs categories={categories} label={faq.heading} />
  </HomeSection>;
}

// The robot swaps sides section by section: hero R, process L, capabilities R, dashboard intro L.
export function OperationsHome({ lang, children }: { lang: Locale; children?: ReactNode }) {
  const t = homepageCopy(lang);
  const pointIcons = ["voice", "follow", "sync", "calendar", "chart", "book"];
  return <main id="main" className="operations-home">
    <RobotCompanion />
    <Hero lang={lang} />

    <HomeSection id="how-it-works" robot="left">
      {lang === "gr" && <span id="consulting" className="absolute top-0 scroll-mt-24" aria-hidden="true" />}
      <SectionIntro title={t.process.title} body={t.process.body} from="left" />
      <StageRows steps={t.process.steps} />
      <Statement text={t.process.close} />
    </HomeSection>

    <HomeSection id="services" robot="right" className="overflow-hidden">
      <div className="section-glow pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[36rem] w-[min(48rem,120vw)] -translate-x-1/2 -translate-y-1/3" aria-hidden="true" />
      <SectionIntro title={t.capabilities.title} body={lang === "gr" ? getContent(lang).services.subhead : undefined} from="right" />
      <CapabilityCards lang={lang} compact />
    </HomeSection>

    <HomeSection id="features" robot="left">
      <SectionIntro title={t.dashboard.title} body={t.dashboard.body} from="left" />
      <ul className="reveal-stagger mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-16">{t.dashboard.points.map((point, i) => <li key={point.title} className="reveal border-t border-white/10 pt-6">
        <span className="text-primary"><ProductIcon name={pointIcons[i]} /></span>
        <h3 className="mt-5 font-display text-lg font-semibold text-white">{point.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">{point.body}</p>
      </li>)}</ul>
      <Statement text={t.dashboard.close} wide />
    </HomeSection>

    <HomeSection id="setup" robot="off" decoration={<LampContainer className="pointer-events-none absolute inset-0 z-0" />} connector>
      <div className="relative z-10 pt-12">
        <SectionIntro title={t.setup.title} centered />
        <ManagedSteps steps={t.setup.steps} />
        <Statement text={t.setup.close} wide />
      </div>
    </HomeSection>

    {children}

    <HomeSection id="contact" robot="off">
      <div className="final-panel reveal relative isolate overflow-hidden rounded-3xl border border-white/10 bg-dark-800/60 px-6 py-20 text-center sm:px-12 md:py-28">
        <div className="final-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" aria-hidden="true" />
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h2 className="section-title font-display text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">{t.final.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">{t.final.body}</p>
          <DemoPill lang={lang} className="mt-10" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-400">{t.final.note}</p>
        </div>
      </div>
    </HomeSection>
    <SectionMotion />
  </main>;
}
