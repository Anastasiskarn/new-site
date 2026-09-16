"use client";
// Multistep discovery-call request, adapted from the 21st.dev "Multistep Form"
// (arihantcodes): dot rail + progress bar, sliding step card, Back/Continue footer.
// Posts the same JSON contract as before to /api/book-demo/.
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Content } from "../lib/content";
import { pathFor, type Locale } from "../lib/routes";

type Copy = Content["bookDemo"]["form"];
type Data = {
  interest: string[];
  message: string;
  company: string;
  website: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type Field = keyof Data;

const empty: Data = {
  interest: [],
  message: "",
  company: "",
  website: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const ui = {
  en: {
    steps: [
      { title: "Focus", heading: null, desc: "" },
      { title: "Challenge", heading: null, desc: "A few sentences are enough. We read them before the call." },
      { title: "Business", heading: "Tell us about your business", desc: "Optional, but it helps us come prepared." },
      { title: "Contact", heading: "Where should we reach you?", desc: "We’ll email you to arrange a time that suits you." },
    ],
    back: "Back",
    next: "Continue",
    stepOf: (n: number, total: number, title: string) => `Step ${n} of ${total}: ${title}`,
    progress: "Form progress",
    optional: "optional",
    required: "This field is required.",
    chooseArea: "Choose at least one area to continue.",
    invalidEmail: "Enter a valid email address.",
    duration: "30 minutes",
    noCard: "No card, no commitment",
    unconfirmed:
      "Your request was received, but the confirmation email could not be sent. The team will follow up.",
  },
  gr: {
    steps: [
      { title: "Στόχος", heading: null, desc: "" },
      { title: "Πρόκληση", heading: null, desc: "Λίγες προτάσεις αρκούν. Τις διαβάζουμε πριν την κλήση." },
      { title: "Επιχείρηση", heading: "Πες μας για την επιχείρησή σου", desc: "Προαιρετικό, αλλά μας βοηθά να έρθουμε προετοιμασμένοι." },
      { title: "Επικοινωνία", heading: "Πού να επικοινωνήσουμε μαζί σου;", desc: "Θα σου στείλουμε email για να βρούμε ώρα που σε βολεύει." },
    ],
    back: "Πίσω",
    next: "Συνέχεια",
    stepOf: (n: number, total: number, title: string) => `Βήμα ${n} από ${total}: ${title}`,
    progress: "Πρόοδος φόρμας",
    optional: "προαιρετικό",
    required: "Το πεδίο είναι υποχρεωτικό.",
    chooseArea: "Διάλεξε τουλάχιστον έναν τομέα για να συνεχίσεις.",
    invalidEmail: "Γράψε μια έγκυρη διεύθυνση email.",
    duration: "30 λεπτά",
    noCard: "Χωρίς κάρτα, χωρίς δέσμευση",
    unconfirmed:
      "Λάβαμε το αίτημά σου, αλλά δεν στάλθηκε το email επιβεβαίωσης. Η ομάδα μας θα επικοινωνήσει μαζί σου.",
  },
} as const;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export function DiscoveryForm({
  lang,
  copy,
  privacyLabel,
}: {
  lang: Locale;
  copy: Copy;
  privacyLabel: string;
}) {
  const t = ui[lang];
  const steps = t.steps;
  const last = steps.length - 1;
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [confirmed, setConfirmed] = useState(true);

  const panel = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const moved = useRef(false);

  // The step heading mounts only after the previous step's exit animation, so focus it from
  // its ref rather than an effect. Keyboard and screen-reader users land on the new step.
  const focusHeading = useCallback((el: HTMLHeadingElement | null) => {
    if (el && moved.current) el.focus({ preventScroll: true });
  }, []);

  // A long step on a phone can leave the panel top above the fold; bring it back.
  useEffect(() => {
    if (!moved.current) return;
    const top = panel.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) panel.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [step, reduceMotion]);

  const update = <K extends Field>(field: K, value: Data[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // "Not sure yet" (always the last option) can't sit alongside a specific problem:
  // picking it clears the others, and picking any other clears it.
  // Derived from the previous state, not this render's data, so quick successive clicks
  // don't overwrite each other.
  function toggleInterest(option: string) {
    const options = copy.interestOptions;
    const unsure = options[options.length - 1];
    setData((prev) => {
      const selected = prev.interest;
      const next = selected.includes(option)
        ? selected.filter((o) => o !== option)
        : option === unsure
          ? [option]
          : [...selected.filter((o) => o !== unsure), option];
      return { ...prev, interest: options.filter((o) => next.includes(o)) };
    });
    if (errors.interest) setErrors((prev) => ({ ...prev, interest: undefined }));
  }

  function validate(index: number) {
    const next: Partial<Record<Field, string>> = {};
    if (index === 0 && !data.interest.length) next.interest = t.chooseArea;
    if (index === 1 && !data.message.trim()) next.message = t.required;
    if (index === 3) {
      if (!data.firstName.trim()) next.firstName = t.required;
      if (!data.lastName.trim()) next.lastName = t.required;
      if (!data.email.trim()) next.email = t.required;
      else if (!isEmail(data.email.trim())) next.email = t.invalidEmail;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      const target = panel.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      target?.focus();
    }
    return !first;
  }

  function goTo(index: number) {
    moved.current = true;
    setDirection(index > step ? 1 : -1);
    setErrors({});
    setStep(index);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || !validate(step)) return;
    if (step < last) return goTo(step + 1);

    setState("sending");
    try {
      const response = await fetch("/api/book-demo/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          companyUrl: honeypot.current?.value ?? "",
          lang,
          pagePath: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error("submission_failed");
      setConfirmed(result.confirmationSent !== false);
      setState("success");
    } catch {
      setState("error");
    }
  }

  function reset() {
    moved.current = false;
    setData(empty);
    setErrors({});
    setStep(0);
    setState("idle");
  }

  const offset = reduceMotion ? 0 : 40;
  const current = steps[step];

  return (
    <div
      ref={panel}
      className="relative scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-dark-700/90 to-dark-900/95 shadow-[0_24px_60px_rgb(0_0_0/0.28)]"
    >
      <div className="border-b border-white/10 px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <h2 id="demo-form-heading" className="font-display text-2xl font-bold tracking-tight text-white">
              {copy.heading}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{copy.subheading}</p>
          </div>
          <ul className="flex flex-wrap gap-2 text-xs text-gray-300">
            <li className="rounded-full border border-white/10 px-3 py-1.5">{t.duration}</li>
            <li className="rounded-full border border-white/10 px-3 py-1.5">{t.noCard}</li>
          </ul>
        </div>

        {state !== "success" && (
          <nav aria-label={t.progress} className="mt-7">
            {/* Equal columns put each dot centre at a fixed fraction, so the track can start and
                end on the first and last dot and fill exactly to the active one. */}
            <ol className="relative grid grid-cols-4">
              <li className="absolute inset-x-[12.5%] top-[11px] h-0.5 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  initial={false}
                  animate={{ width: `${(step / last) * 100}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                />
              </li>
              {steps.map((item, index) => {
                const done = index < step;
                const active = index === step;
                return (
                  <li key={item.title} className="relative flex min-w-0 justify-center">
                    <button
                      type="button"
                      onClick={() => index < step && goTo(index)}
                      disabled={index > step || state === "sending"}
                      aria-current={active ? "step" : undefined}
                      className="group flex min-h-11 flex-col items-center gap-2 rounded-lg px-1 disabled:cursor-default"
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-full border text-[11px] font-semibold tabular-nums transition-[background-color,border-color,box-shadow,color] duration-300 ${
                          done
                            ? "border-primary bg-primary text-dark-900 group-hover:bg-white group-hover:border-white"
                            : active
                              ? "border-primary bg-dark-900 text-primary shadow-[0_0_0_4px_rgb(0_240_255/0.16)]"
                              : "border-white/15 bg-dark-900 text-gray-500"
                        }`}
                        aria-hidden="true"
                      >
                        {done ? <Check size={12} /> : index + 1}
                      </span>
                      <span
                        className={`hidden text-xs sm:block ${active ? "font-semibold text-white" : done ? "text-gray-300" : "text-gray-500"}`}
                      >
                        {item.title}
                      </span>
                      <span className="sr-only sm:hidden">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-1 text-center text-xs text-gray-400 sm:hidden">
              {t.stepOf(step + 1, steps.length, current.title)}
            </p>
          </nav>
        )}
      </div>

      {state === "success" ? (
        <div role="status" className="px-5 py-12 text-center sm:px-8">
          <motion.span
            className="mx-auto grid size-16 place-items-center rounded-full border border-primary/30 bg-primary/[0.08]"
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Check size={28} />
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-white">{copy.successTitle}</h3>
          <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gray-300">
            {confirmed ? copy.successBody : t.unconfirmed}
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn-interactive mt-8 inline-flex min-h-11 items-center rounded-lg border border-white/15 px-5 text-sm font-semibold text-white hover:border-primary/60"
          >
            {copy.sendAnother}
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          action="/api/book-demo/"
          method="post"
          noValidate
          aria-busy={state === "sending"}
        >
          <div className="relative min-h-[22rem] px-5 py-7 sm:px-8">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.fieldset
                key={step}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir * offset }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: number) => ({ opacity: 0, x: dir * -offset }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.23, 1, 0.32, 1] }}
                className="min-w-0"
                disabled={state === "sending"}
              >
                <legend className="sr-only">{t.stepOf(step + 1, steps.length, current.title)}</legend>
                <h3
                  ref={focusHeading}
                  tabIndex={-1}
                  className="font-display text-xl font-semibold tracking-tight text-white outline-none sm:text-2xl"
                >
                  {current.heading ?? (step === 0 ? copy.interest : copy.message)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {step === 0 ? copy.interestIntro : current.desc}
                </p>

                <div className="mt-6">
                  {step === 0 && (
                    <div role="group" aria-label={copy.interest} aria-describedby={errors.interest ? "err-interest" : undefined}>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {copy.interestOptions.map((option, index) => (
                          <motion.label
                            key={option}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: reduceMotion ? 0 : 0.03 * index, duration: 0.25 }}
                            className="group flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-dark-900/60 px-4 py-3.5 transition-colors duration-200 hover:border-white/25 has-[:checked]:border-primary/60 has-[:checked]:bg-primary/[0.08] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/60"
                          >
                            <input
                              type="checkbox"
                              name="interest"
                              value={option}
                              checked={data.interest.includes(option)}
                              onChange={() => toggleInterest(option)}
                              aria-describedby={`interest-hint-${index}`}
                              className="peer sr-only"
                            />
                            <span
                              className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-[5px] border border-white/25 text-dark-900 transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:opacity-100"
                              aria-hidden="true"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 transition-opacity duration-150">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </span>
                            <span className="min-w-0 [overflow-wrap:anywhere]">
                              <span className="block text-sm font-medium text-gray-100 group-hover:text-white">{option}</span>
                              <span id={`interest-hint-${index}`} className="mt-1 block text-xs leading-relaxed text-gray-400">
                                {copy.interestHints[index]}
                              </span>
                            </span>
                          </motion.label>
                        ))}
                      </div>
                      <ErrorText id="err-interest" message={errors.interest} />
                    </div>
                  )}

                  {step === 1 && (
                    <Input label={copy.message} error={errors.message} name="message" required srLabel>
                      {(props) => (
                        <textarea
                          {...props}
                          rows={6}
                          maxLength={4000}
                          value={data.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder={copy.messagePlaceholder}
                          className={`${fieldClass} min-h-40 resize-y`}
                        />
                      )}
                    </Input>
                  )}

                  {step === 2 && (
                    <div className="grid gap-5">
                      <Input label={copy.company} hint={t.optional} name="company">
                        {(props) => (
                          <input
                            {...props}
                            type="text"
                            maxLength={150}
                            autoComplete="organization"
                            value={data.company}
                            onChange={(e) => update("company", e.target.value)}
                            className={fieldClass}
                          />
                        )}
                      </Input>
                      <Input label={copy.website} hint={t.optional} help={copy.websiteHint} name="website">
                        {(props) => (
                          <input
                            {...props}
                            type="text"
                            inputMode="url"
                            maxLength={300}
                            autoComplete="url"
                            placeholder={copy.websitePlaceholder}
                            value={data.website}
                            onChange={(e) => update("website", e.target.value)}
                            className={fieldClass}
                          />
                        )}
                      </Input>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                      {(["firstName", "lastName"] as const).map((name) => (
                        <Input key={name} label={copy[name]} error={errors[name]} name={name} required>
                          {(props) => (
                            <input
                              {...props}
                              type="text"
                              maxLength={100}
                              autoComplete={name === "firstName" ? "given-name" : "family-name"}
                              value={data[name]}
                              onChange={(e) => update(name, e.target.value)}
                              className={fieldClass}
                            />
                          )}
                        </Input>
                      ))}
                      <Input label={copy.email} error={errors.email} name="email" required className="sm:col-span-2">
                        {(props) => (
                          <input
                            {...props}
                            type="email"
                            maxLength={200}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={fieldClass}
                          />
                        )}
                      </Input>
                      <Input label={copy.phone} hint={t.optional} name="phone" className="sm:col-span-2">
                        {(props) => (
                          <input
                            {...props}
                            type="tel"
                            maxLength={60}
                            autoComplete="tel"
                            value={data.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={fieldClass}
                          />
                        )}
                      </Input>
                    </div>
                  )}
                </div>
              </motion.fieldset>
            </AnimatePresence>
          </div>

          {state === "error" && (
            <p role="alert" className="mx-5 mb-5 flex gap-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm leading-relaxed text-rose-100 sm:mx-8">
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5v5.5M12 16.5v.01" />
              </svg>
              <span>
                {copy.errorMessage.split("info@aianchor.online")[0]}
                <a className="underline underline-offset-2" href="mailto:info@aianchor.online">
                  info@aianchor.online
                </a>
                {copy.errorMessage.split("info@aianchor.online")[1]}
              </span>
            </p>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-5 sm:px-8">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0 || state === "sending"}
              className="btn-interactive inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-semibold text-white hover:border-primary/60 disabled:invisible"
            >
              <Chevron dir="left" />
              {t.back}
            </button>
            <p className="hidden text-center text-xs tabular-nums text-gray-500 md:block">
              {t.stepOf(step + 1, steps.length, current.title)}
            </p>
            <button
              type="submit"
              disabled={state === "sending"}
              className="btn-interactive group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-dark-900 hover:bg-primary disabled:opacity-70 sm:px-6"
            >
              {state === "sending" ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M21 12a9 9 0 1 1-6.2-8.6" />
                  </svg>
                  {copy.submitting}
                </>
              ) : step === last ? (
                <>
                  {copy.submit}
                  <Chevron dir="right" />
                </>
              ) : (
                <>
                  {t.next}
                  <Chevron dir="right" />
                </>
              )}
            </button>
          </div>
          <p className="px-5 pb-6 text-center text-xs leading-relaxed text-gray-400 sm:px-8">
            {copy.privacyNote}{" "}
            <a
              href={pathFor(lang, "privacy")}
              className="text-gray-200 underline decoration-primary/60 underline-offset-2 hover:text-primary"
            >
              {privacyLabel}
            </a>
          </p>
        </form>
      )}

      {/* Spam trap, sent to the server as `companyUrl`. It sits outside the form under a
          meaningless name because browsers autofill a field called "companyUrl" (Chrome
          ignores autocomplete="off"), and a filled trap makes the server silently skip
          the emails. The data-* attributes keep password managers out of it too. */}
      <div className="honeypot" aria-hidden="true">
        <input
          ref={honeypot}
          id="dc-hp-7f3"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore=""
          data-lpignore="true"
          data-bwignore=""
          data-form-type="other"
          defaultValue=""
        />
      </div>
    </div>
  );
}

const fieldClass =
  "block w-full min-w-0 rounded-lg border border-white/[0.14] bg-dark-900/70 px-3.5 py-3 text-[15px] leading-snug text-white placeholder:text-gray-500 transition-[border-color,box-shadow,background-color] duration-200 hover:border-white/25 focus:border-primary/75 focus:bg-dark-800/90 focus:outline-none focus:ring-[3px] focus:ring-primary/15 aria-[invalid=true]:border-rose-400/70";

type FieldProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

function Input({
  label,
  name,
  hint,
  help,
  error,
  required = false,
  srLabel = false,
  className = "",
  children,
}: {
  label: string;
  name: Field;
  hint?: string;
  help?: string;
  error?: string;
  required?: boolean;
  srLabel?: boolean;
  className?: string;
  children: (props: FieldProps) => ReactNode;
}) {
  const id = `discovery-${name}`;
  const describedBy = [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`min-w-0 ${className}`}>
      <label
        htmlFor={id}
        className={
          srLabel
            ? "sr-only"
            : "mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm font-medium text-gray-200"
        }
      >
        <span className="min-w-0 break-words">
          {label}
          {required && (
            <span className="ml-1 text-primary" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && <span className="shrink-0 text-xs font-normal text-gray-400">{hint}</span>}
      </label>
      {children({ id, name, required, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {help && (
        <p id={`${id}-help`} className="mt-2 text-xs leading-relaxed text-gray-400">
          {help}
        </p>
      )}
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs font-medium text-rose-300">
      {message}
    </p>
  );
}

function Check({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={size > 14 ? "text-primary" : undefined}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-200 ${dir === "right" ? "group-hover:translate-x-0.5" : ""}`}
    >
      <path d={dir === "right" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
    </svg>
  );
}
