"use client"
import React from 'react'
import { FormikHelpers } from 'formik';

import Image from 'next/image'
import { whiteSpaces } from '../../OldPage/utilities/GlobalSpaces'
import Headings from '../../OldPage/utilities/Headings'
import Paragraph from '../../OldPage/utilities/Paragraph'
import BtnGlobal from '../../OldPage/UI/BtnGlobal'
import { FaFacebook } from 'react-icons/fa6'
import Footer from '../../Components/Reusables/Ui/Footer'
import { IoEyeOutline } from 'react-icons/io5'
import Navbar from '../../Components/Reusables/Ui/Navbar'
import { MbisProvider } from '../../OldPage/hooks/useContextProvider'
import { useValidate } from '../../OldPage/hooks/useValidate'
import FormContainer from '../../OldPage/UI/formComponents/FormContainer';
import CustomInputComponent from '../../OldPage/UI/formComponents/CustomInputComponent';

interface IntialInputValues {
  email: string
  password: string
}

const SignIn = () => {
  const { Field, ErrorMessage, Form, Formik } = useValidate()
  return (
    <MbisProvider>
      <Navbar />
      <section className='max-w-[2000px] m-auto '>
        <main className='sm:grid md:grid-cols-[400px_1fr] lg:grid-cols-[500px_1fr] '>
          <div className='relative'>
            <Image
              src={'/images/regImg.png'}
              alt='reg-img'
              height={100}
              width={100}
              layout='responsive'
              className='md:block xmd:hidden object-contain min-h-dvh min-w-full'
            />
            <Image
              src={'/logo.png'}
              alt='reg-img'
              height={80}
              width={80}

              className='md:block xmd:hidden object-contain absolute lg:bottom-5 right-5 md:bottom-16 opacity-50'
            />
          </div>

          <div className={`${whiteSpaces.sectionMargin}  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:pt-16 md:pt-4 xl:mt-16 lg:mt-8 `}>
            <Headings
              type='global'
              classname=' text-inherit xmd:pb-10  md:pb-4 xl:pb-8 lg:pb-4 font-bold   leading-[18px] tracking-tight text-account-clamp'
            >Sign In</Headings>

            <Paragraph
              type='global'
              classname='text-Bold-1-clamp text-inherit xmd:pb-10  xl:pb-[5.5rem] lg:pb-[2.5rem] md:pb-[1.5rem] tracking-tight font-normal  '
            >Sign in with your details</Paragraph>


            <Formik
              initialValues={{
                password: '',
                email: '',
              }}
              onSubmit={(
                values: IntialInputValues,
                { setSubmitting }: FormikHelpers<IntialInputValues>
              ) => {
                console.log(values);
                setSubmitting(false);
              }}
            >
              {({ handleBlur, handleChange, handleSubmit, values }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <FormContainer label='Email'>
                      <Field name="email" component={CustomInputComponent} input_type="email" placeholder="Your Email Address" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    </FormContainer>

                    <FormContainer label='Password' icon={<IoEyeOutline />}>
                      <Field name="password" component={CustomInputComponent} input_type="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    </FormContainer>

                    <BtnGlobal className='  xmd:py-[10px] xmd:px-[78px] md:py-4 md:px-[108px] m-auto text-white text-center rounded-lg bg-[#4B3938]' type='submit'>Sign Up</BtnGlobal>

                    <div className='flex justify-center xmd:gap-[50px] xmd:pb-14 md:pb-7 lg:pb-[106px] xmd:pt-[26px] lg:pt-[75px]'>
                      <Paragraph type='global' classname='text-team-clamp leading-[18px] tracking-tight font-normal text-[#848484]  '>Already have an account?</Paragraph>

                      <Paragraph type='global' classname='text-team-clamp leading-[18px] tracking-tight font-normal text-[#87592A]  '>Sign In</Paragraph>
                    </div>

                    <div className=' xmd:pb-[22px] md:pb-[19px]'>
                      <BtnGlobal icon={<FaFacebook className="text-white w-[27px] h-[27px] grid m-auto" />} className='bg-[#357AFF] text-fz-xss text-white text-center   xmd:w-3/4 grid m-auto rounded-lg' btnStyle='justify-center xmd:gap-8 flex-row-reverse'>Continue with Facebook</BtnGlobal>
                    </div>

                    <div>
                      <BtnGlobal
                        icon={<Image src='/images/googlelogo.png' alt='Google Logo' width={20} height={20} />}
                        className='border-[0.5px] border-[#EB4335] text-fz-xss text-center   text-[#333333] xmd:w-3/4 m-auto rounded-lg justify-center '
                        btnStyle='flex-row-reverse xmd:gap-8'>
                        Continue with Google
                      </BtnGlobal>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </main>
        <footer className='mt-24 md:mt-2'>
          <Footer />
        </footer>
      </section >
    </MbisProvider >
  )
}

export default SignIn
