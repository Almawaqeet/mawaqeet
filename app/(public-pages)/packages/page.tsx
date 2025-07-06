import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/network/routes';
import { createServerAxiosInstance } from '@/network/server-constructor';
import { routes } from '@/network/routes';
import { Metadata } from 'next';
import { PACKAGE_TYPES } from '@/constants/generic';
import PackageSectionWrapper from './PackageSectionWrapper';

async function getInitialData(searchParams?: {
  type?: string;
  search?: string;
}) {
  const queryClient = new QueryClient();
  const route = routes.packages.showAllActivePackages;
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);

  // Prepare query parameters for the API call
  const params: Record<string, any> = {};

  // Set package type (default to HAJJ if not provided)
  const packageType = searchParams?.type?.toUpperCase() || PACKAGE_TYPES.HAJJ;
  params.package_type = packageType;

  // Set search term if provided
  if (searchParams?.search) {
    params.search = searchParams.search;
  }

  const data = await createServerAxiosInstance(route, { params });

  // Create the exact same query key structure as the client-side hook
  const queryKey = [baseQueryKey, params && params];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => data,
  });

  return queryClient;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { type?: string; search?: string };
}) {
  const queryClient = await getInitialData(searchParams);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PackageSectionWrapper />
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
