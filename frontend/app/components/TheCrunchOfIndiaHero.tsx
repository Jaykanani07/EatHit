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
  Search,
  MapPin,
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
  spiceAccent: string; // emoji/accent for flying ingredients
}

const FLAVORS: FlavorItem[] = [
  {
    id: "masala",
    name: "Masala Khakhra",
    packetImg: "/images/products/masala-pouch.png",
    discImg: "/images/products/masala-khakhra.png",
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.20)",
    floatingIngredient: "🌶️",
    ingredientName: "Kashmiri Chili",
    spiceAccent: "chili",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    packetImg: "/images/products/methi-pouch.png",
    discImg: "/images/products/methi-khakhra.png",
    color: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.20)",
    floatingIngredient: "🌿",
    ingredientName: "Kasuri Methi",
    spiceAccent: "methi",
  },
  {
    id: "plain",
    name: "Plain Khakhra",
    packetImg: "/images/products/plain-pouch.png",
    discImg: "/images/products/plain-khakhra.png",
    color: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.22)",
    floatingIngredient: "🌾",
    ingredientName: "Golden Wheat",
    spiceAccent: "wheat",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    packetImg: "/images/products/jeera-pouch.png",
    discImg: "/images/products/jeera-khakhra.png",
    color: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.20)",
    floatingIngredient: "✨",
    ingredientName: "Roasted Cumin",
    spiceAccent: "cumin",
  },
  {
    id: "lasun",
    name: "Lasun Khakhra",
    packetImg: "/images/products/lasun-pouch.png",
    discImg: "/images/products/lasan-khakhra.png",
    color: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.20)",
    floatingIngredient: "🧄",
    ingredientName: "Roasted Garlic",
    spiceAccent: "garlic",
  },
];

const EASING = [0.22, 1, 0.36, 1] as const;

export default function TheCrunchOfIndiaHero() {
  // Index 2 is Plain Khakhra (the center hero in the master mockup)
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState<number>(1);
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
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? FLAVORS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
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
        }, 650);
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
      x: dir > 0 ? 180 : -180,
      rotate: dir > 0 ? 240 : -240,
      scale: 0.88,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { duration: 0.75, ease: EASING },
        rotate: { duration: 0.8, ease: EASING },
        scale: { duration: 0.7, ease: EASING },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -180 : 180,
      rotate: dir > 0 ? -240 : 240,
      scale: 0.88,
      opacity: 0,
      transition: {
        x: { duration: 0.7, ease: EASING },
        rotate: { duration: 0.75, ease: EASING },
        scale: { duration: 0.7, ease: EASING },
        opacity: { duration: 0.35 },
      },
    }),
  };

  // Packet Animation: Smooth Bottom-to-Top Fade-In (User spec)
  const packetVariants: Variants = {
    enter: {
      y: 55,
      scale: 0.94,
      opacity: 0,
    },
    center: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        y: { duration: 0.65, ease: EASING },
        scale: { duration: 0.65, ease: EASING },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      y: -30,
      scale: 0.94,
      opacity: 0,
      transition: {
        y: { duration: 0.45, ease: EASING },
        scale: { duration: 0.45, ease: EASING },
        opacity: { duration: 0.35 },
      },
    },
  };

  return (
    <section className="relative w-full h-full max-h-screen flex flex-col justify-between overflow-hidden text-[#2B1810] select-none py-1.5 sm:py-2 px-3 sm:px-6">
      {/* ========================================================= */}
      {/* 1. MASTER WARM DESERT DUNE & NATURAL STONE PODIUM STAGE   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-stone-desert-stage.jpg"
          alt="Warm golden desert stage with stone podium"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.02] contrast-[1.01]"
        />

        {/* Soft Golden Sunlight from Top-Left */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6E5]/45 via-transparent to-[#DCC8B0]/30 pointer-events-none" />

        {/* Dynamic Warm Ambient Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 56%, ${activeFlavor.glowColor}, transparent 65%)`,
          }}
        />

        {/* Top Fade Vignette for Crisp Nav & Title Readability */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F2E5D4]/70 via-[#F2E5D4]/25 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 2. FLOATING SPICE & INGREDIENT PARTICLES (MATCHING MOCKUP) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {/* Floating Red Chili (Top-Left near Masala) */}
        <motion.div
          animate={{
            y: [-4, 6, -4],
            rotate: [-14, -8, -14],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[6%] sm:left-[8%] top-[24%] sm:top-[26%] text-3xl sm:text-4xl filter drop-shadow-[0_8px_14px_rgba(220,38,38,0.4)]"
        >
          🌶️
        </motion.div>

        {/* Floating Red Chili Flakes */}
        <div className="absolute left-[9%] top-[34%] w-2 h-2 rounded-full bg-[#DC2626] opacity-75 blur-[0.4px]" />
        <div className="absolute left-[13%] top-[29%] w-1.5 h-1.5 rounded-full bg-[#B91C1C] opacity-80" />

        {/* Floating Green Methi Leaves (Mid-Left near Methi) */}
        <motion.div
          animate={{
            y: [5, -5, 5],
            rotate: [12, 18, 12],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[24%] sm:left-[26%] top-[22%] sm:top-[25%] text-2xl sm:text-3xl filter drop-shadow-[0_8px_12px_rgba(22,163,74,0.35)]"
        >
          🌿
        </motion.div>
        <div className="absolute left-[28%] top-[33%] text-base opacity-70">🌱</div>

        {/* Floating Golden Wheat Stalk (Center-Right near Podium) */}
        <motion.div
          animate={{
            y: [-3, 4, -3],
            rotate: [28, 34, 28],
          }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[33%] sm:right-[35%] top-[24%] sm:top-[27%] text-2xl sm:text-3xl filter drop-shadow-[0_8px_12px_rgba(217,119,6,0.35)]"
        >
          🌾
        </motion.div>

        {/* Floating Cumin Grains & Spices (Mid-Right near Jeera) */}
        <div className="absolute right-[22%] top-[28%] w-1.5 h-2.5 rounded-full bg-[#78350F] rotate-45 opacity-75" />
        <div className="absolute right-[26%] top-[34%] w-1 h-2 rounded-full bg-[#92400E] rotate-12 opacity-80" />
        <div className="absolute right-[20%] top-[36%] w-1.5 h-1.5 rounded-full bg-[#D97706] opacity-75" />

        {/* Floating Garlic Clove (Top-Right near Lasun) */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [15, 8, 15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[7%] sm:right-[9%] top-[25%] sm:top-[27%] text-2xl sm:text-3xl filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]"
        >
          🧄
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 3. TOP NAVIGATION BAR (FAITHFUL TO MASTER DESIGN)         */}
      {/* ========================================================= */}
      <header className="relative z-30 w-full pt-1 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between shrink-0">
        {/* Left: Official EatHit Brand Circular Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group" aria-label="EatHit Home">
            <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden shadow-md border-2 border-[#EAB308]/60 group-hover:scale-105 transition-transform bg-[#105E34]">
              <Image
                src="/810319879_18115925035810617_1916739058068536558_n.jpg"
                alt="EatHit Official Logo"
                fill
                priority
                sizes="52px"
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 text-xs sm:text-sm font-semibold text-[#2B1810]">
          <Link
            href="/"
            className="relative py-1 text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#A82810]"
          >
            Home
          </Link>
          <Link href="#products" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Products
          </Link>
          <Link href="#our-story" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Our Story
          </Link>
          <Link href="#find-a-store" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Find a Store
          </Link>
          <Link href="#contact" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Search Circle Button + "Find a Store" Pill Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white text-[#2B1810] shadow-sm border border-[#2B1810]/10 flex items-center justify-center transition-transform hover:scale-105"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#2B1810]" />
          </button>
          <Link
            href="#find-a-store"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#23120B] text-white text-xs font-semibold shadow-sm hover:bg-[#3D2214] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Find a Store</span>
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 4. HERO HEADLINE (MATCHING MASTER TYPOGRAPHY)             */}
      {/* ========================================================= */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 pt-0 sm:pt-1 shrink-0">
        {/* Subtitle */}
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#4A2E1F] mb-0.5">
          TRADITIONAL &nbsp;•&nbsp; CRISPY &nbsp;•&nbsp; EVERYDAY GOODNESS
        </p>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black uppercase tracking-tight font-[family-name:var(--font-outfit)] leading-[0.84] text-[#24120A]">
          THE CRUNCH
          <br />
          <span className="relative inline-block text-[#D48B28] font-[family-name:var(--font-caveat)] capitalize text-5xl sm:text-7xl md:text-8xl lg:text-[6.4rem] -rotate-2 -mt-1 sm:-mt-3 drop-shadow-sm">
            Of India
            {/* Golden Brush Underline */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-3 sm:h-4 text-[#E69A28] pointer-events-none"
              viewBox="0 0 240 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11C45 4 110 3 236 12C160 8 75 7 12 14"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
            </svg>
          </span>
        </h1>
      </div>

      {/* ========================================================= */}
      {/* 5. 5-PRODUCT STAGE WITH STONE PODIUM & ROLLING ANIMATIONS */}
      {/* ========================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-4 flex-1 min-h-0 flex items-center justify-center my-0">
        {/* Left Arrow Button */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-1 sm:left-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#2B1810] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/80"
          aria-label="Previous Flavor"
        >
          <ChevronLeft className="w-5 h-5 text-[#2B1810]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-1 sm:right-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-[#2B1810] shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/80"
          aria-label="Next Flavor"
        >
          <ChevronRight className="w-5 h-5 text-[#2B1810]" />
        </button>

        {/* Panoramic Showcase Container */}
        <div className="relative w-full h-full max-h-[350px] sm:max-h-[390px] flex items-center justify-center">
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
                  setTimeout(() => setIsAnimating(false), 700);
                }}
                className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center opacity-70 hover:opacity-100 transition-all duration-500 scale-[0.74] cursor-pointer -rotate-6 z-10 group"
              >
                <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-14 -mr-12 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#5C3B24] mt-1 uppercase tracking-wider">
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
                className="hidden md:flex absolute left-[12%] lg:left-[17%] top-1/2 -translate-y-1/2 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-[0.85] cursor-pointer -rotate-3 z-15 group"
              >
                <div className="relative w-[170px] sm:w-[190px] h-[205px] sm:h-[235px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -mr-14 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#5C3B24] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}

          {/* ===================================== */}
          {/* ACTIVE CENTER HERO PRODUCT ON PODIUM */}
          {/* ===================================== */}
          <div className="relative z-25 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Left Khakhra Round (Partially behind left edge) */}
              <div className="absolute -left-20 sm:-left-32 md:-left-40 top-1/2 -translate-y-1/2 w-[160px] sm:w-[200px] md:w-[230px] h-[160px] sm:h-[200px] md:h-[230px] z-10 pointer-events-none -rotate-6">
                <Image
                  src={activeFlavor.discImg}
                  alt={`${activeFlavor.name} left round`}
                  fill
                  sizes="(max-width: 768px) 160px, 230px"
                  className="object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.32)] opacity-95"
                />
              </div>

              {/* Center Active Wrapper Packet (Hero on Stone Podium) */}
              <div className="relative w-[240px] sm:w-[290px] md:w-[325px] h-[280px] sm:h-[340px] md:h-[385px] z-25">
                <div
                  key={`packet-${activeFlavor.id}`}
                  className="w-full h-full relative filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.42)]"
                >
                  <Image
                    src={activeFlavor.packetImg}
                    alt={activeFlavor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 240px, 325px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Khakhra Round - Upper Layer Leaning Forward on Right (Rolling animation) */}
              <div className="absolute -right-16 sm:-right-28 md:-right-34 -bottom-3 sm:-bottom-6 w-[165px] sm:w-[205px] md:w-[235px] h-[165px] sm:h-[205px] md:h-[235px] z-35 pointer-events-none">
                <AnimatePresence custom={direction} mode="wait" initial={false}>
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
                      sizes="(max-width: 768px) 165px, 235px"
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
                className="hidden md:flex absolute right-[12%] lg:right-[17%] top-1/2 -translate-y-1/2 flex-col items-center opacity-85 hover:opacity-100 transition-all duration-500 scale-[0.85] cursor-pointer rotate-3 z-15 group"
              >
                <div className="relative w-[170px] sm:w-[190px] h-[205px] sm:h-[235px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-16 -ml-14 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#5C3B24] mt-1 uppercase tracking-wider">
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
                  setTimeout(() => setIsAnimating(false), 700);
                }}
                className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 flex-col items-center opacity-70 hover:opacity-100 transition-all duration-500 scale-[0.74] cursor-pointer rotate-6 z-10 group"
              >
                <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                  <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                </div>
                <div className="relative -mt-14 -ml-12 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:-rotate-12">
                  <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-[#5C3B24] mt-1 uppercase tracking-wider">
                  {item.name}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Progress Dots Directly Under Stone Podium (Matching Mockup) */}
      <div className="relative z-20 flex items-center justify-center gap-1.5 py-1 shrink-0">
        {FLAVORS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating || idx === currentIndex) return;
              setIsAnimating(true);
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
              setTimeout(() => setIsAnimating(false), 700);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-6 h-2 bg-[#D48B28] shadow-sm"
                : "w-2 h-2 bg-[#2B1810]/35 hover:bg-[#2B1810]/65"
            }`}
            aria-label={`Jump to flavor ${idx + 1}`}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* 6. BOTTOM FLOATING BADGES (TORN-PAPER PARCHMENT CARDS)   */}
      {/* ========================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-3 sm:px-6 w-full pb-2 shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
          {/* Left: Torn-Paper Style Certification Badge Card */}
          <div className="bg-[#FAF6EF]/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-xl shadow-md border border-[#2B1810]/10 flex items-center gap-4 sm:gap-6">
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
            <div className="w-px h-4 bg-[#6E4F3A]/40 mb-1" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#5C3B24] group-hover:text-[#2B1810] transition-colors">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C3B24] group-hover:translate-y-0.5 transition-transform animate-bounce mt-0.5" />
          </div>

          {/* Right: "5 Delicious Flavours" Cursive Note + 5 Circular Disc Chips */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col text-right">
              <span className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl font-bold text-[#2B1810] leading-none">
                5
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl font-bold text-[#2B1810] leading-none">
                Delicious
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl font-bold text-[#D48B28] leading-none flex items-center justify-end gap-1">
                Flavours ➔
              </span>
            </div>

            {/* 5 Circular Disc Chips with Hover Scale */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#FAF6EF]/90 backdrop-blur-md border border-[#2B1810]/10 shadow-sm">
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
                      setTimeout(() => setIsAnimating(false), 700);
                    }}
                    title={f.name}
                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-[#D48B28] ring-offset-1 scale-110 shadow-sm"
                        : "opacity-80 hover:opacity-100 hover:scale-105"
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
