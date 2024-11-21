import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { Field } from 'formik';



export const BasicDetailsForm = ({ errors, touched, values, setFieldValue }: any) => (
    <motion.div
      key="basic"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-lg shadow-sm p-6 border"
    >
      <h2 className="text-xl font-medium text-gray-800 mb-6">Basic Details</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">Package Name</Label>
          <Field
            as={Input}
            id="name"
            name="name"
            placeholder="Enter package name"
            className={`text-base transition-all focus:ring-2 focus:ring-blue-500 ${
              errors.name && touched.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && touched.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm">Package Description</Label>
          <RichTextEditor
            value={values.description}
            onChange={(value) => setFieldValue('description', value)}
            placeholder="Enter package description"
          />
          {errors.description && touched.description && (
            <div className="text-red-500 text-sm">{errors.description}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
