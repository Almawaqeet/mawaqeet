import { Metadata } from 'next';
import { Package } from '@/constants/types';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { routes, generateBaseQueryKeyFromRoute } from '@/network/routes';
import { createServerAxiosInstance } from '@/network/server-constructor';
import SingularPackageWrapper from './SingularPackageWrapper';

import { notFound } from 'next/navigation';

type Params = { packageId: string };

type PackagePageProps = {
  params: Params;
};

async function getInitialData(packageId: string) {
  const queryClient = new QueryClient();
  const route = routes.package.viewPackage(packageId);
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);

  try {
    await queryClient.prefetchQuery({
      queryKey: [baseQueryKey],
      queryFn: async () => {
        try {
          const response = await createServerAxiosInstance(route);
          if (!response || !response.data) {
            throw new Error('Package not found');
          }
          return response.data as Package;
        } catch (error) {
          throw new Error('Package not found');
        }
      },
    });

    const packageData = queryClient.getQueryData<Package>([baseQueryKey]);
    if (!packageData) {
      throw new Error('Package not found');
    }

    return { queryClient, packageData };
  } catch (error) {
    console.error(`Failed to load package with id: ${packageId}`, error);
    throw error; // Let the calling function handle the error
  }
}

export default async function SingularPackagePage({
  params,
}: PackagePageProps) {
  const { packageId } = await params;

  try {
    const { queryClient } = await getInitialData(packageId);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SingularPackageWrapper id={packageId} />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error(`Failed to load package page for ${packageId}:`, error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { packageId } = await params;
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://almawaqeet.com';

  try {
    const { packageData } = await getInitialData(packageId);

    const title =
      packageData?.name || 'Hajj & Umrah Package | Al-Mawaqeet Travels';
    const description =
      packageData?.description ||
      'Discover our premium Hajj and Umrah packages with comprehensive services and expert guidance for your spiritual journey.';

    return {
      title,
      description,
      keywords: [
        'hajj package',
        'umrah package',
        'islamic pilgrimage',
        'mecca travel',
        'medina visit',
        'muslim spiritual journey',
        'al-mawaqeet package details',
        'premium pilgrimage services',
      ].join(', '),
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${domain}/packages/${packageId}`,
        locale: 'en_NG',
        siteName: 'Al-Mawaqeet Travels and Tours',
      },
      alternates: {
        canonical: `${domain}/packages/${packageId}`,
      },
    };
  } catch (error) {
    console.error('Error fetching package data for SEO:', error);
    return {
      title: 'Package Not Found | Al-Mawaqeet Travels',
      description: 'The requested package could not be found.',
    };
  }
}
