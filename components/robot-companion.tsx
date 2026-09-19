"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import type { Application } from "@splinetool/runtime";
import { preloadSpline, SplineScene } from "./ui/splite";

// Scene from serafimcloud's Spline Scene demo on 21st.dev
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

type Side = "left" | "right" | "off";

// One robot for the top of the homepage. It lives in a fixed half-viewport stage behind the content and glides to
// whichever side the block under the middle of the viewport asks for (data-robot="left|right|off" on the block).
// When [data-robot-stop] in the setup section enters the screen, the robot scrolls away.
// This keeps it alongside the dashboard for the full platform section.
// Wide screens only: below lg the sections fall back to full width and the WebGL runtime is never requested.
// The layout itself is pure CSS, so nothing shifts when this hydrates or when the scene is slow to arrive.
export function RobotCompanion() {
  const [side, setSide] = useState<Side>("right");
  const [showcaseLayout, setShowcaseLayout] = useState(false);
  const [moving, setMoving] = useState(false);
  const [gone, setGone] = useState(false);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const app = useRef<Application | null>(null);
  const first = useRef(true);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // Once mounted, stay mounted: resizing back and forth should never re-download the scene
    const check = () => {
      if (wide.matches && !saveData) {
        // Download the scene alongside the engine, rather than waiting for the engine to execute.
        preload(SCENE, { as: "fetch", crossOrigin: "anonymous", fetchPriority: "low" });
        void preloadSpline().catch(() => {}); // Suspense handles an import failure when mounted.
        setMount(true);
      }
    };
    check();
    wide.addEventListener("change", check);

    // querySelectorAll is in document order, so the last active marker is the innermost one
    const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-robot]"));
    const active = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        }
        const current = markers.filter((marker) => active.has(marker)).pop();
        setShowcaseLayout(current?.id === "features");
        setSide((current?.dataset.robot as Side | undefined) ?? "off");
      },
      // A thin band across the middle of the viewport decides who owns the robot
      { rootMargin: "-46% 0px -46% 0px" },
    );
    markers.forEach((marker) => observer.observe(marker));

    // Scroll-linked, not animated: the stage moves exactly as far as the page does past the stop point
    const stop = document.querySelector<HTMLElement>("[data-robot-stop]");
    let frame = 0;
    const lift = () => {
      frame = 0;
      if (!stop || !stage.current) return;
      const offset = Math.min(0, stop.getBoundingClientRect().top - window.innerHeight);
      stage.current.style.setProperty("--robot-lift", `${offset}px`);
      setGone(offset <= -window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(lift);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    lift();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setMoving(true);
    // Match the section-glide duration in .robot-stage so it settles after crossing.
    const timer = window.setTimeout(() => setMoving(false), 1800);
    return () => window.clearTimeout(timer);
  }, [side]);

  // Stop rendering once the robot has scrolled away, so the GPU is idle for the rest of the page
  useEffect(() => {
    if (!app.current) return;
    if (gone || side === "off") app.current.stop();
    else app.current.play();
  }, [gone, side, ready]);

  const load = (instance: Application) => {
    app.current = instance;
    // Listen on window, so the robot tracks the cursor across the copy even though the stage ignores pointers
    instance.setGlobalEvents(true);
    setReady(true);
  };

  return (
    <>
    <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
    <div ref={stage} className="robot-stage" data-side={side} data-layout={showcaseLayout ? "showcase" : undefined} data-moving={moving || undefined} data-ready={ready || undefined} aria-hidden="true">
      <div className="robot-stage-body">
        {mount && (
          <div className="robot-canvas">
            <SplineScene scene={SCENE} className="h-full w-full" onLoad={load} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}
