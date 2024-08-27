import classNames from "classnames";
import React from "react";

interface BtnGlobalProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BtnGlobal: React.FC<BtnGlobalProps> = ({ children, className, onClick }) => {
  const baseClasses = "h-[48px] rounded-[100px] font-dejavu";

  const buttonClasses = classNames(baseClasses, className);

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default BtnGlobal;