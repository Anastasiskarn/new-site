"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Constellation Grid by daiwiikharihar on 21st.dev:
// https://21st.dev/@daiwiikharihar/components/constellation-grid
// Adapted to size to its container instead of the window, run only while visible,
// respect reduced motion, and render overlay content so it can sit behind a page hero.
type GridNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  pulse: number;
};

type Palette = { background: string; node: string; accent: string };

const palettes: Record<"dark" | "light", Palette> = {
  dark: { background: "#030407", node: "255, 255, 255", accent: "56, 189, 248" },
  light: { background: "#f8fafc", node: "15, 23, 42", accent: "2, 132, 199" },
};

const SPACING = 55; // Tight grid density for richer connections
const POINTER_RADIUS = 220;
const SPRING_K = 18; // Spring stiffness back to each node's anchor
const DAMPING = 0.82; // Velocity kept per 60Hz frame
const MAX_CONN_DIST = 75;
// Nodes stay near their anchors, so only nearby grid cells can ever be within MAX_CONN_DIST.
// Checking those instead of every pair keeps the mesh O(n) on large screens.
const NEIGHBOR_REACH = 2;
const OFFSCREEN = -1000;

export type ConstellationGridProps = {
  as?: "div" | "section";
  children?: ReactNode;
  className?: string;
  canvasClassName?: string;
  style?: CSSProperties;
  /** "system" follows prefers-color-scheme. */
  colorScheme?: "system" | "dark" | "light";
  /** Highlight colour as an "r, g, b" triplet. Defaults to the scheme's sky cyan. */
  accent?: string;
  /** Clear to transparent instead of painting the scheme background, so the parent's background shows. */
  transparent?: boolean;
  /** Hex coordinate readouts next to nodes near the pointer. */
  labels?: boolean;
};

export default function ConstellationGrid({
  as = "div",
  children,
  className = "relative w-full h-screen overflow-hidden select-none bg-slate-950",
  canvasClassName = "cursor-crosshair",
  style,
  colorScheme = "system",
  accent,
  transparent = false,
  labels = true,
}: ConstellationGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let nodes: GridNode[] = [];
    let frame = 0;
    let lastTime = 0;
    let inView = true;
    // Viewport coordinates, resolved against the root each frame so scrolling stays in sync
    const pointer = { clientX: OFFSCREEN, clientY: OFFSCREEN, prevX: OFFSCREEN, prevY: OFFSCREEN };

    function palette() {
      const scheme = colorScheme === "system" ? (darkQuery.matches ? "dark" : "light") : colorScheme;
      return palettes[scheme];
    }

    function initNodes() {
      const nextCols = Math.ceil(width / SPACING) + 1;
      const nextRows = Math.ceil(height / SPACING) + 1;
      if (nextCols === cols && nextRows === rows) return;
      cols = nextCols;
      rows = nextRows;
      nodes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;
          nodes.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
            radius: Math.random() * 1.2 + 1.2,
            label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function localPointer() {
      if (pointer.clientX === OFFSCREEN) return { x: OFFSCREEN, y: OFFSCREEN };
      const bounds = root!.getBoundingClientRect();
      return { x: pointer.clientX - bounds.left, y: pointer.clientY - bounds.top };
    }

    function step(dt: number) {
      const { x: px, y: py } = localPointer();
      // Cursor speed in px/ms drives the strength of the shockwave
      const speed = px === OFFSCREEN || pointer.prevX === OFFSCREEN
        ? 0
        : Math.hypot(px - pointer.prevX, py - pointer.prevY) / (dt * 1000 || 1);
      pointer.prevX = px;
      pointer.prevY = py;
      const damping = Math.pow(DAMPING, dt * 60);

      for (const n of nodes) {
        n.pulse += dt * 3;
        const dx = px - n.x;
        const dy = py - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_RADIUS && dist > 0) {
          const force = (1 - dist / POINTER_RADIUS) * (1500 + speed * 150);
          n.vx -= (dx / dist) * force * dt;
          n.vy -= (dy / dist) * force * dt;
        }
        // Hooke's law pull back to the anchor, then damping and integration
        n.vx += (n.baseX - n.x) * SPRING_K * dt;
        n.vy += (n.baseY - n.y) * SPRING_K * dt;
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }
    }

    function draw() {
      const colors = palette();
      const dark = colors === palettes.dark;
      const accentColor = accent ?? colors.accent;
      const { x: px, y: py } = localPointer();

      if (transparent) {
        context!.clearRect(0, 0, width, height);
      } else {
        context!.fillStyle = colors.background;
        context!.fillRect(0, 0, width, height);
      }

      context!.lineWidth = 0.7;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const n = nodes[i * rows + j];
          for (let di = 0; di <= NEIGHBOR_REACH; di++) {
            for (let dj = -NEIGHBOR_REACH; dj <= NEIGHBOR_REACH; dj++) {
              if (di === 0 && dj <= 0) continue;
              const ci = i + di;
              const cj = j + dj;
              if (ci >= cols || cj < 0 || cj >= rows) continue;
              const n2 = nodes[ci * rows + cj];
              const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
              if (dist >= MAX_CONN_DIST) continue;
              const alpha = (1 - dist / MAX_CONN_DIST) * (dark ? 0.18 : 0.08);
              context!.strokeStyle = `rgba(${colors.node}, ${alpha})`;
              context!.beginPath();
              context!.moveTo(n.x, n.y);
              context!.lineTo(n2.x, n2.y);
              context!.stroke();
            }
          }
        }
      }

      for (const n of nodes) {
        const dist = Math.hypot(px - n.x, py - n.y);
        const isNear = dist < POINTER_RADIUS;
        const alpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;
        const radius = isNear ? n.radius * 2.2 : n.radius + Math.sin(n.pulse) * 0.3;
        context!.fillStyle = `rgba(${isNear ? accentColor : colors.node}, ${alpha})`;
        context!.beginPath();
        context!.arc(n.x, n.y, Math.max(0.5, radius), 0, Math.PI * 2);
        context!.fill();

        // Radar rings on the nodes closest to the pointer
        if (dist < 90) {
          const ring = ((n.pulse * 20) % 30) + 4;
          context!.strokeStyle = `rgba(${accentColor}, ${(1 - ring / 34) * 0.4})`;
          context!.lineWidth = 1;
          context!.beginPath();
          context!.arc(n.x, n.y, ring, 0, Math.PI * 2);
          context!.stroke();
          context!.lineWidth = 0.7;
          if (labels) {
            context!.font = "8px ui-monospace, SFMono-Regular, Consolas, monospace";
            context!.fillStyle = `rgba(${accentColor}, 0.85)`;
            context!.fillText(n.label, n.x + 10, n.y - 10);
          }
        }
      }
    }

    function animate(now: number) {
      // Normalise dt across high-refresh displays and long frames
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;
      step(dt);
      draw();
      frame = requestAnimationFrame(animate);
    }

    function resetPointer() {
      pointer.clientX = pointer.clientY = pointer.prevX = pointer.prevY = OFFSCREEN;
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (reducedMotion.matches) {
        resetPointer();
        for (const n of nodes) {
          n.x = n.baseX;
          n.y = n.baseY;
          n.vx = n.vy = 0;
        }
      }
      if (inView && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(animate);
      } else {
        draw();
      }
    }

    function resize() {
      const bounds = root!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      initNodes();
      syncAnimation();
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
    }

    // Listening on the window keeps the mesh reacting while the pointer is over overlay content
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncAnimation();
    });
    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    window.addEventListener("pointermove", movePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    darkQuery.addEventListener("change", syncAnimation);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", movePointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
      darkQuery.removeEventListener("change", syncAnimation);
    };
  }, [colorScheme, accent, transparent, labels]);

  // Both tags are plain HTMLElements to the effect; the cast only satisfies the ref type
  const Root = as as "div";
  return (
    <Root ref={rootRef} className={className} style={style}>
      <canvas ref={canvasRef} className={`absolute inset-0 block h-full w-full ${canvasClassName}`} aria-hidden="true" />
      {children ?? (
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center pointer-events-none mix-blend-difference text-white">
          <h1 className="font-mono text-6xl font-black uppercase leading-none tracking-tighter md:text-9xl">
            Constellation
          </h1>
          <p className="mt-4 max-w-lg font-mono text-xs opacity-70 md:text-sm">
            High-velocity dynamic mesh. Sweep your cursor quickly across the grid to unleash kinetic shockwaves.
          </p>
        </div>
      )}
    </Root>
  );
}
