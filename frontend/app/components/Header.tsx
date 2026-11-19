"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent pointer-events-auto select-none">
      {/* Exact fixed location container matching hero top overlay */}
      <div className="max-w-7xl mx-auto pt-3 sm:pt-4 pb-3 sm:pb-4 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Official EatHit Brand Circular Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
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
              <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-xs sm:text-sm font-semibold text-[#2B1810]">
                <Link
                  href="/"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
            }
            }}
          className={`relative py-1 cursor-pointer transition-colors ${pathname === "/"
              ? "text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C33130]"
              : "text-[#2B1810]/80 hover:text-[#C33130]"
            }`}
          >
          Home
        </Link>
        <Link
          href="/product"
          className={`relative py-1 cursor-pointer transition-colors ${pathname === "/product" || pathname === "/products"
              ? "text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C33130]"
              : "text-[#2B1810]/80 hover:text-[#C33130]"
            }`}
        >
          Product
        </Link>
        <Link
          href="/contact"
          className={`relative py-1 cursor-pointer transition-colors ${pathname === "/contact" || pathname === "/contact-us"
              ? "text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C33130]"
              : "text-[#2B1810]/80 hover:text-[#C33130]"
            }`}
        >
          Contact Us
        </Link>
      </nav>

      {/* Right Spacer for Symmetrical Nav Centering */}
      <div className="w-12 h-12 sm:w-13 sm:h-13 pointer-events-none hidden md:block" aria-hidden="true" />
    </div>
    </header >
  );
}
