"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-colors duration-300 pointer-events-auto select-none ${
        isScrolled
          ? "bg-[#FAF4EC]/92 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-[#2B1810]/10"
          : "bg-transparent"
      }`}
    >
      {/* Exact fixed location container matching hero top overlay */}
      <div className="max-w-7xl mx-auto pt-3 sm:pt-4 pb-3 sm:pb-4 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Official EatHit Brand Circular Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="EatHit Home"
          >
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
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative py-1 text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#A82810] cursor-pointer"
          >
            Home
          </Link>
          <a
            href="#brand-statement"
            onClick={(e) => {
              e.preventDefault();
              document.body.style.overflowY = "";
              document.getElementById("brand-statement")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors cursor-pointer"
          >
            Products
          </a>
          <a
            href="#brand-statement"
            onClick={(e) => {
              e.preventDefault();
              document.body.style.overflowY = "";
              document.getElementById("brand-statement")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="py-1 text-[#2B1810]/80 hover:text-[#A82810] transition-colors cursor-pointer"
          >
            Contact
          </a>
        </nav>

        {/* Right Spacer for Symmetrical Nav Centering */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 pointer-events-none hidden md:block" aria-hidden="true" />
      </div>
    </header>
  );
}
