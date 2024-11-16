"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AppHeading from '@/Components/Reusables/Ui/AppHeading'
import AppButton from '@/Components/Reusables/Ui/AppButton'
import AppTextInput from '@/Components/Reusables/Ui/AppTextInput'

const ForgottenPassword = () => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-16"
      >
        <div className="max-w-md mx-auto">
          <AppHeading
            variant="h1"
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Forgot Password
          </AppHeading>

          <p className="text-gray-600 mb-8">
            Enter your email address to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AppTextInput
              label="Email"
              type="email"
              placeholder="Your Email Address"
              required
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AppButton
                variant="primary"
                className="w-full py-3"
                onClick={() => console.log('Reset Password')}
              >
                Reset Password
              </AppButton>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?
              <span
                onClick={() => router.push('/auth/login')}
                className="text-brand-color ml-2 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ForgottenPassword
