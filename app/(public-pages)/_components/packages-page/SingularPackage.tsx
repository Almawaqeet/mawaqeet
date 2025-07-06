'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayersIcon,
  BanknoteIcon,
  CalendarIcon,
  CrownIcon,
  UserIcon,
  DiamondIcon,
} from 'lucide-react';
import AppButton from '@/components/reusables/AppButton';
import SingularPackageSkeleton from '../SingularPackageSkeleton';
import { useViewPackage } from '@/network/services/packages';
import AppModal from '@/components/reusables/AppModal';
import { useState, useCallback } from 'react';
import { extractUlFromFeature } from './Package';
import { CLIENT_ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

const RichTextEditor = dynamic(
  () =>
    import('@/components/ui/rich-text-editor').then(
      (mod) => mod.RichTextEditor
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full border rounded-md bg-muted animate-pulse" />
    ),
  }
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SingularPackage({ id }: { id: string }) {
  const { data: pkg, isLoading } = useViewPackage(id);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSettlementModalOpen, setIsSettlementModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

  const closeModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsSettlementModalOpen(false);
  }, []);

  const handleBookNowClick = useCallback(() => {
    if (pkg?.settlement) {
      setIsSettlementModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  }, [pkg?.settlement]);

  if (isLoading) {
    return <SingularPackageSkeleton />;
  }

  if (!pkg) {
    return (
      <motion.div
        {...fadeInUp}
        className="text-center text-gray-600 p-8 bg-red-50 rounded-lg shadow-sm"
      >
        Package not found
      </motion.div>
    );
  }

  const getCategoryIcon = (category: string | undefined) => {
    if (!category) return null;

    switch (category.toLowerCase()) {
      case 'vip':
        return <CrownIcon className="h-6 w-6 text-brand-color" />;
      case 'standard':
        return <UserIcon className="h-5 w-5 text-brand-color" />;
      case 'deluxe':
        return <DiamondIcon className="h-5 w-5 text-brand-color" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
    >
      <AppModal
        title="Login Required"
        open={isLoginModalOpen}
        onOpenChange={closeModal}
      >
        <div className="space-y-6">
          <p className="text-brand-color-text text-center text-sm sm:text-base leading-relaxed">
            Please login to continue with the booking process.
          </p>
          <div className="space-y-4">
            <AppButton
              variant="primary"
              className="w-full h-12 text-base font-medium transition-all duration-200 hover:opacity-90"
              type="button"
              onClick={() => router.push(CLIENT_ROUTES.PublicPages.auth.login)}
            >
              Login to Continue
            </AppButton>
          </div>
        </div>
      </AppModal>

      <AppModal
        title="Package Unavailable"
        open={isSettlementModalOpen}
        onOpenChange={closeModal}
      >
        <div className="space-y-6">
          <p className="text-brand-color-text text-center text-sm sm:text-base leading-relaxed">
            This package has been completed and is no longer available for
            booking.
          </p>
          <div className="space-y-4">
            <AppButton
              variant="primary"
              className="w-full h-12 text-base font-medium transition-all duration-200 hover:opacity-90"
              type="button"
              onClick={() =>
                router.push(CLIENT_ROUTES.PublicPages.packages.index)
              }
            >
              Close
            </AppButton>
          </div>
        </div>
      </AppModal>

      <Card className="overflow-hidden bg-white shadow-lg sm:shadow-2xl rounded-xl hover:shadow-xl sm:hover:shadow-3xl transition-shadow duration-300">
        <div className="p-4 sm:p-8">
          <motion.div
            className="flex flex-col gap-3 mb-6 sm:mb-8"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {pkg?.name ?? 'Unnamed Package'}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  {pkg?.package_type?.toUpperCase() ?? 'NO TYPE'}
                </Badge>
                <Badge
                  variant={pkg?.is_active ? 'default' : 'destructive'}
                  className={`px-3 py-1 text-xs sm:text-sm font-medium ${pkg?.is_active ? 'bg-green-100 text-green-800' : ''}`}
                >
                  {pkg?.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </motion.div>
          </motion.div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 p-1 bg-gray-100/80 rounded-lg w-full overflow-x-auto flex-nowrap gap-2">
              <TabsTrigger
                value="overview"
                className="flex-1 transition-all duration-200 text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-brand-color data-[state=active]:shadow-sm"
              >
                <LayersIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="pricing-details"
                className="flex-1 transition-all duration-200 text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-brand-color data-[state=active]:shadow-sm"
              >
                <BanknoteIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Pricing & Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div
                {...fadeInUp}
                className="prose max-w-none text-sm sm:text-base"
              >
                {pkg?.description ? (
                  <RichTextEditor
                    content={pkg.description}
                    onChange={() => {}}
                    readOnly={true}
                  />
                ) : (
                  <p className="text-gray-500 italic">
                    No description available
                  </p>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="pricing-details">
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {pkg?.price?.map((price) => {
                  if (!price?.category) return null;

                  const matchingDescription = pkg?.category_description?.find(
                    (desc) =>
                      desc?.category?.toLowerCase() ===
                      price?.category?.toLowerCase()
                  );
                  const isVIP = price?.category?.toLowerCase() === 'vip';

                  return (
                    <motion.div key={price?.id ?? ''} variants={fadeInUp}>
                      <Card
                        className={`flex flex-col h-full p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border
                                                    ${isVIP ? 'bg-gradient-to-br from-yellow-50 to-white border-yellow-300 hover:border-yellow-400 scale-100' : 'hover:border-brand-color/20'}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2 sm:mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold capitalize text-gray-800 flex items-center gap-2">
                              {getCategoryIcon(price?.category)}
                              {price?.category}
                            </h3>
                            {isVIP && (
                              <Badge className="bg-yellow-500">VIP</Badge>
                            )}
                          </div>
                          <p
                            className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ${isVIP ? 'text-yellow-600' : 'text-brand-color'}`}
                          >
                            ₦
                            {parseFloat(price?.price ?? '0').toLocaleString(
                              'en-US'
                            )}
                          </p>
                          <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                            {price?.monthly_installment_fee && (
                              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                <CalendarIcon className="h-4 w-4 text-brand-color" />
                                <span>
                                  Monthly: ₦
                                  {parseFloat(
                                    price?.monthly_installment_fee ?? '0'
                                  ).toLocaleString('en-US')}
                                </span>
                              </div>
                            )}
                            {price?.weekly_installment_fee && (
                              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                <CalendarIcon className="h-4 w-4 text-brand-color" />
                                <span>
                                  Weekly: ₦
                                  {parseFloat(
                                    price?.weekly_installment_fee ?? '0'
                                  ).toLocaleString('en-US')}
                                </span>
                              </div>
                            )}
                          </div>
                          <AppButton
                            variant="primary"
                            onClick={handleBookNowClick}
                            disabled={pkg?.settlement}
                          >
                            {pkg?.settlement ? 'Booking Completed' : 'Book Now'}
                          </AppButton>
                        </div>

                        {matchingDescription?.description && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="prose prose-sm max-w-none text-xs sm:text-sm">
                              <li className={`text-sm  flex items-start gap-2`}>
                                <div className="flex gap-2">
                                  <ul
                                    className="flex flex-col gap-2"
                                    dangerouslySetInnerHTML={{
                                      __html: extractUlFromFeature(
                                        matchingDescription.description
                                      ),
                                    }}
                                  />
                                </div>
                              </li>
                            </div>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  );
}
