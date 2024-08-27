import React from 'react'
import Image from 'next/image';

import { home, why_hajj_umrah } from '../contents/home';

import Hero from './Hero';
import Navbar from './Navbar';

import Purpose from './Purpose';
import Headings from '../libs/utilities/Headings';

import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const HomeV1 = () => {
  // find content in home.js
  const purposeHeading = why_hajj_umrah.find(
    (content) => content.id === 'why_heading'
  );

  const purposeBody = why_hajj_umrah.find(
    (content) => content.id === 'why_body'
  );

  const purposeIcon = why_hajj_umrah.find(
    (content) => content.id === 'why_image'
  );

  return (
    <>
      <Navbar />
      <Hero
        heading={home.map((text) => (
          <Headings type={'heroHeading'} key={`heroText${text.id}`}>
            {text.heading}
          </Headings>
        ))}
        subheading={home.map((subText) => (
          <Headings type={'heading_1'} key={`subText${subText.id}`}>
            {subText.sub_heading}
          </Headings>
        ))}
        CTA="Get Package Price"
        subCTA="Learn More"
      />
      <section
        className={` xmd:max-w-[375px] mobile:max-w-[700px] m-auto md:max-w-[1500px] lg:max-w-[2000px] ${whiteSpaces.paddingY}`}
      >
        <main className={`${whiteSpaces.paddingX}`}>
          <div className="md:grid md:grid-cols-[200px_1fr] lg:grid-cols-[400px_1fr] md:grid-flow-row lg:grid-flow-row gap-5">
            <div className="md:grid mobile:hidden xmd:hidden grid-cols-2 lg:grid-rows-[320px_320px] md:grid-rows-[300px_300px] md:gap-x-2 lg:gap-x-0">
              <Image
              src={'/images/stack_img_1.png'}
              alt='stack1'
              className="object-cover md:w-32 lg:w-48 md:h-[300px] lg:h-[320px] relative bottom-2" 
              width={32}
              height={300}
              />
              <Image
              src={'/assets/stack_img_2.png'}
              alt='stack1'
              className="object-cover md:w-32 lg:w-48 md:h-[300px] lg:h-[320px] "
              width={32}
              height={300} 
              />
              <Image
              src={'/assets/stack_img_3.png'}
              alt='stack1'
              className="object-cover md:w-32 lg:w-48 md:h-[300px] lg:h-[320px] " 
              width={32}
              height={300}
              />
             <Image
              src={'/assets/stack_img_4.png'}
              alt='stack1'
              className="object-cover md:w-32 lg:w-48 md:h-[300px] lg:h-[320px] relative top-2" 
              width={32}
              height={300}
              />
            </div>

            <div className="md:visible">
              <div className="flex flex-col">
                {home.map((text) => (
                  <Headings
                    type={'heading_1'}
                    classname="xmd:text-justify mb-[0.5px]"
                    key={`heading_1-${text.id}`}
                  >
                    {text.bold_text}
                  </Headings>
                ))}

                <div>
                  {home.map((text) => (
                    <Paragraph
                      type={'bodyParagraph'}
                      key={`pragraph${text.id}`}
                      classname="xmd:text-justify"
                    >
                      {text.light_text}
                    </Paragraph>
                  ))}
                </div>

                <div className="grid gap-y-[1px]">
                  {home.map((text) => (
                    <Headings
                      type={'heading_2'}
                      key={`bold_2--${text.id}`}
                      classname="mb-1 text-justify"
                    >
                      {text.bold_text_1}
                    </Headings>
                  ))}
                </div>
              </div>
              <div className="xmd:grid xmd:gap-2 mobile:gap-6 mobile:grid-cols-[1fr_1fr] mobile:grid-rows-[1fr_1fr] xmd:grid-cols-[1fr] ">
                {purposeHeading?.reasons.map((text, index) => (
                  <Purpose
                    iconImage={purposeIcon?.reasons[index].content}
                    className={`${
                      index === 0
                        ? 'xmd:w-[40px] xmd:h-[37.38px] md:w-[59px] md:h-[54.09px] lg:w-[75px] lg:h-[70.09px]'
                        : index === 1
                        ? 'xmd:w-[40px] xmd:h-[37.21px] md:w-[59px] md:h-[52.78px] lg:w-[75px] lg:h-[69.78px]'
                        : index === 2
                        ? 'xmd:w-4 xmd:h--w-48.01px] md:w-[16px] md:h-[55.2px] lg:w-[30px] lg:h-[63.2px]'
                        : index === 3
                        ? 'xmd:w-[38.96px] xmd:h-[39.47px] md:w-[55px] md:h-[55px] lg:w-[75px] lg:h-[75px]'
                        : ''
                    }`}
                    heading={
                      <Headings type={'heading_2'}>{text.content}</Headings>
                    }
                    subheading={purposeBody?.reasons[index].content} // Access body content directly
                    key={`purpose-${text.id}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`${whiteSpaces.paddingY}`}>
            {home.map((text) => (
              <Paragraph type={'bodyParagraph'} key={`bodypragraph${text.id}`}>
                {text.light_text_2}
              </Paragraph>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default HomeV1;
