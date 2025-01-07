'use client';

import React from 'react';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppHeading from '@/components/reusables/AppHeading';
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';
import { FaSearch } from 'react-icons/fa';

import { segregatePackageByItsPriceCategory } from '@/lib/utils';
import PackageSkeleton from '@/components/skeletons/public-pages/PackageSkeleton';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { addSearchParamsToUrl } from '@/lib/utils';
import { PACKAGE_TYPES } from '@/constants/generic';
import { PackagesEmptyState } from '@/components/reusables/PackagesEmptyState';
import { useGetAllActivePackages } from '@/api/services/packages';

const PackageSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams
    ?.get('type')
    ?.toUpperCase() as (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES];
  const currentSearch = searchParams?.get('search') || '';

  const [activeTab, setActiveTab] = React.useState<
    (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES]
  >(currentTab || PACKAGE_TYPES.HAJJ);
  const [searchTerm, setSearchTerm] = React.useState(currentSearch);

  // Update URL with search params
  const updateSearchParams = React.useCallback(
    (type: string, search?: string) => {
      const newUrl = addSearchParamsToUrl(pathname ?? '/', {
        type: type.toLowerCase(),
        search: search || '',
      });
      router.push(newUrl);
    },
    [pathname, router]
  );

  // Debounced search handler
  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      const timeoutId = setTimeout(() => {
        updateSearchParams(activeTab, term.trim() || undefined);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [activeTab, updateSearchParams]
  );

  const handleTabChange = React.useCallback(
    (tab: (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES]) => {
      setActiveTab(tab);
      setSearchTerm('');
      updateSearchParams(tab);
    },
    [updateSearchParams]
  );

  const { data: packages, isLoading } = useGetAllActivePackages({

    package_type: activeTab,
    search: searchTerm.trim() || undefined,
  });

  // Memoize segregated packages
  const segregatedPackages = React.useMemo(() => {
    if (!packages?.results?.length) return [];
    return segregatePackageByItsPriceCategory([...packages.results]);
  }, [packages?.results]);

  return (
    <section className={`w-full ${whiteSpaces?.paddingX ?? ''} py-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <AppHeading
            variant="h2"
            className="text-3xl md:text-4xl text-center mb-4"
          >
            Our Packages
          </AppHeading>

          {/* Tabs for switching between categories */}
          <div className="flex gap-4 p-2 bg-gray-100 rounded-full mb-8">
            <button
              onClick={() => handleTabChange('HAJJ')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === PACKAGE_TYPES.HAJJ
                  ? 'bg-brand-color text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              Hajj
            </button>
            <button
              onClick={() => handleTabChange('UMRAH')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === PACKAGE_TYPES.UMRAH
                  ? 'bg-brand-color text-white'
                  : 'hover:bg-gray-200'
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
              {[...Array(3)].map((_, index) => (
                <PackageSkeleton key={index} theme="light" />
              ))}
            </>
          ) : segregatedPackages?.length > 0 ? (
            segregatedPackages.map((pkg, index) => (
              <Package key={index} pkg={pkg} theme="light" />
            ))
          ) : (
            <PackagesEmptyState searchTerm={searchTerm} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
