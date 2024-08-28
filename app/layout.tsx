import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al-Mawaqeet Travels and Tours',
  description: 'Your Reliable Companion in Adventurous Journeys',
  icons: {
    icon: '/images/logo.png', 
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
        <link rel="icon" href="/images/logo.png" /> 
      </head>
      <body>{children}</body>
    </html>
  );
}
