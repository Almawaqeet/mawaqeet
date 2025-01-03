import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { createServerAxiosInstance } from '@/api/server-constructor';
import { routes } from '@/api/routes';
import { Metadata } from 'next';

const PackageSection = dynamic(
  () => import('@/app/(public-pages)/_components/packages-page/PackageSection'),
  { ssr: false }
);

async function getInitialData() {
  const queryClient = new QueryClient();
  const route = routes.packages.showAllActivePackages;
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);
  const data = await createServerAxiosInstance(route);
  await queryClient.prefetchQuery({
    queryKey: [baseQueryKey],
    queryFn: () => data,
  });
  return queryClient;
}

export default async function Page() {
  const queryClient = await getInitialData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PackageSection />
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  title: 'Hajj & Umrah Packages | Al-Mawaqeet Travels and Tours',
  description:
    'Explore our comprehensive Hajj and Umrah packages designed for Nigerian pilgrims. Find affordable, all-inclusive packages with premium accommodations, transportation, and expert guidance.',
  keywords: [
    'hajj packages nigeria',
    'umrah packages',
    'islamic pilgrimage packages',
    'mecca travel deals',
    'medina pilgrimage packages',
    'affordable hajj services',
    'premium umrah deals',
    'muslim travel packages',
    'holy sites pilgrimage',
    'al-mawaqeet packages',
  ].join(', '),
  alternates: {
    canonical: 'https://almawaqeet.com/packages',
  },
};
