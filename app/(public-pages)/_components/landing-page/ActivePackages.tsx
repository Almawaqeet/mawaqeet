"use client"
import React from 'react';
import AppHeading from '@/components/reusables/AppHeading';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppButton from '@/components/reusables/AppButton';
import { IoMdCall } from "react-icons/io";
import { Package } from '@/app/(public-pages)/_components/packages-page/Package';

import { useGetAllActivePackages } from '@/api/services/packages';
import PackageSkeleton from '@/components/skeletons/public-pages/PackageSkeleton';
import { packages } from '@/constants/data';

const ActivePackages = () => {

    //todo: update this when making actual api call
    const { data: packageoo, isLoading, isError } = useGetAllActivePackages();
  return (
    <section className={`w-full ${whiteSpaces?.paddingX} py-4 md:py-16 bg-[#1A1A1A]`}>
      <div className="text-center mb-14 w-full flex  items-center justify-between">
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-white"
        >
          Our Packages
        </AppHeading>
        <div className="flex items-center justify-center">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <PackageSkeleton key={index} theme="dark" />
            ))}
          </>
        ) : (
          packages?.map((pkg) => (
            <Package key={pkg.id} pkg={pkg} theme="dark" />
          ))
        )}
      </div>
    </section>
  );
};

export default ActivePackages;
