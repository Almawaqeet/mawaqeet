"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useViewPackage } from "@/api/services/packages";
import { Skeleton } from "@/components/ui/skeleton";

const validationSchema = Yup.object({
  category: Yup.string().required("Please select a category"),
  paymentPlan: Yup.string().required("Please select a payment plan"),
});

export const InitiateBookingForm = ({ packageId }: { packageId: string }) => {
  const { data: packageData, isLoading } = useViewPackage(packageId);
  const formik = useFormik({
    initialValues: {
      category: "",
      paymentPlan: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const paymentPlans = [
    { id: "full", name: "Full Payment" },
    { id: "deposit", name: "Deposit" },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8 mt-10 sm:mt-14">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <Skeleton className="h-6 sm:h-8 w-2/3 mb-3 sm:mb-4" />
            <Skeleton className="h-16 sm:h-20 w-full mb-3 sm:mb-4" />
            <Skeleton className="h-40 sm:h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 mt-10 sm:mt-14">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="space-y-2 border-b p-4 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold">Initiate Booking</CardTitle>
          {packageData && (
            <div className="mt-3 sm:mt-4 bg-muted/50 rounded-lg p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{packageData?.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Package Type</p>
                  <p className="font-medium capitalize">{packageData?.package_type}</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className={`font-medium ${packageData?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {packageData?.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-muted-foreground text-xs">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(packageData?.expiry_date ?? '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-6 sm:pt-8 bg-white">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Category</label>
              <Select
                name="category"
                onValueChange={(value) => formik.setFieldValue("category", value)}
                value={formik.values.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {packageData?.price?.map((priceItem) => (
                    <SelectItem key={priceItem.id} value={priceItem.category}>
                      {priceItem.category} - ₦{Number(priceItem.price).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-xs text-red-500 mt-1">{formik.errors.category}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Plan</label>
              <Select
                name="paymentPlan"
                onValueChange={(value) => formik.setFieldValue("paymentPlan", value)}
                value={formik.values.paymentPlan}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a payment plan" />
                </SelectTrigger>
                <SelectContent>
                  {paymentPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.paymentPlan && formik.errors.paymentPlan && (
                <div className="text-xs text-red-500 mt-1">{formik.errors.paymentPlan}</div>
              )}
            </div>

            <Button type="submit" className="w-full text-sm sm:text-base py-4 sm:py-5 mt-4 bg-brand-color">
              Continue Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
