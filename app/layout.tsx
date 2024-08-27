import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'Al-Mawaqeet Travels and Tours',
  description: 'Your Reliable Companion in adventurous journeys',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
