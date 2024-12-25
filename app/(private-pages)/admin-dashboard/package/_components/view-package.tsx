"use client";

import { useViewPackage } from "@/api/services/packages";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ViewPackageSkeleton from "./view-package-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  BoxIcon,
  BanknoteIcon,
  LayersIcon,
  ClockIcon,
  CalendarIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  BookOpenIcon,
  EditIcon
} from "lucide-react";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ACCOUNT_TYPES } from "@/constants/generic";
import { useRouter } from "next/navigation";
import { CLIENT_ROUTES } from "@/lib/routes";


const RichTextEditor = dynamic(() => import("@/components/ui/rich-text-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});



export default function ViewPackage({ params }: { params: { packageId: string } }) {
    const { data: packageData, isLoading } = useViewPackage(params.packageId);
    const { data: userAccount } = useSession();
    const router = useRouter()
    if (isLoading) {
        return <ViewPackageSkeleton />;
    }

    if (!packageData) {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 p-4 sm:p-8"
          >
            No package data found
          </motion.div>
        );
    }

    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    };

    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8"
        >
            <Card className="overflow-hidden bg-white shadow-xl rounded-xl sm:rounded-2xl">
                <motion.div {...fadeInUp} className="p-4 sm:p-6 lg:p-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                        <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
                            <motion.h1
                              {...fadeInUp}
                              className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight break-words"
                            >
                              <BoxIcon className="mr-2 sm:mr-3 text-brand-color inline-block h-6 w-6 sm:h-7 sm:w-7" />
                              {packageData?.name ?? 'Unnamed Package'}
                            </motion.h1>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <Badge
                                    variant={packageData?.package_type === 'hajj' ? 'default' : 'secondary'}
                                    className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-medium"
                                >
                                    {packageData?.package_type?.toUpperCase() ?? 'NO TYPE'}
                                </Badge>
                                <Badge
                                    variant={packageData?.is_active ? "default" : "destructive"}
                                    className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-medium"
                                >
                                    {packageData?.is_active ? (
                                      <CheckCircleIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                                    ) : (
                                      <XCircleIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                                    )}
                                    {packageData?.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {userAccount?.user.accountType === ACCOUNT_TYPES.USER && (
                                <Button
                                    variant="default"
                                    className="rounded-md flex items-center justify-center gap-2"
                                    onClick={() => router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.booking.initiateBooking(packageData?.id as string))}
                                >
                                    <span>Book Now</span>
                                    <span>→</span>
                                </Button>
                            )}
                            {userAccount?.user.accountType === ACCOUNT_TYPES.ADMIN && (
                                <>
                                    <Button
                                        variant="outline"
                                        className="rounded-md flex items-center justify-center gap-2"
                                        onClick={() => router.push(`/admin-dashboard/package/edit/${packageData?.id}`)}
                                    >
                                        <EditIcon className="h-4 w-4" />
                                        <span>Edit Package</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-md flex items-center justify-center gap-2"
                                        onClick={() => router.push(CLIENT_ROUTES.PrivatePages.adminDashboard.bookings.viewBookingsForPackage(packageData?.id as string))}
                                    >
                                        <BookOpenIcon className="h-4 w-4" />
                                        <span>View Bookings</span>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-4 sm:mb-6 bg-gray-100/70 p-1 sm:p-1.5 rounded-lg overflow-x-auto flex whitespace-nowrap">
                            <TabsTrigger value="overview" className="rounded-md text-sm sm:text-base">
                              <LayersIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Overview
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="rounded-md text-sm sm:text-base">
                              <BanknoteIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Pricing
                            </TabsTrigger>
                            <TabsTrigger value="categories" className="rounded-md text-sm sm:text-base">
                              <LayersIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Categories
                            </TabsTrigger>
                            {packageData?.umrah_batches && packageData.umrah_batches.length > 0 && (
                                <TabsTrigger value="batches" className="rounded-md text-sm sm:text-base">
                                  <ClockIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  Batches
                                </TabsTrigger>
                            )}
                        </TabsList>

                        <TabsContent value="overview" className="mt-4 sm:mt-6">
                            <motion.div
                              {...fadeInUp}
                              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed"
                            >
                                {packageData?.description ? (
                                    <RichTextEditor
                                        onChange={() => {}}
                                        value={packageData.description}
                                        readOnly={true}
                                    />
                                ) : (
                                    <p>No description available</p>
                                )}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="pricing">
                            <motion.div
                              {...fadeInUp}
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            >
                                {packageData?.price?.map((price) => (
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      key={price?.id ?? ''}
                                      className="w-full"
                                    >
                                      <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden border border-gray-100 h-full">
                                          <div className="p-4 sm:p-6">
                                              <h3 className="text-lg sm:text-xl font-semibold capitalize text-gray-800 mb-3 sm:mb-4">
                                                {price?.category ?? 'Unnamed Category'}
                                              </h3>
                                              <p className="text-2xl sm:text-3xl font-bold text-brand-color mb-3 sm:mb-4">
                                                  ₦{parseFloat(price?.price ?? "0").toLocaleString('en-US')}
                                              </p>
                                              <div className="space-y-2 sm:space-y-3">
                                                  {price?.monthly_installment_fee && (
                                                      <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                                          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                          <span className="text-xs sm:text-sm">Monthly Payment:</span>
                                                          <span className="font-medium text-xs sm:text-sm">₦{parseFloat(price?.monthly_installment_fee ?? "0").toLocaleString('en-US')}</span>
                                                      </div>
                                                  )}
                                                  {price?.weekly_installment_fee && (
                                                      <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                                          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                                          <span className="text-xs sm:text-sm">Weekly Payment:</span>
                                                          <span className="font-medium text-xs sm:text-sm">₦{parseFloat(price?.weekly_installment_fee ?? "0").toLocaleString('en-US')}</span>
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                      </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="categories">
                            {packageData?.category_description?.length > 0 ? (
                                <motion.div {...fadeInUp}>
                                  <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
                                      {packageData.category_description.map((category) => (
                                          <AccordionItem key={category?.id ?? ''} value={category?.id ?? ''} className="border rounded-lg px-3 sm:px-4">
                                              <AccordionTrigger className="text-lg sm:text-xl font-semibold capitalize text-gray-800">
                                                  {category?.category ?? 'Unnamed Category'}
                                              </AccordionTrigger>
                                              <AccordionContent>
                                                  {category?.description ? (
                                                      <RichTextEditor
                                                          onChange={() => {}}
                                                          value={category.description}
                                                          readOnly={true}
                                                      />
                                                  ) : (
                                                      <p className="text-gray-600 pt-2 pb-4 text-sm sm:text-base">No description available for this category</p>
                                                  )}
                                              </AccordionContent>
                                          </AccordionItem>
                                      ))}
                                  </Accordion>
                                </motion.div>
                            ) : (
                                <p className="text-gray-600 text-sm sm:text-base">No category descriptions available</p>
                            )}
                        </TabsContent>

                        <TabsContent value="batches">
                            {packageData?.umrah_batches && (
                                <motion.div
                                  {...fadeInUp}
                                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                                >
                                    {packageData.umrah_batches.map((batch) => (
                                        <motion.div
                                          whileHover={{ scale: 1.02 }}
                                          key={batch?.id ?? ''}
                                          className="w-full"
                                        >
                                          <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden border border-gray-100">
                                              <div className="p-4 sm:p-6">
                                                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Batch Details</h3>
                                                      <Badge variant="outline" className="capitalize text-xs sm:text-sm">
                                                          {batch?.batch_status ?? 'No Status'}
                                                      </Badge>
                                                  </div>
                                                  <p className="text-gray-700 text-sm sm:text-base">
                                                      <CalendarIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                                                      Starts: {batch?.batch_start_date ? format(new Date(batch.batch_start_date), 'PPP') : 'No date available'}
                                                  </p>
                                              </div>
                                          </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </TabsContent>
                    </Tabs>

                    {/* Footer Information */}
                    <motion.div
                      {...fadeInUp}
                      className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <p className="flex items-center">
                              <CalendarIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Expiry Date: {packageData?.expiry_date ? format(new Date(packageData.expiry_date), 'PPP') : 'No expiry date'}
                            </p>
                            {packageData?.created_at && (
                                <p className="flex items-center">
                                  <PencilIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  Created: {format(new Date(packageData.created_at), 'PPP')}
                                </p>
                            )}
                            {packageData?.updated_at && (
                                <p className="flex items-center">
                                  <PencilIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  Last Updated: {format(new Date(packageData.updated_at), 'PPP')}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </Card>
        </motion.div>
    );
}
