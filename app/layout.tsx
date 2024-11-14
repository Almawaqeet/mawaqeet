import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from './UI/Navbar';
import Footer from './UI/Footer';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Al-Mawaqeet Travels and Tours',
  description: 'Your Reliable Companion in Adventurous Journeys',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={metadata?.icons as string} />
      </head>
      <body
        className={`${poppins.className} bg-brand-color-subtle`}
      >
        <div className="pt-[100px] max-w-screen-2xl mx-auto">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
