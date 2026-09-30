import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EatHit Lite — The Crunch of India | Authentic Roasted Gujarati Khakhra",
  description:
    "100% Baked Not Fried, crispy, everyday goodness. Available at Patel Brothers, Subzi Mandi, and US grocery stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${caveat.variable} h-full overflow-hidden`}
    >
      <body className="h-full max-h-screen bg-[#EFE6DC] text-[#2B1810] antialiased selection:bg-[#DC2626] selection:text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
