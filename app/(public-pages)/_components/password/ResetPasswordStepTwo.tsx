"use client";

import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/components/reusables/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AppButton from '@/components/reusables/AppButton'
import AppTextInput from '@/components/reusables/AppTextInput'
import { CLIENT_ROUTES } from '@/lib/routes'
import { useAppToast } from '@/components/reusables/AppToast'
import { SESSION_STORAGE_KEYS } from '@/constants/local-storage-keys';
import { useSendOtp, useVerifyOtp } from '@/api/services/authentication';

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits')
})

export default function ResetPasswordStepTwo() {
    const router = useRouter()
    const { showToast } = useAppToast()
    const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL)
    const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp()
    const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp()

    useEffect(() => {
        if (!email) {
            router.push(CLIENT_ROUTES.PublicPages.auth.password.stepOne)
            return
        }
    }, [router, email])

    const handleResendOTP = async () => {
        try {
            if (!email) {
                throw new Error("Email not found")
            }

            sendOtp({ email }, {
                onSuccess: (data) => {
                    showToast({
                        title: "Success",
                        description: "OTP has been resent to your email",
                        variant: "default"
                    })
                },
                onError: (error) => {
                    showToast({
                        title: "Error",
                        description: "Failed to resend OTP. Please try again.",
                        variant: "destructive"
                    })
                },
            })
        } catch (error) {
            showToast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            })
        }
    }

    const otpFormik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: otpValidationSchema,
        onSubmit: (values) => {
            if (!email) {
                router.push(CLIENT_ROUTES.PublicPages.auth.password.stepOne)
                return
            }

            verifyOtp({ email, otp: values.otp }, {
                onSuccess: (data) => {
                    if (data?.message) {
                        router.push(CLIENT_ROUTES.PublicPages.auth.password.stepThree)
                    } else {
                        showToast({
                            title: "Error",
                            description: "Invalid OTP. Please try again.",
                            variant: "destructive",
                            action: {
                                label: "Resend Code",
                                onClick: handleResendOTP
                            }
                        })
                    }
                },
                onError: (error) => {
                    showToast({
                        title: "Error",
                        description: "An error occurred while verifying OTP. Please try again.",
                        variant: "destructive",
                        action: {
                            label: "Resend Code",
                            onClick: handleResendOTP
                        }
                    })
                }
            })
        }
    })

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
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center cursor-pointer"
                    >
                        <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color" />
                    </motion.div>
                    <AppHeading
                        variant="h2"
                        className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
                    >
                        Reset Password - Step 2
                    </AppHeading>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-brand-color-text mb-6 sm:mb-8 text-center sm:text-left text-sm sm:text-base lg:text-lg"
                >
                    Enter the 4-digit code sent to your email
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="w-full"
                >
                    <form onSubmit={otpFormik.handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                            <AppTextInput
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit code"
                                onChange={otpFormik.handleChange}
                                onBlur={otpFormik.handleBlur}
                                value={otpFormik.values.otp}
                                maxLength={6}
                                required
                            />
                            {otpFormik.touched.otp && otpFormik.errors.otp && (
                                <p className="text-red-500 text-xs sm:text-sm px-1">
                                    {otpFormik.errors.otp}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={isSendingOtp}
                                className="text-brand-color hover:text-brand-color/80 text-sm font-medium transition-colors duration-200 ease-in-out"
                            >
                                {isSendingOtp ? 'Resending...' : 'Resend Code'}
                            </button>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="pt-2 sm:pt-4"
                        >
                            <AppButton
                                variant="primary"
                                className="w-full min-h-[44px] sm:h-[50px] text-sm sm:text-base py-2 sm:py-3"
                                onClick={otpFormik.handleSubmit}
                                disabled={!otpFormik.isValid || isVerifyingOtp}
                                loading={isVerifyingOtp}
                            >
                                {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                            </AppButton>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    )
}
