import { Metadata } from 'next'
import { HeroSection } from '@/app/(public-pages)/_components/landing-page/HeroSection';
import ActivePackages from '@/app/(public-pages)/_components/landing-page/ActivePackages';
import HeroSectionCarousel from '@/app/(public-pages)/_components/landing-page/HeroSectionCarousel';
import LiveCall from '@/app/(public-pages)/_components/landing-page/LiveCall';
import StepsToRegister from '@/app/(public-pages)/_components/landing-page/StepsToRegister';
import MeetTheTeam from '@/app/(public-pages)/_components/landing-page/MeetTheTeam';
import WhyUs from '@/app/(public-pages)/_components/landing-page/WhyUs';
import Benefits from '@/app/(public-pages)/_components/landing-page/Benefits';
import Faqs from './_components/landing-page/Faqs';


export default function LandingPage() {
  return (
    <main
      className="flex flex-col gap-8"
    >
      <HeroSection />
      <HeroSectionCarousel />
      <WhyUs />
      <Benefits />
      <MeetTheTeam />
      <StepsToRegister />
      <ActivePackages />
      <LiveCall />
      <Faqs />
    </main>
  )
}


export const metadata: Metadata = {
  title: "Al-Mawaqeet Travels and Tours | Home",
  description: "Your trusted partner for Hajj and Umrah services. We provide comprehensive travel packages, guidance and support for your spiritual journey.",
  keywords: "hajj, umrah, islamic travel, muslim pilgrimage, mecca travel, medina tours, religious tourism, travel agency",
};
