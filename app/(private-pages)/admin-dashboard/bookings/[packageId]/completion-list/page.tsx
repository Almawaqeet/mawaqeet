import { Metadata } from 'next';
import CompletionList from '@/app/(private-pages)/admin-dashboard/bookings/_components/completion-list';

export const metadata: Metadata = {
  title: 'Package Booking Completion List',
  description:
    'View and manage package booking completion status and card delivery details',
};

export default function PackageBookingCompletionList() {
  return <CompletionList />;
}
