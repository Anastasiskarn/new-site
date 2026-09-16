"use client";
import { useEffect } from "react";

// Decorative behavior only: form, menu, consent and pricing remain React controls.
export function SectionMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: (() => void)[] = [];
    let frame = 0;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.append(cursor);
    const trail = Array.from({ length: 8 }, (_, index) => {
      const particle = document.createElement("span");
      particle.className = "cursor-trail-particle";
      particle.style.width = `${7 - index * 0.5}px`;
      particle.style.height = `${7 - index * 0.5}px`;
      particle.style.opacity = `${0.52 - index * 0.05}`;
      particle.setAttribute("aria-hidden", "true");
      document.body.append(particle);
      return particle;
    });
    const syncCursorLayer = () => {
      const dialog = document.querySelector<HTMLDialogElement>(".consent-dialog[open]");
      const parent = dialog || document.body;
      if (cursor.parentElement !== parent) parent.append(cursor);
      for (const particle of trail) if (particle.parentElement !== parent) parent.append(particle);
    };
    const pointer = { x: -100, y: -100 };
    const positions = trail.map(() => ({ x: pointer.x, y: pointer.y }));
    let trailFrame = 0;
    const moveCursor = (event: PointerEvent) => {
      if (!finePointer.matches || media.matches) return;
      syncCursorLayer();
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor.classList.add("is-visible");
      trail.forEach((particle) => particle.classList.add("is-visible"));
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      if (!trailFrame) trailFrame = requestAnimationFrame(animateTrail);
    };
    const animateTrail = () => {
      trailFrame = 0;
      let moving = false;
      positions.forEach((position, index) => {
        const target = index === 0 ? pointer : positions[index - 1];
        position.x += (target.x - position.x) * 0.28;
        position.y += (target.y - position.y) * 0.28;
        trail[index].style.left = `${position.x}px`;
        trail[index].style.top = `${position.y}px`;
        if (Math.abs(target.x - position.x) > 0.5 || Math.abs(target.y - position.y) > 0.5) moving = true;
      });
      if (moving) trailFrame = requestAnimationFrame(animateTrail);
    };
    const updateCursorTarget = (event: PointerEvent) => {
      if (!finePointer.matches || media.matches) return;
      syncCursorLayer();
      const target = event.target instanceof Element
        ? event.target.closest("a, button, summary, input, textarea, select")
        : null;
      cursor.classList.toggle("is-active", Boolean(target));
    };
    window.addEventListener("pointermove", moveCursor, { passive: true });
    const leaveCursor = () => {
      cursor.classList.remove("is-visible");
      trail.forEach((particle) => particle.classList.remove("is-visible"));
    };
    window.addEventListener("pointerleave", leaveCursor, { passive: true });
    window.addEventListener("pointerover", updateCursorTarget, { passive: true });
    window.addEventListener("pointerout", updateCursorTarget, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerleave", leaveCursor);
      window.removeEventListener("pointerover", updateCursorTarget);
      window.removeEventListener("pointerout", updateCursorTarget);
      cancelAnimationFrame(trailFrame);
      cursor.remove();
      trail.forEach((particle) => particle.remove());
    });
    const reveals = new Set<HTMLElement>();
    const showReveal = (element: HTMLElement) => {
      element.classList.add("in-view");
      element.removeAttribute("data-reveal-pending");
    };
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            showReveal(entry.target as HTMLElement);
            revealObserver.unobserve(entry.target);
          }
      },
      { threshold: 0.08 },
    );
    const registerReveal = (element: HTMLElement) => {
      if (reveals.has(element)) return;
      reveals.add(element);
      if (media.matches || element.classList.contains("in-view") || element.getBoundingClientRect().top < innerHeight)
        showReveal(element);
      else {
        element.setAttribute("data-reveal-pending", "");
        revealObserver.observe(element);
      }
    };
    document.querySelectorAll<HTMLElement>(".reveal").forEach(registerReveal);
    // Fast Refresh and streamed navigation can replace content while this effect stays mounted.
    // Observe the new nodes, instead of leaving them hidden by the global .js rule.
    const contentObserver = new MutationObserver((records) => {
      for (const record of records) for (const node of record.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.matches(".reveal")) registerReveal(node);
        node.querySelectorAll<HTMLElement>(".reveal").forEach(registerReveal);
      }
      for (const element of reveals) if (!element.isConnected) {
        revealObserver.unobserve(element);
        reveals.delete(element);
      }
    });
    contentObserver.observe(document.body, { childList: true, subtree: true });
    const reduceReveals = () => {
      if (!media.matches) return;
      reveals.forEach((element) => {
        showReveal(element);
        revealObserver.unobserve(element);
      });
    };
    media.addEventListener("change", reduceReveals);
    document.documentElement.classList.add("js");
    cleanups.push(() => {
      revealObserver.disconnect();
      contentObserver.disconnect();
      media.removeEventListener("change", reduceReveals);
      document.documentElement.classList.remove("js");
      reveals.forEach((element) => element.removeAttribute("data-reveal-pending"));
    });
    const connectors = Array.from(
      document.querySelectorAll<HTMLElement>("[data-connector-section]"),
    );
    // Statements brighten word by word between entering low in the viewport and settling above its middle.
    // Reduced motion clears the value, so the CSS default of 1 shows the resting full-contrast text.
    const statements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-text-reveal]"),
    );
    const update = () => {
      frame = 0;
      for (const statement of statements) {
        if (media.matches) {
          statement.style.removeProperty("--reveal");
          continue;
        }
        const bounds = statement.getBoundingClientRect();
        const start = innerHeight * 0.9;
        const end = innerHeight * 0.45;
        const progress = Math.max(
          0,
          Math.min(1, (start - bounds.top) / (start - end + bounds.height)),
        );
        statement.style.setProperty("--reveal", progress.toFixed(3));
      }
      for (const section of connectors) {
        const bounds = section.getBoundingClientRect();
        const progress = media.matches
          ? 1
          : Math.max(
              0,
              Math.min(
                1,
                (innerHeight - bounds.top) / (bounds.height + innerHeight),
              ),
            );
        section
          .querySelector<HTMLElement>("[data-connector-fill]")
          ?.style.setProperty("--progress", String(progress));
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    media.addEventListener("change", update);
    update();
    const moveSpotlight = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".spotlight-card, .pricing-card")
        : null;
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--my", `${event.clientY - bounds.top}px`);
      target.style.setProperty("--px", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--py", `${event.clientY - bounds.top}px`);
    };
    document.addEventListener("pointermove", moveSpotlight, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", moveSpotlight));
    for (const canvas of document.querySelectorAll<HTMLCanvasElement>(
      "canvas.particle-bg",
    )) {
      const context = canvas.getContext("2d");
      if (!context) continue;
      let width = 0,
        height = 0,
        animation = 0,
        previous = 0,
        visible = false;
      let particles: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
      }[] = [];
      const pointer = { x: -9999, y: -9999 };
      const draw = (step = 0) => {
        context.clearRect(0, 0, width, height);
        for (const particle of particles) {
          particle.x = (particle.x + particle.vx * step + width) % width;
          particle.y = (particle.y + particle.vy * step + height) % height;
          const dx = pointer.x - particle.x,
            dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (step && distance > 0 && distance < 150) {
            particle.x -= (dx / distance) * (1 - distance / 150) * step;
            particle.y -= (dy / distance) * (1 - distance / 150) * step;
          }
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = `rgba(${particle.color},0.6)`;
          context.fill();
          if (distance < 120) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = `rgba(${particle.color},${
              (1 - distance / 120) * 0.3
            })`;
            context.stroke();
          }
        }
      };
      const animate = (time: number) => {
        animation = requestAnimationFrame(animate);
        if (time - previous < 1000 / 30) return;
        const step = previous ? Math.min((time - previous) / 33.33, 2) : 1;
        previous = time;
        draw(step);
      };
      const sync = () => {
        cancelAnimationFrame(animation);
        previous = 0;
        if (
          visible &&
          !media.matches &&
          !document.hidden &&
          width > 0 &&
          height > 0
        )
          animation = requestAnimationFrame(animate);
        else draw();
      };
      const resize = () => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        particles = Array.from(
          { length: Math.min(90, Math.floor((width * height) / 25000)) },
          () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 1.5 + 0.5,
            color: Math.random() > 0.5 ? "0,240,255" : "112,0,255",
          }),
        );
        sync();
      };
      const section = canvas.closest("section");
      const move = (event: PointerEvent) => {
        if (media.matches || event.pointerType === "touch") return;
        const bounds = canvas.getBoundingClientRect();
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
      };
      const leave = () => {
        pointer.x = -9999;
        pointer.y = -9999;
      };
      const resizeObserver = new ResizeObserver(resize);
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      resizeObserver.observe(canvas);
      visibilityObserver.observe(canvas);
      section?.addEventListener("pointermove", move);
      section?.addEventListener("pointerleave", leave);
      media.addEventListener("change", sync);
      document.addEventListener("visibilitychange", sync);
      resize();
      cleanups.push(() => {
        cancelAnimationFrame(animation);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        section?.removeEventListener("pointermove", move);
        section?.removeEventListener("pointerleave", leave);
        media.removeEventListener("change", sync);
        document.removeEventListener("visibilitychange", sync);
      });
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      media.removeEventListener("change", update);
      cleanups.forEach((cleanup) => cleanup());
      statements.forEach((statement) => statement.style.removeProperty("--reveal"));
    };
  }, []);
  return null;
}
