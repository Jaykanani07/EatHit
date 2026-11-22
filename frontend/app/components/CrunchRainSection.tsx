"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  EatHit — Closing section: "Good food. Good mood. Zero boring."            */
/*  Real physical continuous falling loop: khakhra discs and pouches tumble,  */
/*  flutter aerodynamically, and rain down endlessly with natural gravity.    */
/* -------------------------------------------------------------------------- */

const PARCHMENT = "#F2F0E6"; // same parchment as sections 2 & 3

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
/*  Item Catalog                                                              */
/* -------------------------------------------------------------------------- */

const D = (k: string) => `/images/finale/disc-${k}.webp`;
const P = (k: string) => `/images/finale/pouch-${k}.webp`;

type ItemDef = {
  src: string;
  isPouch?: boolean;
  depth: "far" | "mid" | "near";
  baseSize: number; // reference size in pixels
};

const ITEMS: ItemDef[] = [
  /* FAR LAYER: atmospheric background — all 5 discs + 2 pouches */
  { src: D("masala"), depth: "far", baseSize: 66 },
  { src: D("methi"), depth: "far", baseSize: 62 },
  { src: D("jeera"), depth: "far", baseSize: 72 },
  { src: D("plain"), depth: "far", baseSize: 64 },
  { src: D("lasun"), depth: "far", baseSize: 70 },
  { src: P("masala"), isPouch: true, depth: "far", baseSize: 85 },
  { src: P("plain"), isPouch: true, depth: "far", baseSize: 88 },

  /* MID LAYER: hero focus — EVERY DISC FLAVOUR & EVERY POUCH FLAVOUR GUARANTEED */
  // All 5 Pouches:
  { src: P("masala"), isPouch: true, depth: "mid", baseSize: 140 },
  { src: P("methi"), isPouch: true, depth: "mid", baseSize: 138 },
  { src: P("plain"), isPouch: true, depth: "mid", baseSize: 136 },
  { src: P("jeera"), isPouch: true, depth: "mid", baseSize: 138 },
  { src: P("lasun"), isPouch: true, depth: "mid", baseSize: 136 },
  // All 5 Discs:
  { src: D("masala"), depth: "mid", baseSize: 126 },
  { src: D("methi"), depth: "mid", baseSize: 128 },
  { src: D("plain"), depth: "mid", baseSize: 116 },
  { src: D("jeera"), depth: "mid", baseSize: 132 },
  { src: D("lasun"), depth: "mid", baseSize: 122 },
  // Additional mid items for rich coverage:
  { src: D("masala"), depth: "mid", baseSize: 122 },
  { src: P("plain"), isPouch: true, depth: "mid", baseSize: 134 },

  /* NEAR LAYER: foreground cinematic depth */
  { src: D("jeera"), depth: "near", baseSize: 195 },
  { src: P("methi"), isPouch: true, depth: "near", baseSize: 175 },
  { src: D("masala"), depth: "near", baseSize: 185 },
  { src: P("lasun"), isPouch: true, depth: "near", baseSize: 170 },
];

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
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function CrunchRainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reduceMotion = !!useReducedMotion();
  const started = useInView(stageRef, { once: true, amount: 0.25 });
  const show = started || reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const wmY = useTransform(scrollYProgress, [0, 1], ["-6%", "5%"]);
  const wmScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  /* ---- Physical Continuous Falling Animation Loop ----------------------- */
  useEffect(() => {
    if (reduceMotion) return;
    const stage = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    const domItems = Array.from(container.querySelectorAll<HTMLElement>("[data-fall-item]"));
    if (!domItems.length) return;

    let stageW = stage.clientWidth;
    let stageH = stage.clientHeight;

    const baseFallSpeeds = {
      far: 135,  // px/sec (~5.5-6.5s to cross screen)
      mid: 210,  // px/sec (~3.5-4.5s to cross screen)
      near: 310, // px/sec (~2.5-3.2s to cross screen)
    };

    // Initialize physical state for each item with true randomness
    type State = {
      el: HTMLElement;
      def: ItemDef;
      x: number;
      y: number;
      vx: number;       // horizontal drift velocity (px/sec)
      size: number;
      speed: number;    // vertical fall speed (px/sec)
      swayPhase: number;
      swayAmp: number;
      swayFreq: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      vRotX: number;
      vRotY: number;
      vRotZ: number;
      baseTilt: number;
    };

    const states: State[] = domItems.map((el, i) => {
      const def = ITEMS[i % ITEMS.length];
      const scaleFactor = stageW >= 1200 ? 1 : stageW >= 768 ? 0.85 : 0.65;
      const size = def.baseSize * scaleFactor;
      const isPouch = !!def.isPouch;
      const speed = baseFallSpeeds[def.depth] * (0.86 + Math.random() * 0.3);
      const itemH = isPouch ? size * 1.35 : size;

      // Stagger vertical positions across and above the stage so it's already mid-fall
      const startY = (i / domItems.length) * (stageH + itemH * 2) - itemH + (Math.random() - 0.5) * 50;
      // Completely random horizontal position across ANY side of the stage
      const startX = Math.random() * (stageW - size * 0.5);

      const rotDir = Math.random() > 0.5 ? 1 : -1;

      return {
        el,
        def,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 36, // random horizontal drift across screen
        size,
        speed,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: isPouch ? 14 + Math.random() * 12 : 20 + Math.random() * 18,
        swayFreq: 1.1 + Math.random() * 0.8,
        rotX: isPouch ? 6 : Math.random() * 360,
        rotY: 0,
        rotZ: isPouch ? (Math.random() - 0.5) * 16 : Math.random() * 360,
        vRotX: isPouch ? 0 : (20 + Math.random() * 35) * rotDir,
        vRotY: isPouch ? 0 : (10 + Math.random() * 20) * rotDir,
        vRotZ: isPouch ? 0 : (18 + Math.random() * 35) * rotDir,
        baseTilt: isPouch ? (Math.random() - 0.5) * 12 : 0,
      };
    });

    let running = false;
    let lastTime = performance.now();
    let animId = 0;

    const updatePhysics = (now: number) => {
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      for (let i = 0; i < states.length; i++) {
        const s = states[i];
        const def = s.def;

        // Vertical movement with natural gravity speed
        s.y += s.speed * dt;

        // Random horizontal drift + aerodynamic flutter across any side
        s.x += s.vx * dt;
        s.swayPhase += s.swayFreq * dt;
        const currentSway = Math.sin(s.swayPhase) * s.swayAmp;

        // 3D Rotational tumbling
        if (def.isPouch) {
          // Pouches sway with a gentle, realistic aerodynamic rocking & banking motion
          s.rotZ = s.baseTilt + Math.sin(s.swayPhase * 0.8) * 8; // gentle -8deg to +8deg natural rock
          s.rotY = Math.sin(s.swayPhase * 0.8) * 11; // dynamic banking into the turn (never stuck at 80deg!)
          s.rotX = 6 + Math.cos(s.swayPhase * 0.6) * 4; // subtle 3D top pitch
        } else {
          // Khakhra discs tumble naturally in 3D as they glide through the air
          s.rotZ += s.vRotZ * dt;
          s.rotX += s.vRotX * dt;
          s.rotY = Math.sin(s.swayPhase) * 20;
        }

        const itemH = def.isPouch ? s.size * 1.35 : s.size;

        // Soft screen edge wrap for natural horizontal continuity across any side
        if (s.x < -s.size * 1.2) {
          s.x = stageW + s.size * 0.2;
        } else if (s.x > stageW + s.size * 0.2) {
          s.x = -s.size * 1.2;
        }

        // Check if item has fallen past the bottom of the stage
        if (s.y > stageH + itemH + 30) {
          // Recycle above top at a completely random X position anywhere across the width
          s.y = -itemH - (Math.random() * 90 + 20);
          s.x = Math.random() * (stageW - s.size * 0.5);
          s.vx = (Math.random() - 0.5) * 38; // fresh random lateral drift
          s.speed = baseFallSpeeds[def.depth] * (0.86 + Math.random() * 0.32);
          s.swayPhase = Math.random() * Math.PI * 2;
          s.swayAmp = def.isPouch ? 14 + Math.random() * 12 : 20 + Math.random() * 18;
          s.swayFreq = 1.1 + Math.random() * 0.8;
          if (def.isPouch) {
            s.baseTilt = (Math.random() - 0.5) * 12;
          } else {
            const rotDir = Math.random() > 0.5 ? 1 : -1;
            s.vRotZ = (18 + Math.random() * 35) * rotDir;
            s.vRotX = (20 + Math.random() * 35) * rotDir;
          }
        }

        // Direct hardware-accelerated 3D transform update (0 React re-renders, 60-120 FPS)
        const posX = s.x + currentSway;
        s.el.style.transform = `translate3d(${posX.toFixed(1)}px, ${s.y.toFixed(1)}px, 0) rotateX(${s.rotX.toFixed(1)}deg) rotateY(${s.rotY.toFixed(1)}deg) rotateZ(${s.rotZ.toFixed(1)}deg)`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      animId = requestAnimationFrame(updatePhysics);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    // Pause physics completely when scrolled away to use 0 CPU
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    io.observe(stage);

    const onResize = () => {
      stageW = stage.clientWidth;
      stageH = stage.clientHeight;
      const scaleFactor = stageW >= 1200 ? 1 : stageW >= 768 ? 0.85 : 0.65;
      for (const s of states) {
        s.size = s.def.baseSize * scaleFactor;
        s.speed = baseFallSpeeds[s.def.depth] * (0.86 + Math.random() * 0.32);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      stopLoop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="footer"
      aria-label="Good food. Good mood. Zero boring. That's EatHit."
      className="relative isolate flex w-full select-none flex-col overflow-hidden bg-[#C33130] text-[#F2F0E6] min-h-[max(min(100svh,860px),720px)] md:min-h-[max(min(100svh,960px),880px)]"
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
            "radial-gradient(110% 70% at 50% 30%, rgba(255,150,120,0.18), rgba(255,150,120,0) 65%), linear-gradient(to bottom, rgba(70,6,6,0) 55%, rgba(70,6,6,0.30) 100%)",
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
        className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Giant ghost wordmark */}
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: wmY, scale: wmScale }}
          className="pointer-events-none absolute inset-x-0 top-[4%] z-0 flex justify-center"
        >
          <span
            className="font-krisha whitespace-nowrap uppercase leading-[0.82] tracking-tight"
            style={{
              fontSize: "clamp(11rem, 36vw, 40rem)",
              color: "rgba(255, 214, 190, 0.06)",
            }}
          >
            EAT HIT
          </span>
        </motion.div>

        {/* ----------------- FALLING KHAKHRA & POUCH ITEMS ----------------- */}
        <div
          ref={containerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        >
          {ITEMS.map((item, i) => {
            const isNear = item.depth === "near";
            const isFar = item.depth === "far";
            const isPouch = item.isPouch;
            const pouchAspect = 1.35; // Authentic stand-up snack pouch aspect ratio
            const filterClass = isFar
              ? "blur-[1.8px] brightness-[0.88] opacity-75"
              : isNear
                ? "blur-[2.2px] drop-shadow-[0_20px_24px_rgba(50,4,4,0.6)]"
                : isPouch
                  ? "drop-shadow-[0_16px_22px_rgba(40,2,2,0.6)] drop-shadow-[0_4px_8px_rgba(40,2,2,0.35)]"
                  : "drop-shadow-[0_12px_16px_rgba(50,4,4,0.45)]";

            return (
              <div
                key={i}
                data-fall-item=""
                className={`absolute left-0 top-0 will-change-transform ${isNear ? "z-25" : isFar ? "z-5" : "z-10"}`}
                style={{
                  width: `clamp(45px, ${item.baseSize * 0.1}vw, ${item.baseSize}px)`,
                  height: isPouch
                    ? `clamp(${45 * pouchAspect}px, ${item.baseSize * 0.1 * pouchAspect}vw, ${item.baseSize * pouchAspect}px)`
                    : undefined,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    draggable={false}
                    className={`block w-full select-none transition-none ${isPouch ? "h-full object-fill rounded-[6px]" : "h-auto"
                      } ${filterClass}`}
                  />
                  {/* Volumetric foil pillow sheen overlay on pouches */}
                  {isPouch && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[6px] opacity-25 mix-blend-overlay"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft pool behind text so discs never compromise headline legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            background:
              "radial-gradient(54% 45% at 50% 48%, rgba(120,12,12,0.48), rgba(120,12,12,0) 74%)",
          }}
        />

        {/* Headline */}
        <div className="pointer-events-none relative z-20 flex flex-col items-center px-4 pt-[clamp(2.5rem,7vh,5rem)] text-center">
          <h2 className="font-krisha m-0 text-[clamp(3.5rem,15vw,6.5rem)] font-normal uppercase leading-[0.9] tracking-tight md:text-[clamp(4.5rem,10.2vw,8.2rem)]">
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
            initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: -5 }}
            animate={show ? { opacity: 1, y: 0, rotate: -2 } : undefined}
            transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
            className="m-0 mt-[clamp(1.2rem,2.4vw,2.2rem)] font-[family-name:var(--font-caveat)] text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-none text-[#F2F0E6]"
          >
            That’s EatHit.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
