"use client"

import React from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/Components/Reusables/Ui/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import AppButton from '@/Components/Reusables/Ui/AppButton'
import Autocomplete from "react-google-autocomplete"
import AppTextInput from '@/Components/Reusables/Ui/AppTextInput'
import AppPhoneInput from '@/Components/Reusables/Ui/AppPhoneInput'




const StepTwoOnboarding = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: ''
    },
    onSubmit: (values) => {
      // Handle continue action with form values
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-4 py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/onboarding/new-user/step-1')}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-color flex items-center justify-center"
          >
            <FaArrowLeft className="text-xl sm:text-2xl md:text-3xl text-brand-color cursor-pointer" />
          </motion.div>
          <AppHeading
            variant="h2"
            className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
          >
            Onboarding 2/3
          </AppHeading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-color-text mb-8 sm:mb-10 text-center sm:text-left text-sm sm:text-base lg:text-lg"
        >
          We need your personal information, for storing your records on our database
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <form onSubmit={formik.handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <AppTextInput
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className="text-sm sm:text-base"
              />

              <AppTextInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                className="text-sm sm:text-base"
              />

              <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                  formik.setFieldValue('address', place?.formatted_address || '')
                }}
                defaultValue={formik.values.address}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                placeholder="Full Address"
              />

              <AppPhoneInput
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                value={formik.values.phoneNumber}
                className="text-sm sm:text-base"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4 sm:pt-6"
            >
              <AppButton
                variant="primary"
                className="w-full min-h-[56px] sm:h-16 text-sm sm:text-base py-3 sm:py-4"
                onClick={formik.handleSubmit}
              >
                Continue
              </AppButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StepTwoOnboarding
