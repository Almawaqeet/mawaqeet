import { BookingTable } from './_components/booking-table';
import { Metadata } from 'next';

export default function BookingPage() {
  return <BookingTable />;
}

export const metadata: Metadata = {
  title: 'Bookings | Al-Mawaqeet Travels',
  description:
    'View and manage your travel bookings with Al-Mawaqeet Travels and Tours',
  keywords: [
    'bookings',
    'travel',
    'tours',
    'Al-Mawaqeet',
    'reservations',
    'trips',
  ],
  openGraph: {
    title: 'Bookings | Al-Mawaqeet Travels',
    description:
      'View and manage your travel bookings with Al-Mawaqeet Travels and Tours',
  },
};
