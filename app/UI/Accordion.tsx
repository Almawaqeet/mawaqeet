import React, { ReactElement, ReactNode } from 'react';

interface AccordionProps {
  questions?: ReactNode | string[];
  // questionsArray: [], 
  answers: ReactNode;
  icon: ReactNode;
  handleFaqClick: (index: number) => void;
}

const Accordion = ({
  questions,
  answers,
  icon,
  handleFaqClick,
}: AccordionProps) => {
  return (
    <div className="flex flex-col gap-4 ">


      <div className="flex justify-between flex-row-reverse bg-accordion xmd:py-4 xmd:px-4 md:px-6 items-center  rounded-[8px] xmd:gap-4 md:gap-0">
        <div onClick={() => handleFaqClick} className='md:w-[50px] md:h-[50px] xmd:w-8 xmd:h-8 rounded-full bg-[#87592A] opacity-60 relative'>{icon}</div>
        <div className="font-dejavu" onClick={() => handleFaqClick} >{questions}</div>
      </div>
      
      {/* Check if answers is an array before accessing an index */}
      <div className="mobile:text-fz-xsm sm:text-fz-sm xmd:mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12  xmd:text-fz-xsm xmd:leading-5 sm:leading-8 xmd:tracking-[0.12px] text-justify font-dejavu">{answers}</div>
    </div>


  );
};

export default Accordion;
