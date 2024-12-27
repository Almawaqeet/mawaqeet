import SingularPackage from '@/app/(public-pages)/_components/packages-page/SingularPackage';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute } from '@/api/routes';
import { createServerAxiosInstance } from '@/api/server-constructor';
import { routes } from '@/api/routes';

async function getInitialData(packageId: string) {
  const queryClient = new QueryClient();
  const route = routes.package.viewPackage(packageId);
  const baseQueryKey = generateBaseQueryKeyFromRoute(route);
  const data = await createServerAxiosInstance(route);
  await queryClient.prefetchQuery({
    queryKey: [baseQueryKey],
    queryFn: () => data,
  });
  return queryClient;
}

export default async function SingularPackagePage({
  params,
}: {
  params: { packageId: string };
}) {
  const queryClient = await getInitialData(params.packageId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingularPackage id={params.packageId} />
    </HydrationBoundary>
  );
}
