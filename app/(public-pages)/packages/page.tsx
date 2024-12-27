import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { createServerAxiosInstance } from '@/api/server-constructor';
import { routes } from '@/api/routes';

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
