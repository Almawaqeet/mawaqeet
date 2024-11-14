import { HeroSection } from "@/Components/PublicPages/LandingPage/HeroSection";
import HeroSectionCarousel from "@/Components/PublicPages/LandingPage/HeroSectionCarousel";
import StepsToRegister from "@/Components/PublicPages/LandingPage/StepsToRegister";
import ActivePackages from "@/Components/PublicPages/LandingPage/ActivePackages";
import LiveCall from "@/Components/PublicPages/LandingPage/LiveCall";

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
