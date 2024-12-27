import dynamic from 'next/dynamic';

const ContactPageSection = dynamic(
  () =>
    import('./_components/contact-page-section').then(
      (mod) => mod.ContactPageSection
    ),
  { ssr: false }
);

export default function ContactPage() {
  return <ContactPageSection />;
}
