import Navbar from '@/components/Reusables/Ui/Navbar';
import Footer from '@/components/Reusables/Ui/Footer';

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
