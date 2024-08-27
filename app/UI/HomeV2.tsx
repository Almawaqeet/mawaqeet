import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';

import { home, quote, reach_out_to_us } from '../contents/home';

import BtnGlobal from './BtnGlobal';
import Contact from './Contact';
import Faqs from './Faqs';
import Footer from './Footer';
import SavingScheme from './SavingScheme';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';


const HomeV2 = () => {
  return (
    <>
      <section className={`${whiteSpaces.paddingY}`}>
        <div className={` xmd:py-12 ${whiteSpaces.paddingX} `}>
          {quote.map((quote) => (
            <Headings
              type={'quoteText'}
              classname="text-justify "
              key={`quote-${quote.id}`}
            >
              {quote.quote}
            </Headings>
          ))}
        </div>
      </section>

      <section className={`${whiteSpaces.paddingY}`}>
        <main
          className={`  relative xmd:min-h-[800px] sm:min-h-[600px] md:min-h-[695px]  xmd:max-w-[375px] mobile:max-w-[700px] m-auto sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[2000px] `}
        >
          <SavingScheme />
        </main>
      </section>

      <section className={` xmd:max-w-[2000px] ${whiteSpaces.paddingY}`}>
        <main className={` ${whiteSpaces.paddingX}`}>
          {home.map((home) => (
            <Headings
              type={'sectionName'}
              key={`${home.id}--head`}
              classname="xmd:text-center xmd:mb-4 md:mb-6"
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
          className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr] grid-flow-row xmd:gap-4 sm:gap-6 md:gap-10 items-center `}
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
              <BtnGlobal
                className={
                  '  font-normal text-Bold-2-clamp leading-4 -tracking-tight cursor-pointer border-2 border-hover-color m-auto flex items-center flex-row-reverse xmd:px-6 py-2 gap-1 xmd:mb-6 md:mb-0 transition-all duration-500 ease-in-out r hover:bg-number-color hover:text-white hover:border-white'
                }
              >
                <BsArrowRight className="mobile:w-4 mobile:h-8  tab_md:w-8 tab_md:h-8 hover:text-white" />
                Check Package
              </BtnGlobal>
            </div>
          </div>

          <div>
            <Image
            src={'/images/spiritual.png'}
            alt='spiritual-img'
            className="rounded-lg drop-shadow-white-ash shadow-sm xmd:w-full object-contain mobile:h-100 sm:h-full sm:w-full "
            width={100}
            height={100}
             />
          </div>
        </main>
      </section>

      {/* contact section */}
      <section className={`${whiteSpaces.paddingY}`}>
        <Contact />
      </section>

      {/* FAQ section */}
      <section className={`${whiteSpaces.paddingY}`}>
        <Faqs />
      </section>

      <section
        className={`reach-us reach-us-img-1 reach-us-img bg-no-repeat bg-cover relative  max-w-[2000px] m-auto`}
      >
        <div
          className={`xmd:py-8 flex flex-col xmd:min-h-[400px] items-center justify-center ${whiteSpaces.paddingX} ${whiteSpaces.paddingY}`}
        >
          {reach_out_to_us.map((txt) => (
            <Headings
              type={'sectionName'}
              key={`reach-${txt.id}`}
              classname="mobile:mb-0 text-center text-white"
            >
              {txt.reachout}
            </Headings>
          ))}

          {reach_out_to_us.map((txt) => (
            <Paragraph
              key={`${txt.id}-text`}
              type={'bodyParagraph'}
              classname="sm:leading-7 mobile:leading-5 xmd:mb-4 mobile:mb-8 text-white text-center"
            >
              {txt.dedicated}
            </Paragraph>
          ))}

          {reach_out_to_us.map((txt) => (
            <Paragraph
              key={`${txt.id}-text`}
              type={'bodyParagraph'}
              classname="sm:leading-7 mobile:leading-5 italic text-white"
            >
              {txt.motto}
            </Paragraph>
          ))}
        </div>
      </section>
      {/* footer */}
      <Footer />
    </>
  );
};

export default HomeV2;
