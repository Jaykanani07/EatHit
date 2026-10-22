import TheCrunchOfIndiaHero from "./components/TheCrunchOfIndiaHero";
import BrandStatementSection from "./components/BrandStatementSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#F2F0E6] overflow-x-clip scroll-smooth">
      {/* 1. Hero Section Stage */}
      <div className="relative w-full h-screen h-[100svh] overflow-hidden">
        <TheCrunchOfIndiaHero />
      </div>

      {/* 2. Second Section: BAVET-Inspired Brand Statement with Dynamic Scroll Effect */}
      <BrandStatementSection />
    </main>
  );
}
