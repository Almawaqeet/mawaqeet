import { HeroSection } from "@/components/public-pages/landing-page/HeroSection";
import HeroSectionCarousel from "@/components/public-pages/landing-page/HeroSectionCarousel";
import StepsToRegister from "@/components/public-pages/landing-page/StepsToRegister";
import ActivePackages from "@/components/public-pages/landing-page/ActivePackages";
import LiveCall from "@/components/public-pages/landing-page/LiveCall";

export default function LandingPage() {
  return (
    <main
      className="flex flex-col gap-8"
    >
      <HeroSection />
      <HeroSectionCarousel />
      <StepsToRegister />
      <ActivePackages />
      <LiveCall />
    </main>
  )
}
