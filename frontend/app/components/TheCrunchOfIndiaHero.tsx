"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Wheat,
  Flame,
  Ban,
  ChevronDown,
} from "lucide-react";

interface FlavorItem {
  id: string;
  name: string;
  packetImg: string;
  discImg: string;
  color: string;
  glowColor: string;
  floatingIngredient: string;
  ingredientName: string;
}

const FLAVORS: FlavorItem[] = [
  {
    id: "plain",
    name: "Plain Khakhra",
    packetImg: "/images/products/plain-pouch.png",
    discImg: "/images/products/plain-khakhra.png",
    color: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.22)",
    floatingIngredient: "🌾",
    ingredientName: "Golden Wheat",
  },
  {
    id: "masala",
    name: "Masala Khakhra",
    packetImg: "/images/products/masala-pouch.png",
    discImg: "/images/products/masala-khakhra.png",
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.22)",
    floatingIngredient: "🌶️",
    ingredientName: "Kashmiri Chili",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    packetImg: "/images/products/methi-pouch.png",
    discImg: "/images/products/methi-khakhra.png",
    color: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.22)",
    floatingIngredient: "🌿",
    ingredientName: "Kasuri Methi",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    packetImg: "/images/products/jeera-pouch.png",
    discImg: "/images/products/jeera-khakhra.png",
    color: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.22)",
    floatingIngredient: "✨",
    ingredientName: "Roasted Cumin",
  },
  {
    id: "lasun",
    name: "Lasun Khakhra",
    packetImg: "/images/products/lasun-pouch.png",
    discImg: "/images/products/lasan-khakhra.png",
    color: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.22)",
    floatingIngredient: "🧄",
    ingredientName: "Roasted Garlic",
  },
];

const EASING = [0.22, 1, 0.36, 1] as const;

export default function TheCrunchOfIndiaHero() {
  const [currentIndex, setCurrentIndex] = useState(0); // 0 = Plain (center as in mockup)
  const [direction, setDirection] = useState<number>(1); // 1 = right-to-left, -1 = left-to-right
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelLockRef = useRef(false);

  // Preload all assets on mount
  useEffect(() => {
    FLAVORS.forEach((f) => {
      const img1 = new window.Image();
      img1.src = f.packetImg;
      const img2 = new window.Image();
      img2.src = f.discImg;
    });
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FLAVORS.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? FLAVORS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  // Desktop wheel scroll advances carousel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) > 35) {
        wheelLockRef.current = true;
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 750);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goToNext, goToPrev]);

  const activeFlavor = FLAVORS[currentIndex];

  const getItemAtOffset = (offset: number) => {
    const idx = (currentIndex + offset + FLAVORS.length * 2) % FLAVORS.length;
    return FLAVORS[idx];
  };

  // Rolling Khakhra Disc Animation Variants
  const rollingDiscVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 240 : -240,
      rotate: dir > 0 ? 280 : -280,
      scale: 0.85,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { duration: 0.82, ease: EASING },
        rotate: { duration: 0.85, ease: EASING },
        scale: { duration: 0.8, ease: EASING },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -240 : 240,
      rotate: dir > 0 ? -280 : 280,
      scale: 0.85,
      opacity: 0,
      transition: {
        x: { duration: 0.82, ease: EASING },
        rotate: { duration: 0.85, ease: EASING },
        scale: { duration: 0.8, ease: EASING },
        opacity: { duration: 0.4 },
      },
    }),
  };

  // Packet Animation: Smooth Bottom-to-Top Fade-In (User spec)
  const packetVariants: Variants = {
    enter: (dir: number) => ({
      y: 75, // Enters upward from bottom to top
      x: dir > 0 ? 30 : -30,
      scale: 0.94,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        y: { duration: 0.75, ease: EASING },
        x: { duration: 0.75, ease: EASING },
        scale: { duration: 0.75, ease: EASING },
        opacity: { duration: 0.6 },
        filter: { duration: 0.45 },
      },
    },
    exit: (dir: number) => ({
      y: -40, // Smoothly glides up and fades out
      x: dir > 0 ? -30 : 30,
      scale: 0.94,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        y: { duration: 0.55, ease: EASING },
        x: { duration: 0.55, ease: EASING },
        scale: { duration: 0.55, ease: EASING },
        opacity: { duration: 0.4 },
        filter: { duration: 0.35 },
      },
    }),
  };

  return (
    <section className="relative w-full h-full max-h-screen flex flex-col justify-between overflow-hidden text-[#2B1810] select-none py-1.5 sm:py-3 px-3 sm:px-8">
      {/* ========================================================= */}
      {/* 1. LUXURY EDITORIAL FOOD STUDIO BACKDROP */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-luxury-desert-bg.jpg"
          alt="Luxury desert food studio backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.03] contrast-[1.01]"
        />
        {/* Soft Golden Sunlight & Top/Bottom Vignette Blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4EC]/80 via-transparent to-[#EAE0D2]/55 pointer-events-none" />
        {/* Dynamic Flavor Halo Glow behind Active Product */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 50% 55%, ${activeFlavor.glowColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* 2. SLANTED KINETIC BACKGROUND SCROLLING MARQUEE (USER SPEC) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-1 flex items-center justify-center">
        <div
          className="w-[145vw] -rotate-[6deg] flex flex-col gap-6 sm:gap-10 opacity-[0.14] transition-colors duration-700"
          style={{ color: activeFlavor.color }}
        >
          {/* Row 1: Solid Fill (Moving Left) */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none text-[#2B1810]">
              EATHIT LITE • THE CRUNCH OF INDIA • 100% BAKED NOT FRIED • GUJARATI KHAKHRA •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none text-[#2B1810]">
              EATHIT LITE • THE CRUNCH OF INDIA • 100% BAKED NOT FRIED • GUJARATI KHAKHRA •
            </span>
          </div>

          {/* Row 2: Hollow Outline Stroke (Moving Right) */}
          <div className="animate-marquee-right whitespace-nowrap flex items-center gap-8 text-outline-brand-thick">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              AVAILABLE AT PATEL BROTHERS • SUBZI MANDI • APNA BAZAR • 250+ US STORES •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              AVAILABLE AT PATEL BROTHERS • SUBZI MANDI • APNA BAZAR • 250+ US STORES •
            </span>
          </div>

          {/* Row 3: Solid Fill (Moving Left) */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none text-[#2B1810]">
              AUTHENTIC TASTE • ZERO TRANS FAT • WHOLE WHEAT • EVERYDAY GOODNESS •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none text-[#2B1810]">
              AUTHENTIC TASTE • ZERO TRANS FAT • WHOLE WHEAT • EVERYDAY GOODNESS •
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TOP NAVIGATION BAR (CENTERED WITH BALANCED SIDES) */}
      {/* ========================================================= */}
      <header className="relative z-30 w-full pt-1.5 px-4 sm:px-10 max-w-7xl mx-auto flex items-center justify-between shrink-0">
        {/* Left: Official EatHit Brand Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 group" aria-label="EatHit Home">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-md border-2 border-[#EAB308]/70 group-hover:scale-105 transition-transform bg-[#105E34]">
              <Image
                src="/810319879_18115925035810617_1916739058068536558_n.jpg"
                alt="EatHit Official Logo"
                fill
                priority
                sizes="(max-width: 768px) 48px, 56px"
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Center: Main Navigation Menu (Centered) */}
        <nav className="hidden md:flex items-center justify-center gap-9 text-xs sm:text-sm font-semibold text-[#2B1810]">
          <Link
            href="/"
            className="relative py-1 text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#A82810]"
          >
            Home
          </Link>
          <Link href="#products" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Products
          </Link>
          <Link href="#store-locator" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Find a Store
          </Link>
          <Link href="#contact" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Invisible Balance Spacer for Perfect Centering */}
        <div className="flex-1 hidden md:flex items-center justify-end" />
      </header>

      {/* ========================================================= */}
      {/* 4. HERO HEADLINE */}
      {/* ========================================================= */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-1 sm:pt-2 shrink-0">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black uppercase tracking-tight font-[family-name:var(--font-outfit)] leading-[0.84] text-[#2B1810]">
          THE CRUNCH <br />
          <span className="inline-block text-[#C87A1E] font-[family-name:var(--font-caveat)] capitalize text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] -rotate-2 -mt-2 sm:-mt-3.5 drop-shadow-sm">
            Of India
          </span>
        </h1>
      </div>

      {/* ========================================================= */}
      {/* 5. 5-PRODUCT PANORAMA STAGE WITH ROLLING ANIMATIONS */}
      {/* ========================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex-1 min-h-0 flex items-center justify-center my-0">
        {/* Left Arrow Button */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-2 sm:left-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#2B1810] backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/60"
          aria-label="Previous Flavor"
        >
          <ChevronLeft className="w-5 h-5 text-[#2B1810]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-2 sm:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#2B1810] backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/60"
          aria-label="Next Flavor"
        >
          <ChevronRight className="w-5 h-5 text-[#2B1810]" />
        </button>

        {/* Panoramic Showcase Container */}
        <div className="relative w-full h-full max-h-[360px] sm:max-h-[410px] flex items-center justify-center">
          {/* ===================================== */}
          {/* FAR LEFT PRODUCT (Offset -2) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(-2);
            return (
              <div
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setDirection(-1);
                  setCurrentIndex((currentIndex - 2 + FLAVORS.length * 2) % FLAVORS.length);
                  setTimeout(() => setIsAnimating(false), 800);
                }}
                className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center opacity-65 hover:opacity-100 transition-all duration-500 scale-75 cursor-pointer -rotate-6 z-10 group"
              >
                <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-14 -mr-12 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#6E4F3A] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}

          {/* ===================================== */}
          {/* INNER LEFT PRODUCT (Offset -1) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(-1);
            return (
              <div
                onClick={goToPrev}
                className="hidden md:flex absolute left-[12%] lg:left-[17%] top-1/2 -translate-y-1/2 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-85 cursor-pointer -rotate-3 z-15 group"
              >
                <div className="relative w-[175px] sm:w-[195px] h-[210px] sm:h-[240px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -mr-14 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#6E4F3A] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}

          {/* ===================================== */}
          {/* ACTIVE CENTER HERO PRODUCT (ANIMATED) */}
          {/* ===================================== */}
          <div className="relative z-25 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* 1. Center Active Wrapper Packet */}
              <div className="relative w-[220px] sm:w-[270px] md:w-[295px] h-[260px] sm:h-[310px] md:h-[340px] z-25">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`packet-${activeFlavor.id}`}
                    custom={direction}
                    variants={packetVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full relative filter drop-shadow-[0_24px_34px_rgba(0,0,0,0.36)]"
                  >
                    <Image
                      src={activeFlavor.packetImg}
                      alt={activeFlavor.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 220px, 300px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 2. Right Khakhra Disc - Foreground / Upper Layer in Front of Wrapper (User Spec) */}
              <div className="absolute -right-8 sm:-right-16 md:-right-18 -bottom-1 sm:-bottom-3 w-[140px] sm:w-[185px] md:w-[205px] h-[140px] sm:h-[185px] md:h-[205px] z-35 pointer-events-none">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`disc-right-${activeFlavor.id}`}
                    custom={direction}
                    variants={rollingDiscVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full relative filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.44)]"
                  >
                    <Image
                      src={activeFlavor.discImg}
                      alt={`${activeFlavor.name} crisp round`}
                      fill
                      sizes="(max-width: 768px) 140px, 205px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ===================================== */}
          {/* INNER RIGHT PRODUCT (Offset +1) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(1);
            return (
              <div
                onClick={goToNext}
                className="hidden md:flex absolute right-[12%] lg:right-[17%] top-1/2 -translate-y-1/2 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-85 cursor-pointer rotate-3 z-15 group"
              >
                <div className="relative w-[175px] sm:w-[195px] h-[210px] sm:h-[240px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -ml-14 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#6E4F3A] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}

          {/* ===================================== */}
          {/* FAR RIGHT PRODUCT (Offset +2) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(2);
            return (
              <div
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setDirection(1);
                  setCurrentIndex((currentIndex + 2) % FLAVORS.length);
                  setTimeout(() => setIsAnimating(false), 800);
                }}
                className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 flex-col items-center opacity-65 hover:opacity-100 transition-all duration-500 scale-75 cursor-pointer rotate-6 z-10 group"
              >
                <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-14 -ml-12 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#6E4F3A] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Progress Dots Directly Under Product Stage */}
      <div className="relative z-20 flex items-center justify-center gap-1.5 py-1 shrink-0">
        {FLAVORS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating || idx === currentIndex) return;
              setIsAnimating(true);
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
              setTimeout(() => setIsAnimating(false), 800);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-6 h-2 bg-[#D97706] shadow-sm"
                : "w-2 h-2 bg-[#2B1810]/30 hover:bg-[#2B1810]/60"
            }`}
            aria-label={`Jump to flavor ${idx + 1}`}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* 6. BOTTOM FLOATING CARDS (EXACTLY AS IN MOCKUP) */}
      {/* ========================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 w-full pb-2 sm:pb-3 shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Left: Torn-Paper Style Certification Card */}
          <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-2xl shadow-md border border-[#2B1810]/10 flex items-center gap-4 sm:gap-7">
            <div className="flex flex-col items-center text-center">
              <Leaf className="w-4 h-4 text-[#2B1810] mb-0.5" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                NO ADDED <br /> PRESERVATIVES
              </span>
            </div>

            <div className="w-px h-6 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Wheat className="w-4 h-4 text-[#2B1810] mb-0.5" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                MADE WITH <br /> NATURAL INGREDIENTS
              </span>
            </div>

            <div className="w-px h-6 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Flame className="w-4 h-4 text-[#2B1810] mb-0.5" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                BAKED <br /> NOT FRIED
              </span>
            </div>

            <div className="w-px h-6 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Ban className="w-4 h-4 text-[#2B1810] mb-0.5" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                NO ARTIFICIAL <br /> COLORS & FLAVOURS
              </span>
            </div>
          </div>

          {/* Center: Scroll to Explore Indicator */}
          <div className="hidden lg:flex flex-col items-center text-center cursor-pointer group">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#6E4F3A] group-hover:text-[#2B1810] transition-colors">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#6E4F3A] group-hover:translate-y-0.5 transition-transform animate-bounce mt-0.5" />
          </div>

          {/* Right: "5 Delicious Flavours" Cursive Note + 5 Circular Disc Chips */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col text-right">
              <span className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl font-bold text-[#2B1810] leading-none">
                5 Delicious
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl font-bold text-[#C87A1E] leading-none flex items-center justify-end gap-1">
                Flavours ➔
              </span>
            </div>

            {/* 5 Circular Disc Chips with Hover Scale */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-md border border-[#2B1810]/10 shadow-sm">
              {FLAVORS.map((f, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      if (isAnimating || idx === currentIndex) return;
                      setIsAnimating(true);
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAnimating(false), 800);
                    }}
                    title={f.name}
                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#C87A1E] ring-offset-1 scale-110 shadow-sm"
                        : "opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={f.discImg}
                      alt={f.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
