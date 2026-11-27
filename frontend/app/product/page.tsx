import Image from "next/image";
import type { CSSProperties } from "react";

/* -------------------------------------------------------------------------- */
/*  EatHit — Products page. A showcase only: no cart, no prices.              */
/* -------------------------------------------------------------------------- */

export const metadata = {
  title: "Products — EatHit Lite | 100% Baked Not Fried Khakhra",
  description:
    "Five roasted khakhra flavours from EatHit: Masala, Methi, Jeera, Lasan and Plain. Thin, crisp and never fried.",
};

type Product = {
  id: string;
  num: string;
  name: string;
  line: string;
  desc: string;
  bg: string;
  deep: string;
  notes: string[];
  pair: string;
  pouch: string;
  disc: string;
};

const PRODUCTS: Product[] = [
  {
    id: "masala",
    num: "01",
    name: "Masala",
    line: "the spicy one",
    desc: "Big spice, bigger crunch. Red chilli and warm spices roasted right into the dough.",
    bg: "#C33130",
    deep: "#9E2423",
    notes: ["Red chilli", "Cumin", "Whole wheat"],
    pair: "With masala chai",
    pouch: "/images/products/masala-pouch.png",
    disc: "/images/products/masala-khakhra.png",
  },
  {
    id: "methi",
    num: "02",
    name: "Methi",
    line: "the herby one",
    desc: "Earthy and full of fenugreek leaves. The one everyone reaches for first.",
    bg: "#2F7A32",
    deep: "#225E25",
    notes: ["Fenugreek leaves", "Rock salt", "Whole wheat"],
    pair: "With morning tea",
    pouch: "/images/products/methi-pouch.png",
    disc: "/images/products/methi-khakhra.png",
  },
  {
    id: "jeera",
    num: "03",
    name: "Jeera",
    line: "the toasty one",
    desc: "A little cumin, a lot of character. Warm, nutty and easy on the stomach.",
    bg: "#C9730A",
    deep: "#A55D06",
    notes: ["Roasted cumin", "Black pepper", "Whole wheat"],
    pair: "With evening chai",
    pouch: "/images/products/jeera-pouch.png",
    disc: "/images/products/jeera-khakhra.png",
  },
  {
    id: "lasan",
    num: "04",
    name: "Lasan",
    line: "the garlicky one",
    desc: "A bold roasted garlic hit in every bite. Made for people who like it loud.",
    bg: "#B5400F",
    deep: "#8F310B",
    notes: ["Roasted garlic", "Chilli", "Whole wheat"],
    pair: "With friends over",
    pouch: "/images/products/lasun-pouch.png",
    disc: "/images/products/lasan-khakhra.png",
  },
  {
    id: "plain",
    num: "05",
    name: "Plain",
    line: "the classic one",
    desc: "Pure, simple and timeless. Great on its own, better with pickle or butter.",
    bg: "#8C5A1E",
    deep: "#6E4615",
    notes: ["Whole wheat", "Rock salt", "Nothing else"],
    pair: "With pickle",
    pouch: "/images/products/plain-pouch.png",
    disc: "/images/products/plain-khakhra.png",
  },
];

const PAGE_BG = "#FBF8F3";

/* Wavy top edge filled with the colour of whatever sits above the band. */
function Wave({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 -top-px z-10 block h-[clamp(36px,5vw,70px)] w-full"
    >
      <path
        d="M0 0 H1440 V22 C1260 70 1080 70 900 40 C720 10 540 10 360 40 C220 64 100 60 0 34 Z"
        fill={color}
      />
    </svg>
  );
}

/* The five packs fanned out like a hand of cards; each one jumps to its band. */
function PackFan() {
  return (
    <div className="relative mt-5 h-[230px] sm:h-[300px] lg:h-[340px]">
      {PRODUCTS.map((p, i) => {
        const offset = i - 2;
        return (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="pack-fan-item group absolute bottom-[-20px] left-1/2 w-[120px] drop-shadow-[0_22px_26px_rgba(25,18,13,0.22)] hover:z-10 focus-visible:z-10 sm:w-[190px] lg:bottom-[-40px] lg:w-[250px]"
            style={
              {
                "--i": offset,
                "--a": `${offset * 13}deg`,
                zIndex: 5 - Math.abs(offset),
              } as CSSProperties
            }
          >
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-dark px-3 py-1.5 text-[13px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {p.name} Khakhra
            </span>
            <Image
              src={p.pouch}
              alt={`${p.name} Khakhra pack`}
              width={1145}
              height={1374}
              sizes="(min-width: 1024px) 250px, (min-width: 640px) 190px, 120px"
              priority
              className="block h-auto w-full"
            />
          </a>
        );
      })}
    </div>
  );
}

function ProductBand({ product, index }: { product: Product; index: number }) {
  const flip = index % 2 === 1;
  const above = index === 0 ? PAGE_BG : PRODUCTS[index - 1].bg;

  return (
    <section
      id={product.id}
      aria-labelledby={`${product.id}-title`}
      className="relative scroll-mt-4 overflow-hidden pb-24 pt-20 text-[#FFF6E6] sm:pb-36 sm:pt-28"
      style={{ backgroundColor: product.bg }}
    >
      <Wave color={above} />

      {/* Oversized flavour name sitting faintly behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 select-none whitespace-nowrap text-center font-krisha text-[30vw] uppercase leading-[0.8]"
        style={{ color: product.deep, opacity: 0.55 }}
      >
        {product.name}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 sm:px-8 lg:grid-cols-2 lg:gap-12">
        {/* Pack + khakhra */}
        <div className={`relative h-[360px] sm:h-[480px] lg:h-[540px] ${flip ? "lg:order-2" : ""}`}>
          <div
            className={`absolute bottom-6 w-[230px] sm:w-[320px] lg:w-[360px] ${
              flip ? "left-[2%]" : "right-[2%]"
            }`}
          >
            <Image
              src={product.disc}
              alt=""
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 230px"
              className="block h-auto w-full animate-circle-spin drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] [animation-duration:40s] motion-reduce:animate-none"
            />
          </div>
          <div
            className={`absolute top-2 w-[230px] sm:w-[300px] lg:w-[340px] ${
              flip ? "right-[4%] rotate-6 lg:right-[10%]" : "left-[4%] -rotate-6 lg:left-[10%]"
            }`}
          >
            <Image
              src={product.pouch}
              alt={`${product.name} Khakhra pack`}
              width={1145}
              height={1374}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 230px"
              className="block h-auto w-full animate-float-packet drop-shadow-[0_30px_34px_rgba(0,0,0,0.35)] motion-reduce:animate-none"
            />
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="m-0 font-[family-name:var(--font-bebas)] text-lg tracking-[0.2em] opacity-80 sm:text-xl">
            {product.num} / 05 &nbsp;·&nbsp; Roasted, never fried
          </p>
          <h2
            id={`${product.id}-title`}
            className="m-0 mt-1.5 font-krisha text-[clamp(4rem,9vw,8.5rem)] font-normal uppercase leading-[0.82]"
          >
            {product.name}
            <br />
            Khakhra
          </h2>
          <p className="m-0 mt-2 inline-block -rotate-2 font-[family-name:var(--font-caveat)] text-[2.3rem] font-bold leading-tight text-[#FFE08A]">
            {product.line}
          </p>
          <p className="m-0 mt-5 max-w-[30rem] text-lg leading-relaxed opacity-90 sm:text-[19px]">
            {product.desc}
          </p>
          <ul className="m-0 mt-7 flex list-none flex-wrap gap-2.5 p-0" aria-label={`${product.name} Khakhra notes`}>
            {product.notes.map((note) => (
              <li key={note} className="rounded-full bg-[#FFF6E6]/15 px-4 py-2.5 text-sm font-semibold">
                {note}
              </li>
            ))}
            <li className="rounded-full bg-[#FFF6E6] px-4 py-2.5 text-sm font-semibold text-brand-dark">
              <span aria-hidden="true">☕ </span>
              {product.pair}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <main className="overflow-x-clip bg-parchment text-brand-dark">
      <section className="relative overflow-hidden px-4 pt-28 text-center sm:pt-32">
        <h1 className="m-0 font-krisha text-[clamp(3.4rem,8.5vw,8rem)] font-normal uppercase leading-[0.84] text-brand-dark">
          Five ways
          <br />
          <span className="text-brand-red">to crunch</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[34rem] text-base leading-relaxed text-[#6B5E52] sm:text-lg">
          Thin, crisp and roasted in five flavours. Tap a pack to meet it properly.
        </p>
        <PackFan />
      </section>

      {PRODUCTS.map((product, index) => (
        <ProductBand key={product.id} product={product} index={index} />
      ))}
    </main>
  );
}
