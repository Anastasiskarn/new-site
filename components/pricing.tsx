import type { Content } from "../lib/content";
import { getContent } from "../lib/content";
import { pathFor, type Locale } from "../lib/routes";
import styles from "./pricing.module.css";

type Plan = Content["pricing"]["plans"][number];

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

// One step in the engagement, with a single CTA pinned to the bottom.
function PlanCard({ plan, href }: { plan: Plan; href: string }) {
  const featured = "featured" in plan && plan.featured;
  return (
    <article
      className={`${styles.card} pricing-card card-lift relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
        featured
          ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-dark-800/40"
          : "border-white/10 bg-dark-800/40"
      }`}
    >
      <span className="pricing-card-glow" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col">
        <h3 className="font-display text-xl font-semibold text-white lg:min-h-14">
          {plan.name}
        </h3>
        <p className="mt-5 flex min-h-12 flex-wrap items-baseline gap-x-2 gap-y-1">
          {"pricePrefix" in plan && (
            <span className="text-sm text-gray-400">{plan.pricePrefix}</span>
          )}
          <span className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white xl:text-4xl">
            {plan.price}
          </span>
          {"priceSuffix" in plan && (
            <span className="text-sm text-gray-400">{plan.priceSuffix}</span>
          )}
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-200 lg:min-h-[4.5rem]">
          {plan.purpose}
        </p>
        {plan.body && <p className="mt-3 text-sm leading-relaxed text-gray-400">
          {plan.body}
        </p>}
        <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6 text-sm leading-5 text-gray-300">
          {plan.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[3px] shrink-0 text-primary">
                <Check />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <a
            href={href}
            className={`btn-interactive flex min-h-12 items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-semibold ${
              featured
                ? "bg-white text-dark-900 hover:bg-gray-100"
                : "border border-white/15 text-white hover:border-primary/50"
            }`}
          >
            {plan.cta.label}
          </a>
        </div>
      </div>
    </article>
  );
}

export function Pricing({
  lang,
  copy,
}: {
  lang: Locale;
  copy: Content["pricing"];
}) {
  // Calls go to the booking form; "contact" is the direct email, the site's secondary route
  const targets = {
    book: pathFor(lang, "book-demo"),
    contact: `mailto:${getContent(lang).footer.contactEmail}`,
  };
  const steps = lang === "en" ? ["Review", "Setup", "Operate & improve"] : ["Αξιολόγηση", "Υλοποίηση", "Λειτουργία & βελτίωση"];
  return (
    <section id="pricing" className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(720px 480px at 50% 60%, rgba(0,240,255,0.04), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-8xl px-6">
        <div className="max-w-3xl">
          <h2 className="section-title font-display text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
            {copy.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            {copy.subhead}
          </p>
        </div>
        <ol className={styles.journey} aria-label={lang === "en" ? "Engagement steps" : "Βήματα συνεργασίας"}>
          {copy.plans.map((plan, index) => (
            <li className={styles.step} key={plan.name}>
              <div className={styles.stepHead}>
                <span className={styles.marker} aria-hidden="true">{index + 1}</span>
                <span className={styles.stepLabel}>{steps[index]}</span>
              </div>
            <PlanCard
              plan={plan}
              href={targets[plan.cta.target as keyof typeof targets]}
            />
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-gray-300">
          {copy.note} {copy.vatNote}
        </p>
      </div>
    </section>
  );
}
