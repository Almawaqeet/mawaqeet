'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  useEmployeeTableFilters,
} from '../employee-tables/use-employee-table-filters';
import { columns } from './columns';
import { useGetAllRegisteredUsers } from '@/api/services/admin-analytics';
import TableIndexSkelton from '@/app/(private-pages)/admin-dashboard/onboarding/_components/table/table-index-skelton';
import { useQueryState } from 'nuqs';

export default function CustomerTable() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useEmployeeTableFilters();

  const [page] = useQueryState('page');
  const [limit] = useQueryState('limit');

  const { data, isLoading } = useGetAllRegisteredUsers({
    page: Number(page) || 1,
    name: searchQuery ?? undefined,
    email: searchQuery ?? undefined
  });

  const truncatedData = data?.results?.map(user => ({
    ...user,
    profile: {
      ...user.profile,
      address: user.profile?.address ? `${user.profile.address.slice(0, 30)}${user.profile.address.length > 30 ? '...' : ''}` : '-'
    }
  }));

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
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
          data={truncatedData ?? []}
          totalItems={data?.count ?? 0}
          pageSizeOptions={[10, 20, 30, 40, 50]}
          searchKey="name"
        />
      )}
    </div>
  );
}
