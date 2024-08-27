"use client"
import Navbar from "./UI/Navbar";
import About from "./pages/About";
import { MbisProvider } from "./libs/hooks/useContextProvider";


export default function Home() {
  return (
    <MbisProvider>
      <main>
        <Navbar />
        <Home />
      </main>
    </MbisProvider>
  )
}
