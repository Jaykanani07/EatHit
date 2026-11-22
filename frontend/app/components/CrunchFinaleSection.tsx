"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type Matter from "matter-js";

/* -------------------------------------------------------------------------- */
/*  EatHit — Closing section: "Good food. Good mood. Zero boring."            */
/*  A brand-red finale where real khakhra discs & pouches rain down,          */
/*  bounce with true physics, pile up, emit crumbs, and react to cursor.      */
/* -------------------------------------------------------------------------- */

const PARCHMENT = "#F2F0E6"; // same parchment as sections 2 & 3

const FLAVOURS = [
  { key: "masala", label: "Masala" },
  { key: "methi", label: "Methi" },
  { key: "plain", label: "Plain" },
  { key: "jeera", label: "Jeera" },
  { key: "lasun", label: "Lasun" },
] as const;

const POUCHES = [
  { key: "plain", label: "Plain Khakhra Pouch", src: "/images/finale/pouch-plain.webp", ratio: 723 / 640 },
  { key: "masala", label: "Masala Khakhra Pouch", src: "/images/finale/pouch-masala.webp", ratio: 581 / 520 },
  { key: "methi", label: "Methi Khakhra Pouch", src: "/images/finale/pouch-methi.webp", ratio: 584 / 520 },
  { key: "jeera", label: "Jeera Khakhra Pouch", src: "/images/finale/pouch-jeera.webp", ratio: 584 / 520 },
  { key: "lasun", label: "Lasun Khakhra Pouch", src: "/images/finale/pouch-lasun.webp", ratio: 585 / 520 },
] as const;

const CRUMB_COLORS = ["#F2D28B", "#E7A24B", "#C9772B", "#F4E4C1", "#A85A1E"];

/* Deterministic torn-paper edge so server & client markup always match. */
function tornPath(seed: number, base: number, amp: number, step: number) {
  const W = 1440;
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let d = `M0 0 H${W} V${base}`;
  for (let x = W; x >= 0; x -= step) {
    d += ` L${x} ${(base + (rnd() - 0.5) * 2 * amp).toFixed(1)}`;
  }
  return `${d} Z`;
}
const TORN_BACK = tornPath(7, 31, 9, 26);
const TORN_FRONT = tornPath(21, 22, 8, 26);

const GRAIN_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
)}")`;

const OUTLINE_STYLE: React.CSSProperties = {
  color: "transparent",
  WebkitTextStroke: `clamp(1.8px, 0.24vw, 2.8px) ${PARCHMENT}`,
  paintOrder: "stroke fill",
  letterSpacing: "0.025em",
};


/* -------------------------------------------------------------------------- */
/*  Physics scene (Matter.js runs directly on DOM refs)                       */
/* -------------------------------------------------------------------------- */

type Item = {
  body: Matter.Body;
  wrap: HTMLDivElement;
  inner: HTMLDivElement | null;
  w: number;
  h: number;
  label: string;
  lx: number;
  ly: number;
  la: number;
};

type Crumb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
};

function setupScene(
  M: typeof Matter,
  stage: HTMLElement,
  layer: HTMLElement,
  canvas: HTMLCanvasElement,
  reduced: boolean
): () => void {
  const { Engine, Bodies, Body, Composite, Events, Query, Sleeping } = M;
  const STEP = 1000 / 60;
  const ctx = canvas.getContext("2d");

  const engine = Engine.create({
    enableSleeping: true,
    positionIterations: 8,
    velocityIterations: 6,
    gravity: { x: 0, y: 1.18, scale: 0.001 },
  });

  let W = 0;
  let H = 0;
  let D = 0;
  let discCount = 0;
  let total = 0;
  let pouchW = 0;
  const pouchIndices = new Set<number>();

  let walls: Matter.Body[] = [];
  let items: Item[] = [];
  const crumbs: Crumb[] = [];

  let order: string[] = [];
  let discN = 0;
  let spawned = 0;
  let spawnClock = 0;
  let nextSpawn = 220;

  let visible = true;
  let running = false;
  let disposed = false;
  let raf = 0;
  let lastT = 0;
  let acc = 0;
  let hovered: Item | null = null;
  let hideTimer = 0;
  let resizeTimer = 0;

  /* ---- hover tooltip chip ------------------------------------------------ */
  const chip = document.createElement("div");
  chip.setAttribute("aria-hidden", "true");
  chip.style.cssText =
    "position:absolute;left:0;top:0;z-index:200;pointer-events:none;opacity:0;" +
    "transition:opacity .16s ease, transform .08s ease-out;will-change:transform;white-space:nowrap;" +
    `background:${PARCHMENT};color:#C33130;font:700 12px/1 system-ui,sans-serif;` +
    "letter-spacing:.02em;padding:7px 13px;border-radius:999px;" +
    "box-shadow:0 6px 14px rgba(60,6,6,.38);";
  const chipText = document.createElement("span");
  const chipTail = document.createElement("i");
  chipTail.style.cssText = `position:absolute;left:50%;bottom:-4px;width:8px;height:8px;margin-left:-4px;background:${PARCHMENT};transform:rotate(45deg);border-radius:1px;`;
  chip.append(chipText, chipTail);

  /* ---- sizing ------------------------------------------------------------ */
  const measure = () => {
    W = stage.clientWidth;
    H = stage.clientHeight;
    const wide = W >= 1100;
    const mid = W >= 700 && !wide;
    D = wide ? Math.min(190, Math.max(105, W * 0.115)) : mid ? Math.max(115, W * 0.13) : 100;

    const cap = stage.querySelector<HTMLElement>("[data-finale-caption]");
    const capBottom = cap
      ? cap.getBoundingClientRect().bottom - stage.getBoundingClientRect().top
      : H * 0.48;
    const maxPile = Math.max(140, H - capBottom - 24);

    const base = wide ? 16 : mid ? 12 : 9;
    const k = wide ? 380 : mid ? 320 : 380;
    const factor = Math.min(1.8, Math.max(0.65, maxPile / k));
    discCount = Math.min(20, Math.max(7, Math.round(base * factor)));

    pouchIndices.clear();
    if (wide) {
      pouchIndices.add(3);
      pouchIndices.add(8);
      pouchIndices.add(14);
    } else if (mid) {
      pouchIndices.add(3);
      pouchIndices.add(8);
    } else {
      pouchIndices.add(3);
    }
    total = discCount + pouchIndices.size;

    const pouchBase = wide ? W * 0.15 : mid ? W * 0.20 : W * 0.28;
    pouchW = Math.max(105, Math.min(235, pouchBase, (maxPile * 0.60) / 1.13));

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const buildWalls = () => {
    if (walls.length) Composite.remove(engine.world, walls);
    const opts = { isStatic: true, friction: 0.6, restitution: 0.12 };
    walls = [
      Bodies.rectangle(W / 2, H + 50, W * 3, 100, opts), // floor right at bottom of stage
      Bodies.rectangle(-60, H / 2, 120, H * 8, opts),     // left wall
      Bodies.rectangle(W + 60, H / 2, 120, H * 8, opts),  // right wall
    ];
    Composite.add(engine.world, walls);
  };

  const shuffledOrder = () => {
    const a = FLAVOURS.map((f) => f.key as string);
    const list = [...a, ...a, ...a, ...a];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  /* ---- spawning ---------------------------------------------------------- */
  const spawnDisc = (yOffset: number) => {
    const key = order[discN % order.length];
    const flavour = FLAVOURS.find((f) => f.key === key);
    const label = flavour ? `${flavour.label} Khakhra` : "Khakhra";
    const idx = discN++;
    const size = D * (0.84 + Math.random() * 0.28);
    const r = (size / 2) * 0.93;
    const x = W * (0.09 + 0.82 * ((idx * 0.618 + Math.random() * 0.12) % 1));
    const y = -size * 0.85 - yOffset;

    const body = Bodies.circle(x, y, r, {
      restitution: 0.32,
      friction: 0.45,
      frictionStatic: 0.7,
      frictionAir: 0.012,
      density: 0.002,
      sleepThreshold: 45,
    });
    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 2.6,
      y: 2.2 + Math.random() * 3.4,
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.26);

    const wrap = document.createElement("div");
    wrap.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;will-change:transform;z-index:${10 + items.length};cursor:grab;`;
    const shadow = document.createElement("div");
    shadow.style.cssText = `position:absolute;inset:7%;border-radius:50%;box-shadow:0 ${size * 0.07}px ${size * 0.1}px rgba(58,6,6,.5);`;
    const inner = document.createElement("div");
    inner.style.cssText = "position:absolute;inset:0;will-change:transform;";
    const img = new window.Image();
    img.src = `/images/finale/disc-${key}.webp`;
    img.alt = "";
    img.draggable = false;
    img.decoding = "async";
    img.style.cssText =
      "display:block;width:100%;height:100%;pointer-events:none;user-select:none;";
    inner.appendChild(img);
    const shade = document.createElement("div");
    shade.style.cssText =
      "position:absolute;inset:3%;border-radius:50%;pointer-events:none;" +
      "background:radial-gradient(circle at 32% 26%,rgba(255,255,255,.14),rgba(255,255,255,0) 42%,rgba(48,4,4,.26) 100%);";
    wrap.append(shadow, inner, shade);
    layer.appendChild(wrap);

    Composite.add(engine.world, body);
    items.push({ body, wrap, inner, w: size, h: size, label, lx: Infinity, ly: Infinity, la: Infinity });
  };

  const spawnPouch = (pouchNumber: number, yOffset: number) => {
    const pouchData = POUCHES[pouchNumber % POUCHES.length];
    const w = pouchW;
    const h = w * pouchData.ratio;
    const xPos = pouchNumber % 2 === 0
      ? W * (0.62 + Math.random() * 0.15)
      : W * (0.24 + Math.random() * 0.16);
    const x = Math.max(w * 0.55, Math.min(W - w * 0.55, xPos));
    const body = Bodies.rectangle(x, -h * 0.75 - yOffset, w * 0.8, h * 0.86, {
      chamfer: { radius: 14 },
      density: 0.004,
      friction: 0.6,
      frictionStatic: 0.9,
      restitution: 0.14,
      sleepThreshold: 45,
    });
    Body.setAngle(body, (Math.random() - 0.5) * 0.35);
    Body.setInertia(body, Infinity); // stays upright-ish
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.6, y: 2.6 + Math.random() });

    const wrap = document.createElement("div");
    wrap.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;will-change:transform;z-index:${10 + items.length};cursor:grab;`;
    const img = new window.Image();
    img.src = pouchData.src;
    img.alt = "";
    img.draggable = false;
    img.decoding = "async";
    img.style.cssText =
      "display:block;width:100%;height:100%;pointer-events:none;user-select:none;" +
      "filter:drop-shadow(0 14px 14px rgba(58,6,6,.5));";
    wrap.appendChild(img);
    layer.appendChild(wrap);

    Composite.add(engine.world, body);
    items.push({ body, wrap, inner: null, w, h, label: pouchData.label, lx: Infinity, ly: Infinity, la: Infinity });
  };

  const spawnItem = (index: number, yOffset: number) => {
    if (pouchIndices.has(index)) {
      const pIdx = Array.from(pouchIndices).indexOf(index);
      spawnPouch(pIdx, yOffset);
    } else {
      spawnDisc(yOffset);
    }
  };

  /* ---- drawing ----------------------------------------------------------- */
  const drawItems = () => {
    for (const it of items) {
      const { x, y } = it.body.position;
      const a = it.body.angle;
      if (
        Math.abs(x - it.lx) > 0.05 ||
        Math.abs(y - it.ly) > 0.05 ||
        Math.abs(a - it.la) > 0.0005
      ) {
        it.lx = x;
        it.ly = y;
        it.la = a;
        if (it.inner) {
          it.wrap.style.transform = `translate3d(${x - it.w / 2}px,${y - it.h / 2}px,0)`;
          it.inner.style.transform = `rotate(${a}rad)`;
        } else {
          it.wrap.style.transform = `translate3d(${x - it.w / 2}px,${y - it.h / 2}px,0) rotate(${a}rad)`;
        }
      }
    }
  };

  const updateChip = () => {
    if (!hovered) {
      chip.style.opacity = "0";
      return;
    }
    chipText.textContent = hovered.label;
    const { x, y } = hovered.body.position;
    chip.style.opacity = "1";
    chip.style.transform = `translate3d(${x}px,${y - hovered.h / 2 + 4}px,0) translate(-50%,-100%)`;
  };

  const emitCrumbs = (x: number, y: number, n: number) => {
    if (reduced) return;
    for (let i = 0; i < n && crumbs.length < 140; i++) {
      const ang = -Math.PI * Math.random();
      const sp = 1.4 + Math.random() * 3.6;
      crumbs.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 1,
        decay: 0.017 + Math.random() * 0.022,
        size: 1.6 + Math.random() * 2.6,
        color: CRUMB_COLORS[Math.floor(Math.random() * CRUMB_COLORS.length)],
      });
    }
  };

  const drawCrumbs = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = crumbs.length - 1; i >= 0; i--) {
      const c = crumbs[i];
      c.vy += 0.16;
      c.vx *= 0.99;
      c.x += c.vx;
      c.y += c.vy;
      c.life -= c.decay;
      if (c.life <= 0 || c.y > H + 8) {
        crumbs.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.max(0, c.life);
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size * 0.72);
    }
    ctx.globalAlpha = 1;
  };

  Events.on(engine, "collisionStart", (ev: Matter.IEventCollision<Matter.Engine>) => {
    for (const pair of ev.pairs) {
      const a = pair.bodyA;
      const b = pair.bodyB;
      const rv = Math.hypot(a.velocity.x - b.velocity.x, a.velocity.y - b.velocity.y);
      if (rv < 4.5) continue;
      const sp = pair.collision?.supports?.[0];
      const px = sp ? sp.x : (a.position.x + b.position.x) / 2;
      const py = sp ? sp.y : (a.position.y + b.position.y) / 2;
      emitCrumbs(px, py, Math.min(7, Math.round(rv * 0.8)));
    }
  });

  /* ---- main physics loop ------------------------------------------------- */
  const frame = (t: number) => {
    if (disposed || !visible) {
      running = false;
      return;
    }
    const dt = Math.min(50, t - lastT);
    lastT = t;
    acc += dt;
    spawnClock += dt;

    while (spawned < total && spawnClock >= nextSpawn) {
      spawnItem(spawned, 0);
      spawned++;
      nextSpawn += 135 + Math.random() * 45;
    }

    let n = 0;
    while (acc >= STEP && n < 3) {
      Engine.update(engine, STEP);
      acc -= STEP;
      n++;
    }
    if (n === 3) acc = 0;

    drawItems();
    drawCrumbs();
    updateChip();

    const settled =
      spawned >= total && crumbs.length === 0 && items.every((i) => i.body.isSleeping);
    if (settled) {
      running = false; // fully at rest: save CPU until cursor wakes it
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  const kick = () => {
    if (reduced || running || !visible || disposed) return;
    running = true;
    lastT = performance.now();
    raf = requestAnimationFrame(frame);
  };

  /* ---- instant, pre-settled pile for reduced motion / fast resize -------- */
  const simulateSettled = () => {
    discN = 0;
    order = shuffledOrder();
    for (let i = 0; i < total; i++) spawnItem(i, i * D * 0.9);
    spawned = total;
    for (let s = 0; s < 720; s++) Engine.update(engine, STEP);
    drawItems();
    updateChip();
  };

  const resetWorld = () => {
    for (const it of items) it.wrap.remove();
    items = [];
    hovered = null;
    crumbs.length = 0;
    Composite.clear(engine.world, false);
    walls = [];
  };

  /* ---- pointer interaction (nudge / push) -------------------------------- */
  let lpx = 0;
  let lpy = 0;
  let hasLast = false;

  const topItemAt = (px: number, py: number): Item | null => {
    const hits = Query.point(
      items.map((i) => i.body),
      { x: px, y: py }
    );
    if (!hits.length) return null;
    for (let i = items.length - 1; i >= 0; i--) {
      if (hits.includes(items[i].body)) return items[i];
    }
    return null;
  };

  const push = (px: number, py: number, dx: number, dy: number, speed: number) => {
    const reach = 75;
    for (const it of items) {
      const bx = it.body.position.x;
      const by = it.body.position.y;
      const rr = Math.max(it.w, it.h) / 2;
      const dist = Math.hypot(bx - px, by - py);
      if (dist > rr + reach || dist < 1) continue;
      const falloff = 1 - dist / (rr + reach);
      const k = Math.min(11, speed * 0.32) * falloff;
      Sleeping.set(it.body, false);
      Body.setVelocity(it.body, {
        x: it.body.velocity.x + ((bx - px) / dist) * k + dx * 0.05,
        y: it.body.velocity.y + ((by - py) / dist) * k + dy * 0.05,
      });
    }
  };

  const onMove = (e: PointerEvent) => {
    const rect = stage.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (e.pointerType === "mouse") {
      stage.style.setProperty("--mx", `${px}px`);
      stage.style.setProperty("--my", `${py}px`);
      if (hasLast && !reduced) {
        const dx = px - lpx;
        const dy = py - lpy;
        const sp = Math.hypot(dx, dy);
        if (sp > 1) push(px, py, dx, dy, sp);
      }
      lpx = px;
      lpy = py;
      hasLast = true;
    }
    hovered = topItemAt(px, py);
    window.clearTimeout(hideTimer);
    if (e.pointerType !== "mouse" && hovered) {
      hideTimer = window.setTimeout(() => {
        hovered = null;
        updateChip();
      }, 1400);
    }
    updateChip();
    kick();
  };

  const onLeave = () => {
    hasLast = false;
    hovered = null;
    updateChip();
  };

  /* ---- boot --------------------------------------------------------------- */
  measure();
  layer.appendChild(chip);
  buildWalls();
  order = shuffledOrder();

  if (reduced) simulateSettled();
  else kick();

  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerdown", onMove);
  stage.addEventListener("pointerleave", onLeave);

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    },
    { threshold: 0 }
  );
  io.observe(stage);

  let lastW = W;
  let lastH = H;
  const ro = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (disposed) return;
      if (Math.abs(stage.clientWidth - lastW) < 40 && Math.abs(stage.clientHeight - lastH) < 120) return;
      resetWorld();
      measure();
      lastW = W;
      lastH = H;
      buildWalls();
      simulateSettled();
      ctx?.clearRect(0, 0, W, H);
    }, 220);
  });
  ro.observe(stage);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    window.clearTimeout(hideTimer);
    window.clearTimeout(resizeTimer);
    io.disconnect();
    ro.disconnect();
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerdown", onMove);
    stage.removeEventListener("pointerleave", onLeave);
    Events.off(engine, "collisionStart");
    Engine.clear(engine);
    layer.replaceChildren();
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };
}

/* -------------------------------------------------------------------------- */
/*  Headline Mask Animation                                                   */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskLine({
  children,
  index,
  show,
  reduced,
}: {
  children: React.ReactNode;
  index: number;
  show: boolean;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden px-[0.08em] pb-[0.05em] -mb-[0.05em]">
      <motion.span
        className="block"
        initial={reduced ? false : { y: "112%", rotate: 2.2 }}
        animate={show ? { y: "0%", rotate: 0 } : undefined}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 + index * 0.16 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export default function CrunchFinaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);

  const reduceMotion = !!useReducedMotion();
  const started = useInView(stageRef, { once: true, amount: 0.3 });
  const show = started || reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const wmY = useTransform(scrollYProgress, [0, 1], ["-7%", "5%"]);
  const wmScale = useTransform(scrollYProgress, [0, 1], [1.07, 1]);

  useEffect(() => {
    if (!started) return;
    const stage = stageRef.current;
    const layer = layerRef.current;
    const canvas = fxRef.current;
    if (!stage || !layer || !canvas) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    (async () => {
      const mod = await import("matter-js");
      if (disposed) return;
      const M = ((mod as unknown as { default?: typeof Matter }).default ??
        (mod as unknown as typeof Matter)) as typeof Matter;
      teardown = setupScene(M, stage, layer, canvas, reduceMotion);
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [started, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="footer"
      aria-label="Good food. Good mood. Zero boring. That's EatHit."
      className="relative isolate flex w-full flex-col overflow-hidden bg-[#C33130] text-[#F2F0E6] select-none min-h-[max(min(100svh,860px),700px)] md:min-h-[max(min(100svh,980px),900px)]"
    >
      {/* Paper grain + soft light so the red never reads as a flat fill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_URL }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 28%, rgba(255,150,120,0.16), rgba(255,150,120,0) 62%), linear-gradient(to bottom, rgba(70,6,6,0) 55%, rgba(70,6,6,0.30) 100%)",
        }}
      />

      {/* Torn-paper seam from the parchment section above */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 46"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-px inset-x-0 z-40 h-[clamp(26px,3.4vw,48px)] w-full drop-shadow-[0_3px_2px_rgba(70,6,6,0.35)]"
      >
        <path d={TORN_BACK} fill="#E2D9C6" />
        <path d={TORN_FRONT} fill={PARCHMENT} />
      </svg>

      {/* ------------------------------ STAGE -------------------------------- */}
      <div
        ref={stageRef}
        className="relative z-10 flex-1 min-h-0 overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        {/* Giant ghost wordmark */}
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: wmY, scale: wmScale }}
          className="pointer-events-none absolute inset-x-0 top-[2%] z-0 flex justify-center"
        >
          <span
            className="font-krisha uppercase whitespace-nowrap leading-[0.82] tracking-tight"
            style={{
              fontSize: "clamp(11rem, 36vw, 40rem)",
              color: "rgba(255, 214, 190, 0.062)",
            }}
          >
            EAT HIT
          </span>
        </motion.div>

        {/* Cursor spotlight (CSS variables are set from pointer events) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 38%), rgba(255,206,170,0.17), transparent 70%)",
          }}
        />

        {/* Physics layer: khakhra discs + pouches are injected here */}
        <div
          ref={layerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        />

        {/* Crumb particles */}
        <canvas
          ref={fxRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
        />

        {/* Headline sits in front of the falling discs */}
        <div className="pointer-events-none relative z-20 flex flex-col items-center px-4 pt-[clamp(4.5rem,10vh,7.5rem)] text-center">
          <h2 className="font-krisha m-0 text-[clamp(3.4rem,13vw,5.5rem)] md:text-[clamp(4rem,9.4vw,6.2rem)] xl:text-[clamp(5.5rem,7.2vw,7.4rem)] font-normal uppercase leading-[0.9] tracking-tight">
            <span className="sr-only">Good food. Good mood. Zero boring.</span>
            <span aria-hidden="true" className="block">
              <MaskLine index={0} show={show} reduced={reduceMotion}>
                <span style={OUTLINE_STYLE}>Good food.</span>
              </MaskLine>
              <MaskLine index={1} show={show} reduced={reduceMotion}>
                <span style={{ letterSpacing: "0.02em" }}>Good mood.</span>
              </MaskLine>
              <span className="relative block">
                <MaskLine index={2} show={show} reduced={reduceMotion}>
                  <span style={OUTLINE_STYLE}>Zero boring.</span>
                </MaskLine>
                <svg
                  viewBox="0 0 800 30"
                  preserveAspectRatio="none"
                  className="absolute left-[3%] top-full -mt-[0.02em] h-[0.2em] w-[94%] overflow-visible"
                >
                  <motion.path
                    d="M6 20 C 140 5, 300 27, 470 14 S 720 8, 794 17"
                    fill="none"
                    stroke={PARCHMENT}
                    strokeWidth={6}
                    strokeLinecap="round"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.75, delay: 1.0, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </span>
          </h2>

          <motion.p
            data-finale-caption=""
            initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: -5 }}
            animate={show ? { opacity: 1, y: 0, rotate: -2 } : undefined}
            transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
            className="m-0 mt-[clamp(1rem,1.9vw,1.6rem)] font-[family-name:var(--font-caveat)] text-[clamp(1.7rem,2.9vw,2.7rem)] font-bold leading-none text-[#F2F0E6]"
          >
            That’s EatHit.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
