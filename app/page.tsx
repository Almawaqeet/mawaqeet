"use client"

import Navbar from "./UI/Navbar";
import { MbisProvider } from "./libs/hooks/useContextProvider";

import About from "./pages/About";



export default function Home() {
  return (
    <MbisProvider>
      <main>
        <Navbar />
        <About />
      </main>
    </MbisProvider>
  )
}
