import React from 'react';
interface NumItem {
  id: number;
}

type ComponentProps = {
  className?: string;
  position?: number;
};

const ComplementNum: React.FC<ComponentProps> = ({ position, className }) => {
  const numArray: NumItem[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];

  const index = numArray.findIndex((item) => item.id === position);

  return (
    <>
      <div
        className={`rounded-full lg:w-[75px] lg:h-[75px] bg-number-color relative flex justify-center items-center xmd:h-8 xmd:w-8 ${className}`}
      >
        <h6 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {index + 1}
        </h6>
      </div>
    </>
  );
};

export default ComplementNum;
