"use client"

import React from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/components/Reusables/Ui/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AppButton from '@/components/Reusables/Ui/AppButton'
import AppTextInput from '@/components/Reusables/Ui/AppTextInput'
import { useCheckIfEmailAddressExist } from '@/api/Services/onboarding'
import { CLIENT_ROUTES } from '@/lib/routes'
import AppDialogBox from '@/components/Reusables/Ui/AppDialogBox'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

const StepOneOnboarding = () => {
  const router = useRouter()
  const { mutate: checkEmail, isPending } = useCheckIfEmailAddressExist()
  const [showEmailExistsAlert, setShowEmailExistsAlert] = React.useState(false)
  const [showStoredEmailDialog, setShowStoredEmailDialog] = React.useState(false)
  const [showOnboardingDialog, setShowOnboardingDialog] = React.useState(false)
  const [storedEmail, setStoredEmail] = React.useState<string | null>(null)

  React.useEffect(() => {
    const email = localStorage.getItem('onboarding_email')
    const onboardingId = localStorage.getItem('onboarding_user_id')

    if (onboardingId) {
      setShowOnboardingDialog(true)
      return
    }

    if (email) {
      setStoredEmail(email)
      setShowStoredEmailDialog(true)
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      checkEmail(
        { email: values.email },
        {
          onSuccess: (response) => {
            if (!response) return;
            if (response.exists) {
              setShowEmailExistsAlert(true);
              return;
            }
            localStorage.setItem('onboarding_email', values.email);
            router.push(CLIENT_ROUTES.PublicPages.onboarding.stepTwo);
          },
          onError: () => {
            setShowEmailExistsAlert(true);
          }
        }
      );
    },
  })

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowEmailExistsAlert(false)
    formik.handleChange(e)
  }

  const handleStoredEmailConfirm = () => {
    if (storedEmail) {
      formik.setFieldValue('email', storedEmail)
      router.push(CLIENT_ROUTES.PublicPages.onboarding.stepTwo)
    }
  }

  const handleStoredEmailCancel = () => {
    localStorage.removeItem('onboarding_email')
    setShowStoredEmailDialog(false)
  }

  const handleContinueOnboarding = () => {
    router.push(CLIENT_ROUTES.PublicPages.onboarding.stepTwo)
  }

  const handleRestartOnboarding = () => {
    localStorage.removeItem('onboarding_user_id')
    localStorage.removeItem('onboarding_details')
    localStorage.removeItem('onboarding_email')
    setShowOnboardingDialog(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-0 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <AppDialogBox
        open={showStoredEmailDialog}
        onOpenChange={setShowStoredEmailDialog}
        trigger={<></>}
        title="Continue with saved email?"
        description={`We found a saved email (${storedEmail}). Would you like to continue with this email?`}
        confirmText="Yes, continue"
        cancelText="No, use different email"
        onConfirm={handleStoredEmailConfirm}
        onCancel={handleStoredEmailCancel}
      />

      <AppDialogBox
        open={showOnboardingDialog}
        onOpenChange={setShowOnboardingDialog}
        trigger={<></>}
        title="Continue Onboarding?"
        description={`We found that you have already started the onboarding process as ${localStorage.getItem('onboarding_email')}. Would you like to continue where you left off?`}
        confirmText="Continue"
        cancelText="Start Over"
        onConfirm={() => router.push(CLIENT_ROUTES.PublicPages.onboarding.stepThree)}
        onCancel={handleRestartOnboarding}
      />

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
            onClick={() => router.push('/')}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center cursor-pointer"
          >
            <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color" />
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
              <AppTextInput
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleEmailChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs sm:text-sm px-1">
                  {formik.errors.email}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500 text-left px-1">
                  Please make sure the email address you're inputting is a valid email
                </p>
              )}
              {showEmailExistsAlert && (
                <p className="text-red-500 text-xs sm:text-sm px-1">
                  This email already exists. Please use a different email address.
                </p>
              )}
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
                disabled={isPending || !formik.isValid}
                loading={isPending}
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
