import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";
import { useAppMutation, useAppQuery} from "@/api/client-constructor";
import { BookingInformationResponse, BookingVerifyPaymentResponse, CustomApiResponse, InitiateBookingApiResponse, InitiateBookingPaymentRequest, InitiateBookingRequest, InitiatePaymentResponse, SimpleBookingResponse } from "@/api/types";



export const getUserBookings = () => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.bookings.viewUserBookings)
    return useAppQuery<SimpleBookingResponse>({
        apiRoute: routes.bookings.viewUserBookings,
        queryKey: [baseQueryKey]
    })
}

export const useGetBookingInformation = (id: string) => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.bookings.viewAndEditBooking(id))
    return useAppQuery<BookingInformationResponse>({
        apiRoute: routes.bookings.viewAndEditBooking(id),
        queryKey: [baseQueryKey]
    })
}



export const useInitiateBooking = (packageId: string, body?: InitiateBookingRequest) => {
    return useAppMutation<InitiateBookingApiResponse>({
        apiRoute: routes.bookings.initiateBooking(packageId),
        method: 'POST',
        body: JSON.stringify(body)
    })
}


export const useInitiateBookingPayment = (bookingId: string, body?: InitiateBookingPaymentRequest) => {
    return useAppMutation<InitiatePaymentResponse>({
        apiRoute: routes.bookings.initiateBookingPayment(bookingId),
        method: 'POST',
        body: JSON.stringify(body)
     })
}


export const useVerifyBookingPayment = (reference: string) => {
    return useAppQuery<BookingVerifyPaymentResponse>({
        apiRoute: routes.bookings.verifyBookingPayment.replace(':reference', reference),
        queryKey: ['VERIFY_BOOKING_PAYMENT', reference]
    })
}


export const useCancelBooking = (bookingId?: string) => {
    return useAppMutation<CustomApiResponse>({
        apiRoute: routes.bookings.cancelBooking(bookingId as string),
        method: 'POST'
    })
}
