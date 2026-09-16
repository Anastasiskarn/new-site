import assert from "node:assert/strict";
import test from "node:test";
import { attachLampScroll } from "../lib/lamp-scroll.ts";

function scene(t, { reduced = false, observers = true } = {}) {
  const win = Object.assign(new EventTarget(), { innerHeight: 800 });
  const doc = Object.assign(new EventTarget(), { hidden: false });
  const media = Object.assign(new EventTarget(), { matches: reduced });
  win.matchMedia = () => media;
  const frames = new Map();
  let nextFrame = 0;
  const properties = new Map();
  const bounds = { top: 1200, bottom: 2000 };
  let reads = 0;
  const section = { getBoundingClientRect: () => { reads++; return bounds; } };
  const lamp = {
    closest: () => section,
    style: {
      setProperty: (key, value) => properties.set(key, value),
      removeProperty: (key) => properties.delete(key),
    },
  };
  const instances = [];
  class Observer {
    constructor(callback) { this.callback = callback; instances.push(this); }
    observe(target) { assert.equal(target, section); }
    disconnect() { this.disconnected = true; }
  }
  const globals = {
    window: win, document: doc,
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: (id) => frames.delete(id),
    IntersectionObserver: observers ? Observer : undefined,
    ResizeObserver: observers ? Observer : undefined,
  };
  const original = new Map();
  for (const [key, value] of Object.entries(globals)) {
    original.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  }
  t.after(() => {
    cleanup();
    for (const [key, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  const cleanup = attachLampScroll(lamp);
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback());
  };
  const scrollTo = (top, bottom = top + 800) => {
    Object.assign(bounds, { top, bottom });
    win.dispatchEvent(new Event("scroll"));
    flush();
  };
  return { win, doc, media, frames, properties, instances, bounds, cleanup, flush, scrollTo,
    reads: () => reads, power: () => Number(properties.get("--lamp-power")),
    spread: () => Number(properties.get("--lamp-spread")) };
}

test("lamp lights before entry, fills the room and reverses when scrolling back", (t) => {
  const s = scene(t);
  const dim = s.power();
  s.scrollTo(900);
  assert.ok(s.power() > dim, "ceiling lights before section reaches the viewport");
  const entry = s.power();
  s.scrollTo(160);
  assert.equal(s.power(), 1);
  assert.equal(s.spread(), 1);
  s.scrollTo(-600, 200);
  assert.ok(s.power() < 1, "light fades as the section exits");
  s.scrollTo(900);
  assert.equal(s.power(), entry, "reverse scroll is deterministic");
});

test("lamp batches scroll events and recalculates for mobile viewport changes", (t) => {
  const s = scene(t);
  const initialReads = s.reads();
  s.bounds.top = 400;
  for (let i = 0; i < 20; i++) s.win.dispatchEvent(new Event("scroll"));
  assert.equal(s.frames.size, 1);
  s.flush();
  assert.equal(s.reads(), initialReads + 1);
  const desktop = s.power();
  s.win.innerHeight = 600;
  s.win.dispatchEvent(new Event("resize"));
  s.flush();
  assert.ok(s.power() < desktop);
  assert.equal(s.frames.size, 0, "no continuous animation loop");
});

test("lamp stops offscreen and hidden, and releases observers and listeners", (t) => {
  const s = scene(t);
  s.instances[0].callback([{ isIntersecting: false }]);
  s.win.dispatchEvent(new Event("scroll"));
  assert.equal(s.frames.size, 0);
  s.instances[0].callback([{ isIntersecting: true }]);
  assert.equal(s.frames.size, 1);
  s.doc.hidden = true;
  s.doc.dispatchEvent(new Event("visibilitychange"));
  assert.equal(s.frames.size, 0);
  s.doc.hidden = false;
  s.bounds.top = 160;
  s.doc.dispatchEvent(new Event("visibilitychange"));
  assert.equal(s.power(), 1);
  s.win.dispatchEvent(new Event("scroll"));
  s.cleanup();
  assert.equal(s.frames.size, 0);
  assert.ok(s.instances.every((observer) => observer.disconnected));
  for (const type of ["scroll", "resize", "pageshow"]) s.win.dispatchEvent(new Event(type));
  s.media.dispatchEvent(new Event("change"));
  s.doc.dispatchEvent(new Event("visibilitychange"));
  assert.equal(s.frames.size, 0);
  assert.equal(s.properties.size, 0);
});

test("reduced motion uses static CSS defaults, including preference changes", (t) => {
  const s = scene(t, { reduced: true });
  assert.equal(s.properties.size, 0);
  s.scrollTo(400);
  assert.equal(s.properties.size, 0);
  s.media.matches = false;
  s.media.dispatchEvent(new Event("change"));
  assert.ok(s.properties.has("--lamp-power"));
  s.win.dispatchEvent(new Event("scroll"));
  s.media.matches = true;
  s.media.dispatchEvent(new Event("change"));
  assert.equal(s.frames.size, 0);
  assert.equal(s.properties.size, 0);
});

test("scroll animation still works when optional observers are unavailable", (t) => {
  const s = scene(t, { observers: false });
  s.scrollTo(160);
  assert.equal(s.power(), 1);
  s.bounds.top = 900;
  s.win.dispatchEvent(new Event("pageshow"));
  assert.ok(s.power() < 1, "restored pages update immediately");
});
