import Navbar from '@/components/reusables/ui/Navbar';
import Footer from '@/components/reusables/ui/Footer';

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
