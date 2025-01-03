import SingularPackage from '@/app/(public-pages)/_components/packages-page/SingularPackage';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { createServerAxiosInstance } from '@/api/server-constructor';
import { routes } from '@/api/routes';
import { Metadata } from 'next';
import { Package } from '@/constants/types';

async function getInitialData(packageId: string) {
  const queryClient = new QueryClient();
  const route = routes.package.viewPackage(packageId);
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);
  const data = await createServerAxiosInstance(route);
  await queryClient.prefetchQuery({
    queryKey: [baseQueryKey],
    queryFn: () => data,
  });
  return { queryClient, packageData: data?.data as Package | undefined };
}



export default async function SingularPackagePage({
  params,
}: {
  params: { packageId: string };
}) {
  const { queryClient } = await getInitialData(params.packageId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingularPackage id={params.packageId} />
    </HydrationBoundary>
  );
}


export async function generateMetadata({ params }: { params: { packageId: string } }): Promise<Metadata> {
    const { packageData } = await getInitialData(params.packageId);

    const title = packageData?.name ?? 'Hajj & Umrah Package | Al-Mawaqeet Travels';
    const description = packageData?.description ?? 'Discover our premium Hajj and Umrah packages with comprehensive services and expert guidance for your spiritual journey.';

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
        'premium pilgrimage services'
      ].join(', '),
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'en_NG',
        siteName: 'Al-Mawaqeet Travels and Tours'
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description
      },
      alternates: {
        canonical: `https://almawaqeet.com/packages/${params.packageId}`
      }
    };
  }
