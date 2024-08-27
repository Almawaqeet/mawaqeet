import React from 'react'
import { BsEnvelope } from 'react-icons/bs';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { BiChat } from 'react-icons/bi';
import { contact } from '../contents/contact';
import BtnGlobal from './BtnGlobal';

import classNames from 'classnames';
import Headings from '../libs/utilities/Headings';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

interface ContactProps {
  bgColor?: string; // Background color
  bgRound?: string; // Background color for icon circles
  textColor?: string; // Text color
  btnColor?: string; // Button color
  lineColor?: string; // Line color (optional)
}

const Contact: React.FC<ContactProps> = ({
  bgColor = 'bg-[#87592A]', // Default background color
  bgRound = 'bg-[#F0F0F0]', // Default background color for icon circles
  textColor = 'text-white', // Default text color
  btnColor = 'bg-[#87592A]', // Default button color
  lineColor = 'bg-white',
}) => {
  const baseClassNames = 'mobile:max-w-[2000px] m-auto  ';
  const ClassName = classNames(
    baseClassNames,
    bgColor,
    bgRound,
    textColor,
    btnColor,
    lineColor
  );

  return (
    <main className={` ${bgColor} xmd:pb-[48px]  sm:pb-[48px] md:pb-[56px] lg:pb-[48px]`} >
      <div className={` ${whiteSpaces.paddingX} ${whiteSpaces.paddingY}`}>
        {contact.map((heading) => (
          <Headings
            key={`heading-${heading.id}`}
            type={'sectionName'}
            classname={`md:leading-10 xmd:leading-6 xmd:text-center text-white xmd:mb-6`}
          >
            {heading.contact_heading}
          </Headings>
        ))}

        <div className="flex xmd:flex-col xmd:gap-6 md:grid md:grid-cols-[1fr_minmax(0px,_1px)_1fr] lg:grid-cols-[1fr_minmax(10px,_20px)_1fr] justify-around ">
          <div
            className={`flex xmd:flex-col xmd:gap-2 bg-[#F9F9F9] xmd:p-10 md:p-5 rounded-lg `}
          >
            <div className="flex xmd:gap-1 md:gap-4 justify-between ">
              <div
                className={`${bgRound} rounded-full mobile:h-[50px] mobile:w-[50px] xmd:w-[48px] xmd:h-[30px] lg:w-[100px] lg:h-[100px] relative flex items-center md:w-[70px] md:h-[70px]`}
              >
                <BsEnvelope className="text-hover-color absolute left-1/2 transform -translate-x-1/2 xmd:w-[21.33px] xmd:h-[16px] md:w-[42.63px] md:h-[32px] text-start" />
              </div>
              <div className="flex flex-col w-fit xmd:gap-3 ">
                <label className="font-semibold xmd:xmd:text-end mobile:text-fz-sm xmd:text-fz-xss leading-8 tracking-[0.81px] text-[#333333]">
                  Email Address
                </label>
                <BtnGlobal
                  className={`${btnColor} rounded-lg xmd:px-2 sm:px-4 `}
                >
                  <h6 className="font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center ">
                    almawaqeettravelsandtours@gmail.com
                  </h6>
                </BtnGlobal>
              </div>
            </div>

            <div className="flex xmd:gap-0 justify-between items-center">
              <div
                className={`${bgRound}  rounded-fullmobile:h-[50px] mobile:w-[50px] xmd:w-[40px] xmd:h-[30px] lg:w-[100px] lg:h-[100px] relative flex items-center md:w-[70px] md:h-[70px] xmd:bottom-7 mobile:bottom-0`}
                >
                  <IoPhonePortraitOutline className="text-hover-color absolute left-1/2 transform -translate-x-1/2 xmd:w-[21.33px] xmd:h-[16px] md:w-[42.63px] md:h-[32px]" />
                </div>
                <div className="flex flex-col xmd:gap-3">
                  <label className="font-semibold  xmd:text-end mobile:text-fz-sm xmd:text-fz-xss leading-8 tracking-[0.81px] text-[#333333]">
                    Phone Number
                  </label>
                  <BtnGlobal
                    className={
                      'rounded-lg xmd:px-9 sm:px-11 outline-number-color border-2 border-hover-color'
                    }
                  >
                    <h6 className="font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center text-hover-color xmd:px-4 border-1 border-hover-color">
                      09115653889
                    </h6>
                  </BtnGlobal>
                </div>
              </div>
            </div>
  
            <div
              className={` border-[0.1px] w-1/4 m-auto sm:hidden md:w-0 md:h-2/3 md:grid ${lineColor}`}
            ></div>
  
            <div className="flex  xmd:gap-2 flex-row-reverse justify-between bg-[#F9F9F9] mobile:p-10 xmd:px-4 xmd:py-4 md:p-8 rounded-lg rounded-b-none live-chat relative xmd:pb-[16px] mobile:pb-[24px] sm:pb-[32px] md:pb-[40px] lg:pb-[48px]">
              <div
                className={`${bgRound} rounded-full sm:h-[50px] sm:w-[50px] mobile:w-[48px] mobile:h-[48px] xmd:w-[32px] xmd:h-[32px] relative flex justify-between items-center lg:w-[100px] lg:h-[100px] md:w-[70px] md:h-[70px]`}
              >
                <BiChat className="text-hover-color absolute left-1/2 transform -translate-x-1/2 top-1/4 xmd:w-[21.33px] xmd:h-[16px] md:w-[42.63px] md:h-[32px]" />
              </div>
              <div className="flex flex-col xmd:gap-2 xmd:pb-4 sm:pb-0">
                <label className="font-semibold xmd:text-fz-sm leading-8 tracking-[0.81px] text-[#333333]">
                  Live Chat
                </label>
                <p className="font-normal xmd:text-fz-xxs mobile:text-fz-xsm sm:text-fz-xss tracking-[0.16px] text-center text-[#333333]">
                  Message our virtual assistant
                </p>
                <BtnGlobal className={`${btnColor} rounded-lg xmd:px-4 `}>
                  <h6
                    className={`font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center text-white ${textColor}`}
                  >
                    Message Us
                  </h6>
                </BtnGlobal>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default Contact;
  