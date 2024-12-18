'use client'
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import AppTextInput from '@/components/reusables/AppTextInput';
import { Field } from "formik";
import dynamic from 'next/dynamic';
import { Package, FileText, Star, Crown, Award } from 'lucide-react';
import { ReactNode, useState } from "react";

type PackageProps = {
  category: any,
  index: number,
  price: string
}

const RichTextEditor = dynamic(() => import('@/components/ui/rich-text-editor'), {
  ssr: false
});

const categoryIcons = {
  vip: Crown,
  deluxe: Star,
  standard: Award
};

export const CategoryForm = ({ values, errors, touched, setFieldValue, packagedetails }: any) => {


  return (
    <motion.div
      key="pricing"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-12 pb-6 border-b border-gray-200">
        <Package className="w-8 h-8 text-brand-color" />
        <h2 className="text-2xl font-bold text-gray-800">Package Categories</h2>
      </div>

      {/* Category Cards */}
      <div className="space-y-8">
        { values?.package_prices?.map((category: any, index: number) => {
          const IconComponent = categoryIcons[category.category as keyof typeof categoryIcons];

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-gray-50 rounded-xl border border-gray-300 hover:shadow-md transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-8">
                <IconComponent className="w-7 h-7 text-brand-color" />
                <h3 className="text-xl font-semibold text-gray-700 capitalize">
                  {category.category} Package
                </h3>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Price Field */}
                <div className="space-y-4">
                  <Label
                    htmlFor={`package_prices.${index}.price`}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <span className="text-green-600 font-semibold">₦</span>
                    Price
                  </Label>
                  <Field
                    as={AppTextInput}
                    id={`package_prices.${index}.price`}
                    name={`package_prices.${index}.price`}
                    type="number"
                    placeholder="Enter price in Naira"
                    className="w-full text-sm h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-color/30 focus:border-brand-color"
                  />
                  {typeof errors.package_prices?.[index] === 'object' &&
                    'price' in (errors.package_prices[index] || {}) &&
                    touched.package_prices?.[index]?.price && (
                      <div className="text-red-500 text-sm mt-1">
                        {(errors.package_prices[index] as { price: string }).price}
                      </div>
                    )}
                </div>

                {/* Description Field */}
                <div className="space-y-4">
                  <Label
                    htmlFor={`category_descriptions.${index}.description`}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <FileText className="w-5 h-5 text-brand-color" />
                    Description
                  </Label>
                  <div className="bg-white rounded-lg min-h-[200px] border border-gray-300 hover:shadow-sm transition-all duration-300">
                    <RichTextEditor
                      value={values.category_descriptions?.[index]?.description ?? ''}
                      onChange={(value) =>
                        setFieldValue(`category_descriptions.${index}.description`, value)
                      }
                      placeholder={`Enter ${category.category} package description`}
                    />
                  </div>
                  {typeof errors.category_descriptions?.[index] === 'object' &&
                    'description' in (errors.category_descriptions[index] || {}) &&
                    touched.category_descriptions?.[index]?.description && (
                      <div className="text-red-500 text-sm">
                        {(errors.category_descriptions[index] as { description: string }).description}
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )
};
