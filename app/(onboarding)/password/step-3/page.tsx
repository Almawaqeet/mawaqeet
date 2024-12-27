import ResetPasswordStepThree from '@/app/(public-pages)/_components/password/ResetPasswordStepThree';
import { Metadata } from 'next';

export default async function StepThreePage() {
  return <ResetPasswordStepThree />;
}

export const metadata: Metadata = {
  title: 'Set Your New Password | Step 3',
  description: 'Set your new password to continue with our platform.',
  keywords: 'set new password, onboarding, registration, step 3',
};
