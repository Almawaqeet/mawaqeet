'use client';

import { useViewPackage } from '@/api/services/packages';
import {
  useGetBookingFinancialSummaryForASpecificPackage,
  useGetBookingsForAPackage,
} from '@/api/services/booking';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/ui/table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { PackageBookingListResponse } from '@/api/types';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

import {
  Calendar,
  CreditCard,
  Mail,
  Phone,
  User,
  DollarSign,
  Star,
  Diamond,
  Gem,
  Clock,
} from 'lucide-react';
import { SummarySkeleton } from '@/app/(private-pages)/admin-dashboard/bookings/_components/summary-skeleton';
import { BookingTableSkeleton } from '@/app/(private-pages)/client-dashboard/bookings/_components/booking-table-skeleton';
import {
  booking_payment_status_constant,
  package_price_category,
} from '@/constants/generic';
import { removeNoneAlphanumericEntity } from '@/lib/utils';

export default function BookingsForSpecificPackage() {
  const { packageId } = useParams();
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.q.withOptions({ shallow: false }).withDefault('')
  );

  const [categoryFilter, setCategoryFilter] = useQueryState(
    'category',
    searchParams.q.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const { data: packageData, isLoading: packageLoading } = useViewPackage(
    packageId as string
  );
  const { data: bookingsData, isLoading: bookingsLoading } =
    useGetBookingsForAPackage(packageId as string, {
      search: searchQuery ?? '',
      page: page ?? 1,
      status: statusFilter ?? '',
      category: categoryFilter ?? '',
    });

  const { data: financialSummaryData, isLoading: summaryLoading } =
    useGetBookingFinancialSummaryForASpecificPackage(packageId as string);

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStatusFilter(null);
    setCategoryFilter(null);
    setPage(1);
  }, [setSearchQuery, setStatusFilter, setCategoryFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!statusFilter || !!categoryFilter;
  }, [searchQuery, statusFilter, categoryFilter]);

  const isLoading = packageLoading || bookingsLoading;

  const columns: ColumnDef<PackageBookingListResponse>[] = [
    {
      accessorKey: 'user',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">
          Customer Details
        </div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoading) {
          return (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          );
        }
        const firstName = row.original?.user?.profile?.first_name;
        const lastName = row.original?.user?.profile?.last_name;
        const email = row.original?.user?.email;
        const phone = row.original?.user?.profile?.phone_number;
        const id = row.original?.id;

        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">
                {firstName && lastName ? `${firstName} ${lastName}` : 'N/A'}
              </span>
              <span className="text-xs text-gray-500">({id ?? 'N/A'})</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{email ?? 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{phone ?? 'N/A'}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'selected_price',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">
          Package Category
        </div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoading) {
          return <Skeleton className="h-7 w-24 rounded-full" />;
        }
        return (
          <Badge
            variant="outline"
            className="capitalize px-2 py-1 bg-blue-50 text-blue-700 border-blue-200/70"
          >
            {row.original?.selected_price?.category ?? 'N/A'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Booking Info</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoading) {
          return (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {row.original?.created_at
                  ? format(new Date(row.original.created_at), 'PPP')
                  : 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {removeNoneAlphanumericEntity(
                  row.original?.payment_plan ?? 'N/A'
                )}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">Status</div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoading) {
          return <Skeleton className="h-7 w-24 rounded-full" />;
        }
        const status = row.original?.status?.toLowerCase();
        const sanitizedStatus = status?.replace(/_/g, ' ');
        return (
          <Badge
            variant="outline"
            className={`px-2 py-1 capitalize text-xs font-medium rounded-full ${
              status === booking_payment_status_constant.COMPLETED.toLowerCase()
                ? 'bg-green-50 text-green-700 border-green-200/70'
                : status ===
                    booking_payment_status_constant.INSTALMENT.toLowerCase()
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200/70'
                  : status ===
                      booking_payment_status_constant.CANCELLED.toLowerCase()
                    ? 'bg-red-50 text-red-700 border-red-200/70'
                    : 'bg-gray-50 text-gray-700 border-gray-200/70'
            }`}
          >
            {sanitizedStatus ?? 'N/A'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'payment_summary',
      header: () => (
        <div className="text-sm font-semibold text-gray-700">
          Payment Details
        </div>
      ),
      cell: ({ row }) => {
        if (!row.original || isLoading) {
          return (
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-30" />
            </div>
          );
        }
        return (
          <div className="space-y-1">
            <div className="text-sm text-gray-800">
              Total: ₦
              {row.original?.payment_summary?.amount_to_be_paid?.toLocaleString() ??
                'N/A'}
            </div>
            <div className="text-sm text-gray-600">
              Paid: ₦
              {row.original?.payment_summary?.amount_paid?.toLocaleString() ??
                'N/A'}
            </div>
            <div className="text-sm text-gray-600">
              Balance: ₦
              {row.original?.payment_summary?.balance?.toLocaleString() ??
                'N/A'}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              {packageData?.name ?? 'Loading...'} - Bookings
            </h1>
            <p className="text-base text-gray-600 mt-2">
              View and manage bookings for this package
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-brand-color" />
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryLoading ? (
            <SummarySkeleton />
          ) : financialSummaryData?.summary ? (
            Object.entries(financialSummaryData.summary).map(
              ([category, summary]) => (
                <Card
                  key={category}
                  className="border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2.5 rounded-lg ${
                          category.toLowerCase() === package_price_category.VIP
                            ? 'bg-amber-100'
                            : category.toLowerCase() ===
                                package_price_category.DELUXE
                              ? 'bg-emerald-100'
                              : 'bg-indigo-100'
                        }`}
                      >
                        {category.toLowerCase() ===
                        package_price_category.VIP ? (
                          <Star className="h-5 w-5 text-amber-600" />
                        ) : category.toLowerCase() ===
                          package_price_category.DELUXE ? (
                          <Diamond className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Gem className="h-5 w-5 text-indigo-600" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium capitalize text-gray-900">
                        {category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">
                            Amount Paid
                          </p>
                          <p className="text-base font-medium text-gray-900">
                            ₦
                            {summary?.total_amount_paid?.toLocaleString() ??
                              'N/A'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">
                            Amount Due
                          </p>
                          <p className="text-base font-medium text-gray-900">
                            ₦
                            {summary?.total_amount_due?.toLocaleString() ??
                              'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-3">
                          Booking Status
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-white p-2 rounded-lg">
                            <p className="text-lg font-medium text-green-600">
                              {summary?.total_bookings?.completed ?? '0'}
                            </p>
                            <p className="text-xs text-gray-600">Completed</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg">
                            <p className="text-lg font-medium text-yellow-600">
                              {summary?.total_bookings?.installment ?? '0'}
                            </p>
                            <p className="text-xs text-gray-600">Installment</p>
                          </div>
                          <div className="bg-white p-2 rounded-lg">
                            <p className="text-lg font-medium text-gray-600">
                              {summary?.total_bookings?.no_payment ?? '0'}
                            </p>
                            <p className="text-xs text-gray-600">No Payment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No financial summary available.
            </div>
          )}
        </div>
      </div>

      <Card className="border-gray-200/80 shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <DataTableSearch
                searchKey="name"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setPage={setPage}
              />
              <DataTableFilterBox
                filterKey="status"
                title="Booking Status"
                options={[
                  {
                    label: 'Completed',
                    value: booking_payment_status_constant.COMPLETED,
                  },
                  {
                    label: 'Installment',
                    value: booking_payment_status_constant.INSTALMENT,
                  },
                  {
                    label: 'No Payment',
                    value: booking_payment_status_constant.NO_PAYMENT,
                  },
                  {
                    label: 'Cancelled',
                    value: booking_payment_status_constant.CANCELLED,
                  },
                ]}
                setFilterValue={setStatusFilter}
                filterValue={statusFilter}
              />
              <DataTableFilterBox
                filterKey="category"
                title="Package Category"
                options={[
                  {
                    label: 'Standard',
                    value: package_price_category.STANDARD,
                  },
                  {
                    label: 'Deluxe',
                    value: package_price_category.DELUXE,
                  },
                  {
                    label: 'VIP',
                    value: package_price_category.VIP,
                  },
                ]}
                setFilterValue={setCategoryFilter}
                filterValue={categoryFilter}
              />
              <DataTableResetFilter
                isFilterActive={isAnyFilterActive}
                onReset={resetFilters}
              />
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <BookingTableSkeleton />
              ) : (
                <div className="w-full">
                  {bookingsData?.results && (
                    <DataTable
                      columns={columns}
                      data={bookingsData.results}
                      totalItems={bookingsData?.count ?? 0}
                      pageSizeOptions={[10, 20, 30, 40, 50]}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
