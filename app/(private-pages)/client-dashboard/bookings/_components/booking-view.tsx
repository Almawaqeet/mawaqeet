'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  useGetBookingInformation,
  useCancelBooking,
} from '@/api/services/booking';
import { PieChart, Pie, Cell } from 'recharts';
import {
  CrownIcon,
  StarIcon,
  DiamondIcon,
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  PackageIcon,
  CreditCardIcon,
  PercentIcon,
  XIcon,
  ReceiptIcon,
} from 'lucide-react';
import { CLIENT_ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import CompletionModal from './booking-completion-modal';
import CancelModal from './booking-cancel-modal';
import ConfirmationModal from './booking-confirmation-modal';
import ReceiptsModal from './booking-reciept-modal';
import { PACKAGE_TYPES } from '@/constants/generic';
import { removeNoneAlphanumericEntity } from '@/lib/utils';

interface BookingViewProps {
  id: string;
}

export function BookingView({ id }: BookingViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    data: bookingData,
    isLoading,
    error: bookingError,
  } = useGetBookingInformation(id);
  const [showReceiptsModal, setShowReceiptsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const booking = bookingData?.booking;
  const { mutate: cancelBooking, isPending: isCancelling } =
    useCancelBooking(id);
  const queryClient = useQueryClient();

  // Handle completion modal visibility when booking data changes
  useEffect(() => {
    if (booking?.status?.toLowerCase() === 'payment_completed') {
      setShowCompletionModal(true);
    }
  }, [booking?.status]);

  if (bookingError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to fetch booking information. Please try again.',
    });
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  if (booking?.is_active === false) {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="bg-white mx-4">
          <DialogHeader>
            <DialogTitle>Booking Deactivated</DialogTitle>
            <DialogDescription>
              This booking page has been deactivated because the booking is no
              longer active.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() =>
                router.push(
                  CLIENT_ROUTES.PrivatePages.clientDashboard.booking.mainPage
                )
              }
              className="w-full"
            >
              Return to Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const progressPercentage =
    booking.percentage_completion?.percentage_completion ?? 0;
  const remainingPercentage = 100 - progressPercentage;

  const remainingBalance =
    Number(booking.balance ?? 0) - Number(booking.total_amount_paid ?? 0);

  const data = [
    { name: 'Progress', value: progressPercentage },
    { name: 'Remaining', value: remainingPercentage },
  ];

  const COLORS = ['#A88A69', '#E5E7EB'];

  const getCategoryIcon = (category: string | undefined) => {
    if (!category)
      return <StarIcon className="h-5 w-5 transition-all duration-200" />;

    switch (category.toLowerCase()) {
      case 'vip':
        return (
          <CrownIcon className="h-5 w-5 text-yellow-500 drop-shadow-md transition-all duration-200 hover:scale-110" />
        );
      case 'deluxe':
        return (
          <DiamondIcon className="h-5 w-5 text-purple-500 drop-shadow-md transition-all duration-200 hover:scale-110" />
        );
      case 'standard':
        return (
          <StarIcon className="h-5 w-5 text-blue-500 drop-shadow-md transition-all duration-200 hover:scale-110" />
        );
      default:
        return <StarIcon className="h-5 w-5 transition-all duration-200" />;
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'no_payment':
        return 'default';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'success';
      default:
        return 'outline';
    }
  };

  const formatStatus = (status: string | undefined) => {
    if (!status) return 'UNKNOWN';
    return status.replace(/_/g, ' ').toUpperCase();
  };

  const handleCancelBooking = () => {
    cancelBooking(undefined, {
      onSuccess: (response) => {
        if (response?.message) {
          setShowConfirmationModal(true);
          queryClient.invalidateQueries({
            queryKey: [
              generateBaseQueryKeyFromRoute(
                routes.wallet.checkWalletInformation
              ),
            ],
          });
          queryClient.invalidateQueries({
            queryKey: [
              generateBaseQueryKeyFromRoute(routes.bookings.viewUserBookings),
            ],
          });
          queryClient.invalidateQueries({
            queryKey: [
              generateBaseQueryKeyFromRoute(
                routes.bookings.viewAndEditBooking(id)
              ),
            ],
          });
        }
        setShowCancelModal(false);
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error?.response?.message ||
            'Failed to cancel booking. Please try again.',
        });
      },
    });
  };

  const handleConfirmation = (redirectTo: string) => {
    router.push(redirectTo);
  };

  const handleRequestCard = () => {
    // Handle card request logic
    toast({
      title: 'Request Submitted',
      description: 'Your payment card request has been submitted successfully.',
    });
  };

  const handleDownloadPortfolio = () => {
    // Handle portfolio download logic
    toast({
      title: 'Download Started',
      description: 'Your booking portfolio is being downloaded.',
    });
  };

  const handleLiveCall = () => {
    // Handle live call logic
    toast({
      title: 'Call Request Sent',
      description: 'Our representative will contact you shortly.',
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-4 sm:py-8">
      <CompletionModal
        open={showCompletionModal}
        onOpenChange={setShowCompletionModal}
        onRequestCard={handleRequestCard}
        onDownloadPortfolio={handleDownloadPortfolio}
        onLiveCall={handleLiveCall}
      />

      <ReceiptsModal
        open={showReceiptsModal}
        onOpenChange={setShowReceiptsModal}
        transactions={booking.transactions || []}
      />

      <CancelModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        onConfirm={handleCancelBooking}
        totalAmountPaid={booking.total_amount_paid || 0}
        isCancelling={isCancelling}
      />

      <ConfirmationModal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={() =>
          handleConfirmation(
            CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.viewWallet
          )
        }
        onCancel={() =>
          handleConfirmation(
            CLIENT_ROUTES.PrivatePages.clientDashboard.booking.mainPage
          )
        }
        message="Booking cancellation is complete. Would you like to go to the wallet page or the booking page?"
      />

      <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex flex-wrap items-center gap-3">
          <PackageIcon className="h-6 w-6 text-brand-color" />
          <span className="break-all">
            {booking.package?.name ?? 'Booking Details'}
          </span>
          <Badge
            variant={
              getStatusColor(booking.status) as
                | 'default'
                | 'destructive'
                | 'outline'
                | 'secondary'
            }
            className="px-3 py-1 text-sm sm:text-base font-medium rounded-full"
          >
            {formatStatus(booking.status)}
          </Badge>
        </h2>
        <Button
          variant="outline"
          onClick={() => setShowReceiptsModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <ReceiptIcon className="h-4 w-4" />
          View Receipts
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-brand-color" />
              Package Information
            </CardTitle>
            <CardDescription>
              View your package details and specifications
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
            <div className="grid gap-3 sm:gap-4 rounded-lg bg-white p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="font-medium text-gray-600 flex items-center gap-2">
                  <PackageIcon className="h-4 w-4 text-gray-400" />
                  Package Name
                </span>
                <span className="font-semibold text-gray-900 break-all">
                  {booking.package?.name ?? 'N/A'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="font-medium text-gray-600 flex items-center gap-2">
                  <PackageIcon className="h-4 w-4 text-gray-400" />
                  Package Type
                </span>
                <span className="font-semibold text-gray-900">
                  {booking.package?.package_type ?? 'N/A'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="font-medium text-gray-600 flex items-center gap-2">
                  {getCategoryIcon(booking.selected_price?.category)}
                  Package Category
                </span>
                <span className="font-semibold text-gray-900">
                  {(booking.selected_price?.category ?? 'N/A').toUpperCase()}
                </span>
              </div>
              {booking.package?.package_type?.toUpperCase() ===
                PACKAGE_TYPES.UMRAH &&
                booking.selected_batch && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      Selected Batch
                    </span>
                    <span className="font-semibold text-gray-900">
                      {booking.selected_batch?.batch_name ?? 'N/A'} - Starting{' '}
                      {new Date(
                        booking.selected_batch?.batch_start_date ?? ''
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <span className="font-medium text-gray-600 flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4 text-gray-400" />
                  Payment Plan
                </span>
                <span className="font-semibold text-gray-900">
                  {removeNoneAlphanumericEntity(
                    (booking.payment_plan ?? 'N/A').toUpperCase()
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
              <PercentIcon className="h-5 w-5 text-brand-color" />
              Payment Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="w-36 h-36 sm:w-48 sm:h-48 relative flex items-center justify-center">
              <PieChart width={192} height={192}>
                <Pie
                  data={data}
                  cx={96}
                  cy={96}
                  innerRadius={70}
                  outerRadius={95}
                  fill="#A88A69"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-brand-color">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                ₦
                {remainingBalance.toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Remaining Balance
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
              <DollarSignIcon className="h-5 w-5 text-brand-color" />
              Payment Details
            </CardTitle>
            <CardDescription>
              Track your payment progress and balance
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4 text-gray-400" />
                Selected Price
              </p>
              <p className="text-lg sm:text-xl font-bold mt-1">
                ₦
                {booking.selected_price?.price
                  ? Number(booking.selected_price.price).toLocaleString(
                      'en-NG',
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )
                  : 'N/A'}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4 text-gray-400" />
                Payment Plan
              </p>
              <p className="text-lg sm:text-xl font-bold mt-1 capitalize">
                {removeNoneAlphanumericEntity(
                  booking.payment_plan?.toLowerCase() ?? 'N/A'
                )}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray-400" />
                Total Amount Paid
              </p>
              <p className="text-lg sm:text-xl font-bold mt-1">
                ₦
                {booking.total_amount_paid
                  ? Number(booking.total_amount_paid).toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '0.00'}
              </p>
            </div>

            {booking.status !== 'CONFIRMED' && (
              <div className="md:col-span-3 flex flex-col sm:flex-row gap-4">
                {booking.status?.toLowerCase() === 'payment_completed' ? (
                  <Button
                    className="w-full sm:flex-1 bg-brand-color"
                    onClick={() => setShowCompletionModal(true)}
                  >
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    View Completion Details
                  </Button>
                ) : (
                  <Button
                    className="w-full sm:flex-1 bg-brand-color"
                    onClick={() =>
                      router.push(
                        CLIENT_ROUTES.PrivatePages.clientDashboard.booking.initiatePayment(
                          booking.id ?? ''
                        )
                      )
                    }
                  >
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    Make Payment
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="w-full sm:flex-1"
                  onClick={() => setShowCancelModal(true)}
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Cancel Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Timeline
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm font-normal">
                Important Dates
              </span>
            </CardTitle>
            <CardDescription>
              Track important dates and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid md:grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
              <div className="p-4 bg-white rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  Date Initiated
                </span>
                <span className="text-sm sm:text-base font-semibold">
                  {booking.date_initiated
                    ? new Date(booking.date_initiated).toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )
                    : 'N/A'}
                </span>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  Expiry Date
                </span>
                <span className="text-sm sm:text-base font-semibold">
                  {booking.expiry_date
                    ? new Date(booking.expiry_date).toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )
                    : 'N/A'}
                </span>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <DollarSignIcon className="h-4 w-4 text-gray-400" />
                  Payment Completion
                </span>
                <span className="text-sm sm:text-base font-semibold">
                  {booking.date_payment_completed
                    ? new Date(
                        booking.date_payment_completed
                      ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Pending'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
