import { Metadata } from "next";
import dynamic from 'next/dynamic'

const StepThreeOnboarding = dynamic(() => import('@/app/(public-pages)/_components/onboarding/StepThree'), { ssr: false })



export default function StepThreePage() {
  return (
    <StepThreeOnboarding />
  )
}


export const metadata: Metadata = {
    title: "Complete Your Profile | Step 3",
    description: "Complete your profile setup and preferences to get started with our platform.",
    keywords: "profile setup, onboarding, registration, step 3",
  };
