'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { columns } from './columns';
import { useGetOnboardingUsers } from '@/api/services/onboarding';
import TableIndexSkelton from './table-index-skelton';

export default function OnboardingTable() {
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

  const { data, isLoading } = useGetOnboardingUsers({
    page: page ?? 1,
    name: searchQuery ?? undefined,
    status: statusFilter ?? undefined,
    email: searchQuery ?? undefined
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
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="status"
          title="Payment Status"
          options={[
            {
              label: 'Onboarding Payment Completed',
              value: 'true'
            },
            {
              label: 'Onboarding Payment Not Completed',
              value: 'false'
            }
          ]}
          setFilterValue={setStatusFilter}
          filterValue={statusFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      {
        isLoading ? <TableIndexSkelton /> : (
          <DataTable
            columns={columns}
            data={data?.results ?? []}
            totalItems={data?.count ?? 0}
          />
        )
      }
    </div>
  );
}
