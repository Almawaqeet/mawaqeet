'use client';

import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import AppHeading from '@/components/reusables/AppHeading';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppButton from '@/components/reusables/AppButton';
import AppTextInput from '@/components/reusables/AppTextInput';
import { CLIENT_ROUTES } from '@/lib/routes';
import { useAppToast } from '@/components/reusables/AppToast';
import { SESSION_STORAGE_KEYS } from '@/constants/local-storage-keys';
import { useChangePassword } from '@/api/services/authentication';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^\w]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default function ResetPasswordStepThree() {
  const router = useRouter();
  const { showToast } = useAppToast();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();
const [ showPassword, setShowPassword ] = React.useState(false)
const [ showConfirmPassword, setShowConfirmPassword ] = React.useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL);
      if (!email) {
        router.push(CLIENT_ROUTES.PublicPages.auth.password.stepOne);
        return;
      }
    }
  }, [router]);

  const passwordFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      if (typeof window === 'undefined') return;

      const email = sessionStorage.getItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL);
      if (!email) {
        router.push(CLIENT_ROUTES.PublicPages.auth.password.stepOne);
        return;
      }

      changePassword(
        {
          email: email,
          password: values.password,
        },
        {
          onSuccess: (data) => {
            if (data?.message) {
              sessionStorage.removeItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL);
              router.push(CLIENT_ROUTES.PublicPages.auth.login);
              showToast({
                title: 'Success',
                description: 'Password has been reset successfully',
                variant: 'default',
              });
            }
          },
          onError: (error) => {
            showToast({
              title: 'Error',
              description: 'Failed to reset password. Please try again.',
              variant: 'destructive',
              action: {
                label: 'Start Process Again',
                onClick: () => {
                  sessionStorage.removeItem(SESSION_STORAGE_KEYS.ACTIVE_EMAIL);
                  router.push(CLIENT_ROUTES.PublicPages.auth.password.stepOne);
                },
              },
            });
          },
        }
      );
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
            onClick={() =>
              router.push(CLIENT_ROUTES.PublicPages.auth.password.stepTwo)
            }
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-brand-color flex items-center justify-center cursor-pointer"
          >
            <FaArrowLeft className="text-lg sm:text-xl md:text-2xl text-brand-color" />
          </motion.div>
          <AppHeading
            variant="h2"
            className="text-brand-color text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left"
          >
            Reset Password - Step 3
          </AppHeading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-color-text mb-6 sm:mb-8 text-center sm:text-left text-sm sm:text-base lg:text-lg"
        >
          Enter your new password
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <form
            onSubmit={passwordFormik.handleSubmit}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-2">
              <AppTextInput
                type={showPassword ? `text` : 'password'}
                name="password"
                placeholder="Enter new password"
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                icon={showPassword ? <IoEyeOffOutline onClick={() => setShowPassword(false)} /> : <IoEyeOutline onClick={() => setShowPassword(true)} />}
                value={passwordFormik.values.password}
                required
              />
              {passwordFormik.touched.password &&
                passwordFormik.errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm px-1">
                    {passwordFormik.errors.password}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <AppTextInput
                type={showConfirmPassword ? `password` : `text`}
                name="confirmPassword"
                placeholder="Confirm new password"
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                icon={showConfirmPassword ? <IoEyeOffOutline onClick={() => setShowPassword(false)} /> : <IoEyeOutline onClick={() => setShowConfirmPassword(true)} />}
                value={passwordFormik.values.confirmPassword}
                required
              />
              {passwordFormik.touched.confirmPassword &&
                passwordFormik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs sm:text-sm px-1">
                    {passwordFormik.errors.confirmPassword}
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
                disabled={!passwordFormik.isValid || isChangingPassword}
                loading={isChangingPassword}
              >
                {isChangingPassword
                  ? 'Changing Password...'
                  : 'Change Password'}
              </AppButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
