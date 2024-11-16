"use client"

import React from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/components/Reusables/Ui/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import AppButton from '@/Components/Reusables/Ui/AppButton'

const StepOneOnboarding = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
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
      className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-0 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center"
          >
            <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color cursor-pointer" />
          </motion.div>
          <AppHeading
            variant="h2"
            className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
          >
            Onboarding 1/3
          </AppHeading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-color-text mb-6 sm:mb-8 text-center sm:text-left text-sm sm:text-base lg:text-lg"
        >
          Submit your active email
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full h-12 sm:h-[50px] px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <p className="text-xs sm:text-sm text-gray-500 text-left px-1">
                Please make sure the email address you're inputting is a valid email
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2 sm:pt-4"
            >
              <AppButton
                variant="primary"
                className="w-full min-h-[44px] sm:h-[50px] text-sm sm:text-base py-2 sm:py-3"
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

export default StepOneOnboarding
