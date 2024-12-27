import React, { ReactNode } from 'react';

interface SectionDivProps {
  children: ReactNode;
  className?: string;
}

const SectionDiv: React.FC<SectionDivProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`sectionDiv relative text-center   ${className}`}>
      {children}
    </div>
  );
};

export default SectionDiv;
