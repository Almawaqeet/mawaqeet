'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { BasicDetailsForm } from './new-package/basic-details';
import { PackageDetailsForm } from './new-package/package-details';
import { CategoryForm } from './new-package/category-form';
import AppButton from '@/components/reusables/AppButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useGetAllActivePackagesById } from '@/api/services/packages';
import { useAppToast } from '@/components/reusables/AppToast'
import { useRouter } from 'next/navigation';
import AppDialogBox from '@/components/reusables/AppDialogBox';

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

export default function EditPackagePage({ id }: { id: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [dialogStep, setDialogStep] = useState(1);
  const [showDialog, setShowDialog] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { data: packages, isLoading } = useGetAllActivePackagesById(id);
  const router = useRouter();
  const { showToast } = useAppToast()

  const isBasicDetailsComplete = (values: typeof initialValues) => {
    return values.name && values.description;
  };

  const isPackageDetailsComplete = (values: typeof initialValues) => {
    return values.package_type && values.expiry_date;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!values.name || !values.description || !values.package_type || !values.expiry_date) {
      showToast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate package prices and descriptions
    const hasEmptyPrices = values.package_prices.some(price => !price.price);
    const hasEmptyDescriptions = values.category_descriptions.some(desc => !desc.description);

    if (hasEmptyPrices || hasEmptyDescriptions) {
      showToast({
        title: "Error",
        description: "Please fill in all category prices and descriptions",
        variant: "destructive"
      });
      return;
    }

    // Validate expiry date is not in the past
    const expiryDate = new Date(values.expiry_date);
    if (expiryDate < new Date()) {
      showToast({
        title: "Error",
        description: "Expiry date cannot be in the past",
        variant: "destructive"
      });
      return;
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
      className="w-full max-w-5xl mx-auto py-12 px-6"
    >

      <AppDialogBox
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Package Created Successfully"
        description={
          <div className="space-y-4">
            <p>Your package has been edited successfully but is currently inactive.</p>

          </div>
        }
        cancelText="Close"
        onCancel={() => setShowSuccessDialog(false)}
      />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-semibold mb-4 text-center tracking-tight text-brand-color"
      >
        Edit Created Package
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg text-text-color mb-12 text-center max-w-2xl mx-auto leading-relaxed"
      >
        Complete each step to edit your package
      </motion.p>

      <div className="mb-12">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${step === currentStep ? 'bg-brand-color text-white shadow-lg scale-110' :
                step < currentStep ? 'bg-brand-color-light text-brand-color' : 'bg-gray-100 text-gray-400'
                }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-32 h-1.5 rounded-full transition-all duration-300 ${step < currentStep ? 'bg-brand-color-light' : 'bg-gray-100'
                  }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span className={`text-base font-medium transition-all duration-300 ${currentStep === 1 ? 'text-brand-color' : 'text-gray-500'}`}>Basic Details</span>
          <span className={`text-base font-medium transition-all duration-300 ${currentStep === 2 ? 'text-brand-color' : 'text-gray-500'}`}>Package Details</span>
          <span className={`text-base font-medium transition-all duration-300 ${currentStep === 3 ? 'text-brand-color' : 'text-gray-500'}`}>Categories</span>
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
                  packagedetails={packages?.results.map((itm) =>
                    ( itm.price))}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <AppButton
                  onClick={prevStep}
                  icon={<FaArrowLeft />}
                  iconPosition="start"
                  className="px-8 py-3 bg-brand-color-subtle text-brand-color hover:bg-brand-color hover:text-white transition-all duration-300"
                >
                  Previous
                </AppButton>
              )}

              {currentStep < 3 ? (
                <AppButton
                  onClick={() => nextStep(values)}
                  icon={<FaArrowRight />}
                  className="px-8 py-3 bg-brand-color text-white hover:bg-hover-color transition-all duration-300 ml-auto"
                >
                  Next
                </AppButton>
              ) : (
                <AppButton
                  type="submit"
                  disabled={isLoading}
                  loading={isLoading}
                  icon={<FaArrowRight />}
                  className="px-8 py-3 bg-brand-color text-white hover:bg-hover-color transition-all duration-300 ml-auto"
                >
                  Edit Package
                </AppButton>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
