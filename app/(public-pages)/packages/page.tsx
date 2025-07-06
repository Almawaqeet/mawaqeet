import { Metadata } from 'next';
import { Package } from '@/constants/types';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { routes, generateBaseQueryKeyFromRoute } from '@/network/routes';
import { createServerAxiosInstance } from '@/network/server-constructor';
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

  try {
    await queryClient.prefetchQuery({
      queryKey: [baseQueryKey, params],
      queryFn: async () => {
        try {
          const response = await createServerAxiosInstance(route, { params });
          if (!response || !response.data) {
            throw new Error('Packages not found');
          }
          return response.data;
        } catch (error) {
          console.error('Error fetching packages:', error);
          throw error;
        }
      },
    });

    return { queryClient };
  } catch (error) {
    console.error('Failed to load packages:', error);
    throw error;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { type?: string; search?: string };
}) {
  try {
    const { queryClient } = await getInitialData(searchParams);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PackageSectionWrapper />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Failed to load packages page:', error);
    throw error;
  }
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
