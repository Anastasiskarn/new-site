"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { plain } from "../lib/content";

type FaqItem = { q: string; a: string };
type FaqCategory = { label: string; note: string; items: FaqItem[] };

export function FaqTabs({ categories, label = "FAQ categories" }: { categories: FaqCategory[]; label?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  // Every answer is present and usable in the server HTML. Tabs enhance it after hydration.
  useEffect(() => setEnhanced(true), []);

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl lg:mt-14">
      <div className={`${enhanced ? "grid" : "hidden"} grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:justify-center`} role="tablist" aria-label={label} hidden={!enhanced}>
        {categories.map((category, index) => (
          <button
            key={category.label}
            type="button"
            role="tab"
            id={`home-faq-tab-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            aria-selected={activeIndex === index}
            aria-controls={`home-faq-panel-${index}`}
            className={`group flex min-h-11 items-center justify-center rounded-lg border px-3 text-center text-sm leading-snug transition-colors lg:px-4 ${index === categories.length - 1 && categories.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""} ${activeIndex === index ? "border-white bg-white text-dark-900" : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {categories.map((category, index) => (
      <div key={category.label} id={`home-faq-panel-${index}`} role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `home-faq-tab-${index}` : `home-faq-heading-${index}`} tabIndex={enhanced ? 0 : undefined} hidden={enhanced && activeIndex !== index} className={`${enhanced && activeIndex !== index ? "hidden" : ""} min-w-0 pt-8`}>
        <h3 id={`home-faq-heading-${index}`} className={enhanced ? "sr-only" : "mb-4 font-display text-lg font-semibold text-white"}>{category.label}</h3>
        <p className="sr-only">{category.note}</p>
        <div className="space-y-3">
          {category.items.map((item) => (
            <details key={item.q} name="home-faq" className="faq-item group relative overflow-hidden rounded-xl border border-white/10 bg-dark-800/40 transition-colors open:border-primary/30 open:bg-dark-800/70 hover:border-primary/25 hover:bg-dark-800/60">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-base font-medium text-white transition-colors hover:text-primary sm:px-6 [&::-webkit-details-marker]:hidden">
                {plain(item.q)}
                <svg className="h-4 w-4 shrink-0 text-primary/70 transition-transform duration-200 group-open:rotate-45 group-open:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </summary>
              <p className="max-w-2xl px-5 pb-5 text-sm leading-relaxed text-gray-400 sm:px-6">{plain(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
      ))}
    </div>
  );
}
