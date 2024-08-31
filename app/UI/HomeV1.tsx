import React from 'react'
import Image, { StaticImageData } from 'next/image';

import { home, why_hajj_umrah } from '../contents/home';

import Hero from './Hero';


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
        className={` xmd:max-w-[375px] mobile:max-w-[700px] m-auto md:max-w-[1500px] lg:max-w-[2000px] ${whiteSpaces.paddingY} mt-6`}
      >
        <main className={`${whiteSpaces.paddingX}`}>
          <div className="md:grid md:grid-cols-[200px_1fr] lg:grid-cols-[400px_1fr] md:grid-flow-row lg:grid-flow-row gap-5">
            <div className="md:grid mobile:hidden xmd:hidden grid-cols-2  md:gap-2 ">
              <Image
                src={'/images/stack_img_1.png'}
                alt='stack1'
                className="object-cover relative bottom-8"
                width={1920}
                height={2080}
              layout='responsive'
              />
              <Image
                src={'/images/stack_img_2.png'}
                alt='stack1'
                className="object-cover"
                width={150}
                height={100}
              layout='responsive' 
              />
              <Image
                src={'/images/stack_img_3.png'}
                alt='stack1'
                className="object-cover"
                width={1920}
                height={1080}
              layout='responsive'
              />
              <Image
                src={'/images/stack_img_4.png'}
                alt='stack1'
                className="object-cover relative top-1"
                width={1920}
                height={1080}
              layout='responsive'
              />
            </div>


            <div className="md:visible">
              <div className="flex flex-col">
                {home.map((text) => (
                  <Headings
                    type={'heading_1'}
                    classname="xmd:text-justify xmd:mb-4 "
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
                      classname="xmd:text-justify xmd:mb-[10px] md:mb-0"
                    >
                      {text.light_text}
                    </Paragraph>
                  ))}
                </div>

                <div>
                  {home.map((text, i) => (
                    <Paragraph
                      type={'bodyParagraph'}
                      key={`pragraph${text.id}`}
                      classname="xmd:text-justify md:pb-0 xmd:pb-0 md:leading-6"
                    >
                      {i === 4 ? text.light_text_1 : ''}
                    </Paragraph>
                  ))}
                </div>

                <div className="grid gap-y-[1px]">
                  {home.map((text) => (
                    <Headings
                      type={'heading_2'}
                      key={`bold_2--${text.id}`}
                      classname="xmd:pb-4 md:pb-6 text-justify"
                    >
                      {text.bold_text_1}
                    </Headings>
                  ))}
                </div>
              </div>
              <div className="xmd:grid xmd:gap-2 mobile:gap-6 mobile:grid-cols-[1fr_1fr] mobile:grid-rows-[1fr_1fr] xmd:grid-cols-[1fr] ">
                {purposeHeading?.reasons.map((text, index) => (
                  <Purpose
                    iconImage={
                      <Image
                        src={purposeIcon?.reasons[index].content as StaticImageData} // Ensure correct type casting
                        alt={`Purpose Icon ${index + 1}`} // Provide an appropriate alt text
                        width={1920} // Adjust the width as needed
                        height={1080} // Adjust the height as needed
                        objectFit="contain" // Adjust the object fit property as needed
                        layout='responsive'
                        className='z-50'
                      />
                    }

                    heading={<Headings type={'heading_2'}>{text.content}</Headings>}
                    subheading={purposeBody?.reasons[index].content as string} // Access body content directly
                    key={`purpose-${text.id}`}
                    
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`${whiteSpaces.paddingY}`}>
            {home.map((text) => (
              <Paragraph type={'bodyParagraph'} classname='text-justify' key={`bodypragraph${text.id}`} >
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
