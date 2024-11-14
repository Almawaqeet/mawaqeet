import FormInput from './formComponents/FormContainer'
import React from 'react'
import { whiteSpaces } from '../utilities/GlobalSpaces'
import Paragraph from '../utilities/Paragraph'
import FormContainer from './formComponents/FormContainer'
import { useValidate } from '../hooks/useValidate'
import CustomInputComponent from './formComponents/CustomInputComponent'
import BtnGlobal from './BtnGlobal'
import { PiGreaterThanLight, PiLessThanLight } from 'react-icons/pi'
import FormError from './formComponents/FormError'
import { FormikHelpers } from 'formik'
import { onboardingSchema } from '../utilities/schemas'
import { useAppInfo } from '../hooks/useAppInfo'

interface Step1InitialValues {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string
  address: string
}

const Step3: React.FC = () => {
  const { Form, Formik, Field } = useValidate()
  const { handlePrevious } = useAppInfo()
  return (
    <React.Fragment>
      <Paragraph
        type='globalBold'
        classname={`text-Bold-1-clamp font-bold tracking-tight leading-[18px] text-inherit xmd:pb-8   xmd:text-start ${whiteSpaces.paddingX}`}
      >
        Select Package
      </Paragraph>

      <div className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 md:grid-cols-2 md:gap-x-20`}>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            address: ''
          }}
          validationSchema={onboardingSchema}

          onSubmit={(
            values: Step1InitialValues,
            { setSubmitting }: FormikHelpers<Step1InitialValues>
          ) => {
            if (!values) return

            // handleNext()
            console.log(values)
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, values, errors, touched }) => (<Form onSubmit={handleSubmit}>
            <div className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 md:grid-cols-2 md:gap-x-20`}>
              <FormContainer label='First Name'>
                <Field name="first_name" component={CustomInputComponent} input_type="text" placeholder="First Name" value={values.first_name} />
                {errors.first_name && touched.first_name ? <FormError message={errors.first_name} className='text-red-700' /> : null}
              </FormContainer>

              <FormContainer label='Last Name'>
                <Field name="last_name" component={CustomInputComponent} input_type="text" placeholder="Last Name" value={values.last_name} />
                {errors.last_name && touched.last_name ? <FormError message={errors.last_name} className='text-red-700  ' /> : null}
              </FormContainer>

              <FormContainer label='Email'>
                <Field name="email" component={CustomInputComponent} input_type="email" placeholder="Your Email Address" value={values.email} />
                {errors.email && touched.email ? <FormError message={errors.email} className='text-red-700  ' /> : null}
              </FormContainer>

              <FormContainer label='Phone Number' className="xmd:pb-14 md:pb-8 lg:pb-16">
                <Field name="phone_number" component={CustomInputComponent} input_type="tel" placeholder="Phone number" value={values.phone_number} />
                {errors.phone_number && touched.phone_number ? <FormError message={errors.phone_number} className='text-red-700  ' /> : null}
              </FormContainer>

              <FormContainer label='Address' className="xmd:pb-14 md:pb-8 lg:pb-16">
                <Field name="address" component={CustomInputComponent} input_type="text" placeholder="Your Residential Address" value={values.phone_number} />
                {errors.address && touched.address ? <FormError message={errors.address} className='text-red-700  ' /> : null}
              </FormContainer>
            </div>

            <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
              <BtnGlobal onClick={handlePrevious} className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                <PiLessThanLight /> Previous
              </BtnGlobal>
              <BtnGlobal className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                <span className='flex gap-2 items-center'>
                  Submit
                </span>
              </BtnGlobal>
            </span>
          </Form>)}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default Step3
