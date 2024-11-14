import React, { ReactNode } from 'react'
import classNames from "classnames";
interface DropdownProps  {
  children: ReactNode,
  className: string
}
const Dropdown: React.FC<DropdownProps>  = ({ children, className }) => {
  const baseClasses = "bg-white rounded-md shadow-lg shadow-white-ash";
  const dropDrownClasses = classNames(baseClasses, className);
  return <div className={dropDrownClasses}>{children}</div>;
};

export default Dropdown;
