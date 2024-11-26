"use client";


import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayersIcon, BanknoteIcon, CalendarIcon, CrownIcon, UserIcon, DiamondIcon } from "lucide-react";
import AppButton from "@/components/reusables/AppButton";
import SingularPackageSkeleton from "../SingularPackageSkeleton";
import { useViewPackage } from "@/Api/Services/packages";

const RichTextEditor = dynamic(() => import("@/components/ui/rich-text-editor"), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function SingularPackage({ id }: { id: string }) {
    const { data: pkg, isLoading } = useViewPackage(id);

    if (isLoading) {
        return (
            <SingularPackageSkeleton />
        );
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

    const getCategoryIcon = (category: string) => {
        switch(category?.toLowerCase()) {
            case 'vip':
                return <CrownIcon className="h-6 w-6 text-yellow-500" />;
            case 'standard':
                return <UserIcon className="h-5 w-5 text-blue-500" />;
            case 'deluxe':
                return <DiamondIcon className="h-5 w-5 text-purple-500" />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
        >
            <Card className="overflow-hidden bg-white shadow-lg sm:shadow-2xl rounded-xl hover:shadow-xl sm:hover:shadow-3xl transition-shadow duration-300">
                <div className="p-4 sm:p-8">
                    <motion.div
                        className="flex flex-col gap-3 mb-6 sm:mb-8"
                        variants={staggerChildren}
                    >
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                {pkg?.name}
                            </h1>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium">
                                    {pkg?.package_type?.toUpperCase() ?? 'NO TYPE'}
                                </Badge>
                                <Badge
                                    variant={pkg?.is_active ? "default" : "destructive"}
                                    className={`px-3 py-1 text-xs sm:text-sm font-medium ${pkg?.is_active ? "bg-green-100 text-green-800" : ""}`}
                                >
                                    {pkg?.is_active ? "Active" : "Inactive"}
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

                        <AnimatePresence mode="wait">
                            <TabsContent value="overview">
                                <motion.div
                                    {...fadeInUp}
                                    className="prose max-w-none text-sm sm:text-base"
                                >
                                    {pkg?.description ? (
                                        <RichTextEditor
                                            value={pkg.description}
                                            onChange={() => {}}
                                            readOnly={true}
                                        />
                                    ) : (
                                        <p className="text-gray-500 italic">No description available</p>
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
                                        const matchingDescription = pkg?.category_description?.find(
                                            desc => desc?.category?.toLowerCase() === price?.category?.toLowerCase()
                                        );
                                        const isVIP = price?.category?.toLowerCase() === 'vip';

                                        return (
                                            <motion.div key={price?.id ?? ''} variants={fadeInUp}>
                                                <Card className={`flex flex-col h-full p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border
                                                    ${isVIP ? 'bg-gradient-to-br from-yellow-50 to-white border-yellow-300 hover:border-yellow-400 scale-100' : 'hover:border-brand-color/20'}`}>
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2 sm:mb-4">
                                                            <h3 className="text-lg sm:text-xl font-semibold capitalize text-gray-800 flex items-center gap-2">
                                                                {getCategoryIcon(price?.category)}
                                                                {price?.category ?? 'Unnamed Category'}
                                                            </h3>
                                                            {isVIP && <Badge className="bg-yellow-500">VIP</Badge>}
                                                        </div>
                                                        <p className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ${isVIP ? 'text-yellow-600' : 'text-brand-color'}`}>
                                                            ₦{parseFloat(price?.price ?? "0").toLocaleString('en-US')}
                                                        </p>
                                                        <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                                                            {price?.monthly_installment_fee && (
                                                                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                                                    <CalendarIcon className="h-4 w-4 text-brand-color" />
                                                                    <span>Monthly: ₦{parseFloat(price?.monthly_installment_fee ?? "0").toLocaleString('en-US')}</span>
                                                                </div>
                                                            )}
                                                            {price?.weekly_installment_fee && (
                                                                <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                                                    <CalendarIcon className="h-4 w-4 text-brand-color" />
                                                                    <span>Weekly: ₦{parseFloat(price?.weekly_installment_fee ?? "0").toLocaleString('en-US')}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <AppButton
                                                            onClick={() => {}}
                                                            disabled={!pkg?.is_active}
                                                        >
                                                            Book Now
                                                        </AppButton>
                                                    </div>

                                                    {matchingDescription?.description && (
                                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                                            <div className="prose prose-sm max-w-none text-xs sm:text-sm">
                                                                <RichTextEditor
                                                                    value={matchingDescription.description}
                                                                    onChange={() => {}}
                                                                    readOnly={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </TabsContent>
                        </AnimatePresence>
                    </Tabs>
                </div>
            </Card>
        </motion.div>
    );
}
