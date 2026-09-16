"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Content } from "../lib/content";
import { pathFor, type Locale } from "../lib/routes";
export function LeadForm({
  lang,
  copy,
  privacyLabel,
  booking = false,
}: {
  lang: Locale;
  copy: Content["bookDemo"]["form"] | Content["contact"]["form"];
  privacyLabel: string;
  booking?: boolean;
}) {
  const f = copy;
  const bookingCopy = "phone" in copy ? copy : undefined;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [confirmed, setConfirmed] = useState(true);
  const [interest, setInterest] = useState("");
  const [interestOpen, setInterestOpen] = useState(false);
  const message = useRef<HTMLTextAreaElement>(null);
  const interestMenu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!interestOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setInterestOpen(false);
    }
    function closeOnOutsideClick(event: MouseEvent) {
      if (interestMenu.current && !interestMenu.current.contains(event.target as Node)) setInterestOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [interestOpen]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || state === "sending") return;
    setState("sending");
    const formData = new FormData(form);
    formData.set("lang", lang);
    formData.set("pagePath", window.location.pathname);
    try {
      const response = await fetch(booking ? "/api/book-demo/" : f.endpoint, {
        method: "POST",
        headers: booking
          ? { "Content-Type": "application/json", Accept: "application/json" }
          : { Accept: "application/json" },
        body: booking ? JSON.stringify(Object.fromEntries(formData)) : formData,
      });
      const result = await response.json().catch(() => ({}));
      if (
        !response.ok ||
        (booking && result.ok !== true) ||
        (!booking && (result.errors || result.ok === false))
      )
        throw new Error("submission_failed");
      setConfirmed(result.confirmationSent !== false);
      setState("success");
      setInterest("");
      form.reset();
    } catch {
      setState("error");
    }
  }
  const optional = lang === "en" ? "optional" : "προαιρετικό";
  if (state === "success")
    return (
      <div role="status" className="demo-success py-6 text-center">
        <span className="demo-success-mark mx-auto grid size-16 place-items-center rounded-full">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path pathLength="1" d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">{f.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gray-300">
          {booking && !confirmed
            ? lang === "en"
              ? "Your request was received, but the confirmation email could not be sent. The team will follow up."
              : "Λάβαμε το αίτημά σου, αλλά δεν στάλθηκε το email επιβεβαίωσης. Η ομάδα μας θα επικοινωνήσει μαζί σου."
            : f.successBody}
        </p>
        <button
          type="button"
          className="btn-interactive mt-8 inline-flex min-h-11 items-center rounded-lg border border-white/15 px-5 text-sm font-semibold text-white hover:border-primary/60"
          onClick={() => setState("idle")}
        >
          {f.sendAnother}
        </button>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      action={booking ? "/api/book-demo/" : f.endpoint}
      method="post"
      className="grid gap-x-4 gap-y-5 sm:grid-cols-2"
      aria-busy={state === "sending"}
    >
      {(["firstName", "lastName", "email"] as const).map((name) => (
        <Field
          key={name}
          label={f[name]}
          required
          className={name === "email" ? "sm:col-span-2" : ""}
        >
          <input
            required
            name={name}
            type={name === "email" ? "email" : "text"}
            maxLength={name === "email" ? 200 : 100}
            autoComplete={
              name === "email"
                ? "email"
                : name === "firstName"
                  ? "given-name"
                  : "family-name"
            }
            className="demo-field"
          />
        </Field>
      ))}
      {bookingCopy &&
        (["phone", "company"] as const).map((name) => (
          <Field key={name} label={bookingCopy[name]} hint={optional}>
            <input
              name={name}
              type={name === "phone" ? "tel" : "text"}
              maxLength={name === "phone" ? 60 : 150}
              autoComplete={name === "phone" ? "tel" : "organization"}
              className="demo-field"
            />
          </Field>
        ))}
      {bookingCopy && (
        <Field
          label={bookingCopy.website}
          hint={optional}
          className="sm:col-span-2"
          help={bookingCopy.websiteHint}
          helpId="demo-website-help"
        >
          <input
            name="website"
            type="text"
            inputMode="url"
            maxLength={300}
            autoComplete="url"
            placeholder={bookingCopy.websitePlaceholder}
            aria-describedby="demo-website-help"
            className="demo-field"
          />
        </Field>
      )}
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 flex w-full items-baseline justify-between gap-3 text-sm font-medium text-gray-200">
          {f.interest}
          <span className="text-xs font-normal text-gray-400">{optional}</span>
        </legend>
        <div ref={interestMenu} className="demo-select">
          <button
            type="button"
            className="demo-select-trigger"
            aria-haspopup="dialog"
            aria-expanded={interestOpen}
            onClick={() => setInterestOpen((open) => !open)}
          >
            <span className={interest ? "text-gray-100" : "text-gray-400"}>
              {interest || (lang === "en" ? "Select an area" : "Διάλεξε τομέα")}
            </span>
            <svg className={`h-4 w-4 shrink-0 transition-transform ${interestOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {interestOpen && (
            <div className="demo-select-dialog" role="dialog" aria-label={f.interest}>
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
                <p className="text-xs text-gray-400">{lang === "en" ? "Choose one area" : "Διάλεξε έναν τομέα"}</p>
                {interest && <button type="button" className="text-xs text-primary hover:text-white" onClick={() => { setInterest(""); setInterestOpen(false); }}>{lang === "en" ? "Clear" : "Καθαρισμός"}</button>}
              </div>
              <div className="grid gap-1.5 p-2">
                {f.interestOptions.map((option) => (
                  <label key={option} className="demo-chip">
                    <input
                      type="radio"
                      name="interest"
                      value={option}
                      checked={interest === option}
                      onChange={() => { setInterest(option); setInterestOpen(false); }}
                      className="sr-only"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </fieldset>
      <Field label={f.message} required className="sm:col-span-2">
        <textarea
          ref={message}
          required
          name="message"
          rows={4}
          maxLength={4000}
          placeholder={bookingCopy?.messagePlaceholder}
          className="demo-field resize-y"
        />
      </Field>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input
            name={booking ? "companyUrl" : "_gotcha"}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      {state === "error" && (
        <p role="alert" className="demo-error sm:col-span-2 flex gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed text-rose-100">
          <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5M12 16.5v.01" />
          </svg>
          <span>
            {f.errorMessage}{" "}
            <a className="underline underline-offset-2" href="mailto:info@aianchor.online">
              info@aianchor.online
            </a>
          </span>
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="demo-submit btn-interactive group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-white px-6 text-base font-semibold text-dark-900 hover:bg-primary disabled:opacity-70"
        >
          {state === "sending" ? (
            <>
              <svg className="demo-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.2-8.6" />
              </svg>
              {f.submitting}
            </>
          ) : (
            <>
              {f.submit}
              <svg className="transition-transform duration-200 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
        <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
          {bookingCopy
            ? bookingCopy.privacyNote
            : lang === "en"
              ? "We use these details to respond to your enquiry."
              : "Χρησιμοποιούμε τα στοιχεία σου για να απαντήσουμε στο ερώτημά σου."}{" "}
          <a
            href={pathFor(lang, "privacy")}
            className="text-gray-200 underline decoration-primary/60 underline-offset-2 hover:text-primary"
          >
            {privacyLabel}
          </a>
        </p>
      </div>
    </form>
  );
}
function Field({
  label,
  required = false,
  hint,
  help,
  helpId,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  help?: string;
  helpId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm font-medium text-gray-200">
        <span className="min-w-0 break-words">
          {label}
          {required && (
            <span className="ml-1 text-primary" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && <span className="shrink-0 text-xs font-normal text-gray-400">{hint}</span>}
      </span>
      {children}
      {help && (
        <span id={helpId} className="mt-2 block text-xs leading-relaxed text-gray-400">
          {help}
        </span>
      )}
    </label>
  );
}
