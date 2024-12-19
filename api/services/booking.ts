import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";
import { useAppMutation, useAppQuery} from "@/api/client-constructor";
import { BookingInformationResponse, CustomApiResponse, InitiateBookingRequest, SimpleBookingResponse } from "@/api/types";



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
    return useAppMutation<CustomApiResponse>({
        apiRoute: routes.bookings.initiateBooking(packageId),
        method: 'POST',
        body: JSON.stringify(body)
    })
}
