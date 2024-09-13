"use client"
import { MbisProvider } from "./libs/hooks/useContextProvider";
import HomeV1 from "./UI/HomeV1";
import Homes from "./pages/Home";
import Navbar from "./UI/Navbar";
import HomeV2 from "./UI/HomeV2";

export default function Home() {
  return (
    <MbisProvider>
      <main>
        <Navbar />
        <Homes>
          <HomeV1 />
          <HomeV2 />
        </Homes>
      
      </main>
    </MbisProvider>
  )
}
