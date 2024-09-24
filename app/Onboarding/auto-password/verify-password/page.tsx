'use client'
import React, { useState } from 'react'
import { FormikHelpers } from 'formik'


import FormInterface from '../../../UI/formComponents/FormInterface'
import { useValidate } from '../../../libs/hooks/useValidate'
import FormContainer from '../../../UI/formComponents/FormContainer'
import CustomInputComponent from '../../../UI/formComponents/CustomInputComponent'
import BtnGlobal from '../../../UI/BtnGlobal'
import { verifyPasswordSchema } from '@/app/libs/utilities/schemas'
import FormError from '@/app/UI/formComponents/FormError'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'



interface IntialInputValues {
  password: string
  verify_password: string
}


const VerifyPassword = () => {
  const { Field, Form, Formik } = useValidate()

  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const [isShowVerifyPassword, setShowVerifyPassword] = useState<boolean>(false)

  return (
    <div>
      <FormInterface
        heading='Input Password'
        sub_heading='Input your password to gain access to your dashboard'
        layout='grid sm:grid-cols-1 md:grid-cols-[600px_1fr]'
      >

        <Formik
          initialValues={{
            password: '',
            verify_password: ''
          }}
          validationSchema={verifyPasswordSchema}
          onSubmit={(
            values: IntialInputValues,
            { setSubmitting }: FormikHelpers<IntialInputValues>
          ) => {
            console.log(values);

            setSubmitting(false);
          }}
        >
          {({ handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <Form onSubmit={handleSubmit}>

                <FormContainer label='Password'
                  icon={isShowPassword ? <IoEyeOffOutline onClick={() => setShowPassword(false)} /> : <IoEyeOutline onClick={() => setShowPassword(true)} />}
                >
                  <Field
                    name="password"
                    component={CustomInputComponent}
                    input_type={isShowPassword ? 'text' : 'password'}
                    placeholder="********"
                  />
                  {errors.password && touched.password ? (
                    <FormError message={errors.password} />
                  ) : null}
                </FormContainer>;

                <FormContainer label='Verify Password'   icon={isShowVerifyPassword ? <IoEyeOffOutline onClick={() => setShowVerifyPassword(false)} /> : <IoEyeOutline onClick={() => setShowVerifyPassword(true)} />}>
                  <Field name="verify_password" component={CustomInputComponent} input_type={`${isShowVerifyPassword ? 'text': 'password'}`} placeholder="********" value={values.verify_password}  />
                  {errors.verify_password && touched.verify_password ? (
                    <FormError message={errors.verify_password} />
                  ) : null}
                </FormContainer>

                <BtnGlobal className='font-dejavu xmd:py-[10px] xmd:px-[78px] md:py-4 md:px-[108px] m-auto text-white text-center rounded-lg bg-[#4B3938] md:mt-[120px] lg:mt-[197px]' type='submit' disable={isSubmitting}>Sign Up</BtnGlobal>
              </Form>
            </>
          )}
        </Formik>
      </FormInterface>
    </div>
  )
}

export default VerifyPassword