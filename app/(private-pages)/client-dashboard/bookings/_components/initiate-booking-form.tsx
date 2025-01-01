'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCheckPackageSettlementStatus, useViewPackage } from '@/api/services/packages';
import { Skeleton } from '@/components/ui/skeleton';
import { useInitiateBooking } from '@/api/services/booking';
import { useAppToast } from '@/components/reusables/AppToast';
import { useRouter } from 'next/navigation';
import AppButton from '@/components/reusables/AppButton';
import { CLIENT_ROUTES } from '@/lib/routes';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import { useQueryClient } from '@tanstack/react-query';
import { PACKAGE_TYPES } from '@/constants/generic';
import { useCheckIfUserHasAWallet } from '@/api/services/wallet';
import AppDialogBox from '@/components/reusables/AppDialogBox';

const validationSchema = Yup.object({
  category: Yup.string().required('Please select a category'),
  paymentPlan: Yup.string().required('Please select a payment plan'),
  umrahBatch: Yup.string().when('packageType', {
    is: (val: string) => val?.toUpperCase() === PACKAGE_TYPES.UMRAH,
    then: () => Yup.string().required('Please select a batch'),
    otherwise: () => Yup.string(),
  }),
});

export const InitiateBookingForm = ({ packageId }: { packageId: string }) => {
  const router = useRouter();
  const { data: packageData, isLoading } = useViewPackage(packageId);
  const { mutate: initiateBooking, isPending: initiateBookingPending } =
    useInitiateBooking(packageId);
  const { showToast } = useAppToast();
  const queryClient = useQueryClient();
  const { data: checkIfUserHasWallet, isLoading: walletLoading } =
    useCheckIfUserHasAWallet();
  const { data: settlementData, isLoading: settlementLoading } =
    useCheckPackageSettlementStatus(packageId);

  const formik = useFormik({
    initialValues: {
      category: '',
      paymentPlan: '',
      umrahBatch: '',
      packageType: packageData?.package_type || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        payment_plan: values.paymentPlan,
        category: values.category,
        ...(packageData?.package_type?.toUpperCase() ===
          PACKAGE_TYPES.UMRAH && { batch_id: values.umrahBatch }),
      };

      initiateBooking(payload, {
        onSuccess: (response) => {
          if (response?.booking_id) {
            showToast({
              title: 'Success',
              description: response.message,
              variant: 'default',
            });
            queryClient.invalidateQueries({
              queryKey: [
                generateBaseQueryKeyFromRoute(routes.bookings.viewUserBookings),
              ],
            });
            router.push(
              CLIENT_ROUTES.PrivatePages.clientDashboard.booking.viewBooking(
                response?.booking_id
              )
            );
          }
        },
        onError: (error: any) => {
          showToast({
            title: 'Error',
            description:
              error?.message || 'An error occurred while initiating booking',
            variant: 'destructive',
          });
        },
      });
    },
  });

  if (walletLoading || settlementLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  if (settlementData?.has_settlement) {
    return (
      <AppDialogBox
        open={true}
        onOpenChange={() => {}}
        title="Package Not Available"
        description="This package has already been settled and is no longer available for booking. Please choose another package."
        cancelText="Go Back"
        confirmText="View Packages"
        onCancel={() => router.back()}
        onConfirm={() =>
          router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.packages)
        }
      />
    );
  }

  if (checkIfUserHasWallet?.has_wallet === false) {
    return (
      <AppDialogBox
        open={true}
        onOpenChange={() => {}}
        title="You don't have a wallet"
        description="You need to create a wallet before you can book any packages. Would you like to create one now?"
        cancelText="Later"
        confirmText="Create Wallet"
        onCancel={() =>
          router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.packages)
        }
        onConfirm={() =>
          router.push(
            CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.createWallet
          )
        }
      />
    );
  }

  const paymentPlans = [
    { id: 'full', name: 'Full Payment' },
    { id: 'installment_free', name: 'Start with any payment' },
    { id: 'installment_weekly', name: 'Weekly Installment' },
    { id: 'installment_monthly', name: 'Monthly Installment' },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8 mt-10 sm:mt-14">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <Skeleton className="h-6 sm:h-8 w-2/3 mb-3 sm:mb-4" />
            <Skeleton className="h-16 sm:h-20 w-full mb-3 sm:mb-4" />
            <Skeleton className="h-40 sm:h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 mt-10 sm:mt-14">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="space-y-2 border-b p-4 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Initiate Booking
          </CardTitle>
          {packageData && (
            <div className="mt-3 sm:mt-4 bg-muted/50 rounded-lg p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {packageData?.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Package Type</p>
                  <p className="font-medium capitalize">
                    {packageData?.package_type}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p
                    className={`font-medium ${packageData?.is_active ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {packageData?.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(
                      packageData?.expiry_date ?? ''
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-6 sm:pt-8 bg-white">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Category
              </label>
              <Select
                name="category"
                onValueChange={(value) =>
                  formik.setFieldValue('category', value)
                }
                value={formik.values.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {packageData?.price?.map((priceItem) => (
                    <SelectItem key={priceItem.id} value={priceItem.category}>
                      {priceItem.category} - ₦
                      {Number(priceItem.price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-xs text-red-500 mt-1">
                  {formik.errors.category}
                </div>
              )}
            </div>

            {packageData?.package_type?.toUpperCase() === PACKAGE_TYPES.UMRAH &&
              packageData?.umrah_batch && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Batch
                  </label>
                  <Select
                    name="umrahBatch"
                    onValueChange={(value) =>
                      formik.setFieldValue('umrahBatch', value)
                    }
                    value={formik.values.umrahBatch}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageData?.umrah_batch?.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id ?? ''}>
                          {batch?.batch_name as string} - Starting{' '}
                          {new Date(
                            batch.batch_start_date
                          ).toLocaleDateString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.umrahBatch && formik.errors.umrahBatch && (
                    <div className="text-xs text-red-500 mt-1">
                      {formik.errors.umrahBatch}
                    </div>
                  )}
                </div>
              )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Plan
              </label>
              <Select
                name="paymentPlan"
                onValueChange={(value) =>
                  formik.setFieldValue('paymentPlan', value)
                }
                value={formik.values.paymentPlan}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a payment plan" />
                </SelectTrigger>
                <SelectContent>
                  {paymentPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.paymentPlan && formik.errors.paymentPlan && (
                <div className="text-xs text-red-500 mt-1">
                  {formik.errors.paymentPlan}
                </div>
              )}
            </div>

            <AppButton
              type="submit"
              className="w-full text-sm sm:text-base py-4 sm:py-5 mt-4 bg-brand-color"
              loading={initiateBookingPending}
            >
              {initiateBookingPending ? 'Processing...' : 'Continue Booking'}
            </AppButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
