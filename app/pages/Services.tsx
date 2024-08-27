"use client"
import React from 'react';
import SlantDiv from '../UI/SlantDiv';

import ServiceTab from '../UI/ServiceTab';

import UmrahPackage from '../UI/UmrahPackage';
import HajjPackage from '../UI/HajjPackage';
import SavingScheme from '../UI/SavingScheme';
import Complementary from '../UI/Complementary';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';
import { useTab } from '../libs/hooks/useTab';


const Services: React.FC = () => {
  
  // Extract context values and ensure types are handled properly
  const { btn1Ref, btn2Ref, btn3Ref, btn4Ref, handleButtonClick, activeBtnServiceId, showPackage } = useTab();

  return (
    <section className="relative">
      <main className="xmd:max-w-[375px] mobile:max-w-[700px] m-auto sm:max-w-[900px] md:max-w-[1200px] lg:max-w-[2000px] mb-4">
        <div className={`${whiteSpaces.paddingX} ${whiteSpaces.sectionMargin}`}>
          <SlantDiv className="xmd:before:w-[60px]">
            <Headings type="sectionName" classname="text-center">
              Our Services
            </Headings>
          </SlantDiv>

          <div className={whiteSpaces.paddingY}>
            <ServiceTab
              handleClickTab={handleButtonClick}
              btn1Ref={btn1Ref}
              btn2Ref={btn2Ref}
              btn3Ref={btn3Ref}
              btn4Ref={btn4Ref}
              activeBtnService={activeBtnServiceId}
              showPackage={showPackage}
            />
          </div>
        </div>

        <div className="xmd:pt-10 mobile:pt-[52px] md:pt-[108px] lg:pt-[140px]">
          {showPackage === btn1Ref.current ? (
            <div className={whiteSpaces.paddingX}>
              <HajjPackage />
            </div>
          ) : showPackage === btn2Ref.current ? (
            <div className={whiteSpaces.paddingX}>
              <UmrahPackage />
            </div>
          ) : showPackage === btn3Ref.current ? (
            <div className={whiteSpaces.paddingX}>
              <Complementary />
            </div>
          ) : showPackage === btn4Ref.current ? (
            <SavingScheme />
          ) : (
            <div className={whiteSpaces.paddingX}>
              <HajjPackage />
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Services;
