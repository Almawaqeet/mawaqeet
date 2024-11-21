'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { BasicDetailsForm } from '../_components/new-package/basic-details';
import { PackageDetailsForm } from '../_components/new-package/package-details';
import { CategoryForm } from '../_components/new-package/category-form';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Package name is required'),
  description: Yup.string().required('Package description is required'),
  package_type: Yup.string().required('Package type is required'),
  expiry_date: Yup.string().required('Expiry date is required'),
  package_prices: Yup.array().of(
    Yup.object().shape({
      category: Yup.string().required(),
      price: Yup.string().required('Price is required')
    })
  ).required('Package prices are required'),
  category_descriptions: Yup.array().of(
    Yup.object().shape({
      category: Yup.string().required(),
      description: Yup.string().required('Category description is required')
    })
  ).required('Category descriptions are required')
});

const initialValues = {
  name: '',
  description: '',
  package_type: '',
  expiry_date: '',
  package_prices: [
    { category: 'vip', price: '' },
    { category: 'deluxe', price: '' },
    { category: 'standard', price: '' }
  ],
  category_descriptions: [
    { category: 'vip', description: '' },
    { category: 'deluxe', description: '' },
    { category: 'standard', description: '' }
  ],
  is_active: true
};







export default function NewPackagePage() {
  const [currentStep, setCurrentStep] = useState(1);

  const isBasicDetailsComplete = (values: typeof initialValues) => {
    return values.name && values.description;
  };

  const isPackageDetailsComplete = (values: typeof initialValues) => {
    return values.package_type && values.expiry_date;
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to create package');
      }

      if (!data) {
        throw new Error('No data received from server');
      }

      // Handle success - could redirect or show success message
    } catch (error) {
      console.error('Error creating package:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = (values: typeof initialValues) => {
    if (currentStep === 1 && isBasicDetailsComplete(values)) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isPackageDetailsComplete(values)) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto py-12 px-6"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-medium mb-4 text-center tracking-tight"
      >
        Create New Package
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base text-gray-600 mb-8 text-center max-w-2xl mx-auto leading-relaxed"
      >
        Complete each step to create your package
      </motion.p>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep ? 'bg-blue-500 text-white' :
                step < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-24 h-1 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm">Basic Details</span>
          <span className="text-sm">Package Details</span>
          <span className="text-sm">Categories</span>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <BasicDetailsForm
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}

              {currentStep === 2 && (
                <PackageDetailsForm
                  errors={errors}
                  touched={touched}
                />
              )}

              {currentStep === 3 && (
                <CategoryForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
            </AnimatePresence>

            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600"
                >
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={() => nextStep(values)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 ml-auto"
                >
                  Create Package
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
