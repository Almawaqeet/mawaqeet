import StepOneOnboarding from "@/app/(public-pages)/_components/onboarding/StepOne";
import { Metadata } from "next";



export default function StepOnePage() {
  return (
    <StepOneOnboarding />
  )
}


export const metadata: Metadata = {
    title: "Complete Your Profile | Step 1",
    description: "Start your profile setup and preferences to get started with our platform.",
    keywords: "profile setup, onboarding, registration, step 1",
  };
