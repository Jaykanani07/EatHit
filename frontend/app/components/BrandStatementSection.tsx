"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

export interface BrandStatementConfig {
  headlineLine1: string;
  headlineLine2: string;
}

export const BRAND_STATEMENT_COPY: BrandStatementConfig = {
  headlineLine1: "100% ROASTED.",
  headlineLine2: "NEVER FRIED.",
};

// Bavet signature crimson red / EatHit brand red
const BRAND_RED = "#C33130";

interface RayLine {
  angle: number; // in radians [0, 2*PI]
  dist: number; // current travel distance from inner clearance (0 to maxTravel)
  maxTravel: number; // total travel distance for this ray
  speed: number; // px per second
  length: number; // length of the dash line
  width: number; // stroke width
  alphaMax: number; // peak opacity
}

interface ArchedLineProps {
  text: string;
  isTopLine: boolean;
}

/**
 * Renders a line of text warped in Bavet's signature arched woodblock typography:
 * - Top line: Top contour dips into a parabolic bowl in the center, baseline is flat.
 * - Bottom line: Bottom contour arches UP in the center, top baseline is flat.
 * - Outer characters tilt subtly outward for that handcrafted vintage block flare.
 */
function ArchedLine({ text, isTopLine }: ArchedLineProps) {
  const chars = text.split("");
  const total = chars.length;

  return (
    <div
      className="inline-flex items-center justify-center select-none whitespace-nowrap leading-[0.84]"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i} className="inline-block w-[0.24em]" />;
        }

        // Normalized horizontal position: -1 (left edge) to 0 (center) to +1 (right edge)
        const t = total > 1 ? (i / (total - 1) - 0.5) * 2 : 0;
        // Parabolic arch: 0 at edges, 1 at center
        const curve = 1 - t * t;

        // Scale factor: outer letters are 100% height, center letters are ~84% height
        const scaleY = 1 - curve * 0.16;

        // Subtle rotation flare towards edges (like a vintage woodblock arch)
        const rotateDeg = t * 2.6;

        return (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: `scaleY(${scaleY}) rotate(${rotateDeg}deg)`,
              transformOrigin: isTopLine ? "center bottom" : "center top",
              display: "inline-block",
              willChange: "transform",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

interface BrandStatementSectionProps {
  copy?: Partial<BrandStatementConfig>;
  className?: string;
}

export default function BrandStatementSection({
  copy,
  className = "",
}: BrandStatementSectionProps) {
  const headlineLine1 = copy?.headlineLine1 ?? BRAND_STATEMENT_COPY.headlineLine1;
  const headlineLine2 = copy?.headlineLine2 ?? BRAND_STATEMENT_COPY.headlineLine2;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // Mouse tracking state for 3D cursor-facing tilt
  const mouseState = useRef({
    targetX: 0, // normalized [-1, 1]
    targetY: 0,
    currentRotateX: 0,
    currentRotateY: 0,
    currentZ: 0,
    isHovered: false,
    cursorAngle: 0,
  });

  // =========================================================================
  // 1. CONTINUOUS RADIATING RAYS CANVAS ENGINE
  // Lines are continuously emitted outward from behind the arched text
  // =========================================================================
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    // Responsive line count: 84 lines on desktop, 44 on mobile for dense energetic burst
    const lineCount = window.innerWidth < 768 ? 44 : 84;

    const createRay = (startProgress?: number): RayLine => {
      const maxTravel =
        window.innerWidth < 768
          ? 220 + Math.random() * 180
          : 360 + Math.random() * 320;
      const speed = 120 + Math.random() * 160; // px/sec
      const length =
        window.innerWidth < 768
          ? 16 + Math.random() * 26
          : 22 + Math.random() * 42;
      const width =
        window.innerWidth < 768
          ? Math.random() < 0.3 ? 2.0 : 2.8
          : Math.random() < 0.25 ? 2.4 : 3.4;

      return {
        angle: Math.random() * Math.PI * 2,
        dist: startProgress !== undefined ? startProgress * maxTravel : 0,
        maxTravel,
        speed,
        length,
        width,
        alphaMax: 0.8 + Math.random() * 0.2,
      };
    };

    // Initialize lines scattered at various progress stages
    const rays: RayLine[] = [];
    for (let i = 0; i < lineCount; i++) {
      // Disperse uniformly so rays are continuously visible immediately
      rays.push(createRay(i / lineCount + Math.random() * (1 / lineCount)));
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation render loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Center with subtle cursor parallax tracking
      const cx = width / 2 + mouseState.current.targetX * 16;
      const cy = height / 2 + mouseState.current.targetY * 16;

      // Clearance ellipse around text bounds so lines emerge from behind the text
      const wRadius = Math.min(width * 0.34, 300);
      const hRadius = Math.min(height * 0.24, 140);

      // Render all active radiating lines
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];

        // Move outward along ray
        ray.dist += ray.speed * dt;

        // Reset when reaching outer boundary
        if (ray.dist >= ray.maxTravel) {
          ray.dist = 0;
          ray.angle = Math.random() * Math.PI * 2;
          ray.maxTravel =
            window.innerWidth < 768
              ? 220 + Math.random() * 180
              : 360 + Math.random() * 320;
          ray.speed = 120 + Math.random() * 160;
          ray.length =
            window.innerWidth < 768
              ? 16 + Math.random() * 26
              : 22 + Math.random() * 42;
          ray.alphaMax = 0.8 + Math.random() * 0.2;
        }

        // Calculate clearance offset at this specific angle
        const cosA = Math.cos(ray.angle);
        const sinA = Math.sin(ray.angle);
        const innerClearance = Math.hypot(cosA * wRadius, sinA * hRadius) * 0.86;

        const currentR = innerClearance + ray.dist;
        const progress = Math.max(0, Math.min(1, ray.dist / ray.maxTravel));

        // Smooth sine opacity envelope: 0 at start -> 1 at middle -> 0 at end
        const alpha = Math.sin(progress * Math.PI) * ray.alphaMax;

        // Position of the line segment
        const xMid = cx + cosA * currentR;
        const yMid = cy + sinA * currentR;
        const halfLen = ray.length / 2;

        const x1 = xMid - cosA * halfLen;
        const y1 = yMid - sinA * halfLen;
        const x2 = xMid + cosA * halfLen;
        const y2 = yMid + sinA * halfLen;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(195, 49, 48, ${alpha})`;
        ctx.lineWidth = ray.width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion]);

  // =========================================================================
  // 2. 3D CURSOR-TRACKING TILT ENGINE (BAVET MATHEMATICAL MODEL)
  // Text physically turns and faces towards wherever the cursor is located
  // =========================================================================
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Normalized mouse position from center [-1, 1]
    const nx = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.5)));
    const ny = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.5)));

    mouseState.current.targetX = nx;
    mouseState.current.targetY = ny;
    mouseState.current.isHovered = true;
    mouseState.current.cursorAngle = Math.atan2(dy, dx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseState.current.targetX = 0;
    mouseState.current.targetY = 0;
    mouseState.current.isHovered = false;
  }, []);

  // Smooth lerp frame loop for 3D perspective orientation
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;

    const update3DTilt = () => {
      const state = mouseState.current;

      // Bavet degrees:
      // When cursor is at right (targetX > 0), rotateY turns positive to face right
      // When cursor is at top (targetY < 0), rotateX turns positive to face up
      const targetRotateY = state.isHovered ? state.targetX * 18 : 0;
      const targetRotateX = state.isHovered ? -state.targetY * 18 : 0;
      const targetZ = state.isHovered ? 36 : 0;

      // Smooth interpolation factor (0.12)
      state.currentRotateX += (targetRotateX - state.currentRotateX) * 0.12;
      state.currentRotateY += (targetRotateY - state.currentRotateY) * 0.12;
      state.currentZ += (targetZ - state.currentZ) * 0.12;

      if (textStageRef.current) {
        textStageRef.current.style.transform = `rotateX(${state.currentRotateX.toFixed(
          2
        )}deg) rotateY(${state.currentRotateY.toFixed(
          2
        )}deg) translateZ(${state.currentZ.toFixed(2)}px)`;
      }

      animId = requestAnimationFrame(update3DTilt);
    };

    animId = requestAnimationFrame(update3DTilt);

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener("mousemove", handleMouseMove);
      sectionEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      if (sectionEl) {
        sectionEl.removeEventListener("mousemove", handleMouseMove);
        sectionEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      aria-label="Brand Statement: 100% Roasted Never Fried"
      className={`relative w-full min-h-screen min-h-[100svh] bg-[#F2F0E6] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-12 sm:py-16 overflow-hidden select-none cursor-default ${className}`}
    >
      {/* ========================================================= */}
      {/* 1. SLANTED KINETIC BACKGROUND TYPOGRAPHY RIBBONS          */}
      {/* Adds rich living rhythm and eliminates empty negative space */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center opacity-[0.055]">
        <div className="w-[145vw] -rotate-[7deg] flex flex-col gap-6 sm:gap-10 text-[#B72E32]">
          {/* Row 1: Leftward Infinite Scroll */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT KHAKHRA • 100% ROASTED ON TAWA • NEVER DEEP FRIED • STONE-GROUND WHOLE WHEAT •
            </span>
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT KHAKHRA • 100% ROASTED ON TAWA • NEVER DEEP FRIED • STONE-GROUND WHOLE WHEAT •
            </span>
          </div>

          {/* Row 2: Rightward Infinite Scroll (Hollow Outline Stroke) */}
          <div className="animate-marquee-right whitespace-nowrap flex items-center gap-8 text-outline-brand-thick">
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              THE CRUNCH OF INDIA • AUTHENTIC GUJARATI HERITAGE • CRISPY EVERYDAY GOODNESS •
            </span>
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              THE CRUNCH OF INDIA • AUTHENTIC GUJARATI HERITAGE • CRISPY EVERYDAY GOODNESS •
            </span>
          </div>

          {/* Row 3: Leftward Infinite Scroll */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              ZERO TRANS FAT • PURE ROCK SALT • KASURI METHI • ROASTED JEERA • REAL SPICES •
            </span>
            <span className="font-black text-6xl sm:text-8xl lg:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              ZERO TRANS FAT • PURE ROCK SALT • KASURI METHI • ROASTED JEERA • REAL SPICES •
            </span>
          </div>
        </div>
      </div>

      {/* Warm Ambient Radial Tawa Glow behind center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 119, 6, 0.16) 0%, rgba(195, 49, 48, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Continuous Radiating Rays Canvas spanning the full section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* 2. 3D PERSPECTIVE STAGE: FACING TEXT                      */}
      {/* ========================================================= */}
      <div
        ref={stageRef}
        className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center py-10 sm:py-16 pointer-events-none"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Cursor-Facing Headline Box */}
        <div
          ref={textStageRef}
          className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none select-none px-4"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(4.0rem, 11.5vw, 10.5rem)",
              color: BRAND_RED,
            }}
            className="m-0 font-black uppercase text-center tracking-tight font-[family-name:var(--font-bebas),var(--font-outfit),Impact,sans-serif] flex flex-col items-center justify-center"
          >
            {/* Top Line: Arched Bowl Contour */}
            <ArchedLine text={headlineLine1} isTopLine={true} />

            {/* Bottom Line: Arched Crown Contour */}
            <ArchedLine text={headlineLine2} isTopLine={false} />
          </h2>
        </div>
      </div>
    </section>
  );
}
