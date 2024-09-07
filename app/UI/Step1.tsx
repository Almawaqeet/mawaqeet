import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import FormInput from '../UI/FormInput'
import React from 'react'
import Footer from './Footer'

const Step1: React.FC = () => {
  return (
    <React.Fragment>
      <div className={`${whiteSpaces.paddingX}`}>

        <FormInput
          label='First Name'
          name='first-name'
          placeholder='First Name'
          type='text'
          className='w-full'
        />

        <FormInput
          label='Last Name'
          name='last-name'
          placeholder='Last Name'
          type='text'
        />

        <FormInput
          label='Middle Name (Optional)'
          placeholder='Your Middle Name'
          name='middle name'
          type='text'
        />

        <FormInput
          label='Address'
          placeholder='Your residential address'
          name='address'
          type='text'
        />

        <FormInput
          label='Phone Number'
          placeholder='Enter your digit'
          name='phone number'
          type='number'
          className='xmd:pb-14 md:pb-8 lg:pb-16'
        />
      </div>

      
    </React.Fragment>
  )
}

export default Step1