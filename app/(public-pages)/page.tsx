import { Metadata } from 'next'
import { HeroSection } from '@/app/(public-pages)/_components/landing-page/HeroSection';
import ActivePackages from '@/app/(public-pages)/_components/landing-page/ActivePackages';
import HeroSectionCarousel from '@/app/(public-pages)/_components/landing-page/HeroSectionCarousel';
import LiveCall from '@/app/(public-pages)/_components/landing-page/LiveCall';
import StepsToRegister from '@/app/(public-pages)/_components/landing-page/StepsToRegister';
import MeetTheTeam from '@/app/(public-pages)/_components/landing-page/MeetTheTeam';
import WhyUs from '@/app/(public-pages)/_components/landing-page/WhyUs';
import Benefits from '@/app/(public-pages)/_components/landing-page/Benefits';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { createServerAxiosInstance } from '@/api/server-constructor';
import { routes } from '@/api/routes';


async function getInitialData() {
  const queryClient = new QueryClient();
  const route = routes.packages.showAllActivePackages;
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);
  const data = await createServerAxiosInstance(route);
  await queryClient.prefetchQuery({
    queryKey: [baseQueryKey],
    queryFn: () => data
  });
  return queryClient;
}

export default async function LandingPage() {
  const queryClient = await getInitialData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
      </main>
    </HydrationBoundary>
  )
}

export const metadata: Metadata = {
    title: "Al-Mawaqeet Travels and Tours | Home",
    description: "Your trusted partner for Hajj and Umrah services. We provide comprehensive travel packages, guidance and support for your spiritual journey.",
    keywords: "hajj, umrah, islamic travel, muslim pilgrimage, mecca travel, medina tours, religious tourism, travel agency",
  };
