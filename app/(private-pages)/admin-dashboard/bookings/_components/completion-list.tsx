'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';

import { BookingTableSkeleton } from '@/app/(private-pages)/client-dashboard/bookings/_components/booking-table-skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { DataTable } from '@/components/ui/table/data-table';
import {
  useGetBookingsForAPackage,
  useUpdateHotelRoom,
} from '@/api/services/booking';
import { useCheckPackageSettlementStatus } from '@/api/services/packages';
import { useAppToast } from '@/components/reusables/AppToast';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';

const validationSchema = Yup.object({
  hotelName: Yup.string().required('Hotel name is required'),
  hotelAddress: Yup.string().required('Hotel address is required'),
  hotelRoomNumber: Yup.string().required('Room number is required'),
  cardDelivered: Yup.boolean(),
  addedToWhatsapp: Yup.boolean(),
});

export default function CompletionList() {
  const { packageId } = useParams();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSettlementWarning, setShowSettlementWarning] = useState(false);
  const { showToast } = useAppToast();
  const queryClient = useQueryClient();

  const { data: bookingsData, isLoading } = useGetBookingsForAPackage(
    packageId as string,
    {
      status: 'payment_completed',
      page: 1,
    }
  );

  const { data: settlementData, isLoading: settlementLoading } =
    useCheckPackageSettlementStatus(packageId as string);

  const { mutateAsync: updateHotelRoom } = useUpdateHotelRoom();

  const formik = useFormik({
    initialValues: {
      hotelName: '',
      hotelAddress: '',
      hotelRoomNumber: '',
      cardDelivered: false,
      addedToWhatsapp: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedBooking) return;

      try {
        await updateHotelRoom({
          booking_id: selectedBooking,
          hotel_room: `${values.hotelRoomNumber}, ${values.hotelName}, ${values.hotelAddress}`,
          is_on_whatsapp_group: values.addedToWhatsapp,
          card_delivered: values.cardDelivered,
        });

        showToast({
          title: 'Success',
          description: 'Booking details updated successfully',
          variant: 'default',
        });

        queryClient.invalidateQueries({
          queryKey: [
            generateBaseQueryKeyFromRoute(
              routes.bookings.bookingsForPackage(packageId as string)
            ),
          ],
        });

        setIsDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error('Error saving data:', error);
        showToast({
          title: 'Error',
          description: 'Failed to update booking details',
          variant: 'destructive',
        });
      }
    },
  });

  // Segregate bookings based on card delivery status with null checks
  const pendingDeliveryBookings =
    bookingsData?.results?.filter(
      (booking) => booking && booking.card_delivered === false
    ) ?? [];

  const completedDeliveryBookings =
    bookingsData?.results?.filter(
      (booking) => booking && booking.card_delivered === true
    ) ?? [];

  const columns = [
    {
      accessorKey: 'user.profile.first_name',
      header: 'Customer Name',
      cell: ({ row }: any) => {
        const firstName = row.original.user?.profile?.first_name ?? '';
        const lastName = row.original.user?.profile?.last_name ?? '';
        return `${firstName} ${lastName}`;
      },
    },
    {
      accessorKey: 'id',
      header: 'Booking Reference',
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (!settlementData?.has_settlement) {
                setShowSettlementWarning(true);
                return;
              }
              const booking = row.original;
              const [roomNumber = '', hotelName = '', hotelAddress = ''] = (
                booking.hotel_room ?? ''
              )
                .split(',')
                .map((s: string) => s.trim());

              formik.resetForm({
                values: {
                  hotelName: hotelName || '',
                  hotelAddress: hotelAddress || '',
                  hotelRoomNumber: roomNumber || '',
                  cardDelivered: booking.card_delivered ?? false,
                  addedToWhatsapp: booking.is_on_whatsapp_group ?? false,
                },
              });
              setSelectedBooking(booking.id);
              setIsDialogOpen(true);
            }}
          >
            Update Details
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (!settlementData?.has_settlement) {
                setShowSettlementWarning(true);
                return;
              }
              handleDownloadPackage(row.original);
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Info
          </Button>
        </div>
      ),
    },
  ];

  const handleDownloadPackage = (booking: any) => {
    const firstName = booking.user?.profile?.first_name ?? '';
    const lastName = booking.user?.profile?.last_name ?? '';
    const fullName = `${firstName} ${lastName}`.trim();
    const category = booking.selected_price?.category ?? '';
    const bookingInfoUrl = booking.qr_code_url ?? '';

    const content = `Customer Name: ${fullName}
Category: ${category}
QR Code URL: ${bookingInfoUrl}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName}_booking_info.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showToast({
      title: 'Success',
      description: 'Booking info downloaded successfully',
      variant: 'default',
    });
  };

  if (settlementLoading) {
    return <BookingTableSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Pending Card Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <BookingTableSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={pendingDeliveryBookings}
              totalItems={pendingDeliveryBookings.length}
              pageSizeOptions={[10, 20, 30, 40, 50]}
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Card Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <BookingTableSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={completedDeliveryBookings}
              totalItems={completedDeliveryBookings.length}
              pageSizeOptions={[10, 20, 30, 40, 50]}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Update Booking Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Hotel Name</Label>
              <Input
                id="hotelName"
                name="hotelName"
                value={formik.values.hotelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.hotelName && formik.errors.hotelName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.hotelName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Hotel Address</Label>
              <Input
                id="hotelAddress"
                name="hotelAddress"
                value={formik.values.hotelAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.hotelAddress && formik.errors.hotelAddress && (
                <div className="text-red-500 text-sm">
                  {formik.errors.hotelAddress}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Room Number</Label>
              <Input
                id="hotelRoomNumber"
                name="hotelRoomNumber"
                value={formik.values.hotelRoomNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.hotelRoomNumber &&
                formik.errors.hotelRoomNumber && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.hotelRoomNumber}
                  </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="cardDelivered"
                name="cardDelivered"
                checked={formik.values.cardDelivered}
                onCheckedChange={(checked) =>
                  formik.setFieldValue('cardDelivered', checked)
                }
              />
              <Label htmlFor="cardDelivered">Card Delivered to User</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="addedToWhatsapp"
                name="addedToWhatsapp"
                checked={formik.values.addedToWhatsapp}
                onCheckedChange={(checked) =>
                  formik.setFieldValue('addedToWhatsapp', checked)
                }
              />
              <Label htmlFor="addedToWhatsapp">Added to WhatsApp Group</Label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Saving...' : 'Save Details'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showSettlementWarning}
        onOpenChange={setShowSettlementWarning}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Action Not Available</DialogTitle>
            <DialogDescription>
              This package requires settlement before any actions can be taken.
              Please ensure the package is settled first.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSettlementWarning(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
