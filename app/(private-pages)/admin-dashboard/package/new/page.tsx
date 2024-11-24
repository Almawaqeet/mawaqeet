'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { BasicDetailsForm } from '../_components/new-package/basic-details';
import { PackageDetailsForm } from '../_components/new-package/package-details';
import { CategoryForm } from '../_components/new-package/category-form';
import AppButton from '@/components/reusables/AppButton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCreatePackage } from '@/api/services/packages';
import { useAppToast } from '@/components/reusables/AppToast'
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

export default function NewPackagePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [dialogStep, setDialogStep] = useState(1);
  const [showDialog, setShowDialog] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { mutate: createPackage, isPending } = useCreatePackage();
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

    try {
      createPackage(values, {
        onSuccess: () => {
          setShowSuccessDialog(true);
        },
        onError: (error: unknown) => {
          const err = error as { data?: { message?: string } };
          showToast({
            title: "Error",
            description: err?.data?.message || 'An error occurred',
            variant: "destructive"
          });
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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

  const handleDialogContinue = () => {
    if (dialogStep < 3) {
      setShowDialog(true);
      setDialogStep(dialogStep + 1); // Increment step
    } else {
      setDialogStep(1); // Reset step
    }
  };

  const getDialogContent = () => {
    switch (dialogStep) {
      case 1:
        return {
          title: "Package Creation Rules",
          content: (
            <div className="space-y-4">
              <p className="font-medium">Please note the following rules when creating a package:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Package name and description are required</li>
                <li>Expiry date must not be in the past</li>
                <li>All category prices must be filled in</li>
                <li>Each category must have a detailed description</li>
              </ul>
            </div>
          )
        };
      case 2:
        return {
          title: "Category Benefits - Part 1",
          content: (
            <div className="space-y-4">
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold">VIP:</span> Premium access to all features, priority support, exclusive events</li>
                <li><span className="font-semibold">Deluxe:</span> Enhanced features, priority booking, special discounts</li>
              </ul>
            </div>
          )
        };
      case 3:
        return {
          title: "Category Benefits - Part 2",
          content: (
            <div className="space-y-4">
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold">Standard:</span> Basic features, regular support, standard benefits</li>
              </ul>
            </div>
          )
        };
      default:
        return { title: "", content: null };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto py-12 px-6"
    >
      <AppDialogBox
        open={showDialog}
        onOpenChange={setShowDialog}
        title={dialogContent.title}
        description={dialogContent.content}
        confirmText={dialogStep === 3 ? "Get Started" : "Continue"}
        cancelText="Skip"
        onConfirm={handleDialogContinue}
        onCancel={() => {
          setShowDialog(false);
          setDialogStep(1);
        }}
      />

      <AppDialogBox
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Package Created Successfully"
        description={
          <div className="space-y-4">
            <p>Your package has been created successfully but is currently inactive.</p>
            <p>To make it visible to all users, you'll need to activate it from the package management dashboard.</p>
          </div>
        }
        confirmText="Go to Dashboard"
        cancelText="Close"
        onConfirm={() => {
          setShowSuccessDialog(false);
          window.location.href = '/admin-dashboard/package';
        }}
        onCancel={() => setShowSuccessDialog(false)}
      />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-semibold mb-4 text-center tracking-tight text-brand-color"
      >
        Create New Package
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg text-text-color mb-12 text-center max-w-2xl mx-auto leading-relaxed"
      >
        Complete each step to create your package
      </motion.p>

      <div className="mb-12">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                step === currentStep ? 'bg-brand-color text-white shadow-lg scale-110' :
                step < currentStep ? 'bg-brand-color-light text-brand-color' : 'bg-gray-100 text-gray-400'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-32 h-1.5 rounded-full transition-all duration-300 ${
                  step < currentStep ? 'bg-brand-color-light' : 'bg-gray-100'
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
                  disabled={isPending}
                  loading={isPending}
                  icon={<FaArrowRight />}
                  className="px-8 py-3 bg-brand-color text-white hover:bg-hover-color transition-all duration-300 ml-auto"
                >
                  Create Package
                </AppButton>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
