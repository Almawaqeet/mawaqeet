import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { createServerAxiosInstance } from '@/network/server-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/network/routes';

const StepThreeOnboarding = dynamic(
  () => import('@/app/(public-pages)/_components/onboarding/StepThree'),
  { ssr: false }
);

async function getInitialData() {
  const queryClient = new QueryClient();
  const route = routes.onboarding.getOnboardingPaymentAmount;

  const baseQueryKey = generateBaseQueryKeyFromRoute(route);

  try {
    const response = await createServerAxiosInstance(route);
    await queryClient.prefetchQuery({
      queryKey: [baseQueryKey],
      queryFn: () => response.data,
    });
    return queryClient;
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
}

export default async function StepThreePage() {
  const queryClient = (await getInitialData()) ?? new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StepThreeOnboarding />
    </HydrationBoundary>
  );
}

export const metadata: Metadata = {
  title: 'Complete Your Profile | Step 3',
  description:
    'Complete your profile setup and preferences to get started with our platform.',
  keywords: 'profile setup, onboarding, registration, step 3',
};
