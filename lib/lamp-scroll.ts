// One scroll read per frame; decorative updates never change section layout.
export function attachLampScroll(lamp: HTMLElement) {
  const section = lamp.closest("section") ?? lamp;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let visible = true;
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const ease = (value: number) => value * value * (3 - 2 * value);

  const update = () => {
    frame = 0;
    if (media.matches) {
      lamp.style.removeProperty("--lamp-power");
      lamp.style.removeProperty("--lamp-spread");
      return;
    }
    if (document.hidden) return;
    const bounds = section.getBoundingClientRect();
    const viewport = Math.max(window.innerHeight, 1);
    // Bring the downward beam up smoothly as the section approaches the viewport.
    const enter = ease(clamp((viewport * 1.4 - bounds.top) / (viewport * 1.2)));
    const exit = ease(clamp(bounds.bottom / (viewport * 0.3)));
    const power = enter * exit;
    lamp.style.setProperty("--lamp-power", String(0.08 + power * 0.92));
    lamp.style.setProperty("--lamp-spread", String(0.45 + enter * 0.55));
  };
  const schedule = () => {
    if (visible && !media.matches && !document.hidden && !frame)
      frame = requestAnimationFrame(update);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    update();
  };
  const visibility = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }, { rootMargin: "50% 0px" });
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
  visibility?.observe(section);
  resize?.observe(section);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("pageshow", sync);
  document.addEventListener("visibilitychange", sync);
  media.addEventListener("change", sync);
  update();

  return () => {
    cancelAnimationFrame(frame);
    visibility?.disconnect();
    resize?.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", sync);
    document.removeEventListener("visibilitychange", sync);
    media.removeEventListener("change", sync);
    lamp.style.removeProperty("--lamp-power");
    lamp.style.removeProperty("--lamp-spread");
  };
}
