"use client";
import { useEffect, useRef, useState } from "react";
import { APP_URL, pathFor, type Locale } from "../lib/routes";
import type { Content } from "../lib/content";
import { AnchorIcon } from "./ui";
import { homepageCopy } from "../lib/homepage";
export function Navigation({
  lang,
  slug,
  copy,
}: {
  lang: Locale;
  slug: string;
  copy: Content["nav"];
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const other = lang === "en" ? "gr" : "en";
  const home = homepageCopy(lang);
  const entries = [
    [pathFor(lang) + "#features", home.nav.platform],
    [pathFor(lang) + "#how-it-works", home.nav.process],
    [pathFor(lang) + "#pricing", home.nav.pricing],
    [pathFor(lang) + "#about", home.nav.about],
  ];
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1280px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", key);
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      localStorage.setItem("aianchor-lang", other);
    } catch {}
    event.currentTarget.href = pathFor(other, slug) + window.location.hash;
  };
  // The overlay and drawer live outside <header>: its backdrop-filter makes it the
  // containing block for fixed children, which would clip them to the header's height.
  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-[60] border-b border-white/[0.06] bg-dark-900/70 backdrop-blur-xl">
        <nav
          aria-label={lang === "en" ? "Primary" : "Κύρια πλοήγηση"}
          className="mx-auto grid min-h-16 max-w-8xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 xl:grid-cols-[1fr_auto_1fr]"
        >
          <a
            href={pathFor(lang)}
            aria-label="AiAnchor"
            className="flex min-h-11 items-center gap-2.5 justify-self-start whitespace-nowrap font-display text-sm font-bold tracking-wider"
          >
            <span className="rounded-lg border border-primary/30 bg-primary/10 p-1.5 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(0,240,255,0.16)] [&_svg]:h-[18px] [&_svg]:w-[18px]">
              <AnchorIcon />
            </span>
            AI <span className="text-primary">ANCHOR</span>
          </a>
          <div className="hidden items-center gap-1 text-sm xl:flex">
            {entries.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="link-hover inline-flex min-h-11 items-center rounded-full px-4 text-gray-400 hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-self-end gap-2">
            <a className="link-hover hidden min-h-11 items-center px-3 text-sm text-gray-400 hover:text-primary xl:inline-flex" href={APP_URL}>{home.nav.login}</a>
            <a className="link-hover hidden min-h-11 items-center px-3 text-sm font-medium text-gray-300 hover:text-primary xl:inline-flex" href={pathFor(lang, "book-demo")}>{home.demo}</a>
            <a
              href={pathFor(other, slug)}
              hrefLang={other === "gr" ? "el" : "en"}
              onClick={switchLanguage}
              aria-label={copy.langSwitchLabel}
              className="link-hover inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 text-xs font-medium tracking-wide text-gray-300 hover:border-primary/40 hover:text-primary"
            >
              {other.toUpperCase()}
            </a>
            <button
              ref={toggle}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 text-gray-200 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              aria-label={lang === "en" ? "Menu" : "Μενού"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">{open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
            </button>
          </div>
        </nav>
      </header>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-menu"
        ref={panel}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col overflow-y-auto border-l border-white/[0.06] bg-dark-900 px-6 pb-8 pt-24 shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {entries.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center border-b border-white/[0.06] font-display text-xl text-gray-200"
            >
              {label}
            </a>
          ))}
          <a className="flex min-h-14 items-center border-b border-white/[0.06] font-display text-xl text-gray-200" href={APP_URL} onClick={() => setOpen(false)}>{home.nav.login}</a>
          <a
            href={pathFor(lang, "book-demo")}
            className="btn-interactive mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 font-semibold text-dark-900"
            onClick={() => setOpen(false)}
          >
            {home.demo}
          </a>
        </div>
      </div>
    </>
  );
}
