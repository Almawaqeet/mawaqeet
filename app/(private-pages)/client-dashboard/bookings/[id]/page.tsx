import { Metadata } from "next";
import { BookingView } from "../_components/booking-view";



export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {

  return (
    <BookingView id={params.id} />
  );
}

export const metadata: Metadata = {
  title: "Booking Details | Al-Mawaqeet Travels",
  description: "View details of your travel booking with Al-Mawaqeet Travels and Tours",
  keywords: ["booking details", "travel", "tours", "Al-Mawaqeet", "reservation details"],
  openGraph: {
    title: "Booking Details | Al-Mawaqeet Travels",
    description: "View details of your travel booking with Al-Mawaqeet Travels and Tours"
  }
};
