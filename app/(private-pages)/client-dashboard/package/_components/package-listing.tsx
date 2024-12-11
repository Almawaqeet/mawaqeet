"use client"

import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { useGetAllActivePackages } from '@/api/services/packages';
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';
import { my_packages } from '@/constants/data';
import { PackageIcon } from 'lucide-react';
import { segregatePackageByItsPriceCategory } from '@/lib/utils';
import { SegregatedPackage } from '@/constants/types';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useProductTableFilters } from './package-tables/use-product-table-filters';


type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
//   const page = searchParamsCache.get('page');
//   const search = searchParamsCache.get('q');
//   const pageLimit = searchParamsCache.get('limit');
//   const categories = searchParamsCache.get('categories');
  const { data: packages, isLoading } = useGetAllActivePackages();
  const {
    searchQuery,
  } = useProductTableFilters();

  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  const segregatedPackages = segregatePackageByItsPriceCategory(packages?.results || [], searchQuery);

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <PackageIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">No Packages Found</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        There are currently no active packages available. New packages will appear here once they are added to the system.
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {segregatedPackages && segregatedPackages.length > 0 ? (
        segregatedPackages.map((pkg: SegregatedPackage) => (
          <Package key={pkg?.id} pkg={pkg} theme="light" />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
