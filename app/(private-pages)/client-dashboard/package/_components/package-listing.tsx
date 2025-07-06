'use client';

import { useGetAllActivePackages } from '@/network/services/packages';
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';
import { PackageIcon } from 'lucide-react';
import { segregatePackageByItsPriceCategory } from '@/lib/utils';
import { SegregatedPackage } from '@/constants/types';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useProductTableFilters } from './package-tables/use-product-table-filters';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useCallback } from 'react';

type ProductListingPage = {};

export default function ProductListingPage({}: ProductListingPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPackages, setAllPackages] = useState<SegregatedPackage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const {
    searchQuery,
    categoriesFilter: selectedCategories,
    searchQuery: searchTerm,
  } = useProductTableFilters();

  const {
    data: packages,
    isLoading,
    isFetching,
  } = useGetAllActivePackages({
    package_type: selectedCategories ?? undefined,
    page: currentPage,
    search: searchTerm ?? undefined,
  });

  const resetList = useCallback(() => {
    setCurrentPage(1);
    setAllPackages([]);
    setHasMore(true);
    setIsInitialLoad(true);
  }, []);

  useEffect(() => {
    if (packages?.results) {
      const segregatedPackages = segregatePackageByItsPriceCategory(
        packages.results,
        searchQuery ?? ''
      );

      setAllPackages((prev) =>
        currentPage === 1
          ? segregatedPackages
          : [...prev, ...segregatedPackages]
      );

      setHasMore(packages.next !== null);
      setIsInitialLoad(false);
    }
  }, [packages, searchQuery, currentPage]);

  useEffect(() => {
    if (inView && hasMore && !isFetching && !isInitialLoad) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching, isInitialLoad]);

  useEffect(() => {
    resetList();
  }, [selectedCategories, searchTerm, resetList]);

  if (isLoading && isInitialLoad) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <PackageIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        No Packages Found
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        There are currently no active packages available. New packages will
        appear here once they are added to the system.
      </p>
    </div>
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPackages?.length > 0 ? (
          <>
            {allPackages.map((pkg: SegregatedPackage) => (
              <Package key={`${pkg?.id}`} pkg={pkg} theme="light" />
            ))}
            {isFetching && !isInitialLoad && (
              <div className="col-span-full">
                <DataTableSkeleton columnCount={5} rowCount={3} />
              </div>
            )}
            {hasMore && <div ref={ref} className="h-10 w-full" />}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
