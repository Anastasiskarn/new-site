import type { CSSProperties, ReactNode } from "react";

// Shared homepage vocabulary: one intro pattern (headline, supporting line), a statement whose words
// brighten as it scrolls into view, and the app-window frame the coded dashboard sits in.

// `from` is the side the robot companion stands on: the intro drifts in from there, and its type steps down a size
// on lg+ because it only has half the page
export function SectionIntro({ title, body, centered = false, from }: { title: string; body?: string; centered?: boolean; from?: "left" | "right" }) {
  const drift = from ? `reveal-from-${from}` : "";
  return (
    <div className={`reveal ${drift} ${centered ? "mx-auto flex max-w-4xl flex-col items-center text-center" : "max-w-4xl"}`}>
      <h2 className={`section-title font-display text-4xl font-semibold leading-[1.06] sm:text-5xl ${from ? "lg:text-5xl 2xl:text-6xl" : "lg:text-6xl"}`}>{title}</h2>
      {body && <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 ${centered ? "mx-auto" : ""}`}>{body}</p>}
    </div>
  );
}

// Word-by-word brighten, driven by one --reveal value that components/section-motion writes from scroll.
// The CSS default is 1, so no-JS, reduced motion and pre-hydration paint all show the resting full-contrast text.
// Scroll mapping adapted from waleedkibhen's Reading Text Reveal on 21st.dev
// (https://21st.dev/@waleedkibhen/components/reading-text-reveal), without per-frame React state.
export function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <p className={`text-reveal ${className}`} data-text-reveal="" style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="text-reveal-word" style={{ "--i": i } as CSSProperties}>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

// Quiet window chrome around product UI. Children stay responsible for their own accessible name.
export function AppWindow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`app-window relative overflow-hidden rounded-2xl border border-white/10 bg-[#07070d] ${className}`}>
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>
      {children}
    </div>
  );
}
