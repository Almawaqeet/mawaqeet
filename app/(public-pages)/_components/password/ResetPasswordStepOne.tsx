"use client";

import React, { useEffect, useState } from 'react'
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
import { useSendOtp } from '@/api/services/authentication';
import AppDialogBox from '@/components/reusables/AppDialogBox'

const emailValidationSchema = Yup.object({
email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

export default function ResetPasswordStepOne() {
const router = useRouter()
const { showToast } = useAppToast()
const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp()
const [showStoredEmailDialog, setShowStoredEmailDialog] = useState(false)
const [storedEmail, setStoredEmail] = useState<string | null>(null)

useEffect(() => {
    const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL)
    if (email) {
        setStoredEmail(email)
        setShowStoredEmailDialog(true)
    }
}, [])

const handleStoredEmailConfirm = () => {
    if (storedEmail) {
        emailFormik.setFieldValue('email', storedEmail)
        sendOtp({ email: storedEmail }, {
            onSuccess: () => {
                router.push(CLIENT_ROUTES.PublicPages.auth.password.stepTwo)
            }
        })
    }
}

const handleStoredEmailCancel = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL)
    setShowStoredEmailDialog(false)
}

const emailFormik = useFormik({
    initialValues: {
    email: ''
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL, values.email)
    sendOtp({ email: values.email }, {
        onSuccess: () => {
            router.push(CLIENT_ROUTES.PublicPages.auth.password.stepTwo)
        },
        onError: (error: any) => {
            if (error?.response?.status === 404) {
                emailFormik.setErrors({
                    email: "This email is not registered in our system. Please use a valid registered email address."
                })
            } else {
                showToast({
                    title: "Error",
                    description: "Failed to send OTP. Please try again.",
                    variant: "destructive"
                })
            }
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
            onClick={() => router.push(CLIENT_ROUTES.PublicPages.auth.login)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center cursor-pointer"
        >
            <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color" />
        </motion.div>
        <AppHeading
            variant="h2"
            className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
        >
            Reset Password - Step 1
        </AppHeading>
        </motion.div>

        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-brand-color-text mb-6 sm:mb-8 text-center sm:text-left text-sm sm:text-base lg:text-lg"
        >
        Enter your email to start password reset
        </motion.p>

        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full"
        >
        <form onSubmit={emailFormik.handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
                <AppTextInput
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                value={emailFormik.values.email}
                required
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                <p className="text-red-500 text-xs sm:text-sm px-1">
                    {emailFormik.errors.email}
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
                onClick={emailFormik.handleSubmit}
                disabled={!emailFormik.isValid || isSendingOtp}
                loading={isSendingOtp}
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
