import { inputstyles } from '@/old-pages/utilities/InputStyles';
import React, { ReactNode } from 'react';

type FormInputProps = {
  className?: string;
  icon?: ReactNode;
  label: string;
  children: ReactNode;
};
const FormContainer = (props: FormInputProps) => {
  return (
    <div className={`flex flex-col xmd:gap-3 xmd:pb-6 ${props.className}`}>
      <label htmlFor="email" className={`${inputstyles.labelStyle}`}>
        {props.label}
      </label>
      <span className="relative">
        {props.children}
        <div className="absolute right-5 top-1/3">{props.icon}</div>
      </span>
    </div>
  );
};

export default FormContainer;
