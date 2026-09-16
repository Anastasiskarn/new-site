"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Scroll-scrubbed hero: the product window rises from the fold and settles under a compacted headline.
// The pinned container and rising card are adapted from Aceternity's Container Scroll Animation on 21st.dev:
// https://21st.dev/@manuarora700/components/container-scroll-animation
// Rebuilt without framer-motion: one rAF-throttled scroll read writes transform and opacity straight onto the
// moving layers. CSS owns both layouts: the pinned stage, and the static framed layout that no-JS, reduced
// motion, short screens and phones get. The SCRUB query must match app/globals.css.
const SCRUB = "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference) and (scripting: enabled)";
const REVEAL = "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)";

// Share of the pinned distance the sequence uses; the rest holds the settled frame before it scrolls away
const SCRUB_SHARE = 0.85;
const TITLE_SCALE = 0.78;
const MOCK_SCALE = 0.92;
const GLOW_START = 0.6;
const REVEAL_OFFSET = 48;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

type Geometry = {
  range: number;
  titleShift: number;
  bodyShift: number;
  actionsShift: number;
  mockStart: number;
  mockShift: number;
};

export type ScrollFrameProps = {
  title: ReactNode;
  body: ReactNode;
  actions: ReactNode;
  note: ReactNode;
  mockup: ReactNode;
};

export function ScrollFrame({ title, body, actions, note, mockup }: ScrollFrameProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const wellRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const handoff = handoffRef.current;
    const titleEl = titleRef.current;
    const bodyEl = bodyRef.current;
    const actionsEl = actionsRef.current;
    const noteEl = noteRef.current;
    const well = wellRef.current;
    const glow = glowRef.current;
    const edge = edgeRef.current;
    const mock = mockRef.current;
    if (!section || !pin || !stage || !handoff || !titleEl || !bodyEl || !actionsEl || !noteEl || !well || !glow || !edge || !mock) return;

    const scrubQuery = window.matchMedia(SCRUB);
    const revealQuery = window.matchMedia(REVEAL);
    const layers = [handoff, titleEl, bodyEl, actionsEl, noteEl, well, glow, edge, mock];
    let geometry: Geometry | null = null;
    let frameId = 0;
    let mode: "scrub" | "reveal" | "static" = "static";

    const reset = () => {
      for (const layer of layers) {
        layer.style.transform = "";
        layer.style.opacity = "";
        layer.style.pointerEvents = "";
      }
    };

    // Transformed wrappers can become offsetParents, so walk the chain up to the stage.
    // Layout offsets ignore transforms, so resting geometry can be read while the stage is mid-scrub.
    const topOf = (el: HTMLElement) => {
      let y = 0;
      for (let node: Element | null = el; node && node !== stage && node instanceof HTMLElement; node = node.offsetParent) y += node.offsetTop;
      return y;
    };

    const measure = (): Geometry => {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 64;
      const titleTop = header + 44;
      // Layers are flex items, so a slot's own top margin stays inside its wrapper; place the row itself
      const row = (actionsEl.firstElementChild as HTMLElement | null) ?? actionsEl;
      const actionsTop = titleTop + titleEl.offsetHeight * TITLE_SCALE + 28;
      const wellTop = topOf(well);
      return {
        range: Math.max(1, (section.offsetHeight - pin.offsetHeight) * SCRUB_SHARE),
        titleShift: titleTop - topOf(titleEl),
        bodyShift: titleTop - topOf(titleEl) - titleEl.offsetHeight * (1 - TITLE_SCALE),
        actionsShift: actionsTop - topOf(row),
        // Short viewports: keep the peeking window clear of the copy instead of overlapping it
        mockStart: Math.max(0, topOf(noteEl) + noteEl.offsetHeight + 40 - wellTop),
        mockShift: actionsTop + row.offsetHeight + 56 - wellTop,
      };
    };

    const renderScrub = (g: Geometry) => {
      const progress = clamp(-section.getBoundingClientRect().top / g.range);
      const copyP = ease(clamp(progress / 0.8));
      const fadeP = ease(clamp(progress / 0.5));
      const mockP = ease(progress);

      titleEl.style.transform = `translate3d(0, ${copyP * g.titleShift}px, 0) scale(${lerp(1, TITLE_SCALE, copyP)})`;
      bodyEl.style.transform = `translate3d(0, ${copyP * g.bodyShift}px, 0)`;
      bodyEl.style.opacity = String(1 - fadeP);
      bodyEl.style.pointerEvents = fadeP > 0.5 ? "none" : "";
      actionsEl.style.transform = `translate3d(0, ${copyP * g.actionsShift}px, 0)`;
      noteEl.style.transform = `translate3d(0, ${copyP * g.actionsShift}px, 0)`;
      noteEl.style.opacity = String(1 - fadeP);

      well.style.transform = `translate3d(0, ${lerp(g.mockStart, g.mockShift, mockP)}px, 0) scale(${lerp(MOCK_SCALE, 1, mockP)})`;
      glow.style.opacity = String(lerp(GLOW_START, 1, mockP));
      edge.style.opacity = String(mockP);
      handoff.style.opacity = String(mockP);
    };

    const renderReveal = () => {
      const bounds = well.getBoundingClientRect();
      const t = ease(clamp((window.innerHeight - bounds.top) / (window.innerHeight * 0.6)));
      mock.style.transform = `translate3d(0, ${(1 - t) * REVEAL_OFFSET}px, 0)`;
    };

    const render = () => {
      frameId = 0;
      if (mode === "scrub" && geometry) renderScrub(geometry);
      else if (mode === "reveal") renderReveal();
    };
    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(render);
    };
    const sync = () => {
      const next = scrubQuery.matches ? "scrub" : revealQuery.matches ? "reveal" : "static";
      if (next !== mode) reset();
      mode = next;
      geometry = mode === "scrub" ? measure() : null;
      schedule();
    };

    // Copy reflows when webfonts land or the viewport changes, which moves every resting position
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(section);
    resizeObserver.observe(titleEl);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    scrubQuery.addEventListener("change", sync);
    revealQuery.addEventListener("change", sync);
    sync();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", sync);
      scrubQuery.removeEventListener("change", sync);
      revealQuery.removeEventListener("change", sync);
      reset();
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-hero">
      <div ref={pinRef} className="scroll-hero-pin">
        <div ref={stageRef} className="scroll-hero-stage">
          <div ref={titleRef} className="scroll-hero-layer">{title}</div>
          <div ref={bodyRef} className="scroll-hero-layer">{body}</div>
          <div ref={actionsRef} className="scroll-hero-layer">{actions}</div>
          <div ref={noteRef} className="scroll-hero-layer">{note}</div>
          <div ref={wellRef} className="scroll-hero-well">
            {/* The low horizon haze at rest; it rises with the window and becomes its ambient light */}
            <div ref={glowRef} className="scroll-hero-glow" aria-hidden="true" />
            <div ref={mockRef} className="scroll-hero-mock">
              {mockup}
              <div ref={edgeRef} className="scroll-hero-edge" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div ref={handoffRef} className="scroll-hero-handoff" aria-hidden="true" />
      </div>
    </section>
  );
}
