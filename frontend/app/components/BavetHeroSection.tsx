"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Volume2,
  Sparkles,
  Flame,
  ArrowUpRight,
  Shield,
  Leaf,
} from "lucide-react";

interface Flavor {
  num: string;
  id: string;
  name: string;
  gujarati: string;
  headline: string;
  sub: string;
  spice: string;
  spiceCount: number;
  color: string;
  bgGlow: string;
  packet: string;
  disc: string;
  storeBadge: string;
}

const FLAVORS: Flavor[] = [
  {
    num: "01",
    id: "masala",
    name: "Masala Khakhra",
    gujarati: "મસાલા ખાખરા",
    headline: "FIERY KASHMIRI CHILI",
    sub: "Slow-roasted whole wheat infused with hand-ground spices & roasted cumin.",
    spice: "Medium Spicy",
    spiceCount: 3,
    color: "#DC2626",
    bgGlow: "rgba(220, 38, 38, 0.25)",
    packet: "/images/products/masala-pouch.png",
    disc: "/images/products/masala-khakhra.png",
    storeBadge: "Patel Brothers Best Seller",
  },
  {
    num: "02",
    id: "jeera",
    name: "Jeera Khakhra",
    gujarati: "જીરા ખાખરા",
    headline: "TOASTED CUMIN CRUNCH",
    sub: "Earthy roasted cumin seeds folded into golden stone-ground wheat.",
    spice: "Mild & Soothing",
    spiceCount: 1,
    color: "#D97706",
    bgGlow: "rgba(217, 119, 6, 0.25)",
    packet: "/images/products/jeera-pouch.png",
    disc: "/images/products/jeera-khakhra.png",
    storeBadge: "US Diaspora Favorite",
  },
  {
    num: "03",
    id: "methi",
    name: "Methi Khakhra",
    gujarati: "મેથી ખાખરા",
    headline: "HERBAL FENUGREEK LEAF",
    sub: "Sun-dried Gujarati kasuri methi with pure Himalayan rock salt.",
    spice: "Zesty & Herbaceous",
    spiceCount: 2,
    color: "#15803D",
    bgGlow: "rgba(21, 128, 61, 0.25)",
    packet: "/images/products/methi-pouch.png",
    disc: "/images/products/methi-khakhra.png",
    storeBadge: "Authentic Tea-Time Choice",
  },
  {
    num: "04",
    id: "plain",
    name: "Plain Khakhra",
    gujarati: "સાદા ખાખરા",
    headline: "GOLDEN WHOLE WHEAT",
    sub: "The timeless heritage classic: pure roasted wheat, cold-pressed oil, rock salt.",
    spice: "Gentle Classic",
    spiceCount: 0,
    color: "#CA8A04",
    bgGlow: "rgba(202, 138, 4, 0.25)",
    packet: "/images/products/plain-pouch.png",
    disc: "/images/products/plain-khakhra.png",
    storeBadge: "Everyday Staple",
  },
  {
    num: "05",
    id: "lasun",
    name: "Lasun Khakhra",
    gujarati: "લસણ ખાખરા",
    headline: "ROASTED GARLIC PUNCH",
    sub: "Slow-roasted garlic puree folded into dough for unforgettable savory aroma.",
    spice: "Savory & Punchy",
    spiceCount: 3,
    color: "#EA580C",
    bgGlow: "rgba(234, 88, 12, 0.25)",
    packet: "/images/products/lasun-pouch.png",
    disc: "/images/products/lasan-khakhra.png",
    storeBadge: "Garlic Lover's Crunch",
  },
];

export default function BavetHeroSection() {
  const [activeFlavor, setActiveFlavor] = useState<Flavor>(FLAVORS[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isCrunching, setIsCrunching] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synthesize crunch sound
  const playCrunch = () => {
    try {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.25;
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
      filter.frequency.setValueAtTime(2400, audioCtx.currentTime);
      filter.Q.setValueAtTime(2.5, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();

      setIsCrunching(true);
      const newParticles = Array.from({ length: 16 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 220,
      }));
      setParticles(newParticles);

      setTimeout(() => {
        setIsCrunching(false);
        setParticles([]);
      }, 700);
    } catch {
      // Audio fallback
    }
  };

  // Parallax tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -9,
      y: (x / (rect.width / 2)) * 9,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full min-h-screen pt-24 pb-8 flex flex-col justify-between overflow-hidden bg-[#FBF8F3] select-none">
      {/* ========================================================= */}
      {/* 1. SLANTED KINETIC CINEMA MARQUEE (EXACTLY AS USER REQUESTED) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
        <div
          className="w-[145vw] -rotate-[7deg] flex flex-col gap-6 sm:gap-10 opacity-[0.16] transition-colors duration-700"
          style={{ color: activeFlavor.color }}
        >
          {/* Row 1: Solid Text (Left Scroll) */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT LITE • 100% BAKED NOT FRIED • GUJARATI CRUNCH • ZERO TRANS FAT •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              EATHIT LITE • 100% BAKED NOT FRIED • GUJARATI CRUNCH • ZERO TRANS FAT •
            </span>
          </div>

          {/* Row 2: Hollow Stroke Outline Text (Right Scroll) */}
          <div className="animate-marquee-right whitespace-nowrap flex items-center gap-8 text-outline-brand-thick">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              PATEL BROTHERS • SUBZI MANDI • APNA BAZAR • 250+ US STORES • LOCAL GROCERS •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              PATEL BROTHERS • SUBZI MANDI • APNA BAZAR • 250+ US STORES • LOCAL GROCERS •
            </span>
          </div>

          {/* Row 3: Solid Text (Left Scroll) */}
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-8">
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              VACUUM SEALED • WHOLE WHEAT • LIGHT ON STOMACH • GUILT-FREE •
            </span>
            <span className="font-black text-7xl sm:text-[9.5rem] tracking-tighter uppercase font-[family-name:var(--font-outfit)] leading-none">
              VACUUM SEALED • WHOLE WHEAT • LIGHT ON STOMACH • GUILT-FREE •
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Ambient Glow Behind Product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 z-0 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${activeFlavor.bgGlow} 0%, rgba(251, 248, 243, 0) 70%)`,
        }}
      />

      {/* ========================================================= */}
      {/* 2. TOP EDITORIAL META STRIP */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#19120D]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#19120D]">
              NOW STOCKED IN US RETAIL
            </span>
            <span className="text-[#6B5E52] text-xs">/</span>
            <span className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
              Patel Brothers & Subzi Mandi
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#6B5E52]">
            <span className="flex items-center gap-1.5 text-[#19120D]">
              <Leaf className="w-3.5 h-3.5 text-[#15803D]" /> 100% Baked Not Fried
            </span>
            <span className="flex items-center gap-1.5 text-[#19120D]">
              <Shield className="w-3.5 h-3.5 text-[#0D9488]" /> Vacuum Fresh Sealed
            </span>
            <span className="hidden md:inline text-[#19120D]">
              200g (7.05 oz) Packs
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. CINEMATIC MONUMENTAL STAGE (CENTERPIECE) */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center justify-center my-4"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Editorial Headline & Flavor Info */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span
              className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3 inline-block transition-colors"
              style={{
                backgroundColor: `${activeFlavor.color}15`,
                color: activeFlavor.color,
              }}
            >
              {activeFlavor.num} • {activeFlavor.name}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)] leading-[0.98] mb-3">
              {activeFlavor.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#6B5E52] leading-relaxed mb-6 max-w-md font-medium">
              {activeFlavor.sub}
            </p>

            {/* Spice and Gujarati script tag */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#19120D]/10 shadow-sm mb-6">
              <span className="text-base font-serif italic text-[#19120D]">
                {activeFlavor.gujarati}
              </span>
              <span className="w-px h-4 bg-[#19120D]/15" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < activeFlavor.spiceCount
                        ? "text-[#DC2626] fill-[#DC2626]"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-[#19120D] ml-1">
                  {activeFlavor.spice}
                </span>
              </div>
            </div>

            {/* CTA: Find at Patel Brothers */}
            <a
              href="https://maps.google.com/?q=Patel+Brothers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#19120D] hover:bg-[#DC2626] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group"
            >
              <MapPin className="w-4 h-4 text-[#EAB308] group-hover:text-white transition-colors" />
              Find at Patel Brothers
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* CENTER / RIGHT: Monumental 3D Physical Showcase */}
          <div className="lg:col-span-8 relative flex items-center justify-center min-h-[420px] sm:min-h-[490px]">
            {/* Massive Watermark Word Behind Product */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <span
                className="font-black text-[18vw] sm:text-[13vw] uppercase tracking-tighter text-[#19120D]/[0.05] font-[family-name:var(--font-outfit)] leading-none"
              >
                CRISP
              </span>
            </div>

            {/* 3D Tilt Container */}
            <div
              className="relative w-full max-w-[580px] h-[400px] sm:h-[460px] flex items-center justify-center preserve-3d transition-transform duration-200 ease-out z-10"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Floor Shadow */}
              <div className="absolute bottom-2 sm:bottom-4 w-[420px] sm:w-[500px] h-10 bg-black/20 blur-2xl rounded-full transform scale-y-40 pointer-events-none" />

              {/* 1. Large Transparent Cutout Packet */}
              <div className="relative w-[300px] sm:w-[380px] h-[360px] sm:h-[440px] z-10 animate-float-packet filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]">
                <Image
                  src={activeFlavor.packet}
                  alt={activeFlavor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 380px"
                  className="object-contain"
                />
              </div>

              {/* 2. Monumental Floating Crisp Khakhra Disc (Interactive) */}
              <div
                onClick={playCrunch}
                className="absolute -right-2 sm:right-2 bottom-4 sm:bottom-10 w-[210px] sm:w-[260px] h-[210px] sm:h-[260px] z-20 animate-float-disc filter drop-shadow-[0_30px_40px_rgba(0,0,0,0.32)] cursor-pointer group"
                title="Tap disc to hear the crunch!"
              >
                <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={activeFlavor.disc}
                    alt={`${activeFlavor.name} Disc`}
                    fill
                    sizes="(max-width: 768px) 210px, 260px"
                    className="object-contain"
                  />
                  {/* Subtle gloss shine overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

              {/* 3. Bavet Spinning Circular Badge Stamp */}
              <div className="absolute -top-3 right-6 sm:right-10 w-32 sm:w-36 h-32 sm:h-36 z-30 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center animate-circle-spin">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="circleStampPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text
                      className="text-[9.5px] uppercase font-bold tracking-[2.5px]"
                      style={{ fill: activeFlavor.color }}
                    >
                      <textPath href="#circleStampPath">
                        ★ AUTHENTIC GUJARATI KHAKHRA ★ 100% BAKED ★
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#19120D] text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                </div>
              </div>

              {/* 4. Interactive "Tap For Crunch" Button Tag */}
              <button
                onClick={playCrunch}
                className="absolute left-2 sm:left-4 bottom-8 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#19120D]/10 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-[#19120D] font-black text-xs uppercase tracking-wider"
              >
                <Volume2
                  className={`w-4 h-4 ${
                    isCrunching ? "text-[#DC2626] scale-125" : "text-[#6B5E52]"
                  } transition-transform`}
                />
                <span>Hear Crunch</span>
              </button>

              {/* Crunch Particle Bursts */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full bg-[#EAB308] z-40 pointer-events-none animate-ping"
                  style={{
                    transform: `translate(${p.x}px, ${p.y}px)`,
                    boxShadow: "0 0 8px #CA8A04",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. LUXURY NUMBERED FLAVOR DOCK (BOTTOM SELECTOR) */}
      {/* ========================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="bg-white/90 backdrop-blur-xl p-2 sm:p-3 rounded-3xl border border-[#19120D]/10 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {FLAVORS.map((f) => {
              const isSelected = activeFlavor.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFlavor(f)}
                  className={`relative flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all duration-300 text-left ${
                    isSelected
                      ? "bg-[#19120D] text-white shadow-lg -translate-y-1"
                      : "bg-[#FBF8F3] hover:bg-neutral-100 text-[#19120D]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase transition-colors"
                      style={{ color: isSelected ? "#EAB308" : f.color }}
                    >
                      {f.num}
                    </span>
                    <span className="font-extrabold text-xs sm:text-sm uppercase tracking-tight font-[family-name:var(--font-outfit)] truncate">
                      {f.name.replace(" Khakhra", "")}
                    </span>
                  </div>

                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-white/30"
                    style={{ backgroundColor: f.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
