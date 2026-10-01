"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    setTimeout(() => setIsAnimating(false), 550);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? FLAVORS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 550);
  }, [isAnimating]);

  // Desktop wheel scroll advances carousel smoothly
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) > 25) {
        wheelLockRef.current = true;
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 550);
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



  return (
    <section className="relative w-full h-full max-h-screen flex flex-col justify-between overflow-hidden text-[#2B1810] select-none pt-1.5 sm:pt-2 pb-4 sm:pb-6 px-3 sm:px-6">
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
          <Link href="#contact" className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Spacer for Symmetrical Nav Centering */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 pointer-events-none hidden md:block" aria-hidden="true" />
      </header>

      {/* ========================================================= */}
      {/* 4. HERO HEADLINE (MATCHING MASTER TYPOGRAPHY)             */}
      {/* ========================================================= */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 pt-0 sm:pt-1 shrink-0">


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


        {/* Panoramic Showcase Container */}
        <div className="relative w-full h-[320px] sm:h-[370px] md:h-[400px] flex items-end justify-center pb-2 sm:pb-3 overflow-visible">
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
                  setTimeout(() => setIsAnimating(false), 550);
                }}
                className="hidden lg:flex absolute left-[calc(50%-450px)] xl:left-[calc(50%-510px)] -translate-x-1/2 bottom-5 sm:bottom-7 flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 scale-[0.72] cursor-pointer -rotate-6 z-10 group"
              >
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={`side-far-left-${item.id}`}
                    initial={{
                      x: direction > 0 ? 30 : -30,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: EASING },
                    }}
                    exit={{
                      x: direction > 0 ? -30 : 30,
                      opacity: 0,
                      transition: { duration: 0.35, ease: EASING },
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                      <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="relative -mt-14 -mr-10 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:rotate-12">
                      <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                className="hidden md:flex absolute left-[calc(50%-245px)] lg:left-[calc(50%-275px)] xl:left-[calc(50%-310px)] -translate-x-1/2 bottom-2 sm:bottom-4 flex-col items-center opacity-85 hover:opacity-100 transition-opacity duration-300 scale-[0.84] cursor-pointer -rotate-3 z-15 group"
              >
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={`side-inner-left-${item.id}`}
                    initial={{
                      x: direction > 0 ? 30 : -30,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: EASING },
                    }}
                    exit={{
                      x: direction > 0 ? -30 : 30,
                      opacity: 0,
                      transition: { duration: 0.35, ease: EASING },
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-[170px] sm:w-[190px] h-[205px] sm:h-[235px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="relative -mt-16 -mr-12 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-12">
                      <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })()}

          {/* ===================================== */}
          {/* ACTIVE CENTER HERO PRODUCT ON PODIUM */}
          {/* ===================================== */}
          <div className="relative z-25 flex flex-col items-center justify-end">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={`center-hero-${activeFlavor.id}`}
                initial={{
                  x: direction > 0 ? 110 : -110,
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  x: -24, // Symmetrical counter-balance for the single right khakhra disc
                  opacity: 1,
                  scale: 1,
                  transition: {
                    x: { duration: 0.55, ease: EASING },
                    scale: { duration: 0.55, ease: EASING },
                    opacity: { duration: 0.4 },
                  },
                }}
                exit={{
                  x: direction > 0 ? -110 : 110,
                  opacity: 0,
                  scale: 0.92,
                  transition: {
                    x: { duration: 0.45, ease: EASING },
                    scale: { duration: 0.45, ease: EASING },
                    opacity: { duration: 0.3 },
                  },
                }}
                className="relative flex items-end justify-center"
              >
                {/* Center Hero Packet */}
                <div className="relative w-[220px] sm:w-[270px] md:w-[310px] h-[260px] sm:h-[320px] md:h-[370px] z-25 filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.42)]">
                  <Image
                    src={activeFlavor.packetImg}
                    alt={activeFlavor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 220px, 310px"
                    className="object-contain"
                  />
                </div>

                {/* Right Khakhra Round - Rolls smoothly alongside the packet */}
                <motion.div
                  initial={{
                    x: direction > 0 ? 80 : -80,
                    rotate: direction > 0 ? 160 : -160,
                    opacity: 0,
                    scale: 0.85,
                  }}
                  animate={{
                    x: 0,
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      x: { duration: 0.58, ease: EASING },
                      rotate: { duration: 0.65, ease: EASING },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.58, ease: EASING },
                    },
                  }}
                  className="absolute -right-8 sm:-right-12 md:-right-16 -bottom-1 sm:-bottom-2 w-[150px] sm:w-[190px] md:w-[220px] h-[150px] sm:h-[190px] md:h-[220px] z-35 pointer-events-none filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.44)]"
                >
                  <Image
                    src={activeFlavor.discImg}
                    alt={`${activeFlavor.name} crisp round`}
                    fill
                    sizes="(max-width: 768px) 150px, 220px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ===================================== */}
          {/* INNER RIGHT PRODUCT (Offset +1) */}
          {/* ===================================== */}
          {(() => {
            const item = getItemAtOffset(1);
            return (
              <div
                onClick={goToNext}
                className="hidden md:flex absolute left-[calc(50%+245px)] lg:left-[calc(50%+275px)] xl:left-[calc(50%+310px)] -translate-x-1/2 bottom-2 sm:bottom-4 flex-col items-center opacity-85 hover:opacity-100 transition-opacity duration-300 scale-[0.84] cursor-pointer rotate-3 z-15 group"
              >
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={`side-inner-right-${item.id}`}
                    initial={{
                      x: direction > 0 ? 30 : -30,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: EASING },
                    }}
                    exit={{
                      x: direction > 0 ? -30 : 30,
                      opacity: 0,
                      transition: { duration: 0.35, ease: EASING },
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-[170px] sm:w-[190px] h-[205px] sm:h-[235px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="relative -mt-16 -mr-12 w-[105px] sm:w-[115px] h-[105px] sm:h-[115px] drop-shadow-xl transition-transform duration-500 group-hover:rotate-12">
                      <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                  setTimeout(() => setIsAnimating(false), 550);
                }}
                className="hidden lg:flex absolute left-[calc(50%+450px)] xl:left-[calc(50%+510px)] -translate-x-1/2 bottom-5 sm:bottom-7 flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 scale-[0.72] cursor-pointer rotate-6 z-10 group"
              >
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={`side-far-right-${item.id}`}
                    initial={{
                      x: direction > 0 ? 30 : -30,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: EASING },
                    }}
                    exit={{
                      x: direction > 0 ? -30 : 30,
                      opacity: 0,
                      transition: { duration: 0.35, ease: EASING },
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-[150px] sm:w-[170px] h-[180px] sm:h-[210px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105">
                      <Image src={item.packetImg} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="relative -mt-14 -mr-10 w-[90px] sm:w-[100px] h-[90px] sm:h-[100px] drop-shadow-lg transition-transform duration-500 group-hover:rotate-12">
                      <Image src={item.discImg} alt={item.name} fill className="object-contain" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })()}
        </div>
      </div>

    </section>
  );
}
