import React from 'react';

// Define the props interface
interface SlantDivProps {
  children: React.ReactNode;
  className?: string;
}

// Functional component with props typed
const SlantDiv: React.FC<SlantDivProps> = ({ children, className }) => {
  return (
    <div className={`slantDiv relative ${className || ''}`}>{children}</div>
  );
};

export default SlantDiv;
