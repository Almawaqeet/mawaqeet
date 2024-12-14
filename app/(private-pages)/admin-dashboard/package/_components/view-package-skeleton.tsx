"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BoxIcon } from "lucide-react";

export default function ViewPackageSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8"
        >
            <Card className="overflow-hidden bg-white shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl">
                <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                        <div className="space-y-2 w-full sm:w-auto">
                            <div className="flex items-center">
                                <BoxIcon className="mr-2 text-gray-300 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                                <Skeleton className="h-6 sm:h-7 md:h-8 w-full sm:w-64" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
                                <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
                            </div>
                        </div>
                    </div>

                    {/* Tabs Skeleton */}
                    <div className="mb-3 sm:mb-4 md:mb-6 bg-gray-100/70 p-1 rounded-lg flex flex-wrap gap-2">
                        {['Overview', 'Pricing', 'Categories', 'Batches'].map((tab) => (
                            <Skeleton key={tab} className="h-8 sm:h-9 w-24 sm:w-28" />
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-3 sm:h-4 w-full" />
                            <Skeleton className="h-3 sm:h-4 w-full sm:w-3/4" />
                            <Skeleton className="h-3 sm:h-4 w-full sm:w-5/6" />
                        </div>

                        {/* Pricing Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-3 sm:p-4 md:p-6">
                                    <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 mb-2 sm:mb-3" />
                                    <Skeleton className="h-6 sm:h-8 w-32 sm:w-40 mb-3 sm:mb-4" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 sm:h-4 w-full" />
                                        <Skeleton className="h-3 sm:h-4 w-full sm:w-3/4" />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Footer Information Skeleton */}
                        <div className="mt-4 sm:mt-6 md:mt-10 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                                <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
                                <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
                                <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
