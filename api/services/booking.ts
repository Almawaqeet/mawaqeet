import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";
import { useAppMutation, useAppQuery} from "@/api/client-constructor";
import { CustomApiResponse, InitiateBookingRequest, SimpleBookingResponse } from "@/api/types";



export const getUserBookings = () => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.bookings.viewUserBookings)
    return useAppQuery<SimpleBookingResponse>({
        apiRoute: routes.bookings.viewUserBookings,
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
