import type { CSSProperties, ReactNode } from "react";
import { getContent, labels, plain, type Content } from "../lib/content";
import { getDetail } from "../lib/details";
import { APP_URL, detailSlugs, pathFor, type Locale } from "../lib/routes";
import { Action, Section } from "./ui";
import { LeadForm } from "./forms";
import { OperationsHome, CapabilityCards, DemoAction, AboutSection, FaqSection } from "./homepage";
import { Pricing } from "./pricing";
import { DashboardPreview } from "./dashboard-preview";
import { homepageCopy } from "../lib/homepage";
import { RestoredSection } from "./restored-sections";
import { SectionMotion } from "./section-motion";
export function Footer({ lang, copy }: { lang: Locale; copy: Content }) {
  return <RestoredSection lang={lang} section="footer" cookieLabel={copy.footer.legalLinks.cookieSettings} />;
}
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-4xl divide-y divide-white/15 border-y border-white/15">
      {items.map((item) => (
        <details key={item.q} className="faq-item py-5">
          <summary className="cursor-pointer min-h-11 py-2 text-lg font-semibold text-white">
            {plain(item.q)}
          </summary>
          <p className="mt-4 max-w-3xl text-gray-200 leading-relaxed">
            {plain(item.a)}
          </p>
        </details>
      ))}
    </div>
  );
}
export function Comparison({ lang, t, spacing }: { lang: Locale; t: Content; spacing?: string }) {
  const l = labels[lang],
    c = t.comparison;
  const value = (cell: boolean | string) =>
    typeof cell === "boolean" ? (cell ? l.included : l.unavailable) : cell;
  return (
    <Section title={c.heading} lead={c.subhead} spacing={spacing}>
      <p className="mb-6 max-w-3xl text-sm text-gray-300">{l.illustrative}</p>
      <div
        className="overflow-x-auto rounded-xl border border-white/15"
        role="region"
        aria-label={c.heading}
        tabIndex={0}
      >
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{l.illustrative}</caption>
          <thead className="bg-dark-800">
            <tr>
              {[l.features, c.cols.aianchor, c.cols.human, c.cols.basic].map(
                (name) => (
                  <th scope="col" key={name} className="p-4 font-semibold">
                    {name}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <th scope="row" className="p-4 font-medium text-gray-200">
                  {row.label}
                </th>
                {[row.aianchor, row.human, row.basic].map((cell, index) => (
                  <td
                    key={index}
                    className={`p-4 ${
                      index === 0 ? "text-primary" : "text-gray-300"
                    }`}
                  >
                    {value(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
export function Home({ lang }: { lang: Locale }) {
  const t = getContent(lang);
  return <OperationsHome lang={lang}>
    <Pricing lang={lang} copy={t.pricing} />
    <AboutSection lang={lang} />
    <FaqSection lang={lang} />
  </OperationsHome>;
}
export function PlatformPage({ lang }: { lang: Locale }) {
  const t = homepageCopy(lang);
  return <main id="main">
    <PageIntro title={t.platform.title} lead={t.platform.body}><div className="mt-8"><DemoAction lang={lang} /></div><DashboardPreview lang={lang} eager /></PageIntro>
    <Section title={t.platform.details} tone><CapabilityCards lang={lang} linked /><ServiceLinks lang={lang} /></Section>
    <Section id="faq" title={t.platform.faq}><Faq items={getContent(lang).faq.items} /></Section>
    <SectionMotion />
  </main>;
}
export function ServiceLinks({ lang }: { lang: Locale }) {
  return (
    <nav
      className="mt-10 flex flex-wrap gap-4"
      aria-label={labels[lang].services}
    >
      {detailSlugs
        .filter((slug) => slug !== "pricing" && slug !== "about" && slug !== "platform")
        .map((slug) => (
          <a
            key={slug}
            className="min-h-11 rounded-lg border border-primary/30 px-4 py-3 text-primary hover:bg-primary/10"
            href={pathFor(lang, slug)}
          >
            {getDetail(lang, slug)?.title}
          </a>
        ))}
    </nav>
  );
}
export function DetailPage({ lang, slug }: { lang: Locale; slug: string }) {
  const detail = getDetail(lang, slug)!;
  const l = labels[lang];
  return (
    <main id="main">
      <PageIntro title={detail.title} lead={detail.intro}>
        <p className="mt-6 max-w-3xl text-gray-200 leading-relaxed">
          {detail.audience}
        </p>
        <div className="mt-8">
          <Action href={pathFor(lang, "book-demo")}>{l.demo}</Action>
        </div>
      </PageIntro>
      {[
        [l.process, detail.process],
        [l.languages, detail.integrations],
        [l.pricing, detail.pricing],
        [l.limitations, detail.limits],
      ].map(([title, body], index) => (
        <Section key={title} title={title} tone={index % 2 === 0}>
          <p className="max-w-3xl text-lg text-gray-200 leading-relaxed">
            {body}
          </p>
          {index === 2 && (
            <a
              href={`${pathFor(lang)}#pricing`}
              className="mt-5 inline-flex min-h-11 items-center text-primary underline"
            >
              {getContent(lang).nav.pricing}
            </a>
          )}
        </Section>
      ))}
      <Section title={l.faq}>
        <Faq items={detail.faqs} />
        <ServiceLinks lang={lang} />
      </Section>
    </main>
  );
}
export function PageIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="pt-36 pb-16 bg-hero-glow">
      <div className="mx-auto max-w-8xl px-6">
        <h1 className="max-w-4xl font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300 leading-relaxed">
          {lead}
        </p>
        {children}
      </div>
    </section>
  );
}
export function BookingPage({ lang }: { lang: Locale }) {
  const t = getContent(lang);
  return (
    <main id="main" className="demo-page relative overflow-hidden">
      <div className="demo-page-glow pointer-events-none absolute inset-x-0 top-0 h-[60rem]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-8xl gap-x-12 gap-y-10 px-6 pb-24 pt-32 md:pt-40 lg:grid-cols-12 xl:gap-x-16">
        <header className="min-w-0 lg:col-span-7">
          <h1 className="demo-enter max-w-3xl font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] text-white text-balance sm:text-6xl xl:text-7xl">
            {t.bookDemo.heading}
          </h1>
          <p className="demo-enter mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl" style={{ "--demo-delay": "80ms" } as CSSProperties}>
            {t.bookDemo.subhead}
          </p>
          <a
            href="#demo-form"
            className="btn-interactive mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-6 font-semibold text-dark-900 hover:bg-primary lg:hidden"
          >
            {t.bookDemo.form.submit}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </header>

        <aside
          id="demo-form"
          aria-labelledby="demo-form-heading"
          className="min-w-0 scroll-mt-24 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1"
        >
          <div className="demo-panel demo-enter relative rounded-3xl border border-white/10 p-6 sm:p-8 lg:sticky lg:top-28" style={{ "--demo-delay": "160ms" } as CSSProperties}>
            <h2 id="demo-form-heading" className="font-display text-2xl font-bold tracking-tight text-white">
              {t.bookDemo.form.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{t.bookDemo.form.subheading}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-white/10 pb-6 text-sm text-gray-200">
              <li className="inline-flex items-center gap-2">
                <DemoIcon name="clock" />
                {lang === "en" ? "30 minutes" : "30 λεπτά"}
              </li>
              <li className="inline-flex items-center gap-2">
                <DemoIcon name="card" />
                {lang === "en" ? "No card, no commitment" : "Χωρίς κάρτα, χωρίς δέσμευση"}
              </li>
            </ul>
            <div className="mt-6">
              <LeadForm
                lang={lang}
                copy={t.bookDemo.form}
                privacyLabel={t.footer.legalLinks.privacy}
                booking
              />
            </div>
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-7">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {lang === "en" ? "What we’ll cover" : "Τι θα καλύψουμε"}
          </h2>
          <ol className="demo-agenda relative mt-8 grid gap-8">
            {t.bookDemo.bullets.map((item) => (
              <li key={item.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-5">
                <span className="demo-agenda-node relative z-10 grid size-11 place-items-center rounded-xl text-primary" aria-hidden="true">
                  <DemoIcon name={item.icon} size={20} />
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-gray-300">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 border-t border-white/10 pt-10">
            <h2 className="font-display text-lg font-semibold text-white">{lang === "en" ? "What happens next" : "Τι γίνεται μετά"}</h2>
            <ol className="mt-6 grid gap-6 md:grid-cols-3">
              {t.bookDemo.nextSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="text-sm font-semibold text-primary">{index + 1}.</span>
                  <h3 className="mt-2 font-display font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{step.desc}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-gray-400">{t.bookDemo.noPressureNote}</p>
          </div>
        </div>
      </div>
      <SectionMotion />
    </main>
  );
}
export function LegalPage({ lang, slug }: { lang: Locale; slug: string }) {
  const t = getContent(lang),
    legal = t.legal;
  const page = legal[slug as keyof typeof legal] as {
    title: string;
    updated?: string;
    intro: string;
    sections: {
      id: string;
      h: string;
      ps?: string[];
      list?: string[];
      table?: { head: string[]; rows: string[][] };
    }[];
  };
  // Trusted repository-authored legal rich text is kept verbatim to preserve meaning.
  const rich = (html: string) => (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
  return (
    <main id="main" className="pt-36 pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-balance">
          {page.title}
        </h1>
        <p className="mt-4 text-sm text-gray-300">
          {page.updated || legal.lastUpdated}
        </p>
        <div
          role="note"
          className="mt-6 rounded-xl border border-amber-300/40 bg-amber-300/5 p-4 text-amber-200 leading-relaxed"
        >
          {rich(legal.draftNotice)}
        </div>
        <p className="mt-8 text-lg text-gray-200 leading-relaxed">
          {rich(page.intro)}
        </p>
        <nav
          aria-label={legal.tocLabel}
          className="mt-8 rounded-xl border border-white/15 p-5"
        >
          <h2 className="font-semibold">{legal.tocLabel}</h2>
          <ol className="mt-3 space-y-2">
            {page.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-200 underline hover:text-primary"
                >
                  {section.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{section.h}</h2>
              {section.ps?.map((p, index) => (
                <p key={index} className="mt-4 text-gray-200 leading-relaxed">
                  {rich(p)}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-200 leading-relaxed">
                  {section.list.map((item, index) => (
                    <li key={index}>{rich(item)}</li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div
                  className="mt-5 overflow-x-auto rounded-lg border border-white/15"
                  role="region"
                  aria-label={section.h}
                  tabIndex={0}
                >
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr>
                        {section.table.head.map((cell, index) => (
                          <th
                            scope="col"
                            key={index}
                            className="bg-dark-800 p-4"
                          >
                            {rich(cell)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, index) => (
                        <tr key={index} className="border-t border-white/15">
                          {row.map((cell, column) => (
                            <td
                              key={column}
                              className="align-top p-4 text-gray-200"
                            >
                              {rich(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      </article>
      <SectionMotion />
    </main>
  );
}
function DemoIcon({ name, size = 16 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
    workflow: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M6.5 10v2.5A1.5 1.5 0 0 0 8 14h6" /></>,
    chart: <><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    card: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M3 3l18 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={size < 18 ? "text-primary" : undefined}>
      {paths[name] ?? paths.clock}
    </svg>
  );
}
