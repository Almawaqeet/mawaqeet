'use client';

import { useGetAllActivePackages } from '@/network/services/packages';
// import { my_packages } from '@/app/(public-pages)/_components/packages-page/Package';
import { Input } from '@/components/ui/input';
import { SegregatedPackage } from '@/constants/types';
import { cn } from '@/lib/utils';
import { Options } from 'nuqs';
import { useState, useTransition } from 'react';

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string | null;
  setSearchQuery: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage,
}: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
    setPage(1); // Reset page to 1 when search changes
  };

  return (
    <Input
      placeholder={`Search ${searchKey ?? ''}...`}
      value={searchQuery ?? ''}
      onChange={(e) => handleSearch(e.target.value)}
      className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}
    />
  );
}
