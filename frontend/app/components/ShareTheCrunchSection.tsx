"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import BavetWaveText from "./BavetWaveText";

// ============================================================================
// 1. APPROVED FLAVOUR PLATES & EDITORIAL CONTENT
// ============================================================================

export interface FlavourPlateItem {
  id: string;
  num: string;
  name: string;
  gujarati: string;
  title: string; // Exact approved heading
  desc: string; // Exact approved description
  image: string;
  alt: string;
  tag: string;
  accent: string;
  spiceLevel: number;
  bestFor: string;
}

export const FLAVOUR_PLATES: FlavourPlateItem[] = [
  {
    id: "masala",
    num: "01",
    name: "Masala Khakhra",
    gujarati: "મસાલા ખાખરા",
    title: "THE SPICY CRUNCH",
    desc: "Big spice. Bigger crunch.",
    image: "/images/story-plates/masala-plate.png",
    alt: "Masala Khakhra on ceramic plate — The Spicy Crunch",
    tag: "SPICY & BOLD",
    accent: "#C33130",
    spiceLevel: 3,
    bestFor: "Afternoon Chai & Masala Chai Breaks",
  },
  {
    id: "methi",
    num: "02",
    name: "Methi Khakhra",
    gujarati: "મેથી ખાખરા",
    title: "THE HERBAL CRUNCH",
    desc: "Earthy, herby and unmistakably Gujarati.",
    image: "/images/story-plates/methi-plate.png",
    alt: "Methi Khakhra on ceramic plate — The Herbal Crunch",
    tag: "HERBAL CLASSIC",
    accent: "#2E7D32",
    spiceLevel: 1,
    bestFor: "Morning Breakfast & Light Snacking",
  },
  {
    id: "jeera",
    num: "03",
    name: "Jeera Khakhra",
    gujarati: "જીરા ખાખરા",
    title: "THE AROMATIC CRUNCH",
    desc: "A little cumin. A lot of character.",
    image: "/images/story-plates/jeera-plate.png",
    alt: "Jeera Khakhra on ceramic plate — The Aromatic Crunch",
    tag: "TOASTED CUMIN",
    accent: "#D97706",
    spiceLevel: 1,
    bestFor: "Digestive Bite & Evening Tea",
  },
  {
    id: "lasan",
    num: "04",
    name: "Lasan Khakhra",
    gujarati: "લસણ ખાખરા",
    title: "THE GARLIC CRUNCH",
    desc: "A bold garlic hit in every bite.",
    image: "/images/story-plates/lasan-plate.png",
    alt: "Lasan Khakhra on ceramic plate — The Garlic Crunch",
    tag: "ROASTED GARLIC",
    accent: "#C2410C",
    spiceLevel: 2,
    bestFor: "Party Nibbles & Savory Cravings",
  },
  {
    id: "plain",
    num: "05",
    name: "Plain Khakhra",
    gujarati: "સાદા ખાખરા",
    title: "THE CLASSIC",
    desc: "Pure, simple and timeless.",
    image: "/images/story-plates/plain-plate.png",
    alt: "Plain Khakhra on ceramic plate — The Classic",
    tag: "TIMELESS HERITAGE",
    accent: "#8C4A28",
    spiceLevel: 0,
    bestFor: "Pickle Pairing & All-Day Snacking",
  },
];

// ============================================================================
// 2. MAIN SECTION COMPONENT: SHARE THE CRUNCH SECTION (SECTION 3)
// ============================================================================

export default function ShareTheCrunchSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Screen size detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredPlateIndex, setHoveredPlateIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Shared normalized scroll progress driving all 3 stages and 5 plates
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ==========================================================================
  // STAGE 1: INTRODUCTORY HEADLINE (Progress 0.0 -> 0.22)
  // Displayed at start; fades out completely before Stage 2
  // ==========================================================================
  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 0.75, 0]);
  const introY = useTransform(
    scrollYProgress,
    [0, 0.20],
    prefersReducedMotion ? [0, 0] : [0, -90]
  );
  const introScale = useTransform(
    scrollYProgress,
    [0, 0.20],
    prefersReducedMotion ? [1, 1] : [1, 0.94]
  );
  const introDisplay = useTransform(scrollYProgress, (v) => (v < 0.22 ? "flex" : "none"));

  // ==========================================================================
  // STAGE 2: CENTRAL EDITORIAL HEADLINE (Progress 0.20 -> 0.78)
  // Outlined "THE ULTIMATE" + Solid "CRUNCH"
  // Cleanly hidden during Stage 1 (< 0.18) and Stage 3 (> 0.82)
  // ==========================================================================
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.72, 0.80],
    [0, 1, 1, 0]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.72, 0.80],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.88, 1, 1, 1.05]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.72, 0.80],
    prefersReducedMotion ? ["-4.5vh", "-4.5vh", "-4.5vh", "-4.5vh"] : ["-1vh", "-4.5vh", "-4.5vh", "-4.5vh"]
  );
  const headlineDisplay = useTransform(scrollYProgress, (v) =>
    v >= 0.18 && v <= 0.82 ? "flex" : "none"
  );

  // ==========================================================================
  // STAGE 3: FINAL FLAVOUR CTA (Progress 0.76 -> 1.0)
  // FIND YOUR CRUNCH. / SEE ALL FLAVOURS →
  // Cleanly hidden until scroll reaches 0.74
  // ==========================================================================
  const ctaOpacity = useTransform(scrollYProgress, [0.76, 0.84, 1.0], [0, 1, 1]);
  const ctaScale = useTransform(
    scrollYProgress,
    [0.76, 0.84, 1.0],
    prefersReducedMotion ? [1, 1, 1] : [0.92, 1, 1]
  );
  const ctaY = useTransform(
    scrollYProgress,
    [0.76, 0.84, 1.0],
    prefersReducedMotion ? ["-4.5vh", "-4.5vh", "-4.5vh"] : ["-1vh", "-4.5vh", "-4.5vh"]
  );
  const ctaDisplay = useTransform(scrollYProgress, (v) => (v >= 0.74 ? "flex" : "none"));

  // ==========================================================================
  // 5 PLATES CHOREOGRAPHY: CURVED SCROLL PATHS & INDEPENDENT ROTATION
  // Reverses seamlessly when scrolling backwards. Stops when scroll stops.
  // ==========================================================================

  // Plate 1: Masala Khakhra (Top-Left)
  const plate1X = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["-34vw", "-28vw", "-24vw", "-26vw", "-32vw"]
      : isTablet
        ? ["-38vw", "-32vw", "-28vw", "-30vw", "-36vw"]
        : ["-45vw", "-37vw", "-32vw", "-35vw", "-41vw"]
  );
  const plate1Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["-16vh", "-26vh", "-22vh", "-26vh", "-28vh"]
      : ["-12vh", "-25vh", "-21vh", "-26vh", "-29vh"]
  );
  const plate1Rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : isMobile ? [-14, -6, 4, 12, 18] : [-24, -10, 8, 22, 34]
  );
  const plate1Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.85, 0.98, 1.05, 1.0, 0.9]
  );
  const plate1Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.85, 1, 1, 1, 0.8]
  );

  // Plate 2: Methi Khakhra (Top-Right)
  const plate2X = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["36vw", "30vw", "26vw", "29vw", "35vw"]
      : isTablet
        ? ["40vw", "34vw", "30vw", "33vw", "38vw"]
        : ["46vw", "37vw", "32vw", "36vw", "42vw"]
  );
  const plate2Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["-27vh", "-26vh", "-23vh", "-25vh", "-28vh"]
      : ["-31vh", "-28vh", "-25vh", "-27vh", "-29vh"]
  );
  const plate2Rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : isMobile ? [16, 8, -4, -10, -18] : [30, 14, -8, -20, -32]
  );
  const plate2Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.78, 0.96, 1.04, 0.98, 0.88]
  );
  const plate2Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.45, 1, 1, 1, 0.8]
  );

  // Plate 3: Jeera Khakhra (Mid/Far-Right)
  const plate3X = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["38vw", "32vw", "28vw", "28vw", "33vw"]
      : isTablet
        ? ["42vw", "37vw", "33vw", "32vw", "37vw"]
        : ["48vw", "40vw", "36vw", "35vw", "40vw"]
  );
  const plate3Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["13vh", "14vh", "17vh", "21vh", "22vh"]
      : ["15vh", "16vh", "20vh", "25vh", "22vh"]
  );
  const plate3Rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : isMobile ? [-10, 2, 10, 18, 24] : [-16, 2, 18, 32, 44]
  );
  const plate3Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.8, 0.95, 1.02, 0.98, 0.9]
  );
  const plate3Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.65, 1, 1, 1, 0.8]
  );

  // Plate 4: Lasan Khakhra (Bottom-Center / Lower-Right)
  // Glides smoothly up from 42vh to 26vh as user scrolls to the bottom
  const plate4X = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["10vw", "6vw", "2vw", "-2vw", "0vw"]
      : isTablet
        ? ["10vw", "6vw", "3vw", "-2vw", "0vw"]
        : ["12vw", "8vw", "4vw", "-2vw", "0vw"]
  );
  const plate4Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["46vh", "42vh", "38vh", "40vh", "26vh"]
      : ["52vh", "46vh", "40vh", "42vh", "26vh"]
  );
  const plate4Rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : isMobile ? [12, 4, -6, -14, -20] : [20, 8, -10, -22, -34]
  );
  const plate4Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.72, 0.94, 1.04, 0.98, 0.9]
  );
  const plate4Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.4, 1, 1, 1, 0.85]
  );

  // Plate 5: Plain Khakhra (Bottom-Left)
  const plate5X = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["-36vw", "-30vw", "-26vw", "-24vw", "-30vw"]
      : isTablet
        ? ["-40vw", "-34vw", "-29vw", "-27vw", "-34vw"]
        : ["-45vw", "-37vw", "-32vw", "-30vw", "-37vw"]
  );
  const plate5Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile
      ? ["26vh", "20vh", "16vh", "22vh", "22vh"]
      : ["30vh", "22vh", "17vh", "25vh", "22vh"]
  );
  const plate5Rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : isMobile ? [-12, -2, 8, 16, 22] : [-18, -4, 14, 26, 38]
  );
  const plate5Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.78, 0.94, 1.02, 0.98, 0.88]
  );
  const plate5Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.5, 1, 1, 1, 0.85]
  );

  const plateTransforms = [
    { x: plate1X, y: plate1Y, rotate: plate1Rotate, scale: plate1Scale, opacity: plate1Opacity },
    { x: plate2X, y: plate2Y, rotate: plate2Rotate, scale: plate2Scale, opacity: plate2Opacity },
    { x: plate3X, y: plate3Y, rotate: plate3Rotate, scale: plate3Scale, opacity: plate3Opacity },
    { x: plate4X, y: plate4Y, rotate: plate4Rotate, scale: plate4Scale, opacity: plate4Opacity },
    { x: plate5X, y: plate5Y, rotate: plate5Rotate, scale: plate5Scale, opacity: plate5Opacity },
  ];

  return (
    <section
      ref={containerRef}
      id="share-the-crunch"
      aria-label="Chai in one hand, Khakhra in the other. That's the Eat Hit way."
      className="relative w-full bg-[#F2F0E6] overflow-x-clip select-none h-[420svh] md:h-[480svh]"
    >
      {/* ==================================================================== */}
      {/* STICKY 100svh INNER STAGE                                            */}
      {/* ==================================================================== */}
      <div className="sticky top-0 h-[100svh] w-full overflow-x-clip flex flex-col items-center justify-center pointer-events-auto">
        {/* Subtle authentic paper grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#19120D 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* ================================================================== */}
        {/* STAGE 1: INTRODUCTORY HEADLINE & COPY (Scrolls up & fades cleanly) */}
        {/* ================================================================== */}
        <motion.div
          style={{
            y: introY,
            opacity: introOpacity,
            scale: introScale,
            display: introDisplay,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-25 px-4 max-w-5xl mx-auto pointer-events-none select-none"
        >
          {/* Subtle top radiating burst motif matching Bavet */}
          <div className="w-12 h-6 sm:w-14 sm:h-7 mb-3 pointer-events-none flex items-center justify-center text-[#C33130]">
            <svg viewBox="0 0 40 22" fill="none" className="w-full h-full">
              <line x1="10" y1="20" x2="16" y2="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="30" y1="20" x2="24" y2="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Introductory headline with Krisha typography and authentic border line text on line 2 */}
          <h2 className="text-[clamp(2.5rem,7vw,6.8rem)] font-['Krisha',var(--font-bebas),Impact,sans-serif] uppercase tracking-tight leading-[0.88] text-center m-0 font-normal">
            <span className="block text-[#C33130]">CHAI IN ONE HAND,</span>
            <span className="block mt-1 sm:mt-2 bavet-outline-text">
              KHAKHRA IN THE OTHER.
            </span>
            <span className="block mt-1 sm:mt-2 text-[#C33130]">THAT&apos;S THE EAT HIT WAY.</span>
          </h2>
        </motion.div>

        {/* ================================================================== */}
        {/* STAGE 2: CENTRAL SINE-WAVE BANNER HEADLINE (BAVET FLAG RIPPLE)     */}
        {/* Continuous real-time wave distortion on hollow + solid canvas text */}
        {/* ================================================================== */}
        <motion.div
          style={{
            y: headlineY,
            opacity: headlineOpacity,
            scale: headlineScale,
            display: headlineDisplay,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-15 px-4 pointer-events-none select-none"
        >
          <BavetWaveText
            line1="THE ULTIMATE"
            line2="CRUNCH"
            className="w-full max-w-[1240px]"
          />
        </motion.div>

        {/* ================================================================== */}
        {/* STAGE 3: THE 5 REAL KHAKHRA PLATES                                 */}
        {/* Scroll-choreographed floating plates with interactive rotate & scale on hover/hold */}
        {/* ================================================================== */}
        {FLAVOUR_PLATES.map((plate, index) => {
          const transforms = plateTransforms[index];
          const isHovered = hoveredPlateIndex === index;

          return (
            <motion.div
              key={plate.id}
              id={`plate-${plate.id}`}
              style={{
                x: transforms.x,
                y: transforms.y,
                scale: transforms.scale,
                opacity: transforms.opacity,
              }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto select-none ${
                isHovered ? "z-[35]" : "z-[20]"
              }`}
              onMouseEnter={() => setHoveredPlateIndex(index)}
              onMouseLeave={() => setHoveredPlateIndex(null)}
              onClick={() =>
                setHoveredPlateIndex(hoveredPlateIndex === index ? null : index)
              }
            >
              {/* Outer Plate Graphic: Rotates with scroll path */}
              <motion.div
                style={{
                  rotate: transforms.rotate,
                  width: "clamp(230px, 24vw, 390px)",
                  height: "clamp(230px, 24vw, 390px)",
                }}
                className="relative block rounded-full select-none"
              >
                {/* Inner Plate Graphic: Interactive 90-degree rotate & 1.15x scale spring on hover/hold (Same as Bavet dishes) */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 90 : 0,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 1.18,
                    rotate: 105,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    mass: 0.8,
                  }}
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 25px 35px rgba(74, 45, 35, 0.32))"
                      : "drop-shadow(0 14px 24px rgba(74, 45, 35, 0.16))",
                  }}
                  className="relative w-full h-full rounded-full cursor-pointer transition-shadow duration-300"
                >
                  {/* 100% Real Photographic Khakhra on Plate Asset (Clean transparent PNG) */}
                  <Image
                    src={plate.image}
                    alt={plate.alt}
                    fill
                    sizes="(max-width: 768px) 190px, (max-width: 1200px) 290px, 360px"
                    className="object-contain pointer-events-none select-none transition-all duration-300"
                    priority={index < 3}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ================================================================== */}
        {/* STAGE 4: FINAL FLAVOUR CTA (FIND YOUR CRUNCH.)                     */}
        {/* ================================================================== */}
        <motion.div
          style={{
            y: ctaY,
            opacity: ctaOpacity,
            scale: ctaScale,
            display: ctaDisplay,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 select-none pointer-events-none"
        >
          {/* Exact approved final CTA headline centered optically & vertically */}
          <h3 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] uppercase text-[#C33130] tracking-tight leading-none text-[clamp(3.8rem,9.5vw,9.5rem)] m-0 font-normal select-none">
            FIND YOUR CRUNCH
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
