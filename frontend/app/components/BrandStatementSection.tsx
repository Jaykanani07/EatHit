"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Brand Statement Configuration
 * The headline and supporting copy are kept editable in one single location.
 */
export interface BrandStatementConfig {
  headlineLine1: string;
  headlineLine2: string;
  supportingText: string;
}

export const BRAND_STATEMENT_COPY: BrandStatementConfig = {
  headlineLine1: "BORN TO",
  headlineLine2: "CRUNCH.",
  supportingText: "A little crunch. A lot of India.",
};

const BRAND_RED = "#B72E32";

// 5 Top Rays (bursting upward)
const TOP_RAYS = [
  { id: "top-1", x1: 75, y1: 54, x2: 55, y2: 12, opacity: 0.9 },
  { id: "top-2", x1: 140, y1: 55, x2: 130, y2: 8, opacity: 0.8 },
  { id: "top-3", x1: 200, y1: 56, x2: 200, y2: 4, opacity: 1.0 },
  { id: "top-4", x1: 260, y1: 55, x2: 270, y2: 8, opacity: 0.8 },
  { id: "top-5", x1: 325, y1: 54, x2: 345, y2: 12, opacity: 0.9 },
];

// 5 Bottom Rays (bursting downward)
const BOTTOM_RAYS = [
  { id: "bottom-1", x1: 75, y1: 6, x2: 55, y2: 48, opacity: 0.9 },
  { id: "bottom-2", x1: 140, y1: 5, x2: 130, y2: 52, opacity: 0.8 },
  { id: "bottom-3", x1: 200, y1: 4, x2: 200, y2: 56, opacity: 1.0 },
  { id: "bottom-4", x1: 260, y1: 5, x2: 270, y2: 52, opacity: 0.8 },
  { id: "bottom-5", x1: 325, y1: 6, x2: 345, y2: 48, opacity: 0.9 },
];

// 3 Left Rays (bursting leftward)
const LEFT_RAYS = [
  { id: "left-1", x1: 54, y1: 45, x2: 12, y2: 25, opacity: 0.9 },
  { id: "left-2", x1: 56, y1: 110, x2: 6, y2: 110, opacity: 1.0 },
  { id: "left-3", x1: 54, y1: 175, x2: 12, y2: 195, opacity: 0.85 },
];

// 3 Right Rays (bursting rightward)
const RIGHT_RAYS = [
  { id: "right-1", x1: 6, y1: 45, x2: 48, y2: 25, opacity: 0.9 },
  { id: "right-2", x1: 4, y1: 110, x2: 54, y2: 110, opacity: 1.0 },
  { id: "right-3", x1: 6, y1: 175, x2: 48, y2: 195, opacity: 0.85 },
];

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
  const supportingText = copy?.supportingText ?? BRAND_STATEMENT_COPY.supportingText;

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked progress for continuous, responsive BAVET scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Dynamic transforms linked to viewport scroll position
  const headlineScale = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.85],
    prefersReducedMotion ? [1, 1, 1] : [0.84, 1.0, 1.04]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.85],
    prefersReducedMotion ? [0, 0, 0] : [55, 0, -25]
  );
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.32],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  // Radiating rays dynamic burst scale & kinetic rotation
  const raysScale = useTransform(
    scrollYProgress,
    [0.12, 0.46, 0.85],
    prefersReducedMotion ? [1, 1, 1] : [0.35, 1.0, 1.08]
  );
  const raysRotate = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    prefersReducedMotion ? [0, 0] : [-12, 12]
  );
  const raysOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.34],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  // Supporting line glide in
  const supportingY = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    prefersReducedMotion ? [0, 0] : [28, 0]
  );
  const supportingOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.46],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      aria-label="Brand Statement: Born to Crunch"
      className={`relative w-full min-h-[90svh] lg:min-h-[96svh] bg-[#F2F0E6] flex flex-col items-center justify-center px-4 sm:px-8 py-20 sm:py-24 md:py-28 overflow-x-clip select-none ${className}`}
    >
      {/* Central Content Composition with Scroll Transforms */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Headline Staging Box with Radial Rays Perimeter */}
        <div className="relative inline-flex flex-col items-center justify-center px-6 sm:px-10 md:px-14 py-4 sm:py-6">

          {/* ======================================================== */}
          {/* Scroll-Driven Radiating Decorative Rays                  */}
          {/* ======================================================== */}
          <motion.div
            style={{
              scale: raysScale,
              rotate: raysRotate,
              opacity: raysOpacity,
            }}
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            {/* 1. Top Rays Cluster */}
            <div
              className="absolute -top-10 sm:-top-14 md:-top-16 left-1/2 -translate-x-1/2 w-[85%] max-w-[420px] h-11 sm:h-14 md:h-16 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 60" className="w-full h-full overflow-visible" fill="none" role="presentation">
                {TOP_RAYS.map((ray) => (
                  <line
                    key={ray.id}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                    stroke={BRAND_RED}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity={ray.opacity}
                  />
                ))}
              </svg>
            </div>

            {/* 2. Bottom Rays Cluster */}
            <div
              className="absolute -bottom-10 sm:-bottom-14 md:-bottom-16 left-1/2 -translate-x-1/2 w-[85%] max-w-[420px] h-11 sm:h-14 md:h-16 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 60" className="w-full h-full overflow-visible" fill="none" role="presentation">
                {BOTTOM_RAYS.map((ray) => (
                  <line
                    key={ray.id}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                    stroke={BRAND_RED}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity={ray.opacity}
                  />
                ))}
              </svg>
            </div>

            {/* 3. Left Rays Cluster */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-8 sm:-left-12 md:-left-16 w-10 sm:w-13 md:w-16 h-[80%] max-h-[220px] pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 60 220" className="w-full h-full overflow-visible" fill="none" role="presentation">
                {LEFT_RAYS.map((ray) => (
                  <line
                    key={ray.id}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                    stroke={BRAND_RED}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity={ray.opacity}
                  />
                ))}
              </svg>
            </div>

            {/* 4. Right Rays Cluster */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -right-8 sm:-right-12 md:-right-16 w-10 sm:w-13 md:w-16 h-[80%] max-h-[220px] pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 60 220" className="w-full h-full overflow-visible" fill="none" role="presentation">
                {RIGHT_RAYS.map((ray) => (
                  <line
                    key={ray.id}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                    stroke={BRAND_RED}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity={ray.opacity}
                  />
                ))}
              </svg>
            </div>

            {/* 5. Four Corner Burst Rays (hidden on narrow screens to prevent crowding) */}
            <div
              className="hidden sm:block absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-9 sm:w-12 h-9 sm:h-12 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible" fill="none" role="presentation">
                <line x1="44" y1="44" x2="8" y2="8" stroke={BRAND_RED} strokeWidth="3.2" strokeLinecap="round" opacity={0.75} />
              </svg>
            </div>

            <div
              className="hidden sm:block absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-9 sm:w-12 h-9 sm:h-12 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible" fill="none" role="presentation">
                <line x1="6" y1="44" x2="42" y2="8" stroke={BRAND_RED} strokeWidth="3.2" strokeLinecap="round" opacity={0.75} />
              </svg>
            </div>

            <div
              className="hidden sm:block absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-9 sm:w-12 h-9 sm:h-12 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible" fill="none" role="presentation">
                <line x1="44" y1="6" x2="8" y2="42" stroke={BRAND_RED} strokeWidth="3.2" strokeLinecap="round" opacity={0.75} />
              </svg>
            </div>

            <div
              className="hidden sm:block absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-9 sm:w-12 h-9 sm:h-12 pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible" fill="none" role="presentation">
                <line x1="6" y1="6" x2="42" y2="42" stroke={BRAND_RED} strokeWidth="3.2" strokeLinecap="round" opacity={0.75} />
              </svg>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* Scroll-Driven Bold Condensed Headline                    */}
          {/* ======================================================== */}
          <motion.h2
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              scale: headlineScale,
              y: headlineY,
              opacity: headlineOpacity,
            }}
            className="relative z-10 m-0 font-black uppercase text-center text-[#B72E32] tracking-tight leading-[0.85] font-[family-name:var(--font-bebas),var(--font-outfit),Impact,sans-serif]"
          >
            <span className="block">{headlineLine1}</span>
            <span className="block">{headlineLine2}</span>
          </motion.h2>
        </div>

        {/* Supporting Line with Scroll Glide */}
        <motion.p
          style={{
            y: supportingY,
            opacity: supportingOpacity,
          }}
          className="relative z-10 mt-6 sm:mt-8 md:mt-10 font-[family-name:var(--font-jakarta),sans-serif] text-xs sm:text-sm md:text-base font-semibold tracking-[0.24em] uppercase text-[#8C282B] max-w-xl mx-auto"
        >
          {supportingText}
        </motion.p>

      </div>
    </section>
  );
}
