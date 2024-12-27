import React from 'react';
import Image from 'next/image';

import { hajj_and_umrah_saving_scheme } from '../contents/services';

import BtnGlobal from './BtnGlobal';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import Headings from '../utilities/Headings';
import Paragraph from '../utilities/Paragraph';

const SavingScheme: React.FC = () => {
  return (
    <section
      className={`bg-scheme -z-10 xmd:min-h-[600px]  savingscheme relative lg:min-h-[650px] sm:min-h-[400px] grid items-baseline md:min-h-[400px] gap-8 md:gap-10 w-full mt-20 max-w-[2000px] m-auto`}
    >
      <div
        className={`sm: xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:gap-8 lg:gap-8 xl:gap-20 sm:gap-4 xmd:grid-cols-1 xmd:grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr] justify-between sm:mt-10 lg:mt-16`}
      >
        <div className="grid gap-8 md:gap-1 ">
          <div className="xmd:grid h-fit md:gap-[1px] xmd:mt-8 sm:mt-0 ">
            {hajj_and_umrah_saving_scheme.map((scheme) => (
              <Headings
                type="schemeText"
                key={`${scheme.id}-savins`}
                classname={
                  'opacity-100  sm:text-[24px]  sm:text-left md:leading-[30px] sm:mb-1 lg:leading-8'
                }
              >
                {scheme.scheme_heading}
              </Headings>
            ))}

            {hajj_and_umrah_saving_scheme.map((subText, i) => (
              <p
                key={`${i}list`}
                className={`text-Bold-2-clamp   sm:text-left xmd:text-center text-white    ${
                  i === 1 ? 'list-disc sm:list-none  sm:ml-0' : 'list-none'
                }`}
              >
                {subText.scheme_sub_heading}
              </p>
            ))}
          </div>

          <div>
            <BtnGlobal
              className={
                'xmd:py-4 xmd:px-10 bg-white hover:text-white cursor-pointer z-10 grid sm:justify-self-start xmd:m-auto sm:ml-0'
              }
            >
              <Paragraph
                type={'bodyBold'}
                classname="font-normal xmd:leading-[16.3px] xmd:tracking-[0.07px] align-middle text-center leading-[20.95px] md:tracking-[0.2px] text-inherit "
              >
                Get Started
              </Paragraph>
            </BtnGlobal>
          </div>
        </div>

        <div
          className={` xmd:grid xmd:grid-cols-1 relative    xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px]`}
        >
          <div className="bg-number-color opacity-85  min-h-56 md:min-h-[17rem] mobile:w-full sm:w-[269px] md:w-[350px] tab_md:w-[360px] lg:w-[450px] relative  sm:left-1/2 transform sm:-translate-x-1/2 tablg:w-[400px] tabxl:w-[435px] xl:w-[550px]"></div>
          <Image
            src={'/images/scheme.png'}
            alt="scheme"
            className="drop-shadow-black-white rounded-lg absolute xmd:h-[270px] sm:w-5/6 lg:w-5/6 xl:w-5/6 xmd:w-full md:w-[639px] xmd:left-1/2 xmd:transform sm:h-[270px] -translate-x-1/2 xmd:px-7 xmd:-bottom-7 md:h-[320px]  sm:px-0"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div
        className={` xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:absolute xmd:-bottom-20 sm:bottom-30 md:-bottom-32 lg:bottom-0 lg:relative`}
      >
        <div
          className={`bg-white drop-shadow-trans-white rounded-lg  xmd:px-5 xmd:py-6 relative shadow-xl`}
        >
          {hajj_and_umrah_saving_scheme.map((title, i) => (
            <li
              key={`fulfil-${title.id}`}
              className={`${
                i === 2 ? 'list-disc' : 'list-none'
              } xmd:text-fz-xs md:text-fz-md xmd:mb-5 font-bold xmd:leading-5 xmd:tracking-[0.07px] italic`}
            >
              {title.scheme_card_subHeading}
            </li>
          ))}

          {hajj_and_umrah_saving_scheme.map((bdy) => (
            <p
              key={`body-${bdy.id}`}
              className="text-Bold-2-clamp xmd:leading-5 md:leading-8 md:tracking-[0.24px] xmd:tracking-[0.12px] text-justify  "
            >
              {bdy.scheme_card_body}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavingScheme;
