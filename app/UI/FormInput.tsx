import React, { ReactNode } from 'react'

type FormInputProps = {
    label?: ReactNode,
    name?: string,
    type?: string,
    placeholder?: string,
    className?: string,
    inputStyle?: string
    icon?: ReactNode
    onClick?: () => void
}
const FormInput = (props:FormInputProps) => {
  return (
    <div className={`flex flex-col xmd:gap-3 xmd:pb-6 ${props.className}`}>
      <label className='text-[#848484] leading-[18px] font-normal font-dejavu'>{props.label}</label>
      <span className='relative'>
      <input name={props.name} onClick={props.onClick} type={props.type} placeholder={props.placeholder} className={`w-full border-[0.5px] border-[#A0A8AD] xmd:rounded-lg md:rounded-md lg:rounded-lg xmd:h-12 xl:h-[60px] lg:h-[50px] md:h-8 xmd:placeholder:text-fz-xsm md:placeholder:text-fz-xss placeholder:font-dejavu placeholder:text-[#D9D9D9] placeholder:pl-4 ${props.inputStyle}`} />
      
      <div className='absolute right-5 top-1/3'>{props.icon}</div>
      </span>
    </div>
  )
}

export default FormInput