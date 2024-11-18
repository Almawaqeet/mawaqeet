import { HeroSection } from "@/app/(public-pages)/_components/landing-page/HeroSection";
import HeroSectionCarousel from "@/app/(public-pages)/_components/landing-page/HeroSectionCarousel";
import StepsToRegister from "@/app/(public-pages)/_components/landing-page/StepsToRegister";
import ActivePackages from "@/app/(public-pages)/_components/landing-page/ActivePackages";
import LiveCall from "@/app/(public-pages)/_components/landing-page/LiveCall";

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
