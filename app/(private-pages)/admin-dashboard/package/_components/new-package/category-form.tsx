import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field } from "formik";
import dynamic from 'next/dynamic';
import { Package, FileText, Star, Crown, Award } from 'lucide-react';

const RichTextEditor = dynamic(() => import('@/components/ui/rich-text-editor'), {
  ssr: false
});

const categoryIcons = {
  vip: Crown,
  deluxe: Star,
  standard: Award
};

export const CategoryForm = ({ values, errors, touched, setFieldValue }: any) => (
  <motion.div
    key="pricing"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
  >
    <div className="flex items-center gap-3 mb-8">
      <Package className="w-6 h-6 text-brand-color" />
      <h2 className="text-2xl font-semibold text-gray-800">Package Categories</h2>
    </div>

    <div className="space-y-8">
      {values?.package_prices?.map((category: any, index: number) => {
        const IconComponent = categoryIcons[category.category as keyof typeof categoryIcons];

        return (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-color/10">
                <IconComponent className="w-5 h-5 text-brand-color" />
              </div>
              <h3 className="text-xl font-semibold capitalize text-gray-800">
                {category.category} Package
              </h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <Label
                  htmlFor={`package_prices.${index}.price`}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span className="text-green-600 font-semibold">₦</span>
                  Price
                </Label>
                <Field
                  as={Input}
                  id={`package_prices.${index}.price`}
                  name={`package_prices.${index}.price`}
                  type="number"
                  placeholder="Enter price in Naira"
                  className="w-full max-w-md text-base h-12 transition-all focus:ring-2 focus:ring-brand-color rounded-md border-gray-300 hover:border-brand-color"
                />
                {typeof errors.package_prices?.[index] === 'object' &&
                 'price' in (errors.package_prices[index] || {}) &&
                 touched.package_prices?.[index]?.price && (
                  <div className="text-red-500 text-sm mt-1">
                    {(errors.package_prices[index] as {price: string}).price}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`category_descriptions.${index}.description`}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <FileText className="w-4 h-4 text-brand-color" />
                  Description
                </Label>
                <div className="bg-white rounded-lg h-48">
                  <RichTextEditor
                    value={values.category_descriptions?.[index]?.description ?? ''}
                    onChange={(value) => setFieldValue(`category_descriptions.${index}.description`, value)}
                    placeholder={`Enter ${category.category} package description`}
                  />
                </div>
                {typeof errors.category_descriptions?.[index] === 'object' &&
                 'description' in (errors.category_descriptions[index] || {}) &&
                 touched.category_descriptions?.[index]?.description && (
                  <div className="text-red-500 text-sm mt-1">
                    {(errors.category_descriptions[index] as {description: string}).description}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);
