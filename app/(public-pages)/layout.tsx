import Navbar from '@/Components/Reusables/Ui/Navbar';
import Footer from '@/Components/Reusables/Ui/Footer';

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
