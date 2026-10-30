"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MoveRight } from "lucide-react";

// ============================================================================
// STEP 2: CONTENT CONFIG
// All copy and assets in one place for 1-line changes
// ============================================================================
export const COPY = {
  headline: [
    "CHAI IN ONE HAND,",
    "KHAKHRA IN THE OTHER.",
    "THAT'S THE EAT HIT WAY.",
  ],
  sub: "Big flavours. Light bites. Endless crunch.",
  cta: "SEE OUR FULL MENU",
  hoverLabel: ["HOVER ME", "BABY"],
};

export const PLATES = [
  // x, y, d are px at a 1280px design width; rot in degrees
  {
    id: "jeera-1",
    name: "Jeera Khakhra",
    src: "/images/products/jeera-khakhra.png",
    x: 58,
    y: 342,
    d: 278,
    rot: -6,
  },
  {
    id: "masala-1",
    name: "Masala Khakhra",
    src: "/images/products/masala-khakhra.png",
    x: 944,
    y: 242,
    d: 278,
    rot: 8,
  },
  {
    id: "methi-1",
    name: "Methi Khakhra",
    src: "/images/products/methi-khakhra.png",
    x: 906,
    y: 609,
    d: 276,
    rot: -4,
  },
  {
    id: "lasan-1",
    name: "Lasan Khakhra",
    src: "/images/products/lasan-khakhra.png",
    x: -55,
    y: 702,
    d: 275,
    rot: 5,
  },
  {
    id: "plain-1",
    name: "Plain Khakhra",
    src: "/images/products/plain-khakhra.png",
    x: 307,
    y: 862,
    d: 278,
    rot: -3,
  },
  {
    id: "jeera-2",
    name: "Jeera Khakhra",
    src: "/images/products/jeera-khakhra.png",
    x: 1128,
    y: 922,
    d: 275,
    rot: 7,
  },
];

// ============================================================================
// SCALLOPED RIM SVG PATH GENERATOR
// r(theta) = R + 3 * sin(14 * theta), sampled at 180 points
// ============================================================================
function generateScallopedPath(
  cx: number,
  cy: number,
  R: number,
  A: number,
  frequency: number,
  points = 180
): string {
  let path = "";
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * 2 * Math.PI;
    const r = R + A * Math.sin(frequency * theta);
    const x = (cx + r * Math.cos(theta)).toFixed(2);
    const y = (cy + r * Math.sin(theta)).toFixed(2);
    path += (i === 0 ? "M" : "L") + " " + x + " " + y + " ";
  }
  return path + "Z";
}

// 300x300 viewBox: center=(150, 150), radius=142, scalloped amplitude=3, 14 lobes
const SCALLOPED_RIM_PATH = generateScallopedPath(150, 150, 142, 3, 14, 180);


// ============================================================================
// MAIN COMPONENT: SHARE THE CRUNCH SECTION (SECTION 3)
// ============================================================================
export default function ShareTheCrunchSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredPlateIndex, setHoveredPlateIndex] = useState<number | null>(null);
  const [label1Hovered, setLabel1Hovered] = useState(false);
  const [label2Hovered, setLabel2Hovered] = useState(false);

  // Label 1 points to plate 0; Label 2 points to plate 2 and 5
  const isLabel1Active = hoveredPlateIndex === 0 || label1Hovered;
  const isLabel2Active =
    hoveredPlateIndex === 2 || hoveredPlateIndex === 5 || label2Hovered;

  return (
    <section
      id="share-the-crunch"
      aria-label="Chai in one hand, Khakhra in the other. That's the Eat Hit way."
      className="relative w-full bg-[#F2F0E6] overflow-x-clip select-none share-the-crunch-root"
    >
      {/* Dynamic Responsive Styles for 1280px Coordinate Scaling */}
      <style jsx>{`
        .share-the-crunch-root {
          height: 195vw;
          min-height: 820px;
        }

        /* Responsive Plate Coordinates */
        /* Mobile: scaled down to ~43-45vw with edge cropping */
        .plate-box-0 {
          left: -10vw;
          top: 36vw;
          width: 44vw;
          height: 44vw;
        }
        .plate-box-1 {
          left: 66vw;
          top: 28vw;
          width: 44vw;
          height: 44vw;
        }
        .plate-box-2 {
          left: 64vw;
          top: 72vw;
          width: 43vw;
          height: 43vw;
        }
        .plate-box-3 {
          left: -12vw;
          top: 86vw;
          width: 43vw;
          height: 43vw;
        }
        .plate-box-4 {
          left: 28vw;
          top: 108vw;
          width: 44vw;
          height: 44vw;
        }
        .plate-box-5 {
          left: 68vw;
          top: 126vw;
          width: 43vw;
          height: 43vw;
        }

        /* Mobile Label Coordinates */
        .hover-label-1 {
          left: 6vw;
          top: 24vw;
        }
        .hover-label-2 {
          display: none;
        }

        /* Mobile Headline & Paragraph */
        .headline-wrapper {
          top: 6vw;
          max-width: 90vw;
        }
        .headline-text {
          font-size: 10.5vw;
          line-height: 0.94;
        }
        .paragraph-text {
          font-size: clamp(14px, 3.8vw, 17px);
          max-width: 82vw;
        }

        /* Mobile Button */
        .cta-button-wrapper {
          top: 174vw;
        }

        /* Desktop (768px+): exact match to 1280px design formula (value / 12.8 + "vw") */
        @media (min-width: 768px) {
          .share-the-crunch-root {
            height: calc(1341 / 12.8 * 1vw);
            min-height: 105vw;
          }

          /* Desktop Plate Positions: x / 12.8 vw, y / 12.8 vw, d / 12.8 vw */
          .plate-box-0 {
            left: calc(58 / 12.8 * 1vw);
            top: calc(342 / 12.8 * 1vw);
            width: calc(278 / 12.8 * 1vw);
            height: calc(278 / 12.8 * 1vw);
          }
          .plate-box-1 {
            left: calc(944 / 12.8 * 1vw);
            top: calc(242 / 12.8 * 1vw);
            width: calc(278 / 12.8 * 1vw);
            height: calc(278 / 12.8 * 1vw);
          }
          .plate-box-2 {
            left: calc(906 / 12.8 * 1vw);
            top: calc(609 / 12.8 * 1vw);
            width: calc(276 / 12.8 * 1vw);
            height: calc(276 / 12.8 * 1vw);
          }
          .plate-box-3 {
            left: calc(-55 / 12.8 * 1vw);
            top: calc(702 / 12.8 * 1vw);
            width: calc(275 / 12.8 * 1vw);
            height: calc(275 / 12.8 * 1vw);
          }
          .plate-box-4 {
            left: calc(307 / 12.8 * 1vw);
            top: calc(862 / 12.8 * 1vw);
            width: calc(278 / 12.8 * 1vw);
            height: calc(278 / 12.8 * 1vw);
          }
          .plate-box-5 {
            left: calc(1128 / 12.8 * 1vw);
            top: calc(922 / 12.8 * 1vw);
            width: calc(275 / 12.8 * 1vw);
            height: calc(275 / 12.8 * 1vw);
          }

          /* Desktop Hover Labels: 1 at (128, 205), 2 at (935, 897) */
          .hover-label-1 {
            left: calc(128 / 12.8 * 1vw);
            top: calc(205 / 12.8 * 1vw);
          }
          .hover-label-2 {
            display: block;
            left: calc(935 / 12.8 * 1vw);
            top: calc(897 / 12.8 * 1vw);
          }

          /* Desktop Headline & Paragraph */
          .headline-wrapper {
            top: 10vw;
            max-width: 80vw;
          }
          .headline-text {
            font-size: 5.6vw;
            line-height: 0.92;
          }
          .paragraph-text {
            font-size: clamp(16px, 1.25vw, 20px);
            max-width: 48vw;
          }

          /* Desktop Button */
          .cta-button-wrapper {
            top: calc(1228 / 12.8 * 1vw);
          }
        }
      `}</style>

      {/* ========================================================= */}
      {/* STEP 4: HEADLINE REVEAL AND PARAGRAPH                     */}
      {/* ========================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="headline-wrapper absolute left-1/2 -translate-x-1/2 w-full text-center z-20 flex flex-col items-center top-[6vw] md:top-[10vw] max-w-[90vw] md:max-w-[80vw]"
      >
        <h2 className="headline-text font-black uppercase text-[#C33130] font-[family-name:var(--font-bebas)] tracking-tight text-center m-0">
          {COPY.headline.map((line, index) => (
            <span key={index} className="block overflow-hidden py-0.5">
              <motion.span
                className="block whitespace-nowrap"
                variants={{
                  hidden: prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: "105%", opacity: 1 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: prefersReducedMotion ? 0 : index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Small Paragraph in Teko 500, uppercase */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="paragraph-text font-teko font-medium uppercase text-[#C33130] leading-[1.1] tracking-wide text-center mx-auto mt-4 sm:mt-5"
        >
          {COPY.sub}
        </motion.p>
      </motion.div>

      {/* ========================================================= */}
      {/* STEP 6: "HOVER ME BABY" LABELS                            */}
      {/* ========================================================= */}
      {/* Label 1: Down Arrow at (128, 205) */}
      <div
        className="hover-label-1 absolute z-25 pointer-events-auto cursor-pointer select-none"
        onMouseEnter={() => setLabel1Hovered(true)}
        onMouseLeave={() => setLabel1Hovered(false)}
        aria-hidden="true"
      >
        <div className="relative flex flex-col items-start">
          {/* Tilted 2-line Text */}
          <div
            className="font-teko font-semibold uppercase text-[#C33130] tracking-wider leading-[0.88] text-[20px] sm:text-[23px]"
            style={{
              transform: "rotate(-8deg)",
              transformOrigin: "left center",
            }}
          >
            <div>{COPY.hoverLabel[0]}</div>
            <div>{COPY.hoverLabel[1]}</div>
          </div>

          {/* Inline SVG with Down Arrow outline + 3 burst ticks */}
          <motion.svg
            width="50"
            height="58"
            viewBox="0 0 50 58"
            fill="none"
            className="ml-6 mt-1.5"
            animate={{
              y: isLabel1Active && !prefersReducedMotion ? 4 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* 3 Short Burst Ticks */}
            <line
              x1="9"
              y1="13"
              x2="3"
              y2="8"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="22"
              x2="1"
              y2="23"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="11"
              y1="31"
              x2="5"
              y2="35"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Curved Arrow Body pointing downwards */}
            <path
              d="M 14 16 C 22 24, 30 36, 26 48"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <path
              d="M 19 43 L 26 50 L 33 43"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </div>

      {/* Label 2: Up Arrow at (935, 897) */}
      <div
        className="hover-label-2 absolute z-25 pointer-events-auto cursor-pointer select-none"
        onMouseEnter={() => setLabel2Hovered(true)}
        onMouseLeave={() => setLabel2Hovered(false)}
        aria-hidden="true"
      >
        <div className="relative flex flex-col items-start">
          {/* Inline SVG with Up Arrow outline + 3 burst ticks */}
          <motion.svg
            width="50"
            height="58"
            viewBox="0 0 50 58"
            fill="none"
            className="ml-4 mb-1"
            animate={{
              y: isLabel2Active && !prefersReducedMotion ? -4 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* 3 Short Burst Ticks */}
            <line
              x1="8"
              y1="14"
              x2="2"
              y2="10"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="5"
              x2="25"
              y2="0"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="41"
              y1="14"
              x2="47"
              y2="10"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Arrowhead pointing UP */}
            <path
              d="M 18 16 L 25 9 L 32 16"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Curved Arrow Body */}
            <path
              d="M 25 11 C 28 26, 22 38, 14 48"
              stroke="#C33130"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Tilted 2-line Text */}
          <div
            className="font-teko font-semibold uppercase text-[#C33130] tracking-wider leading-[0.88] text-[20px] sm:text-[23px]"
            style={{
              transform: "rotate(-8deg)",
              transformOrigin: "left center",
            }}
          >
            <div>{COPY.hoverLabel[0]}</div>
            <div>{COPY.hoverLabel[1]}</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STEP 5: PLATES (Scalloped rim, drop shadow, WebP image)   */}
      {/* ========================================================= */}
      {PLATES.map((plate, index) => {
        return (
          <div
            key={plate.id + "-" + index}
            className={`plate-box-${index} absolute z-15`}
          >
            <motion.div
              className="relative w-full h-full cursor-pointer select-none"
              style={{
                filter: "drop-shadow(0 14px 22px rgba(120, 60, 40, 0.18))",
              }}
              initial={{ rotate: plate.rot, scale: 1 }}
              animate={{ rotate: plate.rot, scale: 1 }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.06,
                      rotate: plate.rot + 6,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      },
                    }
              }
              onMouseEnter={() => setHoveredPlateIndex(index)}
              onMouseLeave={() => setHoveredPlateIndex(null)}
            >
              {/* Layer 1: Scalloped Rim SVG */}
              <svg
                viewBox="0 0 300 300"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient
                    id={`plate-grad-${index}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="80%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E4E8F2" />
                  </radialGradient>
                </defs>

                {/* Scalloped Rim with stroke and gradient fill */}
                <path
                  d={SCALLOPED_RIM_PATH}
                  fill={`url(#plate-grad-${index})`}
                  stroke="rgba(150, 45, 75, 0.7)"
                  strokeWidth="1.5"
                />

                {/* Subtle inner concentric plate groove */}
                <circle
                  cx="150"
                  cy="150"
                  r="108"
                  fill="none"
                  stroke="rgba(150, 45, 75, 0.14)"
                  strokeWidth="1"
                />
              </svg>

              {/* Layer 2: Khakhra Image at 72% diameter */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] rounded-full overflow-hidden pointer-events-none flex items-center justify-center">
                <Image
                  src={plate.src}
                  alt={plate.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 25vw"
                  className="object-contain"
                  priority={index < 2}
                />
              </div>
            </motion.div>
          </div>
        );
      })}


      {/* ========================================================= */}
      {/* STEP 7: BUTTON (Teko 500, MoveRight arrow with hover)     */}
      {/* ========================================================= */}
      <div className="cta-button-wrapper absolute left-1/2 -translate-x-1/2 z-25 flex items-center justify-center">
        <a
          href="#menu"
          className="group inline-flex items-center justify-center gap-2.5 h-[38px] px-4 rounded-[4px] bg-[#C33130] hover:bg-[#AC2B2A] text-white font-teko font-medium uppercase tracking-wider text-[17px] transition-colors duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C33130] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F0E6] select-none"
        >
          <span>{COPY.cta}</span>
          <MoveRight
            className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={1}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
