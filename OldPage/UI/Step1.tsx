import Image from 'next/image'
import { whiteSpaces } from '../utilities/GlobalSpaces'
import Headings from '../utilities/Headings'
import Paragraph from '../utilities/Paragraph'
import React from 'react'
import { CiClock2 } from 'react-icons/ci'
import { steps } from '../contents/payment'
import { useValidate } from '../hooks/useValidate'
import FormContainer from './formComponents/FormContainer'
import CustomInputComponent from './formComponents/CustomInputComponent'
import { onboardingSchema } from '../utilities/schemas'
import { FormikHelpers } from 'formik'
import BtnGlobal from './BtnGlobal'
import { PiGreaterThanLight } from 'react-icons/pi'
import { useAppInfo } from '../hooks/useAppInfo'
import FormError from './formComponents/FormError'
import AppDialogBox from '@/components/Reusables/Ui/AppDialogBox'

interface Step1InitialValues {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string
  address: string
}

const Step1: React.FC = () => {
  const { Field, Form, Formik } = useValidate()
  const { handleNext } = useAppInfo()
  const [existingEmail, setExistingEmail] = React.useState<string | null>("user@example.com") // Replace with actual existing email
  const [showEmailDialog, setShowEmailDialog] = React.useState(false)

  React.useEffect(() => {
    if (existingEmail) {
      setShowEmailDialog(true)
    }
  }, [existingEmail])

  return (
    <React.Fragment>
      <Headings type='global' classname='font-bold xmd:leading-[18px] tracking-tight xmd:pb-3 md:pb-5 lg:pb-8 text-center  '>
        Application Form
      </Headings>

      <Paragraph type='global' classname='  xmd:text-fz-xss md:text-fz-sm lg:text-fz-md text-center text-[#848484] xmd:pb-[55px] md:pb-[66px]'>
        Provide all the required Information
      </Paragraph>

      <div className={` xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:pb-[37px] lg:pb-[126px]`}>
        <div className='bg-[#F8F8F8] rounded-lg xmd:w-full xmd:p-7 flex xmd:flex-col md:grid md:grid-cols-[200px_minmax(_4px,_8px)_1fr] lg:grid-cols-[300px_minmax(_6px,_12px)_1fr] justify-cente md:gap-3'>
          <div>
            <Paragraph type='globalBold' classname='xmd:pb-7 md:pb-8 font-bold text-quote-clamp  '>Guideline:-</Paragraph>

            {steps.map((itm) => (
              itm.content.map((item) => (
                <Paragraph type='globalBold' key={`${item.id}--item`} classname='text-team-clamp xmd:font-normal leading-4 tracking-tight   xmd:pb-6 md:pb-8'>{item.item}</Paragraph>
              ))
            ))}
          </div>

          <div className='md:border-[.5px] md:border-[#333333] md:w-[.5px] border-opacity-20'></div>

          <div className='bg-white border-2 border-[#333333] border-opacity-20 rounded-lg grid xmd:grid-cols-1 xmd:p-4 xmd:gap-4 md:grid-cols-[1fr_minmax(_5px,_8px)_1fr]' >
            <div className='md:flex md:flex-col md:gap-8'>
              <div className='flex justify-between md:flex-col xmd:pb-4 md:pb-0 md:justify-center md:gap-8'>

                <Paragraph type='globalBold' classname='text-team-clamp font-bold leading-5 tracking-tight  '>Watch Full Video</Paragraph>

                <div className='bg-accordion flex xmd:gap-[7px] xmd:w-2/6 md:w-2/4 px-2 xmd:h-3/4 justify-between items-center'>
                  <CiClock2 className='xmd:w-[14px] xmd:h-[14px] md:w-6 md:h-6 grid justify-end' />

                  <Paragraph type='globalBold' classname='xmd:text-fz-xxs lg:text-fz-xss md:text-fz-xsm text-inherit  '>1 Min 14 Secs</Paragraph>
                </div>
              </div>

              <Paragraph type='globalBold' classname='text-center md:text-start  '>Watch this 1 Min explanatory video clip</Paragraph>
            </div>

            <div className='md:border-[.1px] md:border-[#333333] md:w-[.1px] border-opacity-60'></div>

            <div>
              <Image src={'/images/hajj.png'} width={100} height={100} alt='img' className='m-auto' />
            </div>
          </div>
        </div>
      </div>

      <>
        {showEmailDialog && existingEmail && (
          <AppDialogBox
            title="Existing Email Found"
            description={`We found an existing email (${existingEmail}). Would you like to continue with this email or use a different one?`}
            confirmText="Use Existing"
            cancelText="Use Different"
            onConfirm={() => setShowEmailDialog(false)}
            onCancel={() => {
              setExistingEmail(null)
              setShowEmailDialog(false)
            }}
          />
        )}

        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: existingEmail || '',
            phone_number: '',
            address: ''
          }}
          validationSchema={onboardingSchema}
          enableReinitialize={true}
          onSubmit={(
            values: Step1InitialValues,
            { setSubmitting }: FormikHelpers<Step1InitialValues>
          ) => {
            if(!values) return

            handleNext()
            console.log(values)
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, values, errors, touched }) => (<Form onSubmit={handleSubmit}>
            <div className={` xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] grid xmd:grid-cols-1 md:grid-cols-2 md:gap-x-20`}>
              <FormContainer label='First Name'>
                <Field name="first_name" component={CustomInputComponent} input_type="text" placeholder="First Name" value={values.first_name} />
                {errors.first_name && touched.first_name ? <FormError message={errors.first_name} className='text-red-700  ' /> : null}
              </FormContainer>

              <FormContainer label='Last Name'>
                <Field name="last_name" component={CustomInputComponent} input_type="text" placeholder="Last Name" value={values.last_name} />
                {errors.last_name && touched.last_name ? <FormError message={errors.last_name} className='text-red-700  ' /> : null}
              </FormContainer>

              <FormContainer label='Email'>
                <Field name="email" component={CustomInputComponent} input_type="email" placeholder="Your Email Address" value={values.email} disabled={!!existingEmail} />
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

            <BtnGlobal type='submit' className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg m-auto'>
              <span className='flex gap-2 items-center'>
                Next <PiGreaterThanLight />
              </span>
            </BtnGlobal>
          </Form>)}
        </Formik>
      </>

    </React.Fragment>
  )
}

export default Step1
