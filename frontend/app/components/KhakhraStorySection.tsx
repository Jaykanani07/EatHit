"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Volume2,
  X,
  ExternalLink,
  Flame,
  CheckCircle2,
} from "lucide-react";

// ============================================================================
// 1. CENTRAL EDITABLE CONFIGURATION (as required by Section 5)
// ============================================================================
export interface KhakhraStoryConfig {
  introBadge: string;
  introHeadlineLine1: string;
  introHeadlineLine2: string;
  introDescription: string;
  ctaExplore: string;
  ctaStory: string;
  ctaFindStore: string;
  heroOutlineWord: string;
  heroFilledWord: string;
  finalCtaText: string;
  finalCtaSubtext: string;
}

export const KHAKHRA_STORY_CONFIG: KhakhraStoryConfig = {
  introBadge: "100% ROASTED ON TAWA",
  introHeadlineLine1: "GOOD THINGS TASTE EVEN BETTER TOGETHER.",
  introHeadlineLine2: "CRUNCH THAT BRINGS US TOGETHER.",
  introDescription:
    "From everyday chai breaks to sharing a bite with friends, Eat Hit brings a little Gujarati crunch to every moment.",
  ctaExplore: "EXPLORE FLAVOURS",
  ctaStory: "OUR STORY",
  ctaFindStore: "FIND A STORE",
  heroOutlineWord: "GUJARATI",
  heroFilledWord: "CRUNCH",
  finalCtaText: "SEE ALL FLAVOURS",
  finalCtaSubtext: "Find your kind of crunch.",
};

// ============================================================================
// 2. PRODUCT DATA & POSITIONS FOR THE COLLAGE COMPOSITION
// ============================================================================
export interface KhakhraProductItem {
  id: string;
  name: string;
  gujarati: string;
  tagline: string;
  description: string;
  image: string;
  pouchImage: string;
  color: string;
  spiceLevel: string;
  heat: number; // 0 to 3
  bestFor: string;
  weight: string;
  desktopLayout: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    rotation: number;
    zIndex: number;
  };
  mobileLayout: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    rotation: number;
    show: boolean;
  };
}

export const KHAKHRA_PRODUCTS: KhakhraProductItem[] = [
  {
    id: "masala",
    name: "Masala Khakhra",
    gujarati: "મસાલા ખાખરા",
    tagline: "Fiery Kashmiri Chili & Cumin",
    description:
      "Slow-roasted stone-ground whole wheat infused with hand-ground spices, Kashmiri chili, and roasted cumin.",
    image: "/images/products/masala-khakhra.png",
    pouchImage: "/images/products/masala-pouch.png",
    color: "#B72E32",
    spiceLevel: "Medium Spicy",
    heat: 3,
    bestFor: "Afternoon Chai & Masala Chai Breaks",
    weight: "200g (7.05 oz)",
    desktopLayout: {
      left: "-2%",
      top: "10%",
      width: "clamp(250px, 23vw, 410px)",
      rotation: -8,
      zIndex: 12,
    },
    mobileLayout: {
      left: "-14%",
      top: "1%",
      width: "140px",
      rotation: -10,
      show: true,
    },
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    gujarati: "મેથી ખાખરા",
    tagline: "Sun-Dried Fenugreek & Rock Salt",
    description:
      "Crisp fenugreek leaves harvested in Gujarat, folded with pure Himalayan rock salt for a deeply herbal savoriness.",
    image: "/images/products/methi-khakhra.png",
    pouchImage: "/images/products/methi-pouch.png",
    color: "#2E7D32",
    spiceLevel: "Mild Herbaceous",
    heat: 1,
    bestFor: "Morning Breakfast & Low-Sodium Snacking",
    weight: "200g (7.05 oz)",
    desktopLayout: {
      right: "-2%",
      top: "12%",
      width: "clamp(260px, 24vw, 430px)",
      rotation: 9,
      zIndex: 12,
    },
    mobileLayout: {
      right: "-14%",
      top: "2%",
      width: "140px",
      rotation: 8,
      show: true,
    },
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    gujarati: "જીરા ખાખરા",
    tagline: "Toasted Cumin Crunch",
    description:
      "Whole roasted cumin seeds folded into golden stone-ground wheat for earthy, comforting savoriness.",
    image: "/images/products/jeera-khakhra.png",
    pouchImage: "/images/products/jeera-pouch.png",
    color: "#D97706",
    spiceLevel: "Soothing & Mild",
    heat: 1,
    bestFor: "Tea-Time & Digestive Light Bite",
    weight: "200g (7.05 oz)",
    desktopLayout: {
      left: "4%",
      top: "50%",
      width: "clamp(210px, 19vw, 340px)",
      rotation: -5,
      zIndex: 11,
    },
    mobileLayout: {
      left: "-4%",
      top: "52%",
      width: "130px",
      rotation: -4,
      show: false, // hidden on mobile to avoid clutter
    },
  },
  {
    id: "lasan",
    name: "Lasan Khakhra",
    gujarati: "લસણ ખાખરા",
    tagline: "Roasted Garlic Punch",
    description:
      "Fresh garlic puree gently roasted on tawa into whole wheat dough for an unforgettable savory aroma.",
    image: "/images/products/lasan-khakhra.png",
    pouchImage: "/images/products/lasun-pouch.png",
    color: "#C2410C",
    spiceLevel: "Savory & Punchy",
    heat: 2,
    bestFor: "Evening Snacks & Party Nibbles",
    weight: "200g (7.05 oz)",
    desktopLayout: {
      right: "1%",
      bottom: "12%",
      width: "clamp(250px, 23vw, 400px)",
      rotation: -9,
      zIndex: 13,
    },
    mobileLayout: {
      right: "-12%",
      bottom: "2%",
      width: "150px",
      rotation: -8,
      show: true,
    },
  },
  {
    id: "plain",
    name: "Plain Khakhra",
    gujarati: "સાદા ખાખરા",
    tagline: "Golden Whole Wheat Classic",
    description:
      "The timeless heritage recipe: 100% whole wheat, cold-pressed oil, pure rock salt, roasted golden crisp.",
    image: "/images/products/plain-khakhra.png",
    pouchImage: "/images/products/plain-pouch.png",
    color: "#B45309",
    spiceLevel: "Classic Pure",
    heat: 0,
    bestFor: "Kids, Traditional Breakfast, Pickle Pairing",
    weight: "200g (7.05 oz)",
    desktopLayout: {
      left: "17%",
      bottom: "6%",
      width: "clamp(230px, 21vw, 360px)",
      rotation: 12,
      zIndex: 14,
    },
    mobileLayout: {
      left: "8%",
      bottom: "2%",
      width: "130px",
      rotation: 10,
      show: false, // clean 3-disc composition on mobile
    },
  },
];

// US Retail Stores database for store locator modal
export const US_RETAIL_STORES = [
  {
    chain: "Patel Brothers",
    location: "Edison, New Jersey",
    address: "1343 Oak Tree Rd, Edison, NJ 08820",
    phone: "(732) 906-8800",
    status: "Fully Stocked",
    allFlavors: true,
  },
  {
    chain: "Subzi Mandi Cash & Carry",
    location: "Parsippany, New Jersey",
    address: "260 N Beverwyck Rd, Parsippany, NJ 07054",
    phone: "(973) 263-8700",
    status: "Fully Stocked",
    allFlavors: true,
  },
  {
    chain: "Patel Brothers",
    location: "Jersey City, New Jersey",
    address: "774 Newark Ave, Jersey City, NJ 07306",
    phone: "(201) 659-1991",
    status: "Fresh Batch In Stock",
    allFlavors: true,
  },
  {
    chain: "Patel Brothers",
    location: "Jackson Heights, New York",
    address: "37-27 74th Street, Jackson Heights, NY 11372",
    phone: "(718) 898-3445",
    status: "Fully Stocked",
    allFlavors: true,
  },
  {
    chain: "Patel Brothers",
    location: "Devon Ave, Chicago, Illinois",
    address: "2610 W Devon Ave, Chicago, IL 60659",
    phone: "(773) 764-1857",
    status: "Fully Stocked",
    allFlavors: true,
  },
  {
    chain: "India Cash & Carry",
    location: "Sunnyvale, California",
    address: "1030 E El Camino Real, Sunnyvale, CA 94087",
    phone: "(408) 735-7300",
    status: "Fully Stocked",
    allFlavors: true,
  },
  {
    chain: "Patel Brothers",
    location: "Irving, Texas",
    address: "1001 W Airport Fwy, Irving, TX 75062",
    phone: "(972) 258-0050",
    status: "Fresh Batch In Stock",
    allFlavors: true,
  },
  {
    chain: "Apna Bazar Cash & Carry",
    location: "Hicksville, New York",
    address: "217 Bethpage Rd, Hicksville, NY 11801",
    phone: "(516) 931-1800",
    status: "Fully Stocked",
    allFlavors: true,
  },
];

// ============================================================================
// 3. HAND-DRAWN BESPOKE SVG ARROWS (Desktop only to prevent mobile clutter)
// ============================================================================

/**
 * Top-left hand-drawn arrow pointing down towards Masala khakhra,
 * complete with 3 radiating burst ticks above it (exact BAVET reference style).
 */
function BavetArrowTopLeft({ text }: { text: string }) {
  return (
    <div className="absolute top-[4%] left-[10%] sm:left-[14%] z-20 pointer-events-none select-none hidden md:flex flex-col items-center">
      {/* Hand-drawn label */}
      <span
        className="font-[family-name:var(--font-caveat),cursive] text-[#B72E32] text-xl sm:text-2xl font-bold tracking-wide -rotate-6 mb-1 filter drop-shadow-xs"
        style={{ transformOrigin: "center" }}
      >
        {text}
      </span>

      {/* Hand-drawn hollow arrow with burst marks */}
      <svg
        width="54"
        height="64"
        viewBox="0 0 54 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 sm:w-13 h-auto -rotate-6"
        aria-hidden="true"
      >
        <line
          x1="18"
          y1="4"
          x2="22"
          y2="12"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="27"
          y1="2"
          x2="27"
          y2="11"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="4"
          x2="32"
          y2="12"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <path
          d="M20 18 L34 18 L34 38 L44 38 L27 58 L10 38 L20 38 Z"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Below Methi khakhra arrow pointing up-right towards Methi,
 * placed safely below Methi and to the right of CRUNCH (exact BAVET layout).
 */
function BavetArrowRight({ text }: { text: string }) {
  return (
    <div className="absolute top-[46%] right-[16%] lg:right-[19%] z-20 pointer-events-none select-none hidden lg:flex flex-col items-center">
      <svg
        width="54"
        height="64"
        viewBox="0 0 54 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 sm:w-11 h-auto rotate-12"
        aria-hidden="true"
      >
        <path
          d="M20 46 L34 46 L34 26 L44 26 L27 6 L10 26 L20 26 Z"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="18"
          y1="60"
          x2="22"
          y2="52"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="27"
          y1="62"
          x2="27"
          y2="53"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="60"
          x2="32"
          y2="52"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      <span
        className="font-[family-name:var(--font-caveat),cursive] text-[#B72E32] text-xl sm:text-2xl font-bold tracking-wide rotate-3 mt-1 filter drop-shadow-xs whitespace-nowrap"
        style={{ transformOrigin: "center" }}
      >
        {text}
      </span>
    </div>
  );
}

/**
 * Bottom-left hand-drawn curved arrow pointing towards Plain / Lasan khakhra
 */
function BavetArrowBottom({ text }: { text: string }) {
  return (
    <div className="absolute bottom-[20%] left-[8%] sm:left-[14%] z-20 pointer-events-none select-none hidden md:flex flex-col items-start">
      <span
        className="font-[family-name:var(--font-caveat),cursive] text-[#B72E32] text-xl sm:text-2xl font-bold tracking-wide -rotate-4 mb-1 whitespace-nowrap"
        style={{ transformOrigin: "center" }}
      >
        {text}
      </span>
      <svg
        width="60"
        height="40"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-11 h-auto text-[#B72E32]"
        aria-hidden="true"
      >
        <path
          d="M8 8 C 22 28, 40 32, 52 24"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M44 18 L52 24 L48 32"
          stroke="#B72E32"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. MAIN KHAKHRA STORY SECTION COMPONENT (SECTION 3)
// ============================================================================
export interface KhakhraStorySectionProps {
  config?: Partial<KhakhraStoryConfig>;
  className?: string;
}

export default function KhakhraStorySection({
  config: customConfig,
  className = "",
}: KhakhraStorySectionProps) {
  const cfg = { ...KHAKHRA_STORY_CONFIG, ...customConfig };
  const prefersReducedMotion = useReducedMotion();

  // Selected product for flavor modal / drawer
  const [selectedProduct, setSelectedProduct] = useState<KhakhraProductItem | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<string>("all");

  // Synthesize genuine crisp crunch audio on click (zero-dependency Web Audio API)
  const playCrunchSound = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const bufferSize = audioCtx.sampleRate * 0.22;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (bufferSize * 0.2));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2600, audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.85, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch {
      // Audio fallback for restricted autoplay policies
    }
  }, []);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="khakhra-editorial-experience"
      className={`relative w-full bg-[#F2F0E6] text-[#2B1810] overflow-x-clip select-none transition-colors duration-500 ${className}`}
      style={{
        backgroundColor: "#F2F0E6",
      }}
      aria-label="Eat Hit Editorial Crunch Experience"
    >
      {/* ==================================================================== */}
      {/* STAGE A: THE INTRODUCTORY BRAND STATEMENT & CTA GROUP                 */}
      {/* ==================================================================== */}
      <div className="relative w-full pt-20 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* 1. Bavet Signature Top Radial Sunburst / Burst Motif */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-28 sm:w-36 h-12 sm:h-14 mb-3 sm:mb-5 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <svg viewBox="0 0 140 60" fill="none" className="w-full h-full text-[#B72E32]">
            {/* Symmetrical radiating dashed lines emanating upwards */}
            <line x1="20" y1="52" x2="35" y2="38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="38" y1="42" x2="48" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="56" y1="36" x2="62" y2="14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="70" y1="34" x2="70" y2="6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="84" y1="36" x2="78" y2="14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="102" y1="42" x2="92" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="120" y1="52" x2="105" y2="38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            {/* Subtle center dots */}
            <circle cx="50" cy="50" r="1.8" fill="currentColor" />
            <circle cx="70" cy="48" r="2.2" fill="currentColor" />
            <circle cx="90" cy="50" r="1.8" fill="currentColor" />
          </svg>
        </motion.div>

        {/* 2. Primary Headline (Condensed, Uppercase, Deep Red) */}
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 font-[family-name:var(--font-bebas),var(--font-outfit),Impact,sans-serif] text-[#B72E32] font-black uppercase text-center tracking-tight leading-[0.92] select-none text-[clamp(2.4rem,5.6vw,5.8rem)] max-w-5xl"
        >
          <span className="block">{cfg.introHeadlineLine1}</span>
          <span className="block mt-1 sm:mt-2 text-[#B72E32]">{cfg.introHeadlineLine2}</span>
        </motion.h2>

        {/* 3. Supporting Editorial Description */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="font-[family-name:var(--font-jakarta),sans-serif] text-[#4A3528] text-center font-bold uppercase tracking-wider text-xs sm:text-sm lg:text-[0.95rem] max-w-2xl mx-auto mt-6 sm:mt-8 leading-relaxed px-4"
        >
          {cfg.introDescription}
        </motion.p>

        {/* 4. Grouped 3-CTA Row (Exact BAVET pill container design with explicit IDs) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
          className="mt-8 sm:mt-10 flex items-center justify-center relative z-20 pointer-events-auto"
        >
          <div className="bg-[#B72E32] p-1.5 rounded-2xl sm:rounded-full inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 sm:gap-2 shadow-[0_10px_28px_rgba(183,46,50,0.28)] border border-[#9E262A]/50 pointer-events-auto">
            {/* CTA 1: Explore Flavours */}
            <button
              id="btn-explore-flavours"
              type="button"
              onClick={() => {
                scrollToId("stage-b-composition");
              }}
              className="px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-white/15 active:scale-95 transition-all duration-200 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/40 cursor-pointer pointer-events-auto"
              aria-label="Explore Eat Hit Flavours"
            >
              {cfg.ctaExplore}
            </button>

            {/* CTA 2: Our Story */}
            <button
              id="btn-our-story"
              type="button"
              onClick={() => setIsStoryModalOpen(true)}
              className="px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-white/15 active:scale-95 transition-all duration-200 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/40 cursor-pointer pointer-events-auto"
              aria-label="Read the Eat Hit Story"
            >
              {cfg.ctaStory}
            </button>

            {/* CTA 3: Find a Store */}
            <button
              id="btn-find-store"
              type="button"
              onClick={() => setIsStoreModalOpen(true)}
              className="px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-white/15 active:scale-95 transition-all duration-200 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/40 cursor-pointer pointer-events-auto flex items-center gap-1.5"
              aria-label="Find Patel Brothers and US Stores stocking Eat Hit"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{cfg.ctaFindStore}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* STAGE B: THE OVERSIZED WORDMARK & FLOATING FOOD COMPOSITION           */}
      {/* ==================================================================== */}
      <div
        id="stage-b-composition"
        className="relative w-full min-h-[740px] sm:min-h-[860px] lg:min-h-[960px] flex items-center justify-center overflow-hidden py-24 sm:py-32 lg:py-40"
      >
        {/* Hand-drawn arrow annotations (desktop only to prevent mobile clutter) */}
        <BavetArrowTopLeft text="THAT CRUNCH!" />
        <BavetArrowRight text="GO ON, PICK A FLAVOUR" />
        <BavetArrowBottom text="A LITTLE MORE CRUNCH" />

        {/* 1. Centerpiece Oversized Outlined & Filled Headline (BAVET COMBO Treatment) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center select-none pointer-events-none px-4 my-24 sm:my-0">
          {/* Top Line: OUTLINED UPPER WORD */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-bebas),var(--font-outfit),Impact,sans-serif] font-black uppercase tracking-tight text-transparent leading-[0.84] select-none text-[clamp(3.8rem,13vw,11.8rem)] text-outline-editorial"
            style={{
              WebkitTextStroke: "2.6px #B72E32",
              letterSpacing: "0.02em",
              willChange: "transform",
            }}
          >
            {cfg.heroOutlineWord}
          </motion.div>

          {/* Bottom Line: SOLID RED FILLED LOWER WORD */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-bebas),var(--font-outfit),Impact,sans-serif] font-black uppercase tracking-tight text-[#B72E32] leading-[0.84] select-none text-[clamp(3.8rem,13vw,11.8rem)] -mt-[0.06em]"
            style={{
              letterSpacing: "0.02em",
              willChange: "transform",
            }}
          >
            {cfg.heroFilledWord}
          </motion.div>
        </div>

        {/* 2. Floating Khakhra Discs Collage around the Central Headline */}
        {KHAKHRA_PRODUCTS.map((prod, index) => {
          const isHovered = hoveredProduct === prod.id;

          return (
            <motion.div
              key={prod.id}
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.75,
                      rotate: prod.desktopLayout.rotation - 10,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: prod.desktopLayout.rotation,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                delay: 0.12 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                top: prod.desktopLayout.top,
                bottom: prod.desktopLayout.bottom,
                left: prod.desktopLayout.left,
                right: prod.desktopLayout.right,
                width: prod.desktopLayout.width,
                zIndex: prod.desktopLayout.zIndex,
              }}
              className={`absolute cursor-pointer transition-transform duration-300 ${
                prod.mobileLayout.show ? "block" : "hidden md:block"
              }`}
              onMouseEnter={() => setHoveredProduct(prod.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => {
                playCrunchSound();
                setSelectedProduct(prod);
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${prod.name}`}
            >
              <div
                className="relative w-full aspect-square group transition-all duration-300 transform-gpu"
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 26px 36px rgba(74, 53, 40, 0.28))"
                    : "drop-shadow(0 16px 26px rgba(74, 53, 40, 0.16))",
                  transform: isHovered ? "scale(1.06) translateY(-6px)" : "scale(1)",
                }}
              >
                {/* Real High-Resolution Transparent Khakhra Product Asset */}
                <Image
                  src={prod.image}
                  alt={`${prod.name} - Authentic Gujarati Khakhra`}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1200px) 350px, 440px"
                  className="object-contain pointer-events-none select-none transition-transform duration-500 group-hover:rotate-6"
                  priority={index < 2}
                />

                {/* Interactive Tooltip Pill on Hover */}
                <div
                  className={`absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#2B1810]/10 flex items-center gap-2 pointer-events-none transition-all duration-200 z-30 ${
                    isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: prod.color }}
                  />
                  <span className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-[#2B1810]">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-[#B72E32] font-bold">
                    {prod.gujarati}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* STAGE C: FINAL MENU CTA & SEAMLESS TRANSITION                         */}
      {/* ==================================================================== */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full flex flex-col items-center justify-center text-center pt-4 pb-20 sm:pb-28 px-4"
      >
        {/* Center Pill Button: SEE ALL FLAVOURS with arrow (exact BAVET Menu CTA) */}
        <button
          id="btn-see-all-flavours"
          type="button"
          onClick={() => {
            playCrunchSound();
            setSelectedProduct(KHAKHRA_PRODUCTS[0]);
          }}
          className="group relative inline-flex items-center gap-3.5 bg-[#B72E32] text-white hover:bg-[#9E262A] px-8 sm:px-11 py-4 sm:py-4.5 rounded-full text-sm sm:text-base font-black tracking-widest uppercase transition-all duration-300 shadow-[0_12px_32px_rgba(183,46,50,0.35)] hover:shadow-[0_16px_40px_rgba(183,46,50,0.48)] hover:scale-105 active:scale-98 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#B72E32]/30 pointer-events-auto"
          aria-label="See all Eat Hit flavours"
        >
          <span className="font-[family-name:var(--font-outfit),var(--font-jakarta),sans-serif] tracking-[0.14em]">
            {cfg.finalCtaText}
          </span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.6}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Supporting Microcopy */}
        <span className="mt-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#6B5E52] italic font-[family-name:var(--font-jakarta),sans-serif]">
          {cfg.finalCtaSubtext}
        </span>
      </motion.div>

      {/* ==================================================================== */}
      {/* 5. INTERACTIVE FLAVOR DETAIL MODAL (z-[100] top layer)               */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            id="flavor-detail-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="flavor-modal-title"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#2B1810]/15 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                id="close-flavor-modal"
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F2F0E6] hover:bg-[#E5E0D5] text-[#2B1810] flex items-center justify-center transition-colors z-20 cursor-pointer pointer-events-auto"
                aria-label="Close flavor details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Flavor Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Product Visual Presentation */}
                <div className="relative aspect-square flex items-center justify-center p-4">
                  <div
                    className="absolute inset-4 rounded-full blur-2xl opacity-30"
                    style={{ backgroundColor: selectedProduct.color }}
                  />
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="320px"
                    className="object-contain relative z-10 transition-transform hover:scale-105 duration-300"
                  />
                </div>

                {/* Flavor Information */}
                <div className="flex flex-col text-left">
                  <span
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: selectedProduct.color }}
                  >
                    {selectedProduct.gujarati} • {selectedProduct.weight}
                  </span>

                  <h3
                    id="flavor-modal-title"
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)] mt-1"
                  >
                    {selectedProduct.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#B72E32] mt-0.5">
                    {selectedProduct.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#4A3528] mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Meta Highlights */}
                  <div className="mt-4 pt-4 border-t border-[#2B1810]/10 flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5E52] font-semibold">Spice Level:</span>
                      <span className="font-bold text-[#19120D] flex items-center gap-1">
                        {selectedProduct.spiceLevel}
                        {Array.from({ length: selectedProduct.heat }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
                        ))}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5E52] font-semibold">Best Paired With:</span>
                      <span className="font-bold text-[#19120D]">{selectedProduct.bestFor}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5E52] font-semibold">Baking Standard:</span>
                      <span className="font-bold text-[#2E7D32]">100% Roasted on Tawa</span>
                    </div>
                  </div>

                  {/* Crunch audio trigger button */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={playCrunchSound}
                      className="flex-1 bg-[#19120D] hover:bg-[#2B1810] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-md pointer-events-auto"
                    >
                      <Volume2 className="w-4 h-4 text-[#EAB308]" />
                      <span>Hear The Crunch</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(null);
                        setIsStoreModalOpen(true);
                      }}
                      className="bg-[#B72E32] hover:bg-[#9E262A] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md pointer-events-auto"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Find In US</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 6. STORE LOCATOR MODAL (Patel Brothers, Subzi Mandi, US Grocery)     */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isStoreModalOpen && (
          <div
            id="store-locator-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            onClick={() => setIsStoreModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#2B1810]/15 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2B1810]/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#B72E32]">
                      NOW AVAILABLE ACROSS 250+ US STORES
                    </span>
                  </div>
                  <h3
                    id="store-modal-title"
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)] mt-1"
                  >
                    Find Eat Hit In Your Neighborhood
                  </h3>
                </div>

                <button
                  id="close-store-modal"
                  type="button"
                  onClick={() => setIsStoreModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#F2F0E6] hover:bg-[#E5E0D5] text-[#2B1810] flex items-center justify-center transition-colors cursor-pointer shrink-0 pointer-events-auto"
                  aria-label="Close store locator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick State Filter Tabs */}
              <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-[#2B1810]/10 text-xs font-bold uppercase tracking-wider">
                {["all", "New Jersey", "New York", "Illinois", "California", "Texas"].map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => setActiveTabFilter(state)}
                    className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer pointer-events-auto ${
                      activeTabFilter === state
                        ? "bg-[#B72E32] text-white"
                        : "bg-[#F2F0E6] text-[#4A3528] hover:bg-[#E8E2D6]"
                    }`}
                  >
                    {state === "all" ? "All Locations" : state}
                  </button>
                ))}
              </div>

              {/* Stores List */}
              <div className="overflow-y-auto py-4 flex flex-col gap-3 pr-1">
                {US_RETAIL_STORES.filter((store) =>
                  activeTabFilter === "all" ? true : store.location.includes(activeTabFilter)
                ).map((store, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-2xl border border-[#2B1810]/10 hover:border-[#B72E32]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#19120D] uppercase font-[family-name:var(--font-outfit)]">
                          {store.chain}
                        </span>
                        <span className="text-[10px] bg-[#15803D]/10 text-[#15803D] font-bold px-2 py-0.5 rounded-full">
                          {store.status}
                        </span>
                      </div>
                      <span className="text-xs text-[#4A3528] font-medium mt-0.5">
                        {store.address}
                      </span>
                      <span className="text-xs text-[#6B5E52] mt-0.5">
                        Tel: {store.phone}
                      </span>
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${store.chain} ${store.address}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#B72E32] hover:text-[#9E262A] self-start sm:self-center bg-[#F2F0E6] px-3.5 py-2 rounded-xl transition-colors cursor-pointer pointer-events-auto"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Store Locator Footer Info */}
              <div className="pt-3 border-t border-[#2B1810]/10 flex items-center justify-between text-xs text-[#6B5E52]">
                <span>Look for Eat Hit in the Indian snack & tea aisle.</span>
                <span className="font-bold text-[#19120D] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> 100% Roasted Goodness
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 7. OUR STORY HERITAGE MODAL (z-[100] top layer)                      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div
            id="our-story-modal"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            onClick={() => setIsStoryModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#2B1810]/15 shadow-2xl max-h-[90vh] overflow-y-auto text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="close-story-modal"
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F2F0E6] hover:bg-[#E5E0D5] text-[#2B1810] flex items-center justify-center transition-colors cursor-pointer shrink-0 pointer-events-auto"
                aria-label="Close story modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-black uppercase tracking-widest text-[#B72E32]">
                HERITAGE OF GUJARAT
              </span>
              <h3
                id="story-modal-title"
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)] mt-1"
              >
                Born On The Tawa. Never Deep Fried.
              </h3>

              <div className="mt-4 flex flex-col gap-4 text-xs sm:text-sm text-[#4A3528] leading-relaxed">
                <p>
                  In Gujarati homes, khakhra is not just a snack — it is an art of patience.
                  Rolled wafer-thin from stone-ground whole wheat dough, each khakhra is slowly pressed
                  by hand against a traditional hot concave iron tawa using a wooden press (bavni).
                </p>
                <p>
                  Unlike modern deep-fried potato chips or fried crackers that soak up excessive oil,
                  Eat Hit khakhras are <strong>100% roasted</strong> until they achieve that unmistakable,
                  delicate snap that makes chai breaks unforgettable.
                </p>
                <p>
                  Today, Eat Hit Lite brings that authentic kitchen heritage straight to diaspora homes
                  across North America, vacuum-sealed for fresh crispness from the first bite to the last.
                </p>
              </div>

              {/* Three Pillar Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#2B1810]/10">
                <div className="bg-white p-3.5 rounded-xl border border-[#2B1810]/10 text-center">
                  <span className="font-black text-sm text-[#B72E32] block">100% ROASTED</span>
                  <span className="text-[11px] text-[#6B5E52] mt-0.5 block">Zero deep frying oil</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#2B1810]/10 text-center">
                  <span className="font-black text-sm text-[#2E7D32] block">WHOLE WHEAT</span>
                  <span className="text-[11px] text-[#6B5E52] mt-0.5 block">Pure stone-ground atta</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#2B1810]/10 text-center">
                  <span className="font-black text-sm text-[#D97706] block">ROCK SALT</span>
                  <span className="text-[11px] text-[#6B5E52] mt-0.5 block">Authentic masalas</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
