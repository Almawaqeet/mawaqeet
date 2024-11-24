"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BoxIcon, BanknoteIcon, LayersIcon, ClockIcon } from "lucide-react";

export default function ViewPackageSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8"
        >
            <Card className="overflow-hidden bg-white shadow-xl rounded-xl sm:rounded-2xl">
                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                        <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
                            <div className="flex items-center">
                                <BoxIcon className="mr-2 sm:mr-3 text-gray-300 h-6 w-6 sm:h-7 sm:w-7" />
                                <Skeleton className="h-8 sm:h-9 w-64" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </div>

                    {/* Tabs Skeleton */}
                    <div className="mb-4 sm:mb-6 bg-gray-100/70 p-1 sm:p-1.5 rounded-lg flex gap-2">
                        {['Overview', 'Pricing', 'Categories', 'Batches'].map((tab) => (
                            <Skeleton key={tab} className="h-9 w-28" />
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="mt-4 space-y-6">
                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Pricing Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-4 sm:p-6">
                                    <Skeleton className="h-6 w-32 mb-3" />
                                    <Skeleton className="h-8 w-40 mb-4" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Footer Information Skeleton */}
                        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
