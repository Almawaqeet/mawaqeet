import React from 'react'
import Image from 'next/image'
import AppButton from '@/Components/Ui/AppButton'
import { IoMdArrowRoundForward } from "react-icons/io"
import AppHeading from '@/Components/Ui/AppHeading'
import { PiBookOpenThin } from "react-icons/pi"
import { brandColors } from '@/Constants/BrandConstants'

export const HeroSection = () => {
  return (
    <section className="w-full max-w-[6000px] m-auto px-[150px] py-[120px] flex items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-[800px] w-full">
        <div className="flex items-center gap-4 mb-8 rounded-md p-2">
            <div className='flex items-center gap-2  bg-white rounded-full px-4 py-2'>
                <PiBookOpenThin className="w-5 h-5" />
                <span className="text-sm text-gray-600 font-medium">Q3/45</span>
            </div>
          <span className="text-sm text-gray-600">And complete the Hajj and 'Umrah for Allah. But...</span>
        </div>

        <AppHeading
          variant="h1"
          align="center"
          className="w-full mb-6"
        >
          We offer flexible payment plans for Hajj and Umrah tours, with great support at every step of your pilgrimage.
        </AppHeading>

        <p className="text-lg text-gray-700 mb-12 max-w-[700px]">
          Start your holy journey with us today. We make it easy - pay all at once or in smaller payments. Our team will help you every step of the way, from planning to completing your pilgrimage.
        </p>

        <div className="flex gap-6 mb-8">
          <AppButton
            className="font-bold text-base"
            icon={<IoMdArrowRoundForward className="w-6 h-5" />}
            onClick={() => {}}
          >
            Get Started
          </AppButton>

          <button className="px-8 py-3 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 font-medium">
            Learn more
          </button>
        </div>

        <p className="text-sm text-gray-500 font-medium">✓ Varied payments accepted</p>
      </div>
    </section>
  )
}
