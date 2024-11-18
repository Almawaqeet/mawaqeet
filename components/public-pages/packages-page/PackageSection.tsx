"use client"

import React from 'react';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppHeading from '@/components/reusables/ui/AppHeading';
import { Package } from '@/components/reusables/Package';
import { FaSearch } from 'react-icons/fa';



const PackageSection = () => {
  const packages = [
    {
      id: 1,
      type: 'HAJJ',
      tier: 'STANDARD',
      cohort: '2024',
      price: 'NGN 3,500,000',
      paymentPlan: 'Flexible payment options available',
      features: [
        'Luxurious rooms with en-suite bathrooms',
        'Close proximity to the Haram',
        'Dedicated support team',
        'All meals included',
        'Ground transportation',
        'Visa processing assistance',
        'Pre-departure orientation'
      ]
    },
    {
      id: 2,
      type: 'HAJJ',
      tier: 'VIP',
      cohort: 'Hajj 2024',
      price: 'NGN 4,500,000',
      paymentPlan: 'Flexible payment options available',
      features: [
        'Premium rooms with en-suite bathrooms',
        'Very close proximity to the Haram',
        '24/7 dedicated support team',
        'Premium dining options',
        'Private ground transportation',
        'Priority visa processing',
        'Comprehensive orientation program',
        'Exclusive prayer areas'
      ]
    },
    {
      id: 3,
      type: 'HAJJ',
      tier: 'DELUXE',
      cohort: '2024',
      price: 'NGN 5,500,000',
      paymentPlan: 'Flexible payment options available',
      features: [
        'Luxury suite accommodation',
        'Closest proximity to the Haram',
        'VIP support service',
        'Gourmet dining experience',
        'Private luxury transportation',
        'Express visa processing',
        'Personal guide services',
        'Access to VIP facilities',
        'Premium prayer locations'
      ]
    }
  ];

  const [activeTab, setActiveTab] = React.useState('HAJJ');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPackages = packages?.filter(pkg =>
    pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={`w-full ${whiteSpaces?.paddingX} py-16`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <AppHeading variant="h2" className="text-3xl md:text-4xl text-center mb-4">
            Our Packages
          </AppHeading>

          <div className="flex gap-4 p-2 bg-gray-100 rounded-full mb-8">
            <button
              onClick={() => setActiveTab('HAJJ')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'HAJJ' ? 'bg-brand-color text-white' : 'hover:bg-gray-200'
              }`}
            >
              Hajj
            </button>
            <button
              onClick={() => setActiveTab('UMRAH')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'UMRAH' ? 'bg-brand-color text-white' : 'hover:bg-gray-200'
              }`}
            >
              Umrah
            </button>
          </div>

          <div className="w-full max-w-md mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a package"
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-color"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <FaSearch className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages?.map((pkg, index) => (
            <Package key={pkg.id} pkg={pkg} theme='light'/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
