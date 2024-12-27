import ResetPasswordStepTwo from '@/app/(public-pages)/_components/password/ResetPasswordStepTwo';
import { Metadata } from 'next';

export default function StepTwo() {
  return <ResetPasswordStepTwo />;
}

export const metadata: Metadata = {
  title: 'Verify Your Email | Step 2',
  description: 'Verify your email to continue with our platform.',
  keywords: 'verify email, onboarding, registration, step 2',
};
