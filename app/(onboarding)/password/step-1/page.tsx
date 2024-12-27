import ResetPasswordStepOne from '@/app/(public-pages)/_components/password/ResetPasswordStepOne';
import { Metadata } from 'next';

export default function StepOne() {
  return <ResetPasswordStepOne />;
}

export const metadata: Metadata = {
  title: 'Enter Your Email | Step 1',
  description: 'Enter your email to continue with our platform.',
  keywords: 'enter email, onboarding, registration, step 1',
};
