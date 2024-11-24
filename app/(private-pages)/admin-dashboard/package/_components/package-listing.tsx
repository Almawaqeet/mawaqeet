"use client";

import { PaginatedResponse } from '@/api/types';
import PackageTable from './package-tables/package-table';
import { useGetAllActivePackages, useGetAllInactivePackages } from '@/api/services/packages';
import { Package } from '@/constants/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PackageListingPage() {
  const { data: activePackages, isLoading: isLoadingActive } = useGetAllActivePackages({
    package_type: undefined,
    search: undefined
  });

  const { data: inactivePackages, isLoading: isLoadingInactive } = useGetAllInactivePackages({
    package_type: undefined,
    search: undefined
  });

  return (
    <PackageTable
      activePackages={activePackages ? [activePackages] : undefined}
      inactivePackages={inactivePackages ? [inactivePackages] : undefined}
      isLoadingActive={isLoadingActive}
      isLoadingInactive={isLoadingInactive}
    />
  );
}
