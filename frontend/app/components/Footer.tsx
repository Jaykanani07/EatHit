"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { FLAVOUR_PLATES } from "./ShareTheCrunchSection";

/* -------------------------------------------------------------------------- */
/*  EatHit — Site footer styled as the back-of-pack label of a pouch.         */
/* -------------------------------------------------------------------------- */

const INSTAGRAM_URL = "https://www.instagram.com/eathitfoods";
const EMAIL = "hello@eathitfoods.com";

/* Deterministic torn-paper edge (same technique as CrunchRainSection) so the
   server and client markup always match. Drawn upside-down: the parchment
   tears upward into whatever sits above the footer. */
function tornPath(seed: number, base: number, amp: number, step: number) {
  const W = 1440;
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let d = `M0 46 H${W} V${base}`;
  for (let x = W; x >= 0; x -= step) {
    d += ` L${x} ${(base + (rnd() - 0.5) * 2 * amp).toFixed(1)}`;
  }
  return `${d} Z`;
}
const TORN_BACK = tornPath(11, 15, 9, 26);
const TORN_FRONT = tornPath(29, 24, 8, 26);

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
];

const FACTS = [
  { label: "Roasted", value: "100%" },
  { label: "Fried", value: "0%" },
  { label: "Serving suggestion", value: "1 cup chai, 2 friends" },
];

const OUTLINE_RED: React.CSSProperties = {
  color: "transparent",
  WebkitTextStroke: "clamp(1.6px, 0.2vw, 2.4px) #C33130",
  paintOrder: "stroke fill",
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="-mx-6 mb-5 border-b-[7px] border-brand-dark px-6 pb-3 pt-4 font-[family-name:var(--font-bebas)] text-lg sm:-mx-9 sm:px-9 sm:text-xl font-normal leading-none tracking-[0.14em] text-brand-dark">
      {children}
    </h3>
  );
}

function Stamp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-2 -top-16 h-28 w-28 sm:-right-9 sm:-top-[4.5rem] sm:h-36 sm:w-36"
    >
      <svg viewBox="0 0 150 150" className="h-full w-full -rotate-12">
        <defs>
          <path id="eathit-stamp-ring" d="M75 75 m-56 0 a56 56 0 1 1 112 0 a56 56 0 1 1 -112 0" />
        </defs>
        <circle cx="75" cy="75" r="72" fill="#F2F0E6" stroke="#C33130" strokeWidth="3" />
        <circle cx="75" cy="75" r="42" fill="none" stroke="#C33130" strokeWidth="1.5" />
        {/* Only the lettering ring turns, like a stamp being pressed */}
        <g className="origin-center animate-circle-spin motion-reduce:animate-none">
          <text
            fill="#C33130"
            fontSize="16"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
          >
            {/* textLength pins the phrase to the ring's circumference (2π·56) so it never overlaps */}
            <textPath href="#eathit-stamp-ring" textLength="350" lengthAdjust="spacing">
              100% ROASTED • NEVER FRIED • 100% ROASTED • NEVER FRIED •
            </textPath>
          </text>
        </g>
        <text x="75" y="73" textAnchor="middle" fill="#C33130" fontSize="32" className="font-krisha">
          EAT
        </text>
        <text x="75" y="102" textAnchor="middle" fill="#C33130" fontSize="32" className="font-krisha">
          HIT
        </text>
      </svg>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="relative z-10 bg-[#F2F0E6] text-[#2B1810] [clip-path:inset(-60px_0_0_0)]"
    >
      {/* Torn parchment edge tearing up out of the section above */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 46"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-px h-[clamp(26px,3.4vw,48px)] w-full -translate-y-full drop-shadow-[0_-3px_2px_rgba(70,6,6,0.25)]"
      >
        <path d={TORN_BACK} fill="#E2D9C6" />
        <path d={TORN_FRONT} fill="#F2F0E6" />
      </svg>

      <div className="mx-auto max-w-[90rem] px-4 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        {/* Sign-off */}
        <div className="mb-16 flex flex-col items-start gap-3 sm:mb-12 sm:flex-row sm:items-end sm:gap-7">
          <p className="m-0 font-krisha text-[clamp(3rem,6.5vw,5.6rem)] uppercase leading-[0.86] tracking-[0.01em] text-brand-red">
            Stay <span style={OUTLINE_RED}>crunchy.</span>
          </p>
          <p className="m-0 mb-1.5 -rotate-3 whitespace-nowrap font-[family-name:var(--font-caveat)] text-[2rem] font-bold leading-none text-[#D48B28]">
            see you at chai time →
          </p>
        </div>

        {/* Back-of-pack label */}
        <div className="relative grid grid-cols-1 border-[3px] border-brand-dark md:grid-cols-[1.3fr_1fr_0.9fr]">
          <Stamp />

          {/* Made by */}
          <div className="px-6 pb-9 sm:px-9 sm:pb-11">
            <ColumnHeading>Made by</ColumnHeading>
            <div className="mb-5 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem] overflow-hidden rounded-full border-2 border-[#EAB308]/60 bg-[#105E34]">
                <Image
                  src="/images/eathit-logo.jpg"
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
              <span className="font-krisha text-[2rem] leading-none sm:text-[2.4rem] tracking-[0.02em] text-brand-dark">
                EatHit Foods
              </span>
            </div>
            <p className="m-0 max-w-md text-base leading-relaxed sm:text-[17px] text-[#2B1810]/80">
              Thin, crisp and roasted — never fried. Made for chai breaks, desk
              drawers and passing around with friends.
            </p>
            <dl className="m-0 mt-6 border-t-[1.5px] border-brand-dark">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`flex justify-between gap-4 py-3 text-sm leading-none sm:text-[15px] ${
                    i === FACTS.length - 1
                      ? "border-b-[3px] border-brand-dark"
                      : "border-b border-brand-dark/20"
                  }`}
                >
                  <dt className="font-semibold text-brand-dark">{fact.label}</dt>
                  <dd className="m-0 text-right font-medium text-brand-dark/70">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The flavours */}
          <div className="border-t-[1.5px] border-brand-dark px-6 pb-9 sm:px-9 sm:pb-11 md:border-l-[1.5px] md:border-t-0">
            <ColumnHeading>The flavours</ColumnHeading>
            <ul className="m-0 list-none p-0">
              {FLAVOUR_PLATES.map((plate) => (
                <li key={plate.id} className="flex items-baseline gap-2.5 py-2.5">
                  <span className="w-6 shrink-0 font-[family-name:var(--font-bebas)] text-[15px] tracking-[0.06em] text-brand-red">
                    {plate.num}
                  </span>
                  <span className="text-base font-semibold text-brand-dark sm:text-[17px]">
                    {plate.name.replace(/\s*Khakhra$/i, "")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 -translate-y-1 border-b-[1.5px] border-dotted border-brand-dark/35"
                  />
                  <span className="whitespace-nowrap font-[family-name:var(--font-bebas)] text-sm tracking-[0.08em] sm:text-base text-brand-dark/60">
                    {plate.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Say hello */}
          <div className="border-t-[1.5px] border-brand-dark px-6 pb-9 sm:px-9 sm:pb-11 md:border-l-[1.5px] md:border-t-0">
            <ColumnHeading>Say hello</ColumnHeading>
            <ul className="m-0 list-none space-y-2 p-0 text-base font-semibold sm:text-[17px]">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block py-1 text-brand-red underline underline-offset-4 transition-colors hover:text-[#A82810]"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 py-1 text-brand-dark transition-colors hover:text-brand-red"
                >
                  Instagram
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block py-1 text-brand-dark transition-colors hover:text-brand-red"
                >
                  Contact page
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="mt-10 overflow-hidden select-none pb-[clamp(1rem,2vw,2rem)] sm:mt-14">
        <div
          className="whitespace-nowrap text-center font-krisha text-[27vw] leading-[0.86] tracking-[0.02em] 2xl:text-[32rem]"
          style={{
            color: "transparent",
            WebkitTextStroke: "clamp(1.6px, 0.2vw, 2.6px) #C33130",
          }}
        >
          EAT HIT
        </div>
      </div>

      {/* Legal bar — the very last line of every page */}
      <div className="border-t-[1.5px] border-brand-dark">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-4 py-6 text-sm font-medium text-brand-dark/60 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <span>© {year} EatHit Foods Inc. All rights reserved.</span>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-dark transition-colors hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.04em] text-brand-dark transition-colors hover:text-brand-red"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
