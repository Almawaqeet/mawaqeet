'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import TableIndexSkelton from '@/app/(private-pages)/admin-dashboard/onboarding/_components/table/table-index-skelton';
import { columns } from './columns';
import { useGetBookingsForAPackage } from '@/network/services/booking';
import { useParams } from 'next/navigation';

export default function BookingsTable() {
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

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const { data, isLoading } = useGetBookingsForAPackage(packageId as string, {
    search: searchQuery ?? '',
    page: page ?? 1,
  });

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStatusFilter(null);
    setPage(1);
  }, [setSearchQuery, setStatusFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!statusFilter;
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4">
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
              label: 'Confirmed',
              value: 'confirmed',
            },
            {
              label: 'Pending',
              value: 'pending',
            },
            {
              label: 'Cancelled',
              value: 'cancelled',
            },
          ]}
          setFilterValue={setStatusFilter}
          filterValue={statusFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      {isLoading ? (
        <TableIndexSkelton />
      ) : (
        <DataTable
          columns={columns}
          data={data?.results ?? []}
          totalItems={data?.count ?? 0}
        />
      )}
    </div>
  );
}
