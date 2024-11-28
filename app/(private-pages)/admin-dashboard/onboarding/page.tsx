import React from 'react';
import dynamic from 'next/dynamic'

const OnboardingList = dynamic(() => import('./_components'), { ssr: false })

export default function OnboardingListPage() {
  return <OnboardingList />;
}
