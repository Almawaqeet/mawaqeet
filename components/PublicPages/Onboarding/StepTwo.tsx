"use client"

import React from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import AppHeading from '@/components/Reusables/Ui/AppHeading'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import AppButton from '@/components/Reusables/Ui/AppButton'
// import Autocomplete from "react-google-autocomplete"
import AppTextInput from '@/components/Reusables/Ui/AppTextInput'
import AppPhoneInput from '@/components/Reusables/Ui/AppPhoneInput'
import { useCreateOnboardingUser } from '@/api/Services/onboarding'
import { CLIENT_ROUTES } from '@/lib/routes'
import * as Yup from 'yup'
import AppDialogBox from '@/components/Reusables/Ui/AppDialogBox'
import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage-keys'
import { useAppToast } from '@/components/Reusables/Ui/AppToast';




const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  nextOfKinName: Yup.string().required('Next of kin name is required'),
  nextOfKinPhoneNumber: Yup.string().required('Next of kin phone number is required'),
  nextOfKinAddress: Yup.string().required('Next of kin address is required')
})

const StepTwoOnboarding = () => {
  const router = useRouter()
  const { mutate: createOnboardingUser, isPending } = useCreateOnboardingUser()
  const [serverErrors, setServerErrors] = React.useState<{[key: string]: string[]}>({})
  const [showDialog, setShowDialog] = React.useState(false)
  const [showOnboardingDialog, setShowOnboardingDialog] = React.useState(false)
  const savedDetails = React.useMemo(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_DETAILS)
    return saved ? JSON.parse(saved) : null
  }, [])
  const { showToast } = useAppToast()
  React.useEffect(() => {
    const email = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)
    const onboardingId = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_USER_ID)

    if (!email) {
      router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)
      return
    }

    if (onboardingId) {
      setShowOnboardingDialog(true)
      return
    }

    if (savedDetails) {
      setShowDialog(true)
    }
  }, [router, savedDetails])

  const handleContinueOnboarding = () => {
    router.push(CLIENT_ROUTES.PublicPages.onboarding.stepThree)
  }

  const handleRestartOnboarding = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING_USER_ID)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING_DETAILS)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)
    router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      nextOfKinName: '',
      nextOfKinPhoneNumber: '',
      nextOfKinAddress: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setServerErrors({})
      const email = localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)
      if (!email) {
        router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)
        return
      }

      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        address: values.address,
        phone_number: values.phoneNumber,
        next_of_kin_name: values.nextOfKinName,
        next_of_kin_phone_number: values.nextOfKinPhoneNumber,
        next_of_kin_address: values.nextOfKinAddress,
        email: email
      }

      createOnboardingUser(payload, {
        onSuccess: (data) => {
          console.log(data?.message)
          console.log(data?.payload?.onboarding_id)
          if (data?.payload?.onboarding_id) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING_USER_ID, data.payload.onboarding_id.toString())
            router.push(CLIENT_ROUTES.PublicPages.onboarding.stepThree)
          }
        },
        onError: (error: any) => {
          if (error?.response?.data) {
            setServerErrors(error.response.data)
          }

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
                onClick: () => console.log("contact support")
              }
            })
          }
        }
      })
    },
  });

  // Save form values to localStorage whenever they change
  React.useEffect(() => {
    const formValues = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      address: formik.values.address,
      phoneNumber: formik.values.phoneNumber,
      nextOfKinName: formik.values.nextOfKinName,
      nextOfKinPhoneNumber: formik.values.nextOfKinPhoneNumber,
      nextOfKinAddress: formik.values.nextOfKinAddress
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING_DETAILS, JSON.stringify(formValues))
  }, [formik.values])

  const handleUseSavedDetails = () => {
    if (savedDetails) {
      formik.setValues(savedDetails)
    }
    setShowDialog(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-4 py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <AppDialogBox
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Use Saved Details?"
        description="We found your previously saved details. Would you like to continue with them?"
        confirmText="Use Saved Details"
        cancelText="Start Fresh"
        onConfirm={handleUseSavedDetails}
        onCancel={() => setShowDialog(false)}
      />

      <AppDialogBox
        open={showOnboardingDialog}
        onOpenChange={setShowOnboardingDialog}
        title="Continue Onboarding?"
        description={`We found that you have already started the onboarding process as ${localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING_EMAIL)}. Would you like to continue where you left off?`}
        confirmText="Continue"
        cancelText="Start Over"
        onConfirm={handleContinueOnboarding}
        onCancel={handleRestartOnboarding}
      />

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
            onClick={() => router.push(CLIENT_ROUTES.PublicPages.onboarding.stepOne)}
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
                error={
                  (formik.touched.firstName && formik.errors.firstName) ||
                  (serverErrors?.first_name?.[0]) ?
                  formik.errors.firstName || serverErrors?.first_name?.[0] :
                  undefined
                }
              />

              <AppTextInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.lastName && formik.errors.lastName) ||
                  (serverErrors?.last_name?.[0]) ?
                  formik.errors.lastName || serverErrors?.last_name?.[0] :
                  undefined
                }
              />

              <AppTextInput
                type="text"
                name="address"
                placeholder="Full Address"
                onChange={formik.handleChange}
                value={formik.values.address}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.address && formik.errors.address) ||
                  (serverErrors?.address?.[0]) ?
                  formik.errors.address || serverErrors?.address?.[0] :
                  undefined
                }
              />

              {/* this may be useful for one day... maybe if im not lazy to go to google and setup the api key */}
              {/* <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                  formik.setFieldValue('address', place?.formatted_address || '')
                }}
                defaultValue={formik.values.address}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                placeholder="Full Address"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm" style={{ marginTop: '4px' }}>{formik.errors.address}</div>
              )} */}

              <AppPhoneInput
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                value={formik.values.phoneNumber}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.phoneNumber && formik.errors.phoneNumber) ||
                  (serverErrors?.phone_number?.[0]) ?
                  formik.errors.phoneNumber || serverErrors?.phone_number?.[0] :
                  undefined
                }
              />

              <AppTextInput
                type="text"
                name="nextOfKinName"
                placeholder="Next of Kin Name"
                onChange={formik.handleChange}
                value={formik.values.nextOfKinName}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.nextOfKinName && formik.errors.nextOfKinName) ||
                  (serverErrors?.next_of_kin_name?.[0]) ?
                  formik.errors.nextOfKinName || serverErrors?.next_of_kin_name?.[0] :
                  undefined
                }
              />

              <AppPhoneInput
                name="nextOfKinPhoneNumber"
                placeholder="Next of Kin Phone Number"
                onChange={(value) => formik.setFieldValue('nextOfKinPhoneNumber', value)}
                value={formik.values.nextOfKinPhoneNumber}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.nextOfKinPhoneNumber && formik.errors.nextOfKinPhoneNumber) ||
                  (serverErrors?.next_of_kin_phone_number?.[0]) ?
                  formik.errors.nextOfKinPhoneNumber || serverErrors?.next_of_kin_phone_number?.[0] :
                  undefined
                }
              />

              <AppTextInput
                type="text"
                name="nextOfKinAddress"
                placeholder="Next of Kin Address"
                onChange={formik.handleChange}
                value={formik.values.nextOfKinAddress}
                className="text-sm sm:text-base"
                error={
                  (formik.touched.nextOfKinAddress && formik.errors.nextOfKinAddress) ||
                  (serverErrors?.next_of_kin_address?.[0]) ?
                  formik.errors.nextOfKinAddress || serverErrors?.next_of_kin_address?.[0] :
                  undefined
                }
              />

              {/* <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={(place) => {
                  formik.setFieldValue('nextOfKinAddress', place?.formatted_address || '')
                }}
                defaultValue={formik.values.nextOfKinAddress}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent transition-all duration-200"
                placeholder="Next of Kin Address"
              />
              {formik.touched.nextOfKinAddress && formik.errors.nextOfKinAddress && (
                <div className="text-red-500 text-sm">{formik.errors.nextOfKinAddress}</div>
              )} */}
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
                disabled={isPending}
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

export default StepTwoOnboarding
