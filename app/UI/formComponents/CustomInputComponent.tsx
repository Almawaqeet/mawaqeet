import { inputstyles } from '@/app/libs/utilities/InputStyles';
import React, { InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';

type InputProps = {
  inputstyle?: string;
  input_type: string;
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
};

const CustomInputComponent: React.FC<InputProps & FieldProps> = ({
  field,
  inputstyle,
  input_type,
  placeholder
}) => {
  return (
    <input
      {...field} 
      className={`${inputstyles.styledInput} ${inputstyle}`}
      type={input_type}
      placeholder={placeholder}
    />
  );
};

export default CustomInputComponent;
 