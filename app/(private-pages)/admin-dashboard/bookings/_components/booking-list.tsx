'use client';

import {
  useGetAllActivePackages,
  useGetAllInactivePackages,
} from '@/network/services/packages';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SearchIcon, PackageIcon } from 'lucide-react';

export default function PackageBookingList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: activePackages, isLoading: isLoadingActive } =
    useGetAllActivePackages({
      search: searchQuery,
      package_type: undefined,
    });
  const { data: inactivePackages, isLoading: isLoadingInactive } =
    useGetAllInactivePackages({
      search: searchQuery,
      package_type: undefined,
    });
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const renderPackageGrid = (packages: any, isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages?.results?.map((pkg: any) => (
          <Card
            key={pkg.id}
            className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-brand-color rounded-lg group"
            onClick={() =>
              router.push(
                CLIENT_ROUTES.PrivatePages.adminDashboard.bookings.viewBookingsForPackage(
                  pkg?.id as string
                )
              )
            }
          >
            <div className="flex items-start gap-3">
              <div className="bg-brand-color/10 p-2 rounded-lg group-hover:bg-brand-color/20 transition-colors">
                <PackageIcon className="h-6 w-6 text-brand-color flex-shrink-0" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-color transition-colors">
                  {pkg?.name ?? 'Unnamed Package'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="capitalize px-2 py-0.5 text-sm"
                  >
                    {pkg?.package_type}
                  </Badge>
                  <Badge
                    variant={pkg?.is_active ? 'default' : 'secondary'}
                    className="px-2 py-0.5 text-sm"
                  >
                    {pkg?.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <Button
                  variant="default"
                  className="w-full py-2 text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  View Bookings
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6"
    >
      {/* Header and Search Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Package Bookings Overview
          </h1>
          <p className="text-gray-600">
            Manage and track all package reservations in one place
          </p>
        </div>

        <div className="relative max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search packages by name..."
            className="pl-10 py-2 rounded-lg border-gray-200 focus:border-brand-color focus:ring-brand-color bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Active Packages Section */}
      <Card className="overflow-hidden bg-white shadow-md rounded-lg border-0">
        <motion.div {...fadeInUp} className="p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Active Packages</h2>
          {renderPackageGrid(activePackages, isLoadingActive)}
          {!isLoadingActive && activePackages?.results?.length === 0 && (
            <div className="text-center py-8 space-y-2">
              <PackageIcon className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="text-gray-500">
                No active packages found matching your search.
              </p>
            </div>
          )}
        </motion.div>
      </Card>

      {/* Inactive Packages Section */}
      <Card className="overflow-hidden bg-white shadow-md rounded-lg border-0">
        <motion.div {...fadeInUp} className="p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Inactive Packages</h2>
          {renderPackageGrid(inactivePackages, isLoadingInactive)}
          {!isLoadingInactive && inactivePackages?.results?.length === 0 && (
            <div className="text-center py-8 space-y-2">
              <PackageIcon className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="text-gray-500">
                No inactive packages found matching your search.
              </p>
            </div>
          )}
        </motion.div>
      </Card>
    </motion.div>
  );
}
