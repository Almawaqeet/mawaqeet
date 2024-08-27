import React from 'react'
import { FiFacebook } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';


import { brand } from '../contents/navbar';
import { footerContent, footerText, useful_Links } from '../contents/footer';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';

const Footer: React.FC = () => {
  return (
    <section
      className={`xmd:max-w-[2000px ${whiteSpaces.sectionMargin} bg-[#4B3938] xmd:pt-[30px] xmd:pb-1`}
    >
      <div
        className={`${whiteSpaces.paddingX} xmd:grid grid-cols-1 sm:justify-center md:justify-end m-auto md:grid-cols-[1fr_minmax(100px,_150px)_250px] lg:grid-cols-[1fr_minmax(180px,_250px)_300px]`}
      >
        <div>
          <li className="flex gap-2 mobile:gap-3 tab_md:gap-[4px] items-center xmd:pb-6 ">
            <div>
              <Image
              src={'/images/logo1.png'}
              alt='whitelogo'
              className="mobile:w-[20.31px] mobile:h-[20px] lg:w-10 lg:h-10 tab_md:w-8 tab_md:h-7"
              width={20.31}
              height={20}
               />
            </div>
            {brand.map((itm) => (
              <Headings
                type={'BrandText'}
                key={`itm-${itm.id}`}
                classname="mobile:text-fz-md text-white "
              >
                {itm.brand}
              </Headings>
            ))}
          </li>

          {footerText.map((text) => (
            <p
              key={`foot-${text.id}`}
              className="text-align mobile:text-fz-xsm md:text-fz-sm text-white font-normal xmd:leading-[20.97px] xmd:pb-7 md:pb-0 md:leading-[24.95px] tracking-[0.1px]"
            >
              {text.text}
            </p>
          ))}
        </div>

        <div>
          {footerContent.map((cont) => (
            <p
              key={`${cont.id}-cont`}
              className="text-white xmd:pb-8 md:pb-4 font-normal text-contact-clamp leading-[20.95px] tracking-[0.09px] xmd:text-start md:text-end"
            >
              {cont.content_2}
            </p>
          ))}

          <ul className="flex flex-col xmd:gap-6 md:gap-4 md:text-end xmd:text-start md:justify-center text-contact-clamp">
            {useful_Links.map((link) =>
              link.usefulLinks.map((itm) => (
                <li key={`${itm.id}-itms-`} className="text-white md:text-end">
                  {itm.content}
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          {footerContent.map((itm) => (
            <p
              key={`${itm.id}-cont`}
              className="text-white xmd:pb-8 md:pb-2 font-normal text-contact-clamp leading-[20.95px] tracking-[0.09px] md:text-end xmd:text-start"
            >
              {itm.content_3}
            </p>
          ))}

          <ul className="flex gap-[10px] xmd:justify-start md:justify-end xmd:mb-20  md:relative md:top-6">
            <li>
              <FiFacebook className="text-white" />
            </li>
            <li>
              <BsTwitterX className="text-white" />
            </li>
            <li>
              <IoLogoInstagram className="text-white" />
            </li>
            <li>
              <FaSquareWhatsapp className="text-white" />
            </li>
          </ul>
        </div>
      </div>
      <div className={`${whiteSpaces.paddingX} `}>
        <div>
          <div className="border-[1px] border-white opacity-50 xmd:mb-[26px] md:mb-6 md:mt-16"></div>
        </div>

        <div className="flex xmd:gap-4 items-center justify-center">
          <p className="xmd:text-[30px] text-white">&copy;</p>
          <div className="border-[1px] xmd:h-[30px] border-white"></div>
          <p className="font-normal xmd:text-fz-xss leading-5 tracking-wide text-white">
            All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
