import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import ReactQueryProvider from '@/providers/query-client-provider';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import { NextAuthProvider } from '@/providers/session-provider';



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
      <body className={`${poppins.className}`}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <NextTopLoader showSpinner={false} color="#4B3938" />
            <Toaster />
              <div className="max-w-screen-2xl mx-auto bg-[#F1EBE5] text-brand-color suppressHydrationWarning={true}">
              {children}
            </div>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
