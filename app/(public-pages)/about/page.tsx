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
    'Learn about Al-Mawaqeet Travels and Tours, your trusted partner for Hajj and Umrah services.',
  keywords:
    'hajj, umrah, islamic travel, muslim pilgrimage, mecca travel, medina tours, religious tourism, travel agency',
};
