import React from 'react';

interface BulletProps {
  className?: string;
  index?: number;
}

const Bullet: React.FC<BulletProps> = ({ className, index }) => {
  return (
    <>
      <div
        className={`bg-[#A88A69] sm:w-[12px] xmd:w-[18px] xmd:h-[10px] sm:h-[8px] rounded-full mt-2 md:w-[16px] md:h-[8px] ${className} ${
          index === 0
            ? 'xmd:w-[12px] xmd:h-[7px] mobile:w-[8px] sm:w-[8px] sm:h-[7px]'
            : index === 1
            ? 'xmd:w-[12px] xmd:h-[8px] sm:w-[8px] sm:h-[7px] mobile:w-[8px]'
            : 'xmd:w-[12px] xmd:h-[8px] sm:w-[8px] sm:h-[7px] mobile:w-[8px]'
        }`}
      ></div>
    </>
  );
};

export default Bullet;
