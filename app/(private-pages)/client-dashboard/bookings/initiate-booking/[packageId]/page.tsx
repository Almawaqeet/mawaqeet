import { InitiateBookingForm } from '@/app/(private-pages)/client-dashboard/bookings/_components/initiate-booking-form';

export default function InitiateBookingPage({
  params,
}: {
  params: { packageId: string };
}) {
  return <InitiateBookingForm packageId={params.packageId} />;
}
