import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';

import { home, quote, reach_out_to_us } from '../contents/home';

import BtnGlobal from './BtnGlobal';
import Contact from './Contact';
import Faqs from './Faqs';
import Footer from './Footer';
import SavingScheme from './SavingScheme';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import Headings from '../utilities/Headings';
import Paragraph from '../utilities/Paragraph';
import Link from 'next/link';


const HomeV2 = () => {
  return (
    <>
      <section className={` ${whiteSpaces.paddingY}  mt-6`}>
        <main className={`quote-img`}>
          <div className={` xmd:py-12  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] `}>
            {quote.map((quote) => (
              <Headings
                type={'quoteText'}
                classname="text-justify text-white"
                key={`quote-${quote.id}`}
              >
                {quote.quote}
              </Headings>
            ))}
          </div>
        </main>
      </section>

      <section className={``}>
        <main
          className={`  relative xmd:min-h-[680px] sm:min-h-[470px] md:min-h-[520px]  xmd:max-w-[375px] mobile:max-w-[700px] m-auto sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[2000px] `}
        >
          <SavingScheme />
        </main>
      </section>

      <section className={` xmd:max-w-[2000px] ${whiteSpaces.paddingY} mt-6`}>
        <main className={`  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px]`}>
          {home.map((home) => (
            <Headings
              type={'sectionName'}
              key={`${home.id}--head`}
              classname="xmd:text-center xmd:mb-4 md:mb-2  "
            >
              {home.bold_text_2}
            </Headings>
          ))}

          {home.map((text) => (
            <Paragraph
              type={'bodyParagraph'}
              key={`${text.id}--body`}
              classname="text-justify "
            >
              {text.light_text_3}
            </Paragraph>
          ))}
        </main>

        <main
          className={` xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] mt-6 grid xmd:grid-cols-1  ${whiteSpaces.paddingY} md:grid-cols-[1fr_1fr] grid-flow-row xmd:gap-4 sm:gap-6 md:gap-10 items-center `}
        >
          <div className="">
            {home.map((text) => (
              <Headings
                type={'sectionName'}
                key={`${text.id}--head`}
                classname="text-center xmd:mb-7 md:mb-6 md:text-left"
              >
                {text.bold_text_3}
              </Headings>
            ))}

            {home.map((text) => (
              <Paragraph
                type={'bodyParagraph'}
                key={`${text.id}-body_`}
                classname="text-justify xmd:mb-6"
              >
                {text.light_text_4}
              </Paragraph>
            ))}

            <div className="grid justify-start ">
              <Link href={'/about-us#service-section'}> <BtnGlobal
                className={
                  '  font-normal text-Bold-2-clamp leading-4 -tracking-tight cursor-pointer border-2 border-hover-color m-auto flex items-center flex-row-reverse xmd:px-6 py-2 gap-1 xmd:mb-6 md:mb-0 transition-all duration-500 ease-in-out r hover:bg-number-color hover:text-white hover:border-white'
                }
              >
                <BsArrowRight className="mobile:w-4 mobile:h-8  tab_md:w-8 tab_md:h-8 text-hover-color" />
                Check Package
              </BtnGlobal>
              </Link>
            </div>
          </div>

          <div>
            <Image
              src={'/images/image14.png'}
              alt='spiritual-img'
              className="rounded-lg drop-shadow-white-ash shadow-sm  object-contain  "
              width={50}
              height={50}
              layout='responsive'

            />
          </div>
        </main>
      </section>

      {/* contact section */}
      <section className={`${whiteSpaces.paddingY} mt-6`}>
        <Contact />
      </section>

      {/* FAQ section */}
      <section className={`${whiteSpaces.paddingY} mt-6`}>
        <Faqs />
      </section>

      <section
        className={`reach-us reach-us-img-1 reach-us-img bg-no-repeat bg-cover relative  max-w-[2000px] m-auto ${whiteSpaces.paddingY} mt-6`}
      >
        <div
          className={`xmd:py-8 flex flex-col xmd:min-h-[400px] items-center justify-center  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] ${whiteSpaces.paddingY}`}
        >
          {reach_out_to_us.map((txt) => (
            <Headings
              type={'sectionName'}
              key={`reach-${txt.id}`}
              classname="mobile:mb-0 text-center text-white  "
            >
              {txt.reachout}
            </Headings>
          ))}

          {reach_out_to_us.map((txt) => (
            <Paragraph
              key={`${txt.id}-text`}
              type={'bodyParagraph'}
              classname="sm:leading-7 mobile:leading-5 xmd:mb-4 mobile:mb-8 text-white text-center  "
            >
              {txt.dedicated}
            </Paragraph>
          ))}

          {reach_out_to_us.map((txt) => (
            <Paragraph
              key={`${txt.id}-text`}
              type={'bodyParagraph'}
              classname="sm:leading-7 mobile:leading-5 italic text-white  "
            >
              {txt.motto}
            </Paragraph>
          ))}
        </div>
      </section>
      {/* footer */}
      <section className={`${whiteSpaces.paddingY} mt-8`} id='faqs'>
        <Footer />
      </section>
    </>
  );
};

export default HomeV2;
