'use client';
import React, { useState, useEffect, RefObject } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Dropdown from './Dropdown';
import BtnGlobal from './BtnGlobal';
import Paragraph from '../utilities/Paragraph';
import { useTab } from '../hooks/useTab';

import HajjPackage from './HajjPackage';
import UmrahPackage from './UmrahPackage';
import Complementary from './Complementary';
import SavingScheme from './SavingScheme';

const ServiceTab: React.FC = () => {
  const {
    btn1Ref,
    btn2Ref,
    btn3Ref,
    btn4Ref,
    showPackage,
    activeBtnServiceId,
    dispatch,
    handleButtonClick,
  } = useTab();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTabDisplay, setTabDisplay] =
    useState<RefObject<HTMLButtonElement> | null>(null);
  let isMobile = 768;

  useEffect(() => {
    dispatch({ type: 'setactiveBtnService', payload: btn1Ref });
  }, []);

  const renderButton = (
    ref: React.RefObject<HTMLButtonElement>,
    label: string
  ) => (
    <button
      className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:py-2 xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm   ${
        activeBtnServiceId?.current === ref.current
          ? 'bg-hover-color text-white'
          : 'bg-accordion text-[#333333]'
      } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
      onClick={() => {
        handleButtonClick(ref)();
        setIsActive(false);
        setTabDisplay(ref);
      }}
      ref={ref}
    >
      {label}
    </button>
  );

  return (
    <>
      <section className="xmd:max-w-[2000px] mx-auto mt-2">
        <div className="flex justify-center relative xmd:flex-col-reverse md:flex-row m-auto xmd:gap-2 md:gap-0 ">
          {isActive && isMobile ? (
            <Dropdown className="md:hidden w-3/4 flex flex-col m-auto absolute top-20 left-1/2 transform -translate-x-1/2 z-20 mobile:py-0">
              {renderButton(btn1Ref, 'Hajj Service')}
              {renderButton(btn2Ref, 'Umrah Service')}
              {renderButton(btn4Ref, 'Saving Scheme')}
              {renderButton(btn3Ref, 'Complementary Service')}
            </Dropdown>
          ) : (
            <div className="xmd:hidden md:flex">
              {renderButton(btn1Ref, 'Hajj Service')}
              {renderButton(btn2Ref, 'Umrah Service')}
              {renderButton(btn4Ref, 'Saving Scheme')}
              {renderButton(btn3Ref, 'Complementary Service')}
            </div>
          )}

          {/* Mobile */}
          <div className="flex justify-center xmd:h-16 md:hidden">
            <Dropdown className="flex xmd:w-3/4 justify-between items-center xmd:gap-4 xmd:px-5 xmd:py-3">
              <Paragraph
                type="global"
                classname="text-fz-xss font-normal leading-5 tracking-tight  "
              >
                Select Services
              </Paragraph>

              <BtnGlobal
                className="bg-hover-color drop-shadow-white-ash shadow-sm flex gap-4 px-6 items-center rounded-lg"
                onClick={() => setIsActive(!isActive)}
              >
                <Paragraph
                  type="global"
                  classname="text-fz-xss font-normal leading-5 tracking-tight text-[#ffffff]  "
                >
                  {isTabDisplay === btn1Ref
                    ? 'Hajj Services'
                    : isTabDisplay === btn2Ref
                      ? 'Umrah Services'
                      : isTabDisplay === btn3Ref
                        ? 'Complementary Service'
                        : isTabDisplay === btn4Ref
                          ? 'Saving Scheme'
                          : 'Hajj Services'}
                </Paragraph>
                {isActive ? (
                  <IoIosArrowUp className="text-white" />
                ) : (
                  <IoIosArrowDown className="text-white" />
                )}
              </BtnGlobal>
            </Dropdown>
          </div>
        </div>
        {showPackage === btn1Ref && activeBtnServiceId === btn1Ref ? (
          <HajjPackage />
        ) : showPackage === btn2Ref && activeBtnServiceId === btn2Ref ? (
          <UmrahPackage />
        ) : showPackage === btn3Ref && activeBtnServiceId === btn3Ref ? (
          <Complementary />
        ) : showPackage === btn4Ref && activeBtnServiceId === btn4Ref ? (
          <div className="xmd:pb-32 md:pb-0">
            <SavingScheme />
          </div>
        ) : (
          <HajjPackage />
        )}
      </section>
    </>
  );
};

export default ServiceTab;
