"use client"
import React from 'react';
import AppHeading from '@/Components/Reusables/Ui/AppHeading';
import { whiteSpaces } from '@/OldPage/utilities/GlobalSpaces';
import AppButton from '@/Components/Reusables/Ui/AppButton';
import { IoMdCall } from "react-icons/io";
import { Package } from '@/Components/Reusables/Package';

import { usePackages } from '@/Api/Services/packages';

const ActivePackages = () => {

    //todo: update this when making actual api call
    //const { data: packages, isLoading, isError } = usePackages();
    const packages = [
        {
      id: 1,
      type: 'HAJJ',
      tier: 'STANDARD',
      cohort: 'HAJJ COHORT 2024',
      price: 'NGN 1,800,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    },
    {
      id: 2,
      type: 'HAJJ',
      tier: 'VIP',
      cohort: 'HAJJ COHORT 2024',
      price: 'NGN 2,500,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    },
    {
      id: 3,
      type: 'HAJJ',
      tier: 'DELUXE',
      cohort: 'HAJJ COHORT 2024',
      price: 'NGN 3,000,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    },
    {
      id: 4,
      type: 'UMRAH',
      tier: 'STANDARD',
      cohort: 'UMRAH COHORT 2024',
      price: 'NGN 1,000,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    },
    {
      id: 5,
      type: 'UMRAH',
      tier: 'VIP',
      cohort: 'UMRAH COHORT 2024',
      price: 'NGN 1,400,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    },
    {
      id: 6,
      type: 'UMRAH',
      tier: 'DELUXE',
      cohort: 'UMRAH COHORT 2024',
      price: 'NGN 1,800,000.00',
      paymentPlan: 'Payable in installment',
      features: [
        'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
        'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
      ]
    }
  ];

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
        {packages?.map((pkg) => (
          <Package key={pkg.id} pkg={pkg} theme="dark" />
        ))}
      </div>
    </section>
  );
};

export default ActivePackages;
