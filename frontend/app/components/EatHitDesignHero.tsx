"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, MapPin, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  khakhraImage: string;
  packetImage: string;
  accent: string;
  tagline: string;
}

const products: Product[] = [
  {
    id: "plain",
    name: "Plain Khakhra",
    khakhraImage: "/images/products/plain-khakhra.png",
    packetImage: "/images/products/plain-pouch.png",
    accent: "#F2C64F",
    tagline: "PURE • SIMPLE • CLASSIC",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    khakhraImage: "/images/products/jeera-khakhra.png",
    packetImage: "/images/products/jeera-pouch.png",
    accent: "#E98527",
    tagline: "EARTHY • AROMATIC • CRISPY",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    khakhraImage: "/images/products/methi-khakhra.png",
    packetImage: "/images/products/methi-pouch.png",
    accent: "#69A43B",
    tagline: "HERBAL • LIGHT • CRISPY",
  },
  {
    id: "masala",
    name: "Masala Khakhra",
    khakhraImage: "/images/products/masala-khakhra.png",
    packetImage: "/images/products/masala-pouch.png",
    accent: "#DB2E2B",
    tagline: "BOLD • SPICY • CRISPY",
  },
  {
    id: "lasan",
    name: "Lasan Khakhra",
    khakhraImage: "/images/products/lasan-khakhra.png",
    packetImage: "/images/products/lasun-pouch.png",
    accent: "#DEB577",
    tagline: "GARLIC • CRUNCH • FLAVOUR",
  },
];

export default function EatHitDesignHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (right to left), -1 = prev (left to right)
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelLockRef = useRef(false);

  // Preload all 10 product assets on mount
  useEffect(() => {
    products.forEach((p) => {
      const img1 = new window.Image();
      img1.src = p.khakhraImage;
      const img2 = new window.Image();
      img2.src = p.packetImage;
    });
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  // Desktop wheel scroll advances the hero
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

  // Mobile / Drag gesture handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) {
      goToNext();
    } else if (info.offset.x > 60) {
      goToPrev();
    }
  };

  const activeProduct = products[activeIndex];
  const previousIndex = (activeIndex - 1 + products.length) % products.length;
  const nextIndex = (activeIndex + 1) % products.length;
  const previousProduct = products[previousIndex];
  const nextProduct = products[nextIndex];

const EASING = [0.22, 1, 0.36, 1] as const;

  // Khakhra Disc Variants according to design.md
  // New khakhra enters from RIGHT (translateX 120%) -> exits LEFT (translateX -120%)
  const khakhraVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "120%" : "-120%",
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.8, ease: EASING },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, ease: EASING },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-120%" : "120%",
      opacity: 0,
      scale: 0.88,
      transition: {
        x: { duration: 0.8, ease: EASING },
        opacity: { duration: 0.4 },
        scale: { duration: 0.8, ease: EASING },
      },
    }),
  };

  // Packet Layered Crossfade Variants according to design.md
  // scale 1.04 -> 1, opacity 0 -> 1, blur 4px -> 0
  const packetVariants: Variants = {
    enter: {
      scale: 1.04,
      opacity: 0,
      filter: "blur(4px)",
    },
    center: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: EASING,
      },
    },
    exit: {
      scale: 0.94,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        duration: 0.65,
        ease: EASING,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF6F0] text-[#19120D] select-none transition-colors duration-700">
      {/* ========================================================= */}
      {/* 1. SLANTED KINETIC BACKGROUND SCROLLING MARQUEE (USER SPEC) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
        <div
          className="w-[145vw] -rotate-[6deg] flex flex-col gap-6 sm:gap-10 opacity-[0.11] transition-colors duration-700"
          style={{ color: activeProduct.accent }}
        >
          {/* Row 1: Solid Fill (Moving Left) */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT LITE • THE CRUNCH OF INDIA • 100% BAKED NOT FRIED • GUJARATI KHAKHRA •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT LITE • THE CRUNCH OF INDIA • 100% BAKED NOT FRIED • GUJARATI KHAKHRA •
            </span>
          </div>

          {/* Row 2: Hollow Stroke Outline (Moving Right) */}
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
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              AUTHENTIC TASTE • ZERO TRANS FAT • WHOLE WHEAT • EVERYDAY GOODNESS •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              AUTHENTIC TASTE • ZERO TRANS FAT • WHOLE WHEAT • EVERYDAY GOODNESS •
            </span>
          </div>
        </div>
      </div>

      {/* Flavour Ambient Glow Atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[650px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 z-0 opacity-45"
        style={{
          background: `radial-gradient(circle, ${activeProduct.accent} 0%, rgba(250, 246, 240, 0) 70%)`,
        }}
      />

      {/* ========================================================= */}
      {/* 2. HEADER (FROM DESIGN.MD) */}
      {/* ========================================================= */}
      <header className="relative z-30 w-full pt-5 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1C120D] text-white flex flex-col items-center justify-center shadow-md relative border border-[#EAB308]/40">
            <span className="text-[8px] font-semibold text-white/70 absolute top-1 right-1.5">
              TM
            </span>
            <span className="font-black text-xs sm:text-sm leading-none tracking-tight text-white">
              EAT
            </span>
            <span className="font-black text-xs sm:text-sm leading-none tracking-tight text-[#EAB308]">
              HIT
            </span>
            <span className="text-[9px] font-bold text-[#0D9488] italic tracking-tight font-[family-name:var(--font-caveat)] -mt-0.5">
              Lite
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#19120D]">
          <Link href="#products" className="hover:text-[#DB2E2B] transition-colors py-1">
            Products
          </Link>
          <Link href="#story" className="hover:text-[#DB2E2B] transition-colors py-1">
            Our Story
          </Link>
          <Link href="#store-locator" className="hover:text-[#DB2E2B] transition-colors py-1">
            Find a Store
          </Link>
        </nav>

        {/* Right: Search & Action Button */}
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-[#19120D] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#19120D]" />
          </button>
          <Link
            href="#store-locator"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1C120D] hover:bg-[#DB2E2B] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Find a Store</span>
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO HEADINGS (FROM DESIGN.MD) */}
      {/* ========================================================= */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.3em] text-[#6B5E52] mb-1.5">
          TRADITIONAL • CRISPY • EVERYDAY GOODNESS
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-[family-name:var(--font-outfit)] leading-none text-[#19120D]">
          THE CRUNCH OF INDIA
        </h1>
      </div>

      {/* ========================================================= */}
      {/* 4. MAIN FLAVOUR CAROUSEL STAGE (DESIGN.MD SPEC) */}
      {/* ========================================================= */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 flex items-center justify-center my-auto min-h-[380px] sm:min-h-[440px]"
        touch-action="pan-y"
      >
        {/* Carousel Arrow Left (←) */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-2 sm:left-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/85 hover:bg-white text-[#19120D] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-[#19120D]/10"
          aria-label="Previous Flavour"
        >
          <ChevronLeft className="w-6 h-6 text-[#19120D]" />
        </button>

        {/* Carousel Arrow Right (→) */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-2 sm:right-8 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/85 hover:bg-white text-[#19120D] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-[#19120D]/10"
          aria-label="Next Flavour"
        >
          <ChevronRight className="w-6 h-6 text-[#19120D]" />
        </button>

        {/* Swipe / Drag Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* ===================================== */}
          {/* PREVIOUS FLAVOUR (LEFT SIDE - DESIGN.MD SPEC) */}
          {/* ===================================== */}
          <div
            onClick={goToPrev}
            className="hidden sm:flex absolute left-4 md:left-[10%] lg:left-[14%] flex-col items-center opacity-65 hover:opacity-100 transition-opacity duration-300 scale-[0.68] -rotate-6 z-10 cursor-pointer"
          >
            <div className="relative w-[180px] h-[220px] drop-shadow-xl pointer-events-none">
              <Image
                src={previousProduct.packetImage}
                alt={previousProduct.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="relative -mt-16 -mr-12 w-[120px] h-[120px] drop-shadow-lg pointer-events-none">
              <Image
                src={previousProduct.khakhraImage}
                alt={`${previousProduct.name} Khakhra`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#6B5E52] mt-2">
              {previousProduct.name}
            </span>
          </div>

          {/* ===================================== */}
          {/* ACTIVE FLAVOUR CENTERPIECE (DESIGN.MD SPEC) */}
          {/* ===================================== */}
          <div className="relative z-30 flex flex-col items-center justify-center">
            {/* Packet Behind with Smooth Layered Crossfade */}
            <div className="relative w-[270px] sm:w-[330px] md:w-[370px] h-[310px] sm:h-[370px] md:h-[410px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`packet-${activeProduct.id}`}
                  variants={packetVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
                >
                  <Image
                    src={activeProduct.packetImage}
                    alt={activeProduct.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 270px, 370px"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Active Khakhra Disc in Front with Swipe Right-to-Left Transition */}
              <div className="absolute -right-4 sm:-right-8 bottom-2 sm:bottom-6 w-[170px] sm:w-[220px] md:w-[240px] h-[170px] sm:h-[220px] md:h-[240px] z-30 pointer-events-none">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`khakhra-${activeProduct.id}`}
                    custom={direction}
                    variants={khakhraVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full relative filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.32)]"
                  >
                    <Image
                      src={activeProduct.khakhraImage}
                      alt={`${activeProduct.name} disc`}
                      fill
                      priority
                      sizes="(max-width: 768px) 170px, 240px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ===================================== */}
          {/* NEXT FLAVOUR (RIGHT SIDE - DESIGN.MD SPEC) */}
          {/* ===================================== */}
          <div
            onClick={goToNext}
            className="hidden sm:flex absolute right-4 md:right-[10%] lg:right-[14%] flex-col items-center opacity-65 hover:opacity-100 transition-opacity duration-300 scale-[0.68] rotate-6 z-10 cursor-pointer"
          >
            <div className="relative w-[180px] h-[220px] drop-shadow-xl pointer-events-none">
              <Image
                src={nextProduct.packetImage}
                alt={nextProduct.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="relative -mt-16 -ml-12 w-[120px] h-[120px] drop-shadow-lg pointer-events-none">
              <Image
                src={nextProduct.khakhraImage}
                alt={`${nextProduct.name} Khakhra`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#6B5E52] mt-2">
              {nextProduct.name}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 5. ACTIVE PRODUCT TITLE & TAGLINE (FROM DESIGN.MD) */}
      {/* ========================================================= */}
      <div className="relative z-20 text-center max-w-xl mx-auto px-4 -mt-2 sm:-mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${activeProduct.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)]">
              {activeProduct.name}
            </h2>
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#6B5E52] mt-0.5">
              {activeProduct.tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicator Dots: ○ ● ○ ○ ○ */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                if (isAnimating || idx === activeIndex) return;
                setIsAnimating(true);
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
                setTimeout(() => setIsAnimating(false), 800);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-7 h-2 bg-[#19120D]"
                  : "w-2 h-2 bg-[#19120D]/25 hover:bg-[#19120D]/50"
              }`}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="flex items-center justify-center gap-1 mt-3 pb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B5E52]">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
