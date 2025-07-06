import { generateBaseQueryKeyFromRoute, routes } from '@/network/routes';
import {
  useAppMutation,
  useAppQuery,
  useAppQueryWithPaginationAndParams,
} from '@/network/client-constructor';
import {
  BookingFinancialSummaryResponse,
  BookingInformationResponse,
  BookingVerifyPaymentResponse,
  CompleteBookingRequest,
  CompleteBookingResponse,
  CustomApiResponse,
  InitiateBookingApiResponse,
  InitiateBookingPaymentRequest,
  InitiateBookingRequest,
  InitiatePaymentResponse,
  PackageBookingListResponse,
  SimpleBookingResponse,
  UpdateHotelRoomRequest,
  UpdateHotelRoomResponse,
} from '@/network/types';

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
    options: {
      enabled: !!reference,
      refetchOnWindowFocus: false,
    },
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
  return useAppQueryWithPaginationAndParams<PackageBookingListResponse>({
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

export const useCompleteBooking = (body: CompleteBookingRequest) => {
  return useAppMutation<CompleteBookingResponse>({
    apiRoute: routes.bookings.completeBooking,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useUpdateHotelRoom = (body?: UpdateHotelRoomRequest) => {
  return useAppMutation<UpdateHotelRoomResponse>({
    apiRoute: routes.bookings.updateHotelRoom,
    method: 'POST',
    body: JSON.stringify(body),
  });
};
