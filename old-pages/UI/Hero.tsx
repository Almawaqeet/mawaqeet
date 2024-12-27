import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import BtnGlobal from './BtnGlobal';
import Link from 'next/link';
import { useAppInfo } from '../hooks/useAppInfo';

interface HeroProps {
  heading: React.ReactNode;
  subheading: React.ReactNode;
  CTA: React.ReactNode;
  subCTA?: React.ReactNode;
  to?: string;
  subto?: string;
  id: string;
  handleOpen?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  CTA,
  subCTA,
  to,
  subto,
  id,
  handleOpen,
}) => {
  const { handleNext } = useAppInfo();
  return (
    <section className="mobile:max-w-[2000px] grid items-center relative home tab_md:min-h-screen xmd:min-h-screen mt-auto">
      <div className="mobile:px-16 xmd:px-8 text-center text-white">
        <div className="flex flex-col xmd:gap-4 md:gap-6 xmd:mb-8 lg:mb-20 md:mb-10 xmd:mt-16 md:mt-0">
          <div>{heading}</div>
          <div>{subheading}</div>
        </div>

        <div className="flex tab_md:flex-row tab_md:gap-12 justify-center items-center xmd:flex-col xmd:gap-6">
          {to ? (
            <Link href={to} passHref>
              <BtnGlobal className="bg-hover-color drop-shadow-black-white rounded-full xmd:px-8 tab_md:px-10 xmd:py-3 text-center font-normal text-Bold-2-clamp leading-4 -tracking-tight transition-all duration-500 ease-in-out hover:bg-number-color hover:text-white hover:border-white xmd:mb-6">
                {CTA}
              </BtnGlobal>
            </Link>
          ) : (
            <BtnGlobal className="bg-hover-color drop-shadow-black-white rounded-full xmd:px-8 tab_md:px-10 xmd:py-3 text-center font-normal text-Bold-2-clamp leading-4 -tracking-tight transition-all duration-500 ease-in-out hover:bg-number-color hover:text-white hover:border-white xmd:mb-6">
              {CTA}
            </BtnGlobal>
          )}

          <div className="flex gap-[5px] items-center justify-center flex-col-reverse">
            {subto ? (
              <Link href={subto} passHref>
                <BtnGlobal
                  className="font-normal text-Bold-2-clamp leading-4 -tracking-tight cursor-pointer m-auto flex items-center flex-row-reverse xmd:px-6 tab_md:px-8 xmd:py-3 md:relative md:bottom-3 gap-1 md:mb-0"
                  icon={
                    <BsArrowRight className="mobile:w-4 mobile:h-8 tab_md:w-5 tab_md:h-5 hover:text-white" />
                  }
                  btnStyle="gap-4 flex"
                  onClick={handleOpen}
                >
                  {subCTA}
                </BtnGlobal>
              </Link>
            ) : (
              <Link href={id}>
                <BtnGlobal
                  className="font-normal text-Bold-2-clamp leading-4 -tracking-tight cursor-pointer m-auto flex items-center flex-row-reverse xmd:px-6 tab_md:px-8 xmd:py-3 md:relative md:bottom-3 gap-1 md:mb-0"
                  icon={
                    <BsArrowRight className="mobile:w-4 mobile:h-8 tab_md:w-5 tab_md:h-5 hover:text-white" />
                  }
                  btnStyle="gap-4 flex"
                  onClick={handleOpen}
                >
                  {subCTA}
                </BtnGlobal>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
