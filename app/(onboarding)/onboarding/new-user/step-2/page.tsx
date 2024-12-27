import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const StepTwoOnboarding = dynamic(
  () => import('@/app/(public-pages)/_components/onboarding/StepTwo'),
  { ssr: false }
);

export default function StepTwoPage() {
  return <StepTwoOnboarding />;
}

export const metadata: Metadata = {
  title: 'Complete Your Profile | Step 2',
  description:
    'Complete your profile setup and preferences to get started with our platform.',
  keywords: 'profile setup, onboarding, registration, step 2',
};
