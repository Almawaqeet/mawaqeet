import FormInput from './formComponents/FormContainer'
import React from 'react'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import Paragraph from '../libs/utilities/Paragraph'
import FormContainer from './formComponents/FormContainer'
import { useValidate } from '../libs/hooks/useValidate'
import CustomInputComponent from './formComponents/CustomInputComponent'
import BtnGlobal from './BtnGlobal'
import { PiGreaterThanLight, PiLessThanLight } from 'react-icons/pi'
import FormError from './formComponents/FormError'
import { FormikHelpers } from 'formik'
import { next_of_kin_Schema, onboardingSchema } from '../libs/utilities/schemas'
import { useAppInfo } from '../libs/hooks/useAppInfo'

interface Step1InitialValues {
  Next_of_Kin_Name: string,
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
        classname={`text-Bold-1-clamp font-bold tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu xmd:text-start ${whiteSpaces.paddingX}`}
      >
        Next of Kin Info
      </Paragraph>

        <Formik
          initialValues={{
            Next_of_Kin_Name: '',
            email: '',
            phone_number: '',
            address: ''
          }}
          validationSchema={next_of_kin_Schema}

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
            <div className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 md:grid-cols-2 md:gap-x-20 `}>
              <FormContainer label='Next of Kin Name'>
                <Field name="Next_of_Kin_Name" component={CustomInputComponent} input_type="text" placeholder="Full Name" value={values.Next_of_Kin_Name} />
                {errors.Next_of_Kin_Name && touched.Next_of_Kin_Name ? <FormError message={errors.Next_of_Kin_Name} className='text-red-700 font-dejavu' /> : null}
              </FormContainer>

              <FormContainer label='Email Address'>
                <Field name="last_name" component={CustomInputComponent} input_type="email" placeholder="Email Address" value={values.email} />
                {errors.email && touched.email ? <FormError message={errors.email} className='text-red-700 font-dejavu' /> : null}
              </FormContainer>

              <FormContainer label='Home Address'>
                <Field name="address" component={CustomInputComponent} input_type="text" placeholder="Next of Kin Adrress" value={values.address} />
                {errors.address && touched.address ? <FormError message={errors.address} className='text-red-700 font-dejavu' /> : null}
              </FormContainer>

              <FormContainer label='Contact Number' className="xmd:pb-14 md:pb-8 lg:pb-16">
                <Field name="phone_number" component={CustomInputComponent} input_type="tel" placeholder="Enter digits" value={values.phone_number} />
                {errors.phone_number && touched.phone_number ? <FormError message={errors.phone_number} className='text-red-700 font-dejavu' /> : null}
              </FormContainer>
            </div>

            <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
              <BtnGlobal onClick={handlePrevious} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                <PiLessThanLight /> Previous
              </BtnGlobal>
              <BtnGlobal className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg' type='submit'>
                <span className='flex gap-2 items-center'>
                  Submit
                </span>
              </BtnGlobal>
            </span>
          </Form>)}
        </Formik>
    </React.Fragment>
  )
}

export default Step3