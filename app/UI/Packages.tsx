import React from 'react';
import Bullet from './Bullet';
import BtnGlobal from './BtnGlobal';

interface PackagesProps {
  title_head: string;
  title_intro: string;
  bullets: string[];
  title_conclusion: string;
  className?: string;
  offstyle?: string;
  offheight?: string;
  morestyle?: string;
  hajjupfront?: string
  umrahupfront?: string
  installment?: string
  week?: string;
  pack?: string;
  month?: string;
  hajjamount?: string,
  umrahamount?: string;
  any?: string;
  index: number;
  isSelected: boolean;
  handleClick: (i: number) => void;
}

const Packages: React.FC<PackagesProps> = ({
  title_head,
  title_intro,
  bullets,
  hajjamount,
  umrahamount,
  week,
  month,
  any,
  pack,
  title_conclusion,
  className = '',
  offstyle = '',
  offheight = '',
  morestyle = '',
  hajjupfront='',
  umrahupfront='',
  installment='',
  index,
  isSelected,
  handleClick,
}) => {
  return (
    <div
      className={`bg-[#F8F8F8] drop-shadow-white-ash xmd:rounded-ee-xl xmd:rounded-ss-xl package flex flex-col xmd:gap-4 relative xmd:py-8 xmd:px-4 group hover:bg-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] mobile:h-[900px] sm:h-[850px] md:h-[850px] cursor-pointer lg:min-h-[750px] ${offheight} ${
        index === 1
          ? 'xmd:pb-[6.8rem] '
          : index === 2
          ? 'xmd:pb-[11rem] '
          : index === 0
          ? ''
          : ''
      } ${className}`}
    >
      <div className={`${morestyle} rounded-lg border-2 border-[#D9D9D9] p-4 m-auto bg-white`}>
        <div className='flex justify-between'>
          <input
            className={`xmd:w-[18px] xmd:h-[18px] rounded-full border-[1px] grid justify-start border-[#848484] ${
              isSelected ? 'radiostyle' : ''
            }`}
            type='radio'
            checked={isSelected}
            onClick={() => handleClick(index)}
          />

          <div className={`${installment}`}>
            <h1 className='xmd:pb-11 text-end font-dejavu font-bold'>{pack}</h1>
            <div className='flex flex-col xmd:gap-6 md:gap-8 text-end font-dejavu'>
              <em>{week}</em>
              <em>{month}</em>
              <em>{any}</em>
            </div>
          </div>

          <div className={`${hajjupfront}`}>
            <h1 className='xmd:pb-11 text-end font-dejavu font-bold'>{pack}</h1>
            <div className='flex flex-col xmd:gap-6 md:gap-8 text-end font-dejavu'>
              <em>{hajjamount}</em>
              
            </div>
          </div>

          <div className={`${umrahupfront}`}>
            <h1 className='xmd:pb-11 text-end font-dejavu font-bold'>{pack}</h1>
            <div className='flex flex-col xmd:gap-6 md:gap-8 text-end font-dejavu'>
              <em>{umrahamount}</em>
            </div>
          </div>

        </div>
      </div>

      <h3 className={`text-fz-md text-center group-hover:text-accordion font-dejavu pb-14 ${offstyle}`}>
        {title_head}
      </h3>
      <div className="grid xmd:gap-4 mobile:gap-5">
        <p className={`text-team-clamp group-hover:text-accordion font-dejavu ${offstyle}`}>
          {title_intro}
        </p>
        <ul className="flex flex-col gap-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-2 group-hover:text-accordion font-dejavu">
              <Bullet index={idx} /> {bullet}
            </li>
          ))}
        </ul>
      </div>
      <p className={`text-team-clamp group-hover:text-accordion font-dejavu ${offstyle}`}>
        {title_conclusion}
      </p>
      <div className="grid m-auto">
        <BtnGlobal
          className={`${
            index === 1
              ? 'relative md:top-20 lg:top-20 xmd:top-20 sm:top-16'
              : index === 2
              ? 'md:top-24 lg:top-24 relative xmd:top-36 sm:top-24'
              : index === 0
              ? 'relative md:top-6 lg:top-0'
              : ''
          } rounded-full border-2 border-hover-color bg-white drop-shadow-white-ash shadow-sm hover:bg-number-color hover:border-white px-4 transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] font-dejavu w-[192px] grid m-auto text-center justify-center items-center ${offstyle}`}
        >
          Select Package
        </BtnGlobal>
      </div>
    </div>
  );
};

export default Packages;
