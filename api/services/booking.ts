import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";
import { useAppQuery} from "@/api/client-constructor";
import { SimpleBookingResponse } from "@/api/types";



export const getUserBookings = () => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.bookings.viewUserBookings)
    return useAppQuery<SimpleBookingResponse>({
        apiRoute: routes.bookings.viewUserBookings,
        queryKey: [baseQueryKey]
    })
}
