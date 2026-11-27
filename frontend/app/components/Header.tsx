"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ACTIVE =
  "relative py-1 text-[#2B1810] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C33130] cursor-pointer hover:text-[#C33130] transition-colors";
const NAV_IDLE = "py-1 text-[#2B1810]/80 hover:text-[#C33130] transition-colors cursor-pointer";

/* Links to sections of the home page. On the home page they scroll smoothly;
   on any other page they navigate to the home page at that section. */
const SECTION_LINKS = [
  { id: "share-the-crunch", label: "Flavours" },
  { id: "brand-statement", label: "Manifesto" },
  { id: "footer", label: "Where to Buy" },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onProducts = pathname === "/product" || pathname === "/products";

  const scrollHomeToTop = (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent pointer-events-auto select-none">
      {/* Exact fixed location container matching hero top overlay */}
      <div className="max-w-7xl mx-auto pt-3 sm:pt-4 pb-3 sm:pb-4 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Official EatHit Brand Circular Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={scrollHomeToTop}
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
            onClick={scrollHomeToTop}
            aria-current={onHome ? "page" : undefined}
            className={onHome ? NAV_ACTIVE : NAV_IDLE}
          >
            Home
          </Link>
          <Link
            href="/products"
            aria-current={onProducts ? "page" : undefined}
            className={onProducts ? NAV_ACTIVE : NAV_IDLE}
          >
            Products
          </Link>
          {SECTION_LINKS.map((link) => (
            <a
              key={link.id}
              href={onHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => {
                if (!onHome) return;
                e.preventDefault();
                document.body.style.overflowY = "";
                document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={NAV_IDLE}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Spacer for Symmetrical Nav Centering */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 pointer-events-none hidden md:block" aria-hidden="true" />
      </div>
    </header>
  );
}
