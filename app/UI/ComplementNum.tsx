import React from 'react';
interface NumItem {
  id: string;
}

const ComplementNum: React.FC<{ position: string }> = ({ position }) => {
  const numArray: NumItem[] = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  const index = numArray.findIndex((item) => item.id === position);

  return (
    <>
      <div className='rounded-full w-[75px] h-[75px] bg-number-color relative flex justify-center items-center'>
        <em className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{index + 1}</em>
      </div>
    </>
  );
};

export default ComplementNum;