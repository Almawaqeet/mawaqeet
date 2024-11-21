import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Field } from 'formik';

export const PackageDetailsForm = ({ errors, touched }: any) => (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-lg shadow-sm p-6 border"
    >
      <h2 className="text-xl font-medium text-gray-800 mb-6">Package Details</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="package_type" className="text-sm">Package Type</Label>
          <Field
            as="select"
            id="package_type"
            name="package_type"
            className={`w-full text-base rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.package_type && touched.package_type ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select package type</option>
            <option value="hajj">Hajj</option>
            <option value="umrah">Umrah</option>
          </Field>
          {errors.package_type && touched.package_type && (
            <div className="text-red-500 text-sm">{errors.package_type}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry_date" className="text-sm">Expiry Date</Label>
          <Field
            as={Input}
            id="expiry_date"
            name="expiry_date"
            type="datetime-local"
            className={`text-base transition-all focus:ring-2 focus:ring-blue-500 ${
              errors.expiry_date && touched.expiry_date ? 'border-red-500' : ''
            }`}
          />
          {errors.expiry_date && touched.expiry_date && (
            <div className="text-red-500 text-sm">{errors.expiry_date}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
