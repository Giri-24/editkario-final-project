import { Navbar } from "@/components/marketing/Navbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ReelsShowcase } from "@/components/video/ReelsShowcase";
import { BeforeAfterColorGrade } from "@/components/video/BeforeAfterColorGrade";
import { BentoServices } from "@/components/marketing/BentoServices";
import { PricingCalculator } from "@/components/marketing/PricingCalculator";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Sticky Glass Navigation */}
      <Navbar />

      {/* Hero Section with Ambient Glow & Video Proof */}
      <HeroSection />

      {/* Vertical 9:16 Reels Interactive Showcase */}
      <ReelsShowcase />

      {/* Interactive Before & After DaVinci Color Grading Slider */}
      <BeforeAfterColorGrade />

      {/* 4 Core Production Capabilities Bento Grid */}
      <BentoServices />

      {/* Interactive Scope & Pricing Calculator with 50% Deposit Flow */}
      <PricingCalculator />

      {/* Modern Agency Footer */}
      <Footer />
    </main>
  );
}
