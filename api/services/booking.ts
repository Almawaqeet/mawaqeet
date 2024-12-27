import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import {
  useAppMutation,
  useAppQuery,
  useAppQueryWithPaginationAndParams,
} from '@/api/client-constructor';
import {
  BookingFinancialSummaryResponse,
  BookingInformationResponse,
  BookingVerifyPaymentResponse,
  CustomApiResponse,
  InitiateBookingApiResponse,
  InitiateBookingPaymentRequest,
  InitiateBookingRequest,
  InitiatePaymentResponse,
  PackageBookingListResponse,
  PaginatedResponse,
  SimpleBookingResponse,
} from '@/api/types';

export const useGetUserBookings = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.bookings.viewUserBookings
  );

  return useAppQuery<SimpleBookingResponse>({
    apiRoute: routes.bookings.viewUserBookings,
    queryKey: [baseQueryKey],
  });
};

export const useGetBookingInformation = (id: string) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.bookings.viewAndEditBooking(id)
  );
  return useAppQuery<BookingInformationResponse>({
    apiRoute: routes.bookings.viewAndEditBooking(id),
    queryKey: [baseQueryKey],
  });
};

export const useInitiateBooking = (
  packageId: string,
  body?: InitiateBookingRequest
) => {
  return useAppMutation<InitiateBookingApiResponse>({
    apiRoute: routes.bookings.initiateBooking(packageId),
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useInitiateBookingPayment = (
  bookingId: string,
  body?: InitiateBookingPaymentRequest
) => {
  return useAppMutation<InitiatePaymentResponse>({
    apiRoute: routes.bookings.initiateBookingPayment(bookingId),
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useMakeBookingPaymentThroughWallet = (
  bookingId: string,
  body?: InitiateBookingPaymentRequest
) => {
  return useAppMutation<BookingVerifyPaymentResponse>({
    apiRoute: routes.bookings.makeBookingThroughWallet(bookingId),
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useVerifyBookingPayment = (reference: string) => {
  return useAppQuery<BookingVerifyPaymentResponse>({
    apiRoute: routes.bookings.verifyBookingPayment.replace(
      ':reference',
      reference
    ),
    queryKey: ['VERIFY_BOOKING_PAYMENT', reference],
  });
};

export const useCancelBooking = (bookingId?: string) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.bookings.cancelBooking(bookingId as string),
    method: 'POST',
  });
};

export const useGetBookingsForAPackage = (
  packageId: string,
  params?: {
    search?: string;
    page?: number;
    status?: string;
    category?: string;
  }
) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.bookings.bookingsForPackage(packageId)
  );
  return useAppQueryWithPaginationAndParams<
    PaginatedResponse<PackageBookingListResponse>
  >({
    apiRoute: routes.bookings.bookingsForPackage(packageId),
    queryKey: [
      baseQueryKey,
      params?.search,
      params?.page,
      params?.status,
      params?.category,
    ],
    params: params,
  });
};

export const useGetBookingFinancialSummaryForASpecificPackage = (
  packageId: string
) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.bookings.bookingFinancialSummaryForASpecificPackage(packageId)
  );
  return useAppQuery<BookingFinancialSummaryResponse>({
    apiRoute:
      routes.bookings.bookingFinancialSummaryForASpecificPackage(packageId),
    queryKey: [baseQueryKey],
  });
};
