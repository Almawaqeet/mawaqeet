"use client"
import React from 'react'
import Image from 'next/image'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import Headings from '../libs/utilities/Headings'
import Paragraph from '../libs/utilities/Paragraph'
import FormInput from '../UI/FormInput'
import BtnGlobal from '../UI/BtnGlobal'
import { FaFacebook } from 'react-icons/fa6'
import Footer from '../UI/Footer'
import { IoEyeOutline } from 'react-icons/io5'
import Navbar from '../UI/Navbar'
import { MbisProvider } from '../libs/hooks/useContextProvider'

const SignIn = () => {
  return (
    <MbisProvider>
        <Navbar />
      <section className='max-w-[2000px] m-auto '>
        <main className='sm:grid md:grid-cols-[400px_1fr] lg:grid-cols-[500px_1fr]'>
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
          
          <div className={`${whiteSpaces.sectionMargin} ${whiteSpaces.paddingX} xmd:pt-16 md:pt-4 xl:mt-16 lg:mt-8 `}>
            <Headings
              type='global'
              classname=' text-inherit xmd:pb-10  md:pb-4 xl:pb-8 lg:pb-4 font-bold font-dejavu leading-[18px] tracking-tight text-account-clamp'
            >Sign In</Headings>

            <Paragraph
              type='global'
              classname='text-Bold-1-clamp text-inherit xmd:pb-10  xl:pb-[5.5rem] lg:pb-[2.5rem] md:pb-[1.5rem] tracking-tight font-normal font-dejavu'
            >Sign in with your details</Paragraph>

            <FormInput
              label='Email Address'
              placeholder='Your Email Address'
              name='email'
              type='email'
            />

            <FormInput
              label='Password'
              placeholder='********'
              name='password'
              type='password'
              icon={<IoEyeOutline />
              }
              className='xmd:pb-[63px]'
            />

            <BtnGlobal className='font-dejavu xmd:py-[10px] xmd:px-[78px] md:py-4 md:px-[108px] m-auto text-white text-center rounded-lg bg-[#4B3938]'>Sign In</BtnGlobal>

            <div className='flex justify-center xmd:gap-[50px] xmd:pb-14 xmd:pt-[26px] lg:pt-56px]'>
              <Paragraph type='global' classname='text-team-clamp leading-[18px] tracking-tight font-normal text-[#848484] font-dejavu'>Don’t have an account?</Paragraph>

              <Paragraph type='global' classname='text-team-clamp leading-[18px] tracking-tight font-normal text-[#87592A] font-dejavu'>Sign Up</Paragraph>
            </div>

            <div className=' xmd:pb-[22px] md:pb-[19px]'>
              <BtnGlobal icon={<FaFacebook className="text-white w-[27px] h-[27px] grid m-auto" />} className='bg-[#357AFF] text-fz-xss text-white text-center font-dejavu xmd:w-3/4 grid m-auto rounded-lg' btnStyle='justify-center xmd:gap-8 flex-row-reverse'>Continue with Facebook</BtnGlobal>
            </div>

            <div>
              <BtnGlobal
                icon={<Image src='/images/googlelogo.png' alt='Google Logo' width={20} height={20} className='' />}
                className='border-[0.5px] border-[#EB4335] text-fz-xss text-center font-dejavu text-[#333333] xmd:w-3/4 m-auto rounded-lg justify-center '
                btnStyle='flex-row-reverse xmd:gap-8'>
                Continue with Google
              </BtnGlobal>
            </div>
          </div>
        </main>
        <footer className='mt-24 md:mt-2'>
          <Footer />
        </footer>
      </section>
    </MbisProvider>
  )
}

export default SignIn