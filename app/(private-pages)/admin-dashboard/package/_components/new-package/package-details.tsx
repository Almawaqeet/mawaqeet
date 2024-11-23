import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import AppTextInput from '@/components/reusables/AppTextInput';
import { Field } from 'formik';
import { Package, Calendar } from 'lucide-react';

export const PackageDetailsForm = ({ errors, touched }: any) => (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-6 h-6 text-brand-color" />
        <h2 className="text-2xl font-semibold text-gray-800">Package Details</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="package_type"
            className="flex items-center gap-2 text-base font-medium text-gray-700"
          >
            <Package className="w-5 h-5 text-brand-color" />
            Package Type
          </Label>
          <Field
            as="select"
            id="package_type"
            name="package_type"
            className={`w-full text-base h-12 rounded-md border border-gray-300 px-4 py-2.5 transition-all focus:ring-2 focus:ring-brand-color hover:border-brand-color ${
              errors.package_type && touched.package_type ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select package type</option>
            <option value="hajj">Hajj</option>
            <option value="umrah">Umrah</option>
          </Field>
          {errors.package_type && touched.package_type && (
            <div className="text-red-500 text-sm mt-1">{errors.package_type}</div>
          )}
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="expiry_date"
            className="flex items-center gap-2 text-base font-medium text-gray-700"
          >
            <Calendar className="w-5 h-5 text-brand-color" />
            Expiry Date
          </Label>
          <Field
            as={AppTextInput}
            id="expiry_date"
            name="expiry_date"
            type="datetime-local"
            className={`w-full text-base h-12 transition-all focus:ring-2 focus:ring-brand-color rounded-md border-gray-300 hover:border-brand-color ${
              errors.expiry_date && touched.expiry_date ? 'border-red-500' : ''
            }`}
          />
          {errors.expiry_date && touched.expiry_date && (
            <div className="text-red-500 text-sm mt-1">{errors.expiry_date}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
