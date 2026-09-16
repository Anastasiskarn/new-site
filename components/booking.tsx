"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "../lib/routes";

type Speaker = "agent" | "caller";
type Line = { who: Speaker; text: string; at: number };

// Illustrative demo material: the page labels it as a sample, never as a client outcome.
const calls: Record<
  Locale,
  { lines: Line[]; outcomes: string[] }
> = {
  en: {
    lines: [
      { who: "caller", at: 2, text: "Hi, I’m calling about the two-bedroom apartment in Glyfada. Is it still available?" },
      { who: "agent", at: 7, text: "Yes, it is. Are you looking to buy or rent, and when would you like to move?" },
      { who: "caller", at: 13, text: "Buy. Ideally before September." },
      { who: "agent", at: 16, text: "Is your budget close to the asking price, and is financing already arranged?" },
      { who: "caller", at: 22, text: "Yes, I’m pre-approved with my bank." },
      { who: "agent", at: 26, text: "I can book a viewing with Maria on Thursday at 17:30 or Saturday at 11:00. Which suits you?" },
      { who: "caller", at: 33, text: "Thursday works." },
      { who: "agent", at: 35, text: "Booked. You’ll get a confirmation, and Maria will have your details before the viewing." },
    ],
    outcomes: ["Buyer, financing pre-approved", "Viewing booked, Thu 17:30", "Lead record updated"],
  },
  gr: {
    lines: [
      { who: "caller", at: 2, text: "Γεια σας, καλώ για το διαμέρισμα δύο υπνοδωματίων στη Γλυφάδα. Είναι ακόμη διαθέσιμο;" },
      { who: "agent", at: 7, text: "Ναι, είναι. Ενδιαφέρεστε για αγορά ή ενοικίαση, και πότε θα θέλατε να μετακομίσετε;" },
      { who: "caller", at: 13, text: "Για αγορά. Ιδανικά πριν τον Σεπτέμβριο." },
      { who: "agent", at: 16, text: "Ο προϋπολογισμός σας είναι κοντά στην τιμή πώλησης, και έχετε ήδη εξασφαλίσει χρηματοδότηση;" },
      { who: "caller", at: 22, text: "Ναι, έχω προέγκριση από την τράπεζα." },
      { who: "agent", at: 26, text: "Μπορώ να κλείσω υπόδειξη με τη Μαρία την Πέμπτη στις 17:30 ή το Σάββατο στις 11:00. Τι σας βολεύει;" },
      { who: "caller", at: 33, text: "Την Πέμπτη." },
      { who: "agent", at: 35, text: "Κλείστηκε. Θα λάβετε επιβεβαίωση και η Μαρία θα έχει τα στοιχεία σας πριν την υπόδειξη." },
    ],
    outcomes: ["Αγοραστής, με προέγκριση δανείου", "Υπόδειξη: Πέμπτη 17:30", "Η καρτέλα του lead ενημερώθηκε"],
  },
};

const ui = {
  en: {
    region: "Sample AI agent call",
    agentName: "AiAnchor agent",
    status: "Sample call",
    language: "Call language",
    agent: "Agent",
    caller: "Caller",
    replay: "Replay call",
    note: "Illustrative sample. Your demo runs on a call flow built around your business.",
  },
  gr: {
    region: "Δείγμα κλήσης AI agent",
    agentName: "AiAnchor agent",
    status: "Δείγμα κλήσης",
    language: "Γλώσσα κλήσης",
    agent: "Agent",
    caller: "Πελάτης",
    replay: "Επανάληψη κλήσης",
    note: "Ενδεικτικό δείγμα. Στη δική σου παρουσίαση, χρησιμοποιούμε ένα σενάριο κλήσης που ταιριάζει στην επιχείρησή σου.",
  },
} as const;

const TYPING_MS = 650;
const clock = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function SampleCall({ lang }: { lang: Locale }) {
  const t = ui[lang];
  const [callLang, setCallLang] = useState<Locale>(lang);
  const { lines, outcomes } = calls[callLang];
  // shown = lines fully revealed; typing = the next speaker is "talking".
  const [shown, setShown] = useState(lines.length);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const stop = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback(
    (count: number) => {
      stop();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(count);
        setTyping(false);
        return;
      }
      setShown(0);
      setStarted(true);
      let elapsed = 500;
      for (let i = 0; i < count; i++) {
        timers.current.push(window.setTimeout(() => setTyping(true), elapsed));
        elapsed += TYPING_MS + Math.min(1400, lines[i].text.length * 14);
        timers.current.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
          }, elapsed),
        );
        elapsed += 450;
      }
    },
    [lines],
  );

  // Start once the console is on screen; before that the CSS keeps unplayed lines hidden.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play(lines.length);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
    // Language switches replay through their own handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLang = (next: Locale) => {
    if (next === callLang) return;
    setCallLang(next);
  };
  useEffect(() => {
    if (started) play(calls[callLang].lines.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callLang]);

  const done = shown >= lines.length;
  const speaking: Speaker | null = typing && !done ? lines[shown].who : null;
  const seconds = done ? lines[lines.length - 1].at + 4 : shown ? lines[shown - 1].at : 0;

  return (
    <div
      ref={root}
      role="region"
      aria-label={t.region}
      className="sample-call relative overflow-hidden rounded-3xl border border-white/10 bg-dark-800/80"
      data-started={started || undefined}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-white/10 px-5 py-4 sm:px-6">
        <span className="sample-call-avatar relative grid size-10 shrink-0 place-items-center rounded-full text-primary" aria-hidden="true">
          <PhoneIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-white">{t.agentName}</p>
          <p className="flex items-center gap-2 text-xs text-gray-400">
            <span className={`sample-call-dot size-1.5 rounded-full ${done ? "bg-gray-500" : "bg-primary"}`} aria-hidden="true" />
            {t.status}
            <span className="tabular-nums text-gray-300" aria-hidden="true">{clock(seconds)}</span>
          </p>
        </div>
        <span
          className={`sample-call-wave flex h-6 items-end gap-[3px] ${speaking ? "is-live" : ""} ${speaking === "caller" ? "is-caller" : ""}`}
          aria-hidden="true"
        >
          {Array.from({ length: 14 }, (_, n) => (
            <span key={n} className="wave-bar" style={{ animationDelay: `${(n * 5) % 9 * 80}ms` }} />
          ))}
        </span>
        <div className="flex rounded-lg border border-white/10 bg-dark-900 p-0.5" role="group" aria-label={t.language}>
          {(["gr", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={callLang === code}
              onClick={() => switchLang(code)}
              className="sample-call-lang min-h-9 min-w-10 rounded-md px-2.5 text-xs font-semibold tracking-wide"
            >
              {code === "gr" ? "ΕΛ" : "EN"}
            </button>
          ))}
        </div>
      </div>

      <ol className="grid gap-3 px-5 py-6 sm:px-6" lang={callLang === "gr" ? "el" : "en"}>
        {lines.map((line, i) => (
          <li
            key={`${callLang}-${i}`}
            className={`sample-call-line relative flex ${line.who === "agent" ? "justify-start" : "justify-end"} ${i < shown ? "is-shown" : ""} ${typing && i === shown ? "is-typing" : ""}`}
          >
            <div className={`sample-call-message max-w-[85%] ${line.who === "agent" ? "" : "text-right"}`}>
              <p className="mb-1 text-[11px] font-medium text-gray-400">
                {line.who === "agent" ? t.agent : t.caller}
              </p>
              <p
                className={`rounded-2xl px-4 py-2.5 text-left text-[15px] leading-snug ${
                  line.who === "agent"
                    ? "sample-call-agent rounded-tl-md text-white"
                    : "rounded-tr-md bg-white/[0.06] text-gray-200"
                }`}
              >
                {line.text}
              </p>
            </div>
            <span
              aria-hidden="true"
              className={`sample-call-typing absolute top-5 flex gap-1 rounded-full bg-white/[0.06] px-3 py-2.5 ${line.who === "agent" ? "left-0" : "right-0"}`}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          </li>
        ))}
      </ol>

      <div className={`sample-call-outcome border-t border-white/10 px-5 py-4 sm:px-6 ${done ? "is-shown" : ""}`}>
        <ul className="flex flex-wrap gap-2" lang={callLang === "gr" ? "el" : "en"}>
          {outcomes.map((outcome, i) => (
            <li
              key={outcome}
              className="sample-call-chip inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] py-1.5 pl-2 pr-3 text-[13px] text-gray-100"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <CheckIcon />
              {outcome}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-400">{t.note}</p>
          <button
            type="button"
            onClick={() => play(lines.length)}
            className="sample-call-replay inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-primary"
          >
            <ReplayIcon />
            {t.replay}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
