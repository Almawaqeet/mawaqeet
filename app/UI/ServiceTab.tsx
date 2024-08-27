import React, { useState, useEffect, RefObject } from 'react';

import { IoIosArrowDown } from 'react-icons/io';
import Dropdown from './Dropdown';
import BtnGlobal from './BtnGlobal';
import Paragraph from '../libs/utilities/Paragraph';

// Define the props interface
interface ServiceTabProps {
  handleClickTab: (ref: RefObject<HTMLButtonElement>) => () => void;
  btn1Ref: RefObject<HTMLButtonElement>;
  btn2Ref: RefObject<HTMLButtonElement>;
  btn3Ref: RefObject<HTMLButtonElement>;
  btn4Ref: RefObject<HTMLButtonElement>;
  showPackage: HTMLButtonElement | null; // or use the appropriate type if different
  activeBtnService: HTMLButtonElement | null;
}

const ServiceTab: React.FC<ServiceTabProps> = ({
  handleClickTab,
  btn1Ref,
  btn2Ref,
  btn3Ref,
  btn4Ref,
  showPackage,
  activeBtnService,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="max-w-[2000px] mx-auto mt-2">
      <div className="flex justify-center relative xmd:flex-col-reverse md:flex-row m-auto xmd:gap-2 md:gap-0">
        {isMobile && isActive ? (
          <Dropdown
            className={
              'md:hidden flex flex-col absolute left-1/2 transform -translate-x-1/2 sm:w-8/12 mobile:w-[350px] xmd:w-3/4 top-20 z-10'
            }
          >
            <button
              className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm ${
                activeBtnService
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } ${
                showPackage === btn1Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn1Ref)}
              ref={btn1Ref}
            >
              Hajj Service
            </button>
            <button
              className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm ${
                showPackage === btn2Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn2Ref)}
              ref={btn2Ref}
            >
              Umrah Service
            </button>
            <button
              className={`md:py-[16px] md:px-5 font-bold leading-[50px] drop-shadow-white-ash tracking-[0.32px] md:text-purpose-clamp mobile:text-fz-sm xmd:text-fz-xsm text-heading-clamp xmd:px-2 mobile:px-4 mobile:py-2 rounded-ee-lg rounded-ss-lg ${
                showPackage === btn4Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn4Ref)}
              ref={btn4Ref}
            >
              Saving Scheme
            </button>
            <button
              className={`md:py-[16px] md:px-5 font-bold leading-[50px] drop-shadow-white-ash tracking-[0.32px] md:text-purpose-clamp mobile:text-fz-sm xmd:text-fz-xsm text-heading-clamp xmd:px-2 mobile:px-4 mobile:py-2 rounded-ee-lg rounded-ss-lg ${
                showPackage === btn3Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn3Ref)}
              ref={btn3Ref}
            >
              Complementary Service
            </button>
          </Dropdown>
        ) : (
          <>
            <button
              className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm ${
                activeBtnService
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } ${
                showPackage === btn1Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn1Ref)}
              ref={btn1Ref}
            >
              Hajj Service
            </button>
            <button
              className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm ${
                showPackage === btn2Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn2Ref)}
              ref={btn2Ref}
            >
              Umrah Service
            </button>
            <button
              className={`md:py-[16px] md:px-5 font-bold leading-[50px] drop-shadow-white-ash tracking-[0.32px] md:text-purpose-clamp mobile:text-fz-sm xmd:text-fz-xsm text-heading-clamp xmd:px-2 mobile:px-4 mobile:py-2 rounded-ee-lg rounded-ss-lg ${
                showPackage === btn4Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn4Ref)}
              ref={btn4Ref}
            >
              Saving Scheme
            </button>
            <button
              className={`md:py-[16px] md:px-5 font-bold leading-[50px] drop-shadow-white-ash tracking-[0.32px] md:text-purpose-clamp mobile:text-fz-sm xmd:text-fz-xsm text-heading-clamp xmd:px-2 mobile:px-4 mobile:py-2 rounded-ee-lg rounded-ss-lg ${
                showPackage === btn3Ref.current
                  ? 'bg-hover-color text-white'
                  : 'bg-accordion text-[#333333]'
              } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
              onClick={handleClickTab(btn3Ref)}
              ref={btn3Ref}
            >
              Complementary Service
            </button>
          </>
        )}

        {/* Rest of the component content */}
        <div className="grid m-auto">
          <Dropdown
            className={`flex gap-6 h-16 md:hidden sm:w-8/12 mobile:w-[350px] xmd:w-3/4 justify-center items-center `}
          >
            <Paragraph
              type="global"
              classname="text-fz-xss font-normal leading-5 tracking-tight"
            >
              Select Services
            </Paragraph>

            <BtnGlobal
              className={
                'bg-hover-color drop-shadow-white-ash shadow-sm flex gap-4 px-6 items-center rounded-lg'
              }
              onClick={() => setIsActive(!isActive)}
            >
              <Paragraph
                type="global"
                classname="text-fz-xss font-normal leading-5 tracking-tight text-[#ffffff]"
              >
                Hajj Services
              </Paragraph>
              <IoIosArrowDown className="text-white" />
            </BtnGlobal>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ServiceTab;
