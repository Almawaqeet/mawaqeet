"use client"

import HomeV1 from "./UI/HomeV1";
import Homes from "./pages/Home";
import Navbar from "./UI/Navbar";
import TeamProfile from "./UI/TeamProfile";
import { MbisProvider } from "./libs/hooks/useContextProvider";

import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import LocateUs from "./UI/LocateUs";
import Payment from "./UI/Payment";
import SignUp from "./pages/SignUp";



export default function Home() {
  return (
    <MbisProvider>
      <main>
        <Navbar />
        {/* <Homes>
          <HomeV1 />
        </Homes> */}
        {/* <About /> */}
        {/* <TeamProfile /> */}
        {/* <ContactUs /> */}
        {/* <LocateUs /> */}
        {/* <Payment /> */}
        <SignUp />
      </main>
    </MbisProvider>
  )
}
