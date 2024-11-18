"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import AppHeading from "@/components/reusables/AppHeading";
import AppButton from "@/components/reusables/AppButton";
import AppTextInput from "@/components/reusables/AppTextInput";
import { IoEyeOutline } from "react-icons/io5";
import { CLIENT_ROUTES } from "@/lib/routes";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
          return;
        }

        if (result?.ok) {
          router.push(CLIENT_ROUTES.PublicPages.home);
          router.refresh();
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

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
          <AppHeading variant="h1" className="text-3xl sm:text-4xl font-bold mb-4">
            Sign In
          </AppHeading>

          <p className="text-gray-600 mb-8">Sign in with your details</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <AppTextInput
              label="Email"
              type="email"
              placeholder="Your Email Address"
              required
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <div className="space-y-1">
              <AppTextInput
                label="Password"
                type="password"
                placeholder="Password"
                icon={<IoEyeOutline />}
                required
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="text-right">
                <span
                  onClick={() => router.push(CLIENT_ROUTES.PublicPages.auth.forgotPassword)}
                  className="text-sm text-brand-color cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <AppButton
                variant="primary"
                className="w-full py-3"
                disabled={isLoading}
                onClick={formik.handleSubmit}
                loading={isLoading}
              >
                Sign In
              </AppButton>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              Are you new here?
              <span
                onClick={() => router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)}
                className="text-brand-color ml-2 cursor-pointer hover:underline"
              >
                Get Started
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
