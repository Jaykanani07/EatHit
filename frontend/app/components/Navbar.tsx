"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FBF8F3]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-[#19120D]/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav Items (Bavet Symmetrical Split) */}
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-end pr-10">
              <Link
                href="#flavors"
                className="text-sm font-semibold tracking-wider uppercase text-[#19120D] hover:text-[#DC2626] transition-colors relative group py-1"
              >
                Flavors
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="#why-eathit"
                className="text-sm font-semibold tracking-wider uppercase text-[#19120D] hover:text-[#DC2626] transition-colors relative group py-1"
              >
                Why EatHit
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="#ritual"
                className="text-sm font-semibold tracking-wider uppercase text-[#19120D] hover:text-[#DC2626] transition-colors relative group py-1"
              >
                The Ritual
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </Link>
            </nav>

            {/* Centered Brand Emblem (Bavet Center Logo) */}
            <Link
              href="/"
              className="flex items-center gap-3 group px-4 py-1 rounded-full transition-transform hover:scale-105"
            >
              <div className="w-12 h-12 rounded-full bg-[#1C130D] border-2 border-[#EAB308] flex items-center justify-center shadow-md relative overflow-hidden group-hover:border-[#DC2626] transition-colors">
                <span className="text-white font-extrabold text-sm tracking-tighter leading-none text-center">
                  EAT
                  <br />
                  <span className="text-[#EAB308]">HIT</span>
                </span>
                {/* Mini teal Lite script dot */}
                <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl tracking-tight text-[#19120D] font-[family-name:var(--font-outfit)] leading-none flex items-center gap-1.5">
                  EAT HIT
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] font-bold tracking-normal uppercase">
                    Lite
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#6B5E52] font-semibold">
                  100% Baked Khakhra
                </span>
              </div>
            </Link>

            {/* Right Nav Items (Bavet Symmetrical Split) */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-start pl-10">
              <Link
                href="#store-finder"
                className="text-sm font-semibold tracking-wider uppercase text-[#19120D] hover:text-[#DC2626] transition-colors relative group py-1"
              >
                Store Locator
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="#wholesale"
                className="text-sm font-semibold tracking-wider uppercase text-[#19120D] hover:text-[#DC2626] transition-colors relative group py-1"
              >
                Wholesale
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC2626] transition-all duration-200 group-hover:w-full" />
              </Link>

              {/* Action Pill Button */}
              <Link
                href="#store-finder"
                className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                Find in Stores
              </Link>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="#store-finder"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-bold"
              >
                <MapPin className="w-3 h-3" />
                Stores
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-[#19120D]/10 text-[#19120D] hover:bg-neutral-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FBF8F3] border-b border-[#19120D]/10 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4">
              <Link
                href="#flavors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#19120D] hover:text-[#DC2626] flex items-center justify-between py-2 border-b border-[#19120D]/5"
              >
                Flavors
                <ChevronRight className="w-4 h-4 text-[#6B5E52]" />
              </Link>
              <Link
                href="#why-eathit"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#19120D] hover:text-[#DC2626] flex items-center justify-between py-2 border-b border-[#19120D]/5"
              >
                Why EatHit (Baked Not Fried)
                <ChevronRight className="w-4 h-4 text-[#6B5E52]" />
              </Link>
              <Link
                href="#ritual"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#19120D] hover:text-[#DC2626] flex items-center justify-between py-2 border-b border-[#19120D]/5"
              >
                The Modern Ritual
                <ChevronRight className="w-4 h-4 text-[#6B5E52]" />
              </Link>
              <Link
                href="#store-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#19120D] hover:text-[#DC2626] flex items-center justify-between py-2 border-b border-[#19120D]/5"
              >
                Find in Patel Brothers & Stores
                <ChevronRight className="w-4 h-4 text-[#6B5E52]" />
              </Link>
              <Link
                href="#wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold uppercase tracking-wider text-[#19120D] hover:text-[#DC2626] flex items-center justify-between py-2"
              >
                Retailer Wholesale Inquiry
                <ChevronRight className="w-4 h-4 text-[#6B5E52]" />
              </Link>

              <div className="pt-4 mt-2">
                <Link
                  href="#store-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#DC2626] text-white text-sm font-bold uppercase tracking-wider shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Find Nearest US Store
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
