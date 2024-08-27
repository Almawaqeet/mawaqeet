import React from "react";
import { BsArrowRight } from "react-icons/bs";
import BtnGlobal from "./BtnGlobal";


interface HeroProps {
  heading: React.ReactNode;
  subheading: React.ReactNode;
  CTA: React.ReactNode;
  subCTA: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, CTA, subCTA }) => {
  return (
    <>
      
      <section className="mobile:max-w-[2000px] m-auto grid items-center relative home xmd:min-h-[550px] tab_md:min-h-[572px]">
        <div className="mobile:px-16 xmd:px-8 text-center text-white">
          <div className="flex flex-col xmd:gap-4 md:gap-12 xmd:mb-9 md:mb-20">
            <div>{heading}</div>
            <div>{subheading}</div>
          </div>

          <div className="flex tab_md:flex-row tab_md:gap-12 justify-center items-center xmd:flex-col xmd:gap-2">
            <BtnGlobal className="bg-hover-color drop-shadow-black-white rounded-full xmd:px-8 tab_md:px-10 xmd:py-3 text-center font-normal text-Bold-2-clamp leading-4 -tracking-tight transition-all duration-500 ease-in-out hover:bg-number-color hover:text-white hover:border-white xmd:mb-6">
              {CTA}
            </BtnGlobal>

            <div className="flex gap-[5px] items-center justify-center">
              <BtnGlobal className="font-normal text-Bold-2-clamp leading-4 -tracking-tight cursor-pointer m-auto flex items-center flex-row-reverse xmd:px-6 tab_md:px-8 xmd:py-3 md:relative md:bottom-3 gap-1 xmd:mb-10 md:mb-0">
                <BsArrowRight className="mobile:w-4 mobile:h-8 tab_md:w-5 tab_md:h-5 hover:text-white" />
                {subCTA}
              </BtnGlobal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
