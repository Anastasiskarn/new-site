"use client";
import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import type { Content } from "../lib/content";
import { pathFor, type Locale } from "../lib/routes";
type Categories = { necessary: true; analytics: boolean; marketing: boolean };
declare global {
  interface Window {
    AiAnchorConsent?: { categories: Categories; open: () => void };
  }
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    </svg>
  );
}
function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
    </svg>
  );
}
export function Consent({
  lang,
  copy,
}: {
  lang: Locale;
  copy: Content["cookieConsent"];
}) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [categories, setCategories] = useState<Categories>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const permitted = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let saved: Categories | undefined;
    try {
      const record = JSON.parse(
        localStorage.getItem("aianchor-consent") || "null",
      );
      if (
        record?.version === 1 &&
        typeof record.categories?.analytics === "boolean" &&
        typeof record.categories?.marketing === "boolean"
      )
        saved = { ...record.categories, necessary: true };
    } catch {}
    if (saved) {
      setCategories(saved);
      permitted.current = saved.analytics;
    } else setOpen(true);
    const reopen = () => {
      previousFocus.current = document.activeElement as HTMLElement;
      setCustom(true);
      setOpen(true);
    };
    window.AiAnchorConsent = {
      categories: saved || {
        necessary: true,
        analytics: false,
        marketing: false,
      },
      open: reopen,
    };
    document.addEventListener("aianchor:open-consent", reopen);
    return () => {
      document.removeEventListener("aianchor:open-consent", reopen);
    };
  }, []);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) {
      dialog.current.close();
      previousFocus.current?.focus();
    }
  }, [open]);
  function save(next: Categories) {
    permitted.current = next.analytics;
    setCategories(next);
    try {
      localStorage.setItem(
        "aianchor-consent",
        JSON.stringify({
          version: 1,
          date: new Date().toISOString(),
          categories: next,
        }),
      );
    } catch {}
    if (window.AiAnchorConsent) window.AiAnchorConsent.categories = next;
    document.dispatchEvent(
      new CustomEvent("aianchor:consent", { detail: next }),
    );
    setOpen(false);
  }
  return (
    <>
      {categories.analytics && (
        <Analytics beforeSend={(event) => (permitted.current ? event : null)} />
      )}
      <dialog
        ref={dialog}
        id={open ? "cookie-consent" : undefined}
        onCancel={(event) => {
          event.preventDefault();
        }}
        aria-labelledby="consent-title"
        aria-describedby="consent-desc"
        className="consent-dialog w-full rounded-2xl border border-white/10 bg-dark-800/95 p-6 text-white sm:p-7"
      >
        {!custom ? (
          <div>
            <div className="flex items-start gap-4">
              <span className="hidden shrink-0 rounded-xl bg-gradient-to-tr from-primary to-secondary p-2.5 sm:block">
                <ShieldIcon />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {copy.intro.eyebrow}
                </p>
                <h2 id="consent-title" className="mt-1.5 font-display text-lg font-bold text-white">
                  {copy.intro.heading}
                </h2>
                <p id="consent-desc" className="mt-2 text-sm leading-relaxed text-gray-400">
                  {copy.intro.body}{" "}
                  <a
                    className="link-hover font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                    href={pathFor(lang, "cookies")}
                  >
                    {copy.intro.policyLink}
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                className="btn-interactive btn-no-fill min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-gray-300 hover:border-primary/50 hover:text-white"
                onClick={() => setCustom(true)}
              >
                {copy.intro.customize}
              </button>
              <button
                type="button"
                className="btn-interactive btn-no-fill min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-gray-300 hover:border-primary/50 hover:text-white"
                onClick={() =>
                  save({ necessary: true, analytics: false, marketing: false })
                }
              >
                {copy.intro.rejectAll}
              </button>
              <button
                type="button"
                className="btn-interactive min-h-11 rounded-full bg-white px-5 text-sm font-semibold text-dark-900 hover:bg-gray-100"
                onClick={() =>
                  save({ necessary: true, analytics: true, marketing: true })
                }
              >
                {copy.intro.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-4">
              <button
                type="button"
                aria-label={copy.prefs.back}
                className="btn-interactive btn-no-fill mt-0.5 shrink-0 rounded-lg border border-white/10 p-2 text-gray-300 hover:border-primary/50 hover:text-white"
                onClick={() => setCustom(false)}
              >
                <BackIcon />
              </button>
              <div className="min-w-0">
                <h2 id="consent-title" className="font-display text-lg font-bold text-white">
                  {copy.prefs.heading}
                </h2>
                <p id="consent-desc" className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {copy.prefs.body}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {copy.prefs.categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-dark-900/60 p-4"
                >
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">{category.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">{category.desc}</p>
                  </div>
                  {category.locked ? (
                    <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {copy.prefs.alwaysOn}
                    </span>
                  ) : (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={categories[category.id as "analytics" | "marketing"]}
                      aria-label={category.title}
                      className="cookie-switch shrink-0"
                      onClick={() =>
                        setCategories({
                          ...categories,
                          [category.id]: !categories[category.id as "analytics" | "marketing"],
                        })
                      }
                    >
                      <span className="cookie-switch-thumb" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                className="btn-interactive btn-no-fill min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-gray-300 hover:border-primary/50 hover:text-white"
                onClick={() => save({ ...categories, necessary: true })}
              >
                {copy.prefs.save}
              </button>
              <button
                type="button"
                className="btn-interactive min-h-11 rounded-full bg-white px-5 text-sm font-semibold text-dark-900 hover:bg-gray-100"
                onClick={() =>
                  save({ necessary: true, analytics: true, marketing: true })
                }
              >
                {copy.prefs.acceptAll}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
export function CookieSettings({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="link-hover inline-flex min-h-11 items-center text-left hover:text-primary"
      onClick={() => document.dispatchEvent(new Event("aianchor:open-consent"))}
    >
      {label}
    </button>
  );
}
