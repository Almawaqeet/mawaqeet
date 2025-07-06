import { Metadata } from 'next';
import { HeroSection } from '@/app/(public-pages)/_components/landing-page/HeroSection';
import ActivePackages from '@/app/(public-pages)/_components/landing-page/ActivePackages';
import HeroSectionCarousel from '@/app/(public-pages)/_components/landing-page/HeroSectionCarousel';
import LiveCall from '@/app/(public-pages)/_components/landing-page/LiveCall';
import StepsToRegister from '@/app/(public-pages)/_components/landing-page/StepsToRegister';
import MeetTheTeam from '@/app/(public-pages)/_components/landing-page/MeetTheTeam';
import WhyUs from '@/app/(public-pages)/_components/landing-page/WhyUs';
import Benefits from '@/app/(public-pages)/_components/landing-page/Benefits';
import Faqs from './_components/landing-page/Faqs';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/network/routes';
import { createServerAxiosInstance } from '@/network/server-constructor';
import { routes } from '@/network/routes';

async function getInitialData() {
  const queryClient = new QueryClient();
  const route = routes.packages.showAllActivePackages;
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);
  await queryClient.prefetchQuery({
    queryKey: [baseQueryKey],
    queryFn: async () => {
      try {
        const response = await createServerAxiosInstance(route);
        if (!response || !response.data) {
          throw new Error('Package not found');
        }
        return response.data;
      } catch (error) {
        throw new Error('Package not found');
      }
    },
  });
  return queryClient;
}

export default async function LandingPage() {
  const queryClient = await getInitialData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col gap-8">
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
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://almawaqeet.com',
  },
};
