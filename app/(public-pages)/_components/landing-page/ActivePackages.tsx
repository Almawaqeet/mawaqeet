'use client';
import React from 'react';
import AppHeading from '@/components/reusables/AppHeading';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppButton from '@/components/reusables/AppButton';
import { IoMdCall } from 'react-icons/io';
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';
import { PackageIcon } from 'lucide-react';
import PackageSkeleton from '@/components/skeletons/public-pages/PackageSkeleton';
import { SegregatedPackage } from '@/constants/types';
import { segregatePackageByItsPriceCategory } from '@/lib/utils';
import { useGetAllActivePackages } from '@/api/services/packages';

const ActivePackages = () => {
  const { data: packages, isLoading } = useGetAllActivePackages();

  const segregatedPackages = segregatePackageByItsPriceCategory(
    packages?.results || []
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-[#2A2A2A] rounded-lg border-2 border-dashed border-gray-700">
      <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mb-4">
        <PackageIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-1">
        No Packages Available
      </h3>
      <p className="text-sm text-gray-400 text-center max-w-sm">
        There are currently no active packages available. Please check back
        later for new offerings.
      </p>
    </div>
  );

  return (
    <section
      className={`w-full ${whiteSpaces?.paddingX} py-4 md:py-16 bg-[#1A1A1A]`}
    >
      <div className="text-center mb-14 w-full flex  items-center justify-between">
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-white"
        >
          Our Packages
        </AppHeading>
        <div className="flex items-center justify-center">
          <a href="tel:+2349115653889">
            <AppButton
              variant="secondary"
              className="w-fit mx-auto"
              onClick={() => {
                // Add actual click handler implementation
                console.log('Live call button clicked');
              }}
            >
              <IoMdCall className="w-4 h-4 mr-2" />
              Live call
            </AppButton>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <PackageSkeleton key={index} theme="dark" />
            ))}
          </>
        ) : segregatedPackages && segregatedPackages.length > 0 ? (
          segregatedPackages.map((pkg: SegregatedPackage) => (
            <Package key={pkg.id} pkg={pkg} theme="dark" />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

export default ActivePackages;
