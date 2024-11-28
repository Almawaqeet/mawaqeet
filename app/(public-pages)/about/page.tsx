import React from 'react'
import { Metadata } from 'next'
import { AboutPageSection } from '@/app/(public-pages)/_components/about-page/AboutPageSection'

export default function AboutPage() {
    return <AboutPageSection />
}



export const metadata: Metadata = {
    title: "About Us | Al-Mawaqeet Travels and Tours",
    description: "Learn about Al-Mawaqeet Travels and Tours, your trusted partner for Hajj and Umrah services.",
    keywords: "hajj, umrah, islamic travel, muslim pilgrimage, mecca travel, medina tours, religious tourism, travel agency",
  };
