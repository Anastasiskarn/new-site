import type { CSSProperties } from "react";
import { homepageCopy } from "../lib/homepage";
import { pathFor, type Locale } from "../lib/routes";
import ConstellationGrid from "./ui/constellation-grid";

// Layout adapted from waleedkibhen's SaaS Template hero on 21st.dev:
// https://21st.dev/@waleedkibhen/components/saa-s-template
// The dashboard preview is replaced by a lit horizon that hands off to the next section,
// under a pointer-reactive constellation mesh (components/ui/constellation-grid).
const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
}

export function HorizonHero({ lang }: { lang: Locale }) {
  const t = homepageCopy(lang);
  return (
    <ConstellationGrid
      as="section"
      className="horizon-hero relative isolate flex min-h-[min(940px,100svh)] flex-col items-center overflow-hidden px-6 pb-40 pt-40 md:pb-72 md:pt-52"
      canvasClassName="horizon-hero-mesh pointer-events-none -z-20"
      colorScheme="dark"
      accent="0, 240, 255"
      transparent
      labels={false}
    >
      <div className="horizon-hero-scrim pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <h1 className="horizon-hero-heading horizon-hero-enter max-w-5xl text-center font-display text-4xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl" style={delay(0)}>
        {t.hero.title}
      </h1>

      <p className="horizon-hero-enter mt-7 max-w-2xl text-center text-base leading-relaxed text-gray-400 md:text-lg" style={delay(200)}>
        {t.hero.body}
      </p>

      <div className="horizon-hero-enter mt-10 flex flex-wrap items-center justify-center gap-3" style={delay(300)}>
        <a className="horizon-hero-cta btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-7 text-base font-semibold text-dark-900" href={pathFor(lang, "book-demo")}>
          {t.demo}
          <Arrow />
        </a>
        <a className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-base text-white/70 hover:bg-white/5 hover:text-white" href="#how-it-works">
          {t.hero.secondary}
        </a>
      </div>

      <p className="horizon-hero-enter mt-6 text-center text-sm text-gray-500" style={delay(400)}>{t.hero.integration}</p>

      <div className="horizon-hero-horizon pointer-events-none absolute inset-x-0 bottom-0 -z-10" aria-hidden="true">
        <div className="horizon-hero-glow" />
        <div className="horizon-hero-arc" />
      </div>
    </ConstellationGrid>
  );
}
