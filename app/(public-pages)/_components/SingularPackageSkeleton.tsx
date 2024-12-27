'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayersIcon, BanknoteIcon } from 'lucide-react';

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

export default function SingularPackageSkeleton() {
  return (
    <motion.div
      {...fadeInUp}
      className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
    >
      <Card className="overflow-hidden bg-white shadow-lg sm:shadow-2xl rounded-xl">
        <div className="h-[300px] w-full bg-gray-200 animate-pulse" />
        <div className="p-4 sm:p-8">
          <motion.div
            className="flex flex-col gap-3 mb-6 sm:mb-8"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </motion.div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 p-1 bg-gray-100/80 rounded-lg w-full overflow-x-auto flex-nowrap gap-2">
              <TabsTrigger
                value="overview"
                className="flex-1 transition-all duration-200"
              >
                <LayersIcon className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="pricing-details"
                className="flex-1 transition-all duration-200"
              >
                <BanknoteIcon className="mr-2 h-4 w-4" />
                Pricing & Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div {...fadeInUp}>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="pricing-details">
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {[1, 2, 3].map((index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="flex flex-col h-full p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                      </div>
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />
                      <div className="space-y-4 mb-6">
                        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                      </div>
                      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  );
}
