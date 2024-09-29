"use client"


import React from 'react'
import { FormikHelpers } from 'formik'


import FormInterface from '../../UI/formComponents/FormInterface'
import { useValidate } from '../../libs/hooks/useValidate'
import FormContainer from '../../UI/formComponents/FormContainer'
import CustomInputComponent from '../../UI/formComponents/CustomInputComponent'
import BtnGlobal from '../../UI/BtnGlobal'
import { autoPasswordSchema } from '@/app/libs/utilities/schemas'
import FormError from '@/app/UI/formComponents/FormError'
import { useRouter } from 'next/navigation'



interface IntialInputValues {
    email: string
  }


const OnboardingEmail = () => {
    const { Field, Form, Formik } = useValidate()
    const router = useRouter()
  return (
    <div>
        <FormInterface
        heading='Provide your email'
        sub_heading='Provide your email address to receive your login details'
        layout='grid sm:grid-cols-1 md:grid-cols-[500px_1fr]'
        >

        <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={autoPasswordSchema}
              onSubmit={(
                values: IntialInputValues,
                { setSubmitting }: FormikHelpers<IntialInputValues>
              ) => {
                console.log(values);
                setSubmitting(false);
                router.push(`verify-password`)
              }}
            >
              {({ handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <FormContainer label='Email Address'>
                      <Field name="email" component={CustomInputComponent} input_type="email" placeholder="Your Email Address" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                      {errors.email && touched.email ? (
                        <FormError message={errors.email}  />
                      ) : null}

                    </FormContainer>

                    <BtnGlobal className='font-dejavu xmd:py-[10px] xmd:px-[78px] md:py-4 md:px-[108px] m-auto text-white text-center rounded-lg bg-[#4B3938]' type='submit' disable={isSubmitting}>Sign Up</BtnGlobal>
                  </Form>
                </>
              )}
            </Formik>
        </FormInterface>
    </div>
  )
}

export default OnboardingEmail
