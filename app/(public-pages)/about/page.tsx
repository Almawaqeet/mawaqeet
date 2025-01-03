import React from 'react';
import { Metadata } from 'next';
import { AboutPageSection } from '@/app/(public-pages)/_components/about-page/AboutPageSection';
import OurTeam from '@/app/(public-pages)/_components/about-page/OurTeam';
import Complementary from '@/app/(public-pages)/_components/about-page/Complementary';

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-2">
      <AboutPageSection />
      <OurTeam />
      <Complementary />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'About Us | Al-Mawaqeet Travels and Tours',
  description:
    'Learn about Al-Mawaqeet Travels and Tours, your trusted partner for Hajj and Umrah services. Discover our experienced team, values, and commitment to excellence in Islamic pilgrimage services.',
  keywords: [
    'al-mawaqeet travels',
    'hajj services',
    'umrah packages',
    'islamic travel agency',
    'muslim pilgrimage',
    'mecca travel',
    'medina tours',
    'religious tourism',
    'nigerian travel agency',
    'pilgrimage experts',
    'spiritual journey guides',
  ].join(', '),
  alternates: {
    canonical: 'https://almawaqeet.com/about',
  },
};
