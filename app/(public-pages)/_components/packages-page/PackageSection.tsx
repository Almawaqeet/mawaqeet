"use client";

import React from 'react';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppHeading from '@/components/reusables/AppHeading';
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';
import { FaSearch } from 'react-icons/fa';
import { useGetAllActivePackages } from '@/api/services/packages';
import { segregatePackageByItsPriceCategory } from '@/lib/utils';
import PackageSkeleton from '@/components/skeletons/public-pages/PackageSkeleton';
import { PackageIcon } from 'lucide-react';

const PackageSection = () => {
  const [activeTab, setActiveTab] = React.useState<'HAJJ' | 'UMRAH'>('HAJJ');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');

  // Custom debounce implementation
  const debounceSearch = React.useCallback((callback: (term: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (term: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(term), delay);
    };
  }, []);

  // Initialize debounced search with useCallback
  const debouncedSetSearch = React.useCallback(
    debounceSearch((term: string) => setDebouncedSearchTerm(term), 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSetSearch(term);
  };

  const handleTabChange = (tab: 'HAJJ' | 'UMRAH') => {
    setActiveTab(tab);
    setSearchTerm('');
    setDebouncedSearchTerm(''); // Reset debounced search term on tab change
  };

  const { data: packages, isLoading } = useGetAllActivePackages({
    package_type: activeTab,
    search: debouncedSearchTerm.trim() || undefined,
  });

  // Memoize segregated packages to prevent unnecessary recalculations
  const segregatedPackages = React.useMemo(() => {
    if (!packages?.results) return [];
    // Create a new array from the results to avoid mutation
    const results = [...packages.results];
    return segregatePackageByItsPriceCategory(results);
  }, [packages?.results]);

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <PackageIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">No Packages Found</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        {debouncedSearchTerm
          ? "No packages match your search criteria. Try different keywords."
          : "There are currently no packages available for this category."}
      </p>
    </div>
  );

  return (
    <section className={`w-full ${whiteSpaces?.paddingX ?? ''} py-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <AppHeading variant="h2" className="text-3xl md:text-4xl text-center mb-4">
            Our Packages
          </AppHeading>

          {/* Tabs for switching between categories */}
          <div className="flex gap-4 p-2 bg-gray-100 rounded-full mb-8">
            <button
              onClick={() => handleTabChange('HAJJ')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'HAJJ' ? 'bg-brand-color text-white' : 'hover:bg-gray-200'
              }`}
            >
              Hajj
            </button>
            <button
              onClick={() => handleTabChange('UMRAH')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'UMRAH' ? 'bg-brand-color text-white' : 'hover:bg-gray-200'
              }`}
            >
              Umrah
            </button>
          </div>

          {/* Search input */}
          <div className="w-full max-w-md mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for a package"
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-color"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <FaSearch className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <PackageSkeleton key={index} theme="light" />
              ))}
            </>
          ) : segregatedPackages?.length > 0 ? (
            segregatedPackages.map((pkg) => (
              <Package key={pkg.id} pkg={pkg} theme="light" />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
