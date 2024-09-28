import classNames from "classnames";
import { StaticImageData } from "next/image";
import Image from "next/image"; // Direct import of Next.js Image
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface BtnGlobalProps {
  children: React.ReactNode;
  className?: string;
  btnStyle?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]; 
  disable?:  ButtonHTMLAttributes<HTMLButtonElement>['disabled']; 
  icon?: ReactNode | StaticImageData;
  onClick?: () => void;
  id?: string;
}

const BtnGlobal: React.FC<BtnGlobalProps> = ({
  children,
  className,
  icon,
  btnStyle,
  onClick,
  disable,
  id,
  type = "button", // Default button type to 'button'
}) => {
  const baseClasses = "h-[48px] rounded-[100px] font-dejavu";
  const buttonClasses = classNames(baseClasses, className);

  return (
    <div>
      <button className={`${buttonClasses} flex items-center`}  id={id} type={type} disabled={disable} onClick={onClick}>
        <span className={`flex items-center ${btnStyle}`}>
          {children}
          {icon && typeof icon === "object" && "src" in icon ? (
            <Image src={icon as StaticImageData} alt="" className="mr-2" />
          ) : (
            <span className="mr-2">{icon}</span>
          )}
        </span>
      </button>
    </div>
  );
};

export default BtnGlobal;
