"use client"
import { MbisProvider } from "./libs/hooks/useContextProvider";
import HomeV1 from "./UI/HomeV1";
import Navbar from "./UI/Navbar";
import HomeV2 from "./UI/HomeV2";
import Homes from "./pages/Home";
import { HeroSection } from "@/Components/PublicPages/LandingPage/HeroSection";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function LandingPage() {
  return (

    <MbisProvider>
        <main className={poppins.className}>
          <Navbar />
          <HeroSection />
        </main>
    </MbisProvider>
  )
}
