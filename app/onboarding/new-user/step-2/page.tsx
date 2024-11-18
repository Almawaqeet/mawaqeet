import StepTwoOnboarding from "@/components/public-pages/onboarding/StepTwo";
import { Metadata } from "next";


export default function StepTwoPage() {
  return (
    <StepTwoOnboarding />
  )
}


export const metadata: Metadata = {
    title: "Complete Your Profile | Step 2",
    description: "Complete your profile setup and preferences to get started with our platform.",
    keywords: "profile setup, onboarding, registration, step 2",
  };
