import TheCrunchOfIndiaHero from "./components/TheCrunchOfIndiaHero";
import BrandStatementSection from "./components/BrandStatementSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#FAF4EC] overflow-x-clip scroll-smooth">
      {/* 1. Hero Section Stage */}
      <div className="relative w-full h-screen h-[100svh] overflow-hidden">
        <TheCrunchOfIndiaHero />
      </div>

      {/* 3. Second Section: BAVET-Inspired Brand Statement with Dynamic Scroll Effect */}
      <BrandStatementSection />
    </main>
  );
}
