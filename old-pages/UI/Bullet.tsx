import React from 'react';

interface BulletProps {
  className?: string;
  index?: number;
}

const Bullet: React.FC<BulletProps> = ({ className }) => {
  return (
    <>
      <div
        className={`bg-brand-color sm:w-[12px] xmd:w-[18px] xmd:h-[10px] sm:h-[8px] rounded-full mt-2 md:w-[16px] md:h-[8px] z-40 ${className}`}
      ></div>
    </>
  );
};

export default Bullet;
