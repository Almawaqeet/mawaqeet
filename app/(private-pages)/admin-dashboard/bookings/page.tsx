import React from 'react'
import PackageBookingList from './_components/booking-list'

export const metadata = {
  title: 'Dashboard : Package Bookings',
  description: 'View and manage package bookings across all active packages'
};

export default function BookingPage() {
  return (
    <PackageBookingList />
  )
}
