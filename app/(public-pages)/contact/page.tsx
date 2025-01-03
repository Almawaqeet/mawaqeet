import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const ContactPageSection = dynamic(
  () =>
    import('./_components/contact-page-section').then(
      (mod) => mod.ContactPageSection
    ),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <main>
      <ContactPageSection />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Contact Us | Al-Mawaqeet Travels and Tours',
  description: 'Get in touch with Al-Mawaqeet Travels and Tours for all your Hajj and Umrah travel needs. Contact our expert team for inquiries about packages, bookings, and personalized pilgrimage services.',
  keywords: [
    'contact al-mawaqeet',
    'hajj travel contact',
    'umrah booking inquiry',
    'islamic travel agency contact',
    'pilgrimage services contact',
    'muslim travel agency nigeria',
    'mecca travel booking',
    'medina tour inquiry'
  ].join(', '),
  openGraph: {
    title: 'Contact Us | Al-Mawaqeet Travels and Tours',
    description: 'Get in touch with Al-Mawaqeet Travels and Tours for all your Hajj and Umrah travel needs. Contact our expert team for inquiries about packages, bookings, and personalized pilgrimage services.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Al-Mawaqeet Travels and Tours'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Al-Mawaqeet Travels and Tours',
    description: 'Get in touch with Al-Mawaqeet Travels and Tours for all your Hajj and Umrah travel needs. Contact our expert team for inquiries about packages, bookings, and personalized pilgrimage services.'
  },
  alternates: {
    canonical: 'https://almawaqeet.com/contact'
  }
};
