"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Adapted from Dhileep Kumar GM's Aether Flow Hero on 21st.dev:
// https://21st.dev/@dhileepkumargm/components/aether-flow-hero
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function AetherFlowHero({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let previousTime = 0;
    let inView = true;
    const pointer = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function draw(step = 0) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (step && distance > 0 && distance < 200) {
          const force = (1 - distance / 200) * 5 * step;
          particle.x += (dx / distance) * force;
          particle.y += (dy / distance) * force;
        }
        particle.x += particle.vx * step;
        particle.y += particle.vy * step;
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(191, 128, 255, 0.8)";
        context.fill();
      }

      const connectionRadius = Math.min(180, Math.max(110, width / 7));
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const first = particles[a];
          const second = particles[b];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance >= connectionRadius) continue;
          const nearPointer = Math.hypot(first.x - pointer.x, first.y - pointer.y) < 200;
          const color = nearPointer ? "255, 255, 255" : "200, 150, 255";
          context.strokeStyle = `rgba(${color}, ${(1 - distance / connectionRadius) * 0.55})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }
    }

    function animate(time: number) {
      const step = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      draw(step);
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (inView && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(animate);
      } else {
        draw();
      }
    }

    function resize() {
      if (!section || !canvas || !context) return;
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(140, Math.ceil(width * height / 9000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.4 - 0.2,
        vy: Math.random() * 0.4 - 0.2,
        size: Math.random() * 2 + 1,
      }));
      syncAnimation();
    }

    function movePointer(event: PointerEvent) {
      if (!section || reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function resetPointer() {
      pointer.x = -1000;
      pointer.y = -1000;
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncAnimation();
    });
    resizeObserver.observe(section);
    intersectionObserver.observe(section);
    section.addEventListener("pointermove", movePointer);
    section.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      section.removeEventListener("pointermove", movePointer);
      section.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
    };
  }, []);

  return (
    <section ref={sectionRef} className="aether-hero relative isolate flex min-h-[min(900px,100svh)] items-center justify-center overflow-hidden bg-black px-6 pb-24 pt-40 md:pb-28 md:pt-44">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="aether-hero-shade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl text-center">
        {children}
      </div>
    </section>
  );
}
