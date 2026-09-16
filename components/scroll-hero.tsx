import type { CSSProperties } from "react";
import { homepageCopy } from "../lib/homepage";
import { pathFor, type Locale } from "../lib/routes";
import { DashboardPreview } from "./dashboard-preview";
import { ScrollFrame } from "./ui/scroll-frame";

// Near-empty opening: headline, one supporting line, two restrained actions, and the framed product
// peeking from the fold. Motion lives in components/ui/scroll-frame; everything here is server-rendered.
// Entrance runs on the inner copy so it never competes with the scrub transforms on the wrapping layers.
const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
}

export function ScrollHero({ lang }: { lang: Locale }) {
  const t = homepageCopy(lang);
  return (
    <ScrollFrame
      title={
        <h1 style={delay(0)} className="scroll-hero-heading scroll-hero-enter mx-auto max-w-5xl text-center font-display text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
          {t.hero.title}
        </h1>
      }
      body={
        <p style={delay(180)} className="scroll-hero-enter mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-gray-400 md:text-lg">
          {t.hero.body}
        </p>
      }
      actions={
        <div style={delay(260)} className="scroll-hero-enter mt-10 flex flex-wrap items-center justify-center gap-2">
          <a className="btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-dark-900" href={pathFor(lang, "book-demo")}>
            {t.demo}
            <Arrow />
          </a>
          <a className="link-hover inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-medium text-gray-300 hover:text-primary" href="#how-it-works">
            {t.hero.secondary}
          </a>
        </div>
      }
      note={<p style={delay(340)} className="scroll-hero-enter mt-5 text-center text-sm text-gray-400">{t.hero.integration}</p>}
      mockup={
        // The same preview renders with its caption in #features, so this cropped copy stays out of the accessibility tree
        <div className="[&_.dash-glow]:hidden [&_.dash-preview]:mt-0 [&_figcaption]:hidden" aria-hidden="true">
          <DashboardPreview lang={lang} eager idPrefix="hero-spark" />
        </div>
      }
    />
  );
}
