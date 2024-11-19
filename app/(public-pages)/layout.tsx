import Navbar from '@/components/reusables/Navbar';
import Footer from '@/components/reusables/Footer';

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-[100px] bg-brand-color-subtle">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
