import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export const metadata = {
  title: "Products — EatHit Lite | 100% Baked Not Fried Khakhra",
  description: "Explore our authentic Gujarati roasted khakhra flavors.",
};

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B1810] pt-28 sm:pt-36 pb-20 px-4 sm:px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#C33130]/10 text-[#C33130] flex items-center justify-center mx-auto border border-[#C33130]/20 shadow-xs">
          <Package className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C33130]/10 border border-[#C33130]/25 text-[#C33130] text-xs font-black tracking-widest uppercase font-[family-name:var(--font-bebas)]">
          COMING SOON
        </div>

        <h1 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-4xl sm:text-6xl text-[#19120D] uppercase tracking-tight leading-none">
          OUR PRODUCTS
        </h1>

        <p className="text-base sm:text-lg text-[#2B1810]/75 font-[family-name:var(--font-jakarta)] leading-relaxed">
          We are crafting an authentic showcase of our 100% roasted Gujarati Khakhra range: Methi, Masala, Plain, Lasun, and Jeera.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C33130] hover:bg-[#A82810] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors font-[family-name:var(--font-bebas)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

