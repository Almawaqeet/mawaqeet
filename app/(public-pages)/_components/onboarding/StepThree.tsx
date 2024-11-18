"use client"

import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/components/reusables/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AppButton from '@/components/reusables/AppButton'
import { useGetOnboardingPaymentAmount, useInitiateOnboardingPayment, useVerifyOnboardingPayment } from '@/api/services/onboarding'
import AppSkeleton from '@/components/reusables/AppSkeleton'
import { CLIENT_ROUTES } from '@/lib/routes'
import { usePaystack } from '@/third-party/Paystack'
import { convertToKobo } from '@/lib/utils'
import AppModal from '@/components/reusables/AppModal'
import SuccessLottie from '@/components/reusables/SuccessLottie'
import LoadingLottie from '@/components/reusables/LoadingLottie'
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage-keys'
import { useAppToast } from '@/components/reusables/AppToast'

const StepThreeOnboarding = () => {
  const [reference, setReference] = useState('')
  const { data: registrationFeeData, isPending } = useGetOnboardingPaymentAmount()
  const { mutate: initiatePayment, isPending: isInitiatingPayment } = useInitiateOnboardingPayment()
  const { data: verifyPaymentData, isPending: isVerifyingPayment } = useVerifyOnboardingPayment(reference)
  const router = useRouter()
  const { showToast } = useAppToast()
  const onboardingId = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_USER_ID)
  const email = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)

  React.useEffect(() => {
    if (!onboardingId || !email) {
      router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)
      return
    }
  }, [router, onboardingId, email])

  React.useEffect(() => {
    if (verifyPaymentData?.status === 'success') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING_COMPLETED_STATUS, 'true')
    }
  }, [verifyPaymentData])

  const registrationFee = registrationFeeData?.registration_fee?.toLocaleString() ?? 0

  const handleRestartOnboarding = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING_USER_ID)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)
    router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)
  }

  const handlePayment = () => {
    initiatePayment(
      { onboarding_id: parseInt(onboardingId ?? '0') },
      {
        onSuccess: (data) => {
          if (data?.data?.reference && data?.data?.authorization_url && email && registrationFeeData?.registration_fee) {
            const { initializePayment } = usePaystack({
              email,
              amount: convertToKobo(registrationFeeData.registration_fee),
              reference: data.data.reference,
              onSuccess: () => {
                setReference(data.data?.reference ?? '')
              },
              onClose: () => {
                console.log('Payment closed')
              }
            })
            initializePayment()
          }
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || error?.message || "An error occurred while initiating payment"

          if (error?.status === 404 || error?.status === 400) {
            showToast({
              title: "Error",
              description: errorMessage,
              variant: "destructive",
              action: {
                label: "Restart Onboarding",
                onClick: handleRestartOnboarding
              }
            })
          } else {
            showToast({
              title: "Error",
              description: errorMessage,
              variant: "destructive",
              action: {
                label: "Contact Support",
                // TODO: Add contact support functionality
                onClick: () => console.log("contact support")
              }
            })
          }
        }
      }
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-0 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <AppModal
        open={isVerifyingPayment && reference !== ''}
        title="Please hang on while we verify your payment"
      >
        <div className="flex flex-col items-center justify-center">
          <LoadingLottie />
        </div>
      </AppModal>

      <AppModal
        open={verifyPaymentData?.status === 'success'}
        title="Payment Successful"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <SuccessLottie />
          <p className="text-center text-gray-700 text-base font-medium">
            {verifyPaymentData?.message}
          </p>
          <p className="text-sm text-gray-500 text-center font-normal">
            We have created your account successfully, we would be redirecting you to the login page in a few seconds. Click on the button below to download your receipt.
          </p>
          {verifyPaymentData?.receipt_url && (
            <a
              href={verifyPaymentData.receipt_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-color hover:underline text-sm font-medium transition-colors duration-200 ease-in-out"
            >
              Download Receipt
            </a>
          )}
        </div>
      </AppModal>

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
            onClick={() => router.push(CLIENT_ROUTES.PublicPages.onboarding.stepTwo)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center"
          >
            <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color cursor-pointer" />
          </motion.div>
          <AppHeading
            variant="h2"
            className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
          >
            Onboarding 3/3
          </AppHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-brand-color-text text-sm sm:text-base lg:text-lg mb-2">
            Your Registration Fee
          </p>
          {isPending ? (
            <AppSkeleton height="3rem" width="200px" className="mx-auto" />
          ) : (
            <div className="text-4xl sm:text-5xl font-bold text-brand-color">
              ₦{registrationFee}
            </div>
          )}
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            One-time payment for account activation
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Registration Fee</span>
                {isPending ? (
                  <AppSkeleton height="1.5rem" width="100px" />
                ) : (
                  <span className="font-medium">₦{registrationFee}</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Processing Fee</span>
                <span>₦0.00</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                {isPending ? (
                  <AppSkeleton height="1.5rem" width="100px" />
                ) : (
                  <span>₦{registrationFee}</span>
                )}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AppButton
                variant="primary"
                className="w-full min-h-[44px] sm:h-[50px] text-sm sm:text-base py-2 sm:py-3"
                onClick={handlePayment}
                disabled={isPending || isInitiatingPayment}
                loading={isInitiatingPayment}
              >
                Pay Now
              </AppButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StepThreeOnboarding
