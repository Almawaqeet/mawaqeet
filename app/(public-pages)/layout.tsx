import Navbar from '@/components/reusables/Navbar';
import Footer from '@/components/reusables/Footer';
import InlineNavigation from '@/components/reusables/InlineNavigation';
import WhatsaapChat from '@/components/reusables/whatsaap-chat';

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-[100px] bg-brand-color-subtle">
      <Navbar />
      <WhatsaapChat />
      <InlineNavigation />
      {children}
      <Footer />
    </div>
  );
}
