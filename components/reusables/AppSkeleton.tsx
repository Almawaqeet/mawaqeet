import React from 'react';

interface AppSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const AppSkeleton: React.FC<AppSkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  borderRadius = '0.375rem',
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      className={`${baseClasses} ${animationClasses[animation]} ${className}`}
      style={style}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AppSkeleton;
