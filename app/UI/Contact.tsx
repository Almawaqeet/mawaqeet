import React from 'react'
import { BsEnvelope } from 'react-icons/bs';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoLocationOutline } from "react-icons/io5";
import { contact } from '../contents/contact';
import BtnGlobal from './BtnGlobal';

import classNames from 'classnames';
import Headings from '../libs/utilities/Headings';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Link from 'next/link';

interface ContactProps {
  bgColor?: string; // Background color
  bgRound?: string; // Background color for icon circles
  textColor?: string; // Text color
  btnColor?: string; // Button color
  lineColor?: string;
  headingColor?: string,
  position?: string
}

const Contact: React.FC<ContactProps> = ({
  bgColor = 'bg-[#87592A]', // Default background color
  bgRound = 'bg-[#F0F0F0]', // Default background color for icon circles
  textColor = 'text-white', // Default text color
  btnColor = 'bg-[#87592A]', // Default button color
  lineColor = 'bg-white',
  headingColor = 'text-white',
  position = 'xmd:relative'
}) => {
  const baseClassNames = 'mobile:max-w-[2000px] m-auto  ';
  const ClassName = classNames(
    baseClassNames,
    bgColor,
    bgRound,
    textColor,
    btnColor,
    lineColor,
    headingColor,
    position,
  );

  return (
    <main className={` ${bgColor} xmd:pb-[48px] sm:pb-[48px] md:pb-[56px] lg:pb-[48px] rounded-[20px] drop-shadow-transparent shadow-lg ${baseClassNames} ${position} xmd:w-11/12`} >
      <div className={` ${whiteSpaces.paddingX} ${whiteSpaces.paddingY}`}>
        {contact.map((heading) => (
          <Headings
            key={`heading-${heading.id}`}
            type={'sectionName'}
            classname={`md:leading-10 xmd:leading-6 xmd:text-center ${headingColor} xmd:mb-6 font-dejavu`}
          >
            {heading.contact_heading}
          </Headings>
        ))}

        <div className="flex xmd:flex-col  md:grid md:flex-col lg:grid-cols-[1fr_minmax(10px,_20px)_1fr] justify-around lg:gap-1">
          <div
            className={`flex xmd:flex-col xmd:gap-28 bg-[rgb(249,249,249)] xmd:p-5 md:p-5 rounded-lg `}
          >
            <div className="flex xmd:gap-1 md:gap-4 justify-between ">
              <div
                className={`${bgRound} rounded-full xmd:w-[55px] xmd:h-[50px] mobile:h-[55px] lg:w-[80px] lg:h-[80px] sm:w-[50px] sm:h-[50px] relative flex items-center md:w-[70px] md:h-[70px]`}
              >
                <BsEnvelope className="text-hover-color absolute left-1/2 transform -translate-x-1/2 xmd:w-[21.33px] xmd:h-[16px] md:w-[42.63px] md:h-[32px] text-start" />
              </div>
              <div className="flex flex-col w-fit xmd:gap-3 overflow-x-hidden">
                <label className="font-semibold xmd:xmd:text-end mobile:text-fz-sm xmd:text-fz-sm leading-8 tracking-[0.81px] text-[#333333] font-dejavu ">
                  Email Address
                </label>
                <BtnGlobal
                  className={`${btnColor} rounded-lg  md:py-[11px] md:px-[15px] flex items-center m-auto`}
                >
                  <h6 className={`font-normal xmd:text-fz-xxs sm:text-fz-sm leading-8 tracking-[0.14px] text-center font-dejavu m-auto ${textColor} `}>
                    almawaqeettravelsandtours@gmail.com
                  </h6>
                </BtnGlobal>
              </div>
            </div>

            <div className="flex justify-between items-center ">
              <div
                className={`${bgRound} rounded-full  xmd:w-[50px] xmd:h-[50px] mobile:w-[55px] mobile:h-[55px] lg:w-[80px] lg:h-[80px] relative flex items-center md:w-[70px] md:h-[70px] xmd:bottom-7 mobile:bottom-0`}
              >
                <IoPhonePortraitOutline className="text-hover-color absolute left-1/2 transform -translate-x-1/2 xmd:w-[21.33px] xmd:h-[16px] md:w-[42.63px] md:h-[32px]" />
              </div>
              <div className="flex flex-col w-fit xmd:gap-3 overflow-x-hidden">
                <label className="font-semibold  xmd:text-end mobile:text-fz-sm xmd:text-fz-sm leading-8 tracking-[0.81px] text-[#333333] font-dejavu">
                  Phone Number
                </label>
                <BtnGlobal
                  className={
                    'rounded-lg outline-number-color border-2 border-hover-color xmd:py-[10px] xmd:px-[37px] md:px-[11px] py-[67px]'
                  }
                >
                  <h6 className="font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center text-hover-color xmd:px-4 border-1 border-hover-color font-dejavu">
                    09115653889
                  </h6>
                </BtnGlobal>
              </div>
            </div>
          </div>

          <div
            className={` border-[0.1px] w-1/4 m-auto md:w-0 md:h-2/3 xmd:hidden md:grid bg-${lineColor} `}
          ></div>

          <div className={`flex flex-row-reverse items-center justify-between bg-[#F9F9F9] mobile:p-10 xmd:px-4 xmd:py-4 md:p-8 lg:p-4 rounded-lg rounded-b-none  xmd:mt-9 md:mt-0`}>

            <div className="flex flex-col xmd:gap-2 md:gap-8 xmd:pb-4 sm:pb-0">
              <div className='flex justify-between'>
                <label className="font-semibold xmd:text-fz-sm leading-8 tracking-[0.81px] text-[#333333] font-dejavu">
                  Office Address
                </label>
                <div
                  className={`${bgRound} rounded-full xmd:w-[50px] xmd:h-[50px] mobile:h-[55px] mobile:w-[55px] lg:w-[80px] lg:h-[80px] sm:w-[50px] sm:h-[50px] relative flex items-center md:w-[70px] md:h-[70px]`}
                >
                  <IoLocationOutline className="text-hover-color absolute left-1/2 transform -translate-x-1/2 xmd:w-[24px] xmd:h-[20px] md:w-[42.63px] md:h-[32px] text-start" />
                </div>
              </div>
              <p className="font-normal xmd:text-fz-xss xmd:leading-6 xmd:tracking-tight mobile:text-fz-xsm md:text-fz-sm md:leading-8 md:tracking-[0.18px] text-justify text-[#333333] font-dejavu ">
                MAKTABAT DAARILHADITH SHOP NO 20/21 KOLEOSO PLAZA, KOLAWOLE AREA, SAKI USTADH YUUSUF MURTADAH AL-MUJAHIDUN
              </p>
              <div>
                <Link href='/contact-us/locate-us'>
                <BtnGlobal className={`bg-white rounded-lg xmd:px-9 xmd:py-3 md:py-[11px] md:px-[35px] grid m-auto items-baseline drop-shadow-transparent shadow-md`}>
                  <h6
                    className={`font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center  text-hover-color font-dejavu`}
                  >
                    Locate Us
                  </h6>
                </BtnGlobal>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
