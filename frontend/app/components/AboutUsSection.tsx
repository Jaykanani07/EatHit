"use client";

import React from "react";
import Image from "next/image";
import {
  Flame,
  Wheat,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

// ============================================================================
// 1. AUTHENTIC HERITAGE DATA & STATS
// ============================================================================

const STATS = [
  { value: "100%", label: "TAWA ROASTED", sublabel: "0% Deep Fried" },
  { value: "0g", label: "TRANS FAT", sublabel: "Zero Palm Oil Baths" },
  { value: "45s", label: "IRON PRESS TIME", sublabel: "Per Hand-Roasted Disc" },
  { value: "5", label: "HERITAGE FLAVOURS", sublabel: "Authentic Gujarati Recipes" },
];

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      aria-label="About EatHit — The Authentic Gujarati Khakhra Craft"
      className="relative w-full bg-[#F2F0E6] text-[#19120D] pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden select-none"
    >
      {/* Subtle authentic paper grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#19120D 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* ==================================================================== */}
      {/* 1. TOP TRANSITION MARQUEE RIBBON (BRIDGE FROM SECTION 3)              */}
      {/* ==================================================================== */}
      <div className="w-full border-y border-[#19120D]/10 bg-[#FAF8F2] py-3.5 mb-16 sm:mb-24 overflow-hidden shadow-xs">
        <div className="flex w-max items-center animate-marquee-left">
          {[1, 2, 3].map((loop) => (
            <div
              key={loop}
              className="flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 text-xs sm:text-sm font-black uppercase tracking-[0.2em] font-[family-name:var(--font-bebas)] text-[#C33130]"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#C33130]" />
                100% ROASTED ON IRON TAWA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C33130]/40" />
              <span>NOT A CHIP • NOT A CRACKER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C33130]/40" />
              <span className="text-[#19120D]">ESTABLISHED IN GUJARAT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C33130]/40" />
              <span>THE AUTHENTIC CRUNCH OF INDIA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C33130]/40" />
              <span className="text-[#19120D]">STONE-GROUND WHOLE WHEAT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C33130]/40" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================== */}
        {/* 2. SECTION HEADER & MANIFESTO TITLE                                */}
        {/* ================================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          {/* Authentic Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C33130]/10 border border-[#C33130]/25 text-[#C33130] text-xs sm:text-sm font-black tracking-widest uppercase mb-6 font-[family-name:var(--font-bebas)]">
            <span className="w-2 h-2 rounded-full bg-[#C33130] animate-ping" />
            THE EAT HIT STORY & CULINARY MANIFESTO
          </div>

          {/* Bavarian/Bavet Poster Headline with Outlined & Solid Contrast */}
          <h2 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-[clamp(2.8rem,7.5vw,7.2rem)] uppercase tracking-tight leading-[0.88] m-0 font-normal text-[#C33130]">
            <span className="block text-[#19120D]">BORN ON THE TAWA.</span>
            <span className="block mt-1 sm:mt-2 bavet-outline-text">
              HONEST TO THE CRUNCH.
            </span>
          </h2>

          {/* Authentic Handwritten Margin Annotation */}
          <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#C33130] mt-4 -rotate-1 font-medium">
            ~ No deep fryers. No secret palm oil baths. Just pure Gujarati craftsmanship ~
          </p>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#19120D]/80 leading-relaxed font-[family-name:var(--font-jakarta)] max-w-2xl mx-auto font-normal">
            Centuries ago in Gujarat, no leftover rotli was ever wasted. Mothers and grandmothers pressed them slow and low against seasoned iron tawas using a wooden <em>vadharo</em> until crisp as glass. That honest, unadulterated crunch is what we bring to every EatHit pack.
          </p>
        </div>

        {/* ================================================================== */}
        {/* 3. DUAL-COLUMN EDITORIAL: THE ORIGIN & THE PHILOSOPHY              */}
        {/* ================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 sm:mb-28">
            {/* Left Column: The Narrative Text (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="border-l-4 border-[#C33130] pl-6 sm:pl-8 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C33130] font-[family-name:var(--font-bebas)]">
                  THE CRAFT OF THE WOODEN PRESS (વધારો)
                </span>
                <h3 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-3xl sm:text-5xl uppercase tracking-tight leading-none text-[#19120D]">
                  WE DIDN&apos;T REINVENT THE SNACK. <br />
                  <span className="text-[#C33130]">WE PROTECTED IT.</span>
                </h3>
              </div>

              <p className="text-[#19120D]/85 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-jakarta)]">
                Somewhere in the last twenty years, the snack industry made a silent pact: drown everything in cheap palm oil, coat it with artificial dust, puff up the bag with nitrogen, and call it food.
              </p>

              <p className="text-[#19120D]/85 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-jakarta)]">
                EatHit started with a stubborn refusal. We didn&apos;t want extruded potato pastes or chemical seasonings. We wanted the khakhra we grew up with in Ahmedabad and Surat—where the kitchen smelled of freshly roasted cumin seeds, toasted wheat bran, and cold-pressed mustard oil warming over a cast-iron flame.
              </p>

              {/* Authentic Stamp Box with Real Founder/Baker Ethos */}
              <div className="p-6 sm:p-7 rounded-xl bg-[#FAF8F2] border border-[#19120D]/10 relative shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C33130] text-white flex items-center justify-center shrink-0 font-['Krisha',var(--font-bebas),sans-serif] text-xl">
                    EH
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#19120D] uppercase tracking-wider font-[family-name:var(--font-bebas)]">
                      THE EATHIT GOLDEN RULE
                    </h4>
                    <p className="text-sm sm:text-base text-[#19120D]/75 mt-1 font-[family-name:var(--font-jakarta)] italic">
                      &ldquo;If a snack cannot be snapped with one thumb while holding a hot cutting chai in the other hand, it has no business being on your table.&rdquo;
                    </p>
                    <span className="block mt-3 text-xs font-semibold text-[#C33130] tracking-wider uppercase">
                      — Master Baker & Co-Founders, EatHit Foods
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Proof Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#19120D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C33130] shrink-0" />
                  <span>100% Stone-Ground Wheat</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#19120D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C33130] shrink-0" />
                  <span>Zero Deep Frying</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#19120D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C33130] shrink-0" />
                  <span>Zero Added Preservatives</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Stage with Real Khakhra & Spices (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* Rotating Vintage Brand Seal Backdrop */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C33130]/30 animate-circle-spin" />

                {/* Radiant Warm Backglow */}
                <div className="absolute inset-8 rounded-full bg-[#C33130]/10 blur-2xl animate-pulse-glow" />

                {/* The Real Khakhra Hero Disc Asset */}
                <div className="relative w-[82%] h-[82%] rounded-full select-none cursor-pointer transition-transform duration-500 hover:scale-105">
                  <Image
                    src="/images/products/masala-khakhra.png"
                    alt="Authentic EatHit Masala Khakhra Tawa Roasted Disc"
                    fill
                    sizes="(max-width: 768px) 300px, 420px"
                    className="object-contain drop-shadow-[0_20px_28px_rgba(74,45,35,0.22)] select-none pointer-events-none"
                    priority
                  />

                  {/* Floating Tactile Callout 1: 100% Whole Wheat */}
                  <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-[#19120D]/10 shadow-md flex items-center gap-2 text-xs font-bold text-[#19120D] rotate-2">
                    <Wheat className="w-3.5 h-3.5 text-[#C33130]" />
                    <span>100% Sharbati Gehu</span>
                  </div>

                  {/* Floating Tactile Callout 2: Tawa Pressed */}
                  <div className="absolute -bottom-3 -left-2 sm:-left-4 bg-[#C33130] text-white px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-2 text-xs font-bold -rotate-3">
                    <Flame className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>Pressed on Iron Griddle</span>
                  </div>
                </div>

                {/* Gujarati Script Floating Cultural Watermark */}
                <div className="absolute -bottom-6 right-0 font-['Caveat',cursive] text-2xl text-[#19120D]/40 font-bold">
                  અસલી ગુજરાતી ખાખરા
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* 4. BIG EDITORIAL STATS GRID                                        */}
          {/* ================================================================== */}
          <div className="rounded-3xl bg-[#19120D] text-white p-8 sm:p-14 lg:p-16 mb-20 sm:mb-28 relative overflow-hidden shadow-xl">
            {/* Subtle Red Warm Corner Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C33130]/20 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <span className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-5xl sm:text-7xl lg:text-8xl text-[#C33130] block leading-none">
                    {stat.value}
                  </span>
                  <span className="block text-sm sm:text-base font-black tracking-widest uppercase font-[family-name:var(--font-bebas)] mt-2 text-white">
                    {stat.label}
                  </span>
                  <span className="block text-xs sm:text-sm text-white/60 font-[family-name:var(--font-jakarta)] mt-0.5">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-jakarta)] max-w-xl">
                Exported worldwide with love from Gujarat. Available in independent Indian grocers, Patel Brothers, and Subzi Mandi stores across North America.
              </p>
              <a
                href="#share-the-crunch"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("share-the-crunch")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C33130] hover:bg-[#A82810] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors font-[family-name:var(--font-bebas)] cursor-pointer shrink-0"
              >
                <span>EXPLORE ALL FLAVOURS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ================================================================== */}
          {/* 5. FOOTER: WARM BRAND CONCLUSION & GROCERY LOCATION TICKER         */}
          {/* ================================================================== */}
          <footer id="footer" className="pt-8 border-t border-[#19120D]/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
              {/* Col 1: Brand Logo & Mission (5 Cols) */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#EAB308]/60 shadow-md bg-[#105E34]">
                    <Image
                      src="/images/eathit-logo.jpg"
                      alt="EatHit Official Logo"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-2xl uppercase tracking-wider text-[#19120D] block leading-none">
                      EAT HIT
                    </span>
                    <span className="text-[11px] font-bold text-[#C33130] uppercase tracking-widest font-[family-name:var(--font-bebas)]">
                      THE CRUNCH OF INDIA
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#19120D]/75 leading-relaxed font-[family-name:var(--font-jakarta)] max-w-sm">
                  Authentic Gujarati Khakhra crafted with 100% stone-ground whole wheat, roasted on hot cast-iron tawas, and seasoned with honest whole spices.
                </p>

                <div className="pt-2 text-xs text-[#19120D]/60 space-y-1 font-[family-name:var(--font-jakarta)]">
                  <p>US & International Distribution: <span className="font-semibold text-[#19120D]">hello@eathitfoods.com</span></p>
                  <p>Origin: Ahmedabad, Gujarat, India</p>
                </div>
              </div>

              {/* Col 2: Quick Links (3 Cols) */}
              <div className="md:col-span-3 space-y-3">
                <h5 className="text-xs font-black uppercase tracking-widest text-[#C33130] font-[family-name:var(--font-bebas)]">
                  DISCOVER
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm font-semibold text-[#19120D]/80 font-[family-name:var(--font-jakarta)]">
                  <li>
                    <a
                      href="#share-the-crunch"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("share-the-crunch")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-[#C33130] transition-colors cursor-pointer"
                    >
                      The 5 Flavour Plates
                    </a>
                  </li>
                  <li>
                    <a
                      href="#brand-statement"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("brand-statement")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-[#C33130] transition-colors cursor-pointer"
                    >
                      100% Roasted Manifesto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about-us"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-[#C33130] transition-colors cursor-pointer"
                    >
                      The Tawa & Vadharo Craft
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: Where To Buy / US Retailers (4 Cols) */}
              <div className="md:col-span-4 space-y-3">
                <h5 className="text-xs font-black uppercase tracking-widest text-[#C33130] font-[family-name:var(--font-bebas)]">
                  WHERE TO FIND EATHIT
                </h5>
                <p className="text-xs text-[#19120D]/75 leading-relaxed font-[family-name:var(--font-jakarta)]">
                  Look for EatHit packets in the snack and roti aisle at your favorite South Asian grocery stores:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "Patel Brothers",
                    "Subzi Mandi",
                    "Apna Bazar",
                    "India Cash & Carry",
                    "Cherians",
                    "New India Bazar",
                  ].map((retailer, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#19120D]/10 text-[11px] font-semibold text-[#19120D]/80"
                    >
                      {retailer}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright & Disclaimer Bar */}
            <div className="pt-6 pb-4 border-t border-[#19120D]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#19120D]/60 font-[family-name:var(--font-jakarta)]">
              <p>© {new Date().getFullYear()} EatHit Foods Inc. All rights reserved. 100% Roasted, Never Fried.</p>
              <p className="font-['Caveat',cursive] text-base text-[#C33130]">
                “Chai in one hand, Khakhra in the other.”
              </p>
            </div>
          </footer>
        </div>
    </section>
  );
}
