import FormInput from './formComponents/FormContainer'
import React from 'react'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import Paragraph from '../libs/utilities/Paragraph'

const Step3: React.FC = () => {
  return (
    <React.Fragment>
        <Paragraph
          type='globalBold'
          classname={`text-Bold-1-clamp font-bold tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu xmd:text-start ${whiteSpaces.paddingX}`}
        >
          Select Package
        </Paragraph>

      <div className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 md:grid-cols-2 md:gap-x-20`}>
        <FormInput
          label='Next of Kin Name'
          name='Full Name'
          placeholder='Full Name'
          type='text'
          className='w-full'
        />

        <FormInput
          label='Email Address'
          name='Email Address'
          placeholder='Email Address'
          type='text'
        />

        <FormInput
          label='Home Address'
          placeholder='Next of Kin Address'
          name='Next of Kin Address'
          type='text'
        />

        <FormInput
          label='Contact Number'
          placeholder='Enter your digit'
          name='digit'
          type='text'
        />
      </div>
    </React.Fragment>
  )
}

export default Step3