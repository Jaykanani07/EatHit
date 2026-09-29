"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
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
    packetImg: "/images/products/plain-packet.png",
    discImg: "/images/products/plain-khakhra.png",
    color: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.28)",
    floatingIngredient: "🌾",
    ingredientName: "Golden Wheat",
  },
  {
    id: "masala",
    name: "Masala Khakhra",
    packetImg: "/images/products/masala-packet.png",
    discImg: "/images/products/masala-khakhra.png",
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.28)",
    floatingIngredient: "🌶️",
    ingredientName: "Kashmiri Chili",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    packetImg: "/images/products/methi-packet.png",
    discImg: "/images/products/methi-khakhra.png",
    color: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.28)",
    floatingIngredient: "🌿",
    ingredientName: "Kasuri Methi",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    packetImg: "/images/products/jeera-packet.png",
    discImg: "/images/products/jeera-khakhra.png",
    color: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.28)",
    floatingIngredient: "✨",
    ingredientName: "Roasted Cumin",
  },
  {
    id: "lasun",
    name: "Lasun Khakhra",
    packetImg: "/images/products/lasan-packet.png",
    discImg: "/images/products/lasan-khakhra.png",
    color: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.28)",
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
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-[#2B1810] select-none">
      {/* ========================================================= */}
      {/* 1. PHOTOREALISTIC WARM DESERT & STONE BACKDROP */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-desert-stone-bg.jpg"
          alt="Desert studio backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom brightness-[1.02] contrast-[1.02]"
        />
        {/* Warm Golden Sunlight Gradients to Blend Top & Bottom Seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4EC]/85 via-[#F4E9DC]/35 to-[#EAE0D2]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(43,24,16,0.12)_100%)] pointer-events-none" />
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
      {/* 3. TOP NAVIGATION BAR (EXACTLY AS IN MOCKUP) */}
      {/* ========================================================= */}
      <header className="relative z-30 w-full pt-4 sm:pt-6 px-4 sm:px-10 max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Authentic EAT HIT Lite Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1C120D] text-white flex flex-col items-center justify-center shadow-lg relative border-2 border-[#EAB308]/60 group-hover:scale-105 transition-transform">
            <span className="text-[9px] font-semibold text-white/70 tracking-widest absolute top-1.5 right-2">
              TM
            </span>
            <span className="font-black text-sm sm:text-base leading-none tracking-tighter text-white">
              EAT
            </span>
            <span className="font-black text-sm sm:text-base leading-none tracking-tighter text-[#EAB308]">
              HIT
            </span>
            <span className="text-[10px] font-bold text-[#0D9488] italic tracking-tight font-[family-name:var(--font-caveat)] -mt-0.5">
              Lite
            </span>
          </div>
        </Link>

        {/* Center: Main Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#2B1810]">
          <Link
            href="/"
            className="relative py-1 text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#A82810]"
          >
            Home
          </Link>
          <Link href="#products" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Products
          </Link>
          <Link href="#story" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Our Story
          </Link>
          <Link href="#store-locator" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Find a Store
          </Link>
          <Link href="#contact" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Search & "Find a Store" Action Button */}
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#2B1810] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#2B1810]" />
          </button>
          <Link
            href="#store-locator"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C120D] hover:bg-[#A82810] text-white text-xs font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Find a Store</span>
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 4. HERO HEADLINE (FROM MOCKUP) */}
      {/* ========================================================= */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-3 sm:pt-4">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#6E4F3A] mb-1">
          TRADITIONAL &nbsp;•&nbsp; CRISPY &nbsp;•&nbsp; EVERYDAY GOODNESS
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-[family-name:var(--font-outfit)] leading-[0.9] text-[#2B1810]">
          THE CRUNCH <br />
          <span className="inline-block text-[#C87A1E] font-[family-name:var(--font-caveat)] capitalize text-5xl sm:text-7xl md:text-8xl -rotate-2 -mt-2 sm:-mt-3 drop-shadow-sm">
            Of India
          </span>
        </h1>
      </div>

      {/* ========================================================= */}
      {/* 5. 5-PRODUCT PANORAMA STAGE WITH ROLLING ANIMATIONS */}
      {/* ========================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex items-center justify-center my-auto min-h-[380px] sm:min-h-[460px]">
        {/* Left Arrow Button */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-[#2B1810] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/60"
          aria-label="Previous Flavor"
        >
          <ChevronLeft className="w-6 h-6 text-[#2B1810]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-[#2B1810] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/60"
          aria-label="Next Flavor"
        >
          <ChevronRight className="w-6 h-6 text-[#2B1810]" />
        </button>

        {/* Panoramic Showcase Container */}
        <div className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center">
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
                className="hidden lg:flex absolute left-4 xl:left-8 top-10 flex-col items-center opacity-65 hover:opacity-100 transition-all duration-500 scale-75 cursor-pointer -rotate-6 z-10 group"
              >
                {/* Floating Chili / Ingredient */}
                <span className="text-3xl absolute -top-4 -left-2 animate-bounce drop-shadow-md">
                  {item.floatingIngredient}
                </span>
                <div className="relative w-[180px] h-[220px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -mr-14 w-[110px] h-[110px] drop-shadow-lg transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-bold text-[#6E4F3A] mt-2 uppercase tracking-wider">
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
                className="hidden md:flex absolute left-[13%] lg:left-[18%] top-8 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-85 sm:scale-90 cursor-pointer -rotate-3 z-15 group"
              >
                {/* Floating Herb / Leaves */}
                <span className="text-2xl absolute -top-3 right-0 animate-pulse drop-shadow-md">
                  {item.floatingIngredient}
                </span>
                <div className="relative w-[210px] h-[260px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-20 -mr-16 w-[130px] h-[130px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-bold text-[#6E4F3A] mt-2 uppercase tracking-wider">
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
              <div className="relative w-[250px] sm:w-[320px] md:w-[350px] h-[310px] sm:h-[390px] z-25">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`packet-${activeFlavor.id}`}
                    custom={direction}
                    variants={packetVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full relative filter drop-shadow-[0_28px_38px_rgba(0,0,0,0.38)]"
                  >
                    <Image
                      src={activeFlavor.packetImg}
                      alt={activeFlavor.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 250px, 350px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 2. Right Khakhra Disc - Foreground / Upper Layer in Front of Wrapper (User Spec) */}
              <div className="absolute -right-10 sm:-right-18 md:-right-20 -bottom-2 sm:-bottom-4 w-[155px] sm:w-[210px] md:w-[230px] h-[155px] sm:h-[210px] md:h-[230px] z-35 pointer-events-none">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`disc-right-${activeFlavor.id}`}
                    custom={direction}
                    variants={rollingDiscVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full relative filter drop-shadow-[0_24px_34px_rgba(0,0,0,0.44)]"
                  >
                    <Image
                      src={activeFlavor.discImg}
                      alt={`${activeFlavor.name} crisp round`}
                      fill
                      sizes="(max-width: 768px) 155px, 230px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Floating Ingredient Emblems */}
            <span className="absolute -top-3 left-4 text-3xl animate-bounce drop-shadow-md">
              {activeFlavor.floatingIngredient}
            </span>
            <span className="absolute -top-2 right-4 text-2xl animate-pulse drop-shadow-md">
              {activeFlavor.floatingIngredient}
            </span>
          </div>

          {/* ===================================== */}
          {/* INNER RIGHT PRODUCT (Offset +1) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(1);
            return (
              <div
                onClick={goToNext}
                className="hidden md:flex absolute right-[13%] lg:right-[18%] top-8 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-85 sm:scale-90 cursor-pointer rotate-3 z-15 group"
              >
                {/* Floating Cumin/Ingredient */}
                <span className="text-2xl absolute -top-3 left-0 animate-pulse drop-shadow-md">
                  {item.floatingIngredient}
                </span>
                <div className="relative w-[210px] h-[260px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-20 -ml-16 w-[130px] h-[130px] drop-shadow-xl transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-bold text-[#6E4F3A] mt-2 uppercase tracking-wider">
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
                className="hidden lg:flex absolute right-4 xl:right-8 top-10 flex-col items-center opacity-65 hover:opacity-100 transition-all duration-500 scale-75 cursor-pointer rotate-6 z-10 group"
              >
                {/* Floating Garlic/Ingredient */}
                <span className="text-3xl absolute -top-4 right-0 animate-bounce drop-shadow-md">
                  {item.floatingIngredient}
                </span>
                <div className="relative w-[180px] h-[220px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -ml-14 w-[110px] h-[110px] drop-shadow-lg transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-bold text-[#6E4F3A] mt-2 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Progress Dots Directly Under Product Stage */}
      <div className="relative z-20 flex items-center justify-center gap-2 -mt-2 mb-3">
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
                ? "w-7 h-2.5 bg-[#D97706] shadow-sm"
                : "w-2.5 h-2.5 bg-[#2B1810]/30 hover:bg-[#2B1810]/60"
            }`}
            aria-label={`Jump to flavor ${idx + 1}`}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* 6. BOTTOM FLOATING CARDS (EXACTLY AS IN MOCKUP) */}
      {/* ========================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 w-full pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Torn-Paper Style Certification Card */}
          <div className="bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-2xl shadow-lg border border-[#2B1810]/10 flex items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center">
              <Leaf className="w-5 h-5 text-[#2B1810] mb-1" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                NO ADDED <br /> PRESERVATIVES
              </span>
            </div>

            <div className="w-px h-8 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Wheat className="w-5 h-5 text-[#2B1810] mb-1" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                MADE WITH <br /> NATURAL INGREDIENTS
              </span>
            </div>

            <div className="w-px h-8 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Flame className="w-5 h-5 text-[#2B1810] mb-1" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                BAKED <br /> NOT FRIED
              </span>
            </div>

            <div className="w-px h-8 bg-[#2B1810]/15" />

            <div className="flex flex-col items-center text-center">
              <Ban className="w-5 h-5 text-[#2B1810] mb-1" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[#2B1810] leading-tight">
                NO ARTIFICIAL <br /> COLORS & FLAVOURS
              </span>
            </div>
          </div>

          {/* Center: Scroll to Explore Indicator */}
          <div className="flex flex-col items-center text-center cursor-pointer group">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6E4F3A] group-hover:text-[#2B1810] transition-colors">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-[#6E4F3A] group-hover:translate-y-1 transition-transform animate-bounce mt-1" />
          </div>

          {/* Right: "5 Delicious Flavours" Cursive Note + 5 Circular Disc Chips */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl font-bold text-[#2B1810] leading-none">
                5 Delicious
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl font-bold text-[#C87A1E] leading-none flex items-center justify-end gap-1">
                Flavours ➔
              </span>
            </div>

            {/* 5 Circular Disc Chips with Hover Scale */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#2B1810]/10 shadow-md">
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
                    className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#C87A1E] ring-offset-2 scale-110 shadow-md"
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
