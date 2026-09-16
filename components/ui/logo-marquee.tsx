"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";
import { useIsomorphicLayoutEffect, useReducedMotion } from "motion/react";

// Logo Marquee by ddoemonn on 21st.dev (https://21st.dev/@ddoemonn/components/logo-marquee).
// Physics-based infinite strip that eases to a stop on hover and focus, pauses off screen and falls back to a
// static, horizontally scrollable row for reduced motion. Restyled for the dark brand surface: chips instead of a
// white card, and a mask fade on the edges so it sits on any background.

const RAMP = 0.19;
const SETTLE = 0.16;
const MAX_COPIES = 14;

type MarqueeDirection = "left" | "right";

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

function useLogoMarquee({ speed = 44, direction = "left", gap = 40, paused = false }: { speed?: number; direction?: MarqueeDirection; gap?: number; paused?: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [copies, setCopies] = useState(4);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState(false);

  const reduced = useReducedMotion() === true;
  const stopped = held || paused;

  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const movingRef = useRef(false);
  movingRef.current = !stopped && !reduced;

  const offset = useRef(0);
  const nudge = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = reducedRef.current ? 0 : offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();

      const next = reduced || loop <= 0 ? 4 : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint, reduced]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setNear(entry.isIntersecting);
      },
      { rootMargin: "96px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return;

    let frame = 0;
    let last = 0;
    const sign = direction === "right" ? 1 : -1;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const loop = span.current;
      if (loop <= 0) return;

      rate.current += ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));

      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE));
      nudge.current -= pull;

      let x = offset.current + sign * speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) {
        nudge.current = 0;
        x = fold(x, loop);
      } else {
        x = clamp(x, -loop, loop);
      }

      offset.current = x;
      paint();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, direction, paint]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const pin = () => {
      if (reducedRef.current) return;
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
      if (viewport.scrollTop !== 0) viewport.scrollTop = 0;
    };
    viewport.addEventListener("scroll", pin, { passive: true });
    return () => viewport.removeEventListener("scroll", pin);
  }, []);

  useEffect(() => {
    const release = () => setHeld(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, []);

  const reveal = useCallback((node: HTMLElement) => {
    const viewport = viewportRef.current;
    const loop = span.current;
    if (!viewport || reducedRef.current || loop <= 0) return;
    if (node === viewport) return;

    const view = viewport.getBoundingClientRect();
    const box = node.getBoundingClientRect();
    const pad = 12;

    let delta = 0;
    if (box.left < view.left + pad) delta = view.left + pad - box.left;
    else if (box.right > view.right - pad) delta = view.right - pad - box.right;
    if (delta === 0) return;

    const target = clamp(offset.current + nudge.current + delta, -loop, loop);
    nudge.current = target - offset.current;
  }, []);

  const bind = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType !== "touch") setHeld(true);
    },
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType === "touch") setHeld(false);
    },
    onPointerCancel: () => setHeld(false),
    onPointerLeave: () => setHeld(false),
    onFocus: (e: FocusEvent) => {
      setHeld(true);
      reveal(e.target as HTMLElement);
    },
    onBlur: () => setHeld(false),
  };

  return { viewportRef, trackRef, groupRef, copies, reduced, bind };
}

export type LogoMarqueeItem = {
  id: string;
  label: string;
  mark?: ReactNode;
};

const FACE =
  "inline-flex h-10 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] pl-2.5 pr-4 text-sm font-medium text-gray-300";

export function LogoMarquee({
  items,
  label,
  speed = 34,
  direction = "left",
  gap = 12,
  className = "",
}: {
  items: LogoMarqueeItem[];
  label: string;
  speed?: number;
  direction?: MarqueeDirection;
  gap?: number;
  className?: string;
}) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } = useLogoMarquee({ speed, direction, gap });
  const groups = reduced ? 1 : copies;
  const live = reduced ? 0 : 1;

  return (
    <div role="group" aria-label={label} className={`logo-marquee relative isolate w-full min-w-0 max-w-full overflow-hidden ${className}`} {...bind}>
      <div
        ref={viewportRef}
        // Reduced motion turns the strip into a scrollable row, which needs to be reachable by keyboard
        tabIndex={reduced ? 0 : undefined}
        style={{ overflowX: reduced ? "auto" : "hidden" }}
        className="overflow-y-hidden py-1"
      >
        <div ref={trackRef} style={{ gap, willChange: "transform" }} className="flex w-max items-center">
          {Array.from({ length: groups }, (_, copy) => (
            <ul key={copy} ref={copy === live ? groupRef : undefined} aria-hidden={copy === live ? undefined : true} style={{ gap }} className="flex w-max items-center">
              {items.map((item) => (
                <li key={item.id} className="shrink-0">
                  <span className={FACE}>
                    {item.mark}
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
