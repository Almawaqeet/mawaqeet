import React from 'react'
import { BookingPayment } from '@/app/(private-pages)/client-dashboard/bookings/_components/booking-payment'

export default function BookingPaymentPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <BookingPayment id={params?.id ?? ''} />
    </div>
  )
}
