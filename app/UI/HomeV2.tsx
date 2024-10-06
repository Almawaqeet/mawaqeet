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
import Link from 'next/link';


const HomeV2 = () => {
  return (
    <>

      <section className={` xmd:max-w-[2000px] mb-[150px]`}>

        <main
          className={`${whiteSpaces.paddingX} grid xmd:grid-cols-1 md:grid-cols-[1fr_1fr] md:grid-rows-[535px] xmd:gap-4 sm:gap-6 md:gap-8 items-center `}
        >
          <div className="">

            {home.map((home) => (
              <Headings
                type="heading_1"
                classname="xmd:text-left xmd:mb-4"
                key={`heading_1-${home.id}`}
              >
                {home.bold_text_2}
              </Headings>
            ))}

            {home.map((text) => (
              <Paragraph
                type="bodyParagraph"
                key={`paragraph${text.id}`}
                classname="xmd:text-left "
              >
                {text.light_text_3}
              </Paragraph>
            ))}

            {home.map((text) => (
              <Headings
                type="heading_1"
                classname="xmd:text-left xmd:mb-4 xmd:mt-8"
                key={`heading_1-${text.id}`}
              >
                {text.bold_text_3}
              </Headings>
            ))}

            {home.map((text) => (
              <Paragraph
                type={'bodyParagraph'}
                key={`${text.id}-body_`}
                classname="xmd:text-left xmd:mb-4"
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

                Check Package
                <BsArrowRight className="mobile:w-4 mobile:h-8  tab_md:w-8 tab_md:h-8 text-hover-color" />
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


      <section className={`mb-[150px]`}>
        <main
          className={`  relative xmd:min-h-[713px] sm:min-h-[513px] md:min-h-[594px]  xmd:max-w-[375px] mobile:max-w-[700px] m-auto sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[2000px] `}
        >
          <SavingScheme />
        </main>
      </section>


      {/* contact section */}
      <section className={`mb-[150px]`}>
        <Contact />
      </section>

      {/* FAQ section */}
        <Faqs />

      <section
        className={`reach-us reach-us-img-1 reach-us-img bg-no-repeat bg-cover relative  max-w-[2000px] m-auto ${whiteSpaces.paddingY} xmd:pb-8 mb-[150px]`}
      >

        {reach_out_to_us.map((txt) => (
          <Headings
            type={'heroHeading'}
            key={`reach-${txt.id}`}
            classname="xmd:mb-4 text-center text-white font-dejavu "
          >
            {txt.reachout}
          </Headings>
        ))}

        <div
          className={`${whiteSpaces.paddingX} xmd:grid xmd:grid-cols-1 xmd:gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2`}
        >

          <div>
            {quote.map((quote) => (
              <Headings
                type={'BrandText'}
                classname="text-left text-white font-bold"
                key={`quote-${quote.id}`}
              >
                {quote.quote}
              </Headings>
            ))}
          </div>

          <div>
          {reach_out_to_us.map((txt) => (
              <Paragraph
                key={`${txt.id}-text`}
                type={'bodyParagraph'}
                classname="sm:leading-7 mobile:leading-5 text-white text-left font-dejavu xmd:mb-4"
              >
                {txt.dedicated}
              </Paragraph>
            ))}

            {reach_out_to_us.map((txt) => (
              <Paragraph
                key={`${txt.id}-text`}
                type={'bodyParagraph'}
                classname="sm:leading-7 mobile:leading-5 italic text-white font-dejavu"
              >
                {txt.motto}
              </Paragraph>
            ))}
          </div>
        </div>
      </section>
      {/* footer */}
      <section className={``} id='faqs'>
        <Footer />
      </section>
    </>
  );
};

export default HomeV2;
