import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import React from "react";

interface AppPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const AppPhoneInput: React.FC<AppPhoneInputProps> = ({
  value,
  onChange,
  label,
  error,
  placeholder,
  disabled = false,
  className = '',
  name,
  id,
  onBlur
}) => {
  const inputStyle = {
    width: '100%',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: error ? '1px solid #EF4444' : '1px solid #D1D5DB',
    transition: 'all 200ms',
    backgroundColor: 'rgb(255 255 255)',
    padding: '0.5rem 3.2rem'
  };

  const buttonStyle = {
    border: error ? '1px solid #EF4444' : '1px solid #D1D5DB',
    borderRight: 'none',
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
    backgroundColor: error ? 'rgb(255 255 255)' : 'transparent'
  };

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${error ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <PhoneInput
          country="us"
          value={value ?? ''}
          onChange={handleChange}
          inputProps={{
            name: name,
            id: id,
            placeholder: placeholder,
            className: `focus:outline-none pl-4 focus:ring-2 focus:ring-brand-color focus:border-transparent h-10 sm:h-12 md:h-14 ${className}`,
            onBlur: onBlur
          }}
          disabled={disabled}
          inputStyle={inputStyle}
          buttonStyle={buttonStyle}
          containerClass="h-10 sm:h-12 md:h-14"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default AppPhoneInput;
