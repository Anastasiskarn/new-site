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
        className="consent-dialog w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-white/20 bg-dark-800 p-6 text-white"
      >
        <p className="text-primary text-sm">{copy.intro.eyebrow}</p>
        <h2 id="consent-title" className="mt-2 text-2xl font-display font-bold">
          {custom ? copy.prefs.heading : copy.intro.heading}
        </h2>
        <p className="mt-4 text-gray-200 leading-relaxed">
          {custom ? copy.prefs.body : copy.intro.body}
        </p>
        <a
          className="mt-4 inline-block min-h-11 text-primary underline"
          href={pathFor(lang, "cookies")}
        >
          {copy.intro.policyLink}
        </a>
        {custom && (
          <div className="my-4 space-y-4">
            {copy.prefs.categories.map((category) => (
              <label
                key={category.id}
                className="flex items-start gap-4 rounded-lg border border-white/15 p-4"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-cyan-400"
                  checked={categories[category.id as "analytics" | "marketing"]}
                  onChange={(event) =>
                    setCategories({
                      ...categories,
                      [category.id]: event.target.checked,
                    })
                  }
                />
                <span>
                  <span className="block font-semibold">{category.title}</span>
                  <span className="mt-1 block text-sm text-gray-300">
                    {category.desc}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="min-h-12 rounded-lg border border-white/30 px-4 py-3"
            onClick={() =>
              save({ necessary: true, analytics: false, marketing: false })
            }
          >
            {copy.intro.rejectAll}
          </button>
          <button
            type="button"
            className="min-h-12 rounded-lg border border-white/30 px-4 py-3"
            onClick={() =>
              save({ necessary: true, analytics: true, marketing: true })
            }
          >
            {copy.intro.acceptAll}
          </button>
          {custom ? (
            <button
              type="button"
              className="sm:col-span-2 min-h-12 rounded-lg bg-primary px-4 py-3 text-dark-900 font-semibold"
              onClick={() => save({ ...categories, necessary: true })}
            >
              {copy.prefs.save}
            </button>
          ) : (
            <button
              type="button"
              className="sm:col-span-2 min-h-12 rounded-lg text-primary underline"
              onClick={() => setCustom(true)}
            >
              {copy.intro.customize}
            </button>
          )}
        </div>
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
