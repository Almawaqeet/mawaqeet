import classNames from "classnames";
import { StaticImageData } from "next/image";
import Image from "next/image"; // Image should not be destructured, directly import
import React, { ReactNode } from "react";

interface BtnGlobalProps {
  children: React.ReactNode;
  className?: string;
  btnStyle?: string;
  icon?: ReactNode | StaticImageData;
  onClick?: () => void;
  id?: string
}

const BtnGlobal: React.FC<BtnGlobalProps> = ({ children, className, icon, btnStyle, onClick, id }) => {
  const baseClasses = "h-[48px] rounded-[100px] font-dejavu";
  const buttonClasses = classNames(baseClasses, className);

  return (
    <div>
      <button className={`${buttonClasses} flex items-center`} onClick={onClick} id={id}>
        <span className={`flex items-center ${btnStyle}`}>
        {children}
          {icon && typeof icon === "object" && "src" in icon ? (
            <Image src={icon} alt="" className="mr-2" />
          ) : (
            <span className="mr-2">{icon}</span>
          )}
          
        </span>
      </button>
    </div>
  );
};

export default BtnGlobal;
