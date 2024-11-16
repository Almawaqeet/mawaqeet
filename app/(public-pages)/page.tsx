import { HeroSection } from "@/components/PublicPages/LandingPage/HeroSection";
import HeroSectionCarousel from "@/components/PublicPages/LandingPage/HeroSectionCarousel";
import StepsToRegister from "@/components/PublicPages/LandingPage/StepsToRegister";
import ActivePackages from "@/components/PublicPages/LandingPage/ActivePackages";
import LiveCall from "@/components/PublicPages/LandingPage/LiveCall";

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
