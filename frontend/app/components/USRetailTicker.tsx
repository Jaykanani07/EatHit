"use client";

import { MapPin, Sparkles } from "lucide-react";

const STORES_AND_CITIES = [
  "PATEL BROTHERS",
  "SUBZI MANDI",
  "APNA BAZAR",
  "EDISON, NJ",
  "DEVON AVE, CHICAGO",
  "DALLAS / FORT WORTH, TX",
  "PIONEER BLVD, ARTESIA CA",
  "FREMONT, CA",
  "LITTLE INDIA, QUEENS NY",
  "DECATUR, ATLANTA GA",
  "TAMPA, FL",
  "HILLCROFT, HOUSTON TX",
  "INDIA SQUARE, JERSEY CITY",
  "CHARLOTTE, NC",
  "ISLAND GROCERS, LONG ISLAND",
];

export default function USRetailTicker() {
  return (
    <div className="relative w-full bg-[#DC2626] text-white py-3.5 overflow-hidden shadow-inner select-none z-20">
      <div className="flex w-max items-center animate-marquee-left">
        {/* Sequence 1 */}
        {STORES_AND_CITIES.map((item, idx) => (
          <div key={`s1-${idx}`} className="flex items-center gap-4 px-3 sm:px-5">
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5 font-[family-name:var(--font-outfit)]">
              {item.includes("PATEL") || item.includes("MANDI") || item.includes("APNA") ? (
                <Sparkles className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
              ) : (
                <MapPin className="w-3 h-3 text-white/80 shrink-0" />
              )}
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        ))}

        {/* Sequence 2 (Duplicate for smooth infinite seamless loop) */}
        {STORES_AND_CITIES.map((item, idx) => (
          <div key={`s2-${idx}`} className="flex items-center gap-4 px-3 sm:px-5">
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5 font-[family-name:var(--font-outfit)]">
              {item.includes("PATEL") || item.includes("MANDI") || item.includes("APNA") ? (
                <Sparkles className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
              ) : (
                <MapPin className="w-3 h-3 text-white/80 shrink-0" />
              )}
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
