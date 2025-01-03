import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import ReactQueryProvider from '@/providers/query-client-provider';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import { NextAuthProvider } from '@/providers/session-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ErrorProvider } from '@/providers/error-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'Al-Mawaqeet Travels and Tours | Premier Hajj & Umrah Services',
  description:
    'Experience seamless Islamic pilgrimages with Al-Mawaqeet Travels. We offer premium Hajj & Umrah packages, expert guidance, and comprehensive travel services tailored to your spiritual journey.',
  keywords: [
    'Hajj packages',
    'Umrah services',
    'Islamic pilgrimage',
    'Muslim travel agency',
    'Saudi Arabia tours',
    'Makkah trips',
    'Madinah visits',
  ],
  authors: [{ name: 'Al-Mawaqeet Travels and Tours' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Al-Mawaqeet Travels and Tours | Premier Hajj & Umrah Services',
    description:
      'Experience seamless Islamic pilgrimages with Al-Mawaqeet Travels. We offer premium Hajj & Umrah packages, expert guidance, and comprehensive travel services tailored to your spiritual journey.',
    images: [
      {
        url: '/images/export.png',
        width: 800,
        height: 600,
        alt: 'Al-Mawaqeet Travels and Tours - Your Trusted Partner for Hajj & Umrah',
      },
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'Al-Mawaqeet Travels and Tours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Mawaqeet Travels and Tours | Premier Hajj & Umrah Services',
    description:
      'Experience seamless Islamic pilgrimages with Al-Mawaqeet Travels. We offer premium Hajj & Umrah packages, expert guidance, and comprehensive travel services.',
    images: ['/images/export.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={metadata?.icons as string} />
      </head>
      <body className={`${poppins.className}`}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <ErrorProvider error={null}>
              <NuqsAdapter>
                <NextTopLoader showSpinner={false} color="#4B3938" />
                <Toaster />
                <div className="max-w-screen-2xl mx-auto bg-[#F1EBE5] text-brand-color suppressHydrationWarning={true}">
                  {children}
                </div>
              </NuqsAdapter>
            </ErrorProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
