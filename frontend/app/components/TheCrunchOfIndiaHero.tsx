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
}

const FLAVORS: FlavorItem[] = [
  {
    id: "masala",
    name: "Masala Khakhra",
    packetImg: "/images/products/masala-pouch.png",
    discImg: "/images/products/masala-khakhra.png",
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.16)",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    packetImg: "/images/products/methi-pouch.png",
    discImg: "/images/products/methi-khakhra.png",
    color: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.16)",
  },
  {
    id: "plain",
    name: "Plain Khakhra",
    packetImg: "/images/products/plain-pouch.png",
    discImg: "/images/products/plain-khakhra.png",
    color: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.18)",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    packetImg: "/images/products/jeera-pouch.png",
    discImg: "/images/products/jeera-khakhra.png",
    color: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.16)",
  },
  {
    id: "lasun",
    name: "Lasun Khakhra",
    packetImg: "/images/products/lasun-pouch.png",
    discImg: "/images/products/lasan-khakhra.png",
    color: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.16)",
  },
];

const EASING = [0.22, 1, 0.36, 1] as const;

interface SlotConfig {
  left: string;
  bottom: string;
  width: string;
  zIndex: number;
  opacity: number;
  scale: number;
  rotate: number;
  shadow: string;
  responsiveClass: string;
}

const SLOTS: Record<number, SlotConfig> = {
  [-2]: {
    left: "19.8%",
    bottom: "25.5%",
    width: "12.2%",
    zIndex: 20,
    opacity: 0.9,
    scale: 0.9,
    rotate: -1.5,
    shadow: "drop-shadow-[0_12px_22px_rgba(0,0,0,0.28)]",
    responsiveClass: "hidden lg:block",
  },
  [-1]: {
    left: "33%",
    bottom: "25%",
    width: "14.2%",
    zIndex: 25,
    opacity: 0.96,
    scale: 0.96,
    rotate: -0.5,
    shadow: "drop-shadow-[0_16px_26px_rgba(0,0,0,0.32)]",
    responsiveClass: "hidden md:block",
  },
  [0]: {
    left: "50%",
    bottom: "19.5%",
    width: "22.5%",
    zIndex: 30,
    opacity: 1,
    scale: 1,
    rotate: 0,
    shadow: "drop-shadow-[0_26px_40px_rgba(0,0,0,0.45)]",
    responsiveClass: "block",
  },
  [1]: {
    left: "67%",
    bottom: "25%",
    width: "14.2%",
    zIndex: 25,
    opacity: 0.96,
    scale: 0.96,
    rotate: 0.5,
    shadow: "drop-shadow-[0_16px_26px_rgba(0,0,0,0.32)]",
    responsiveClass: "hidden md:block",
  },
  [2]: {
    left: "80.2%",
    bottom: "25.5%",
    width: "12.2%",
    zIndex: 20,
    opacity: 0.9,
    scale: 0.9,
    rotate: 1.5,
    shadow: "drop-shadow-[0_12px_22px_rgba(0,0,0,0.28)]",
    responsiveClass: "hidden lg:block",
  },
};

function ProductSlot({
  flavor,
  index,
  currentIndex,
  prevIndex,
  onSelect,
}: {
  flavor: FlavorItem;
  index: number;
  currentIndex: number;
  prevIndex: number;
  onSelect: (offset: number, index: number) => void;
}) {
  const offset = (((index - currentIndex + 7) % 5) - 2) as -2 | -1 | 0 | 1 | 2;
  const prevOffset = (((index - prevIndex + 7) % 5) - 2) as -2 | -1 | 0 | 1 | 2;
  const isWrap = Math.abs(offset - prevOffset) > 2;
  const slot = SLOTS[offset];
  const isSelectable = offset !== 0;

  return (
    <motion.div
      onClick={() => isSelectable && onSelect(offset, index)}
      className={`absolute -translate-x-1/2 select-none ${slot.responsiveClass} ${slot.shadow} ${isSelectable ? "cursor-pointer hover:brightness-105 pointer-events-auto" : "cursor-default pointer-events-none"
        }`}
      initial={false}
      animate={{
        left: slot.left,
        bottom: slot.bottom,
        width: slot.width,
        zIndex: slot.zIndex,
        opacity: isWrap ? [0, slot.opacity] : slot.opacity,
        scale: slot.scale,
        rotate: slot.rotate,
      }}
      transition={
        isWrap
          ? {
            left: { duration: 0 },
            bottom: { duration: 0 },
            width: { duration: 0 },
            zIndex: { duration: 0 },
            scale: { duration: 0 },
            rotate: { duration: 0 },
            opacity: { duration: 0.35, ease: "easeOut" },
          }
          : {
            duration: 0.6,
            ease: EASING,
          }
      }
      style={{
        aspectRatio: "1145 / 1374",
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={flavor.packetImg}
          alt={flavor.name}
          fill
          priority={offset === 0}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 22vw"
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

function Disc({
  activeFlavor,
  direction,
}: {
  activeFlavor: FlavorItem;
  direction: number;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none -translate-x-1/2"
      style={{
        left: "57%",
        bottom: "16.8%",
        width: "13.8%",
        aspectRatio: "1 / 1",
        zIndex: 32,
      }}
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`disc-${activeFlavor.id}`}
          custom={direction}
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
              opacity: { duration: 0.35 },
              scale: { duration: 0.58, ease: EASING },
            },
          }}
          exit={{
            x: direction > 0 ? -80 : 80,
            rotate: direction > 0 ? -160 : 160,
            opacity: 0,
            scale: 0.85,
            transition: {
              x: { duration: 0.45, ease: EASING },
              rotate: { duration: 0.45, ease: EASING },
              opacity: { duration: 0.25 },
            },
          }}
          className="relative w-full h-full filter drop-shadow-[0_20px_32px_rgba(0,0,0,0.44)]"
        >
          <Image
            src={activeFlavor.discImg}
            alt={`${activeFlavor.name} crisp round`}
            fill
            priority
            sizes="15vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Bounded sequence covering all 5 khakhras starting from Plain (2):
// Step 0: Plain Khakhra (index 2)
// Step 1: Jeera Khakhra (index 3)
// Step 2: Lasun Khakhra (index 4)
// Step 3: Masala Khakhra (index 0)
// Step 4: Methi Khakhra (index 1) - Final product, bounded (does not loop)
const SEQUENCE: number[] = [2, 3, 4, 0, 1];

export default function TheCrunchOfIndiaHero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelLockRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const currentIndex = SEQUENCE[currentStep];
  const prevIndex = SEQUENCE[prevStep];

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
    if (currentStep >= SEQUENCE.length - 1) return; // Do not advance past the last khakhra
    setIsAnimating(true);
    setDirection(1);
    setPrevStep(currentStep);
    setCurrentStep((prev) => Math.min(prev + 1, SEQUENCE.length - 1));
    setTimeout(() => setIsAnimating(false), 550);
  }, [currentStep, isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    if (currentStep <= 0) return; // Do not move backwards past initial Plain khakhra
    setIsAnimating(true);
    setDirection(-1);
    setPrevStep(currentStep);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 550);
  }, [currentStep, isAnimating]);

  const handleSelect = useCallback(
    (offset: number, index: number) => {
      if (offset === 0 || isAnimating) return;
      const targetStep = SEQUENCE.indexOf(index);
      if (targetStep === -1 || targetStep === currentStep) return;
      setIsAnimating(true);
      setDirection(targetStep > currentStep ? 1 : -1);
      setPrevStep(currentStep);
      setCurrentStep(targetStep);
      setTimeout(() => setIsAnimating(false), 550);
    },
    [currentStep, isAnimating]
  );

  // Desktop wheel scroll advances carousel smoothly within bounds
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelLockRef.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) > 25) {
        if (delta > 0) {
          if (currentStep < SEQUENCE.length - 1) {
            wheelLockRef.current = true;
            goToNext();
            setTimeout(() => {
              wheelLockRef.current = false;
            }, 550);
          }
        } else {
          if (currentStep > 0) {
            wheelLockRef.current = true;
            goToPrev();
            setTimeout(() => {
              wheelLockRef.current = false;
            }, 550);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goToNext, goToPrev, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const activeFlavor = FLAVORS[currentIndex];

  return (
    <section
      className="relative w-full h-full max-h-screen overflow-hidden text-[#2B1810] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================= */}
      {/* 1. FIXED HEADER / TOP NAVIGATION (VIEWPORT OVERLAY)       */}
      {/* ========================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Official EatHit Brand Circular Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group" aria-label="EatHit Home">
            <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden shadow-md border-2 border-[#EAB308]/60 group-hover:scale-105 transition-transform bg-[#105E34]">
              <Image
                src="/images/eathit-logo.jpg"
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
      {/* 2. 16:9 PROPORTIONAL STAGE WITH PERCENTAGE-BASED LAYERS   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video w-[max(100vw,177.78vh)] @container">
          {/* Layer 1: Background (Cream wall, arch, tiled floor) */}
          <Image
            src="/new-images/background.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none select-none z-[1]"
          />

          {/* Layer 1b: Subtle warm ambient glow behind active center product */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-[2]"
            style={{
              background: `radial-gradient(ellipse 45% 35% at 50% 55%, ${activeFlavor.glowColor}, transparent 70%)`,
            }}
          />

          {/* Layer 4: Central Stone Rock Slab Podium */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none z-15"
            style={{
              width: "70%",
              bottom: "4.5%",
              aspectRatio: "2172 / 724",
            }}
          >
            <Image
              src="/new-images/rock.webp"
              alt=""
              aria-hidden
              fill
              priority
              sizes="75vw"
              className="object-contain"
            />
          </div>

          {/* Layer 5: Hero Headline (sitting on cream wall) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-20 w-full max-w-[90%]"
            style={{ top: "15%" }}
          >
            <h1
              className="font-black uppercase tracking-tight font-[family-name:var(--font-outfit)] leading-[0.84] text-[#24120A]"
              style={{ fontSize: "clamp(2rem, 4.8cqw, 5.8rem)" }}
            >
              THE CRUNCH
              <br />
              <span
                className="relative inline-block text-[#D48B28] font-[family-name:var(--font-caveat)] capitalize -rotate-2 -mt-1 sm:-mt-2 drop-shadow-sm"
                style={{ fontSize: "clamp(2.6rem, 6.2cqw, 7.5rem)" }}
              >
                Of India
                {/* Golden Brush Underline */}
                <svg
                  className="absolute -bottom-[0.5cqw] left-1/2 -translate-x-1/2 w-[85%] h-[1.2cqw] min-h-[10px] text-[#E69A28] pointer-events-none"
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

          {/* Layer 6: Product Carousel Slots & Center Disc */}
          <div className="absolute inset-0 pointer-events-none">
            {FLAVORS.map((flavor, i) => (
              <ProductSlot
                key={flavor.id}
                flavor={flavor}
                index={i}
                currentIndex={currentIndex}
                prevIndex={prevIndex}
                onSelect={handleSelect}
              />
            ))}

            {/* Center Disc (offset 0) */}
            <Disc activeFlavor={activeFlavor} direction={direction} />
          </div>

          {/* Layer 7: Foreground Spices, Wheat, Leaves Overlay */}
          <div
            className="absolute left-0 bottom-0 w-full pointer-events-none select-none z-35"
            style={{ aspectRatio: "2172 / 724" }}
          >
            <Image
              src="/new-images/bottom-masalas.webp"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
