import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { home, why_hajj_umrah, whyImages } from '../contents/home';
import Hero from './Hero';
import Purpose from './Purpose';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const HomeV1 = () => {
  // Find content from home.js
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
          <Headings type="heroHeading" key={`heroText${text.id}`}>
            {text.heading}
          </Headings>
        ))}
        subheading={home.map((subText) => (
          <Headings type="heading_1" key={`subText${subText.id}`}>
            {subText.sub_heading}
          </Headings>
        ))}
        CTA="Get Package Price"
        subCTA="Learn More"
      />

      <section
        className={`xmd:max-w-[375px] mobile:max-w-[700px] m-auto md:max-w-[1500px] lg:max-w-[2000px] ${whiteSpaces.paddingY} mt-6`}
      >
        <main className={`${whiteSpaces.paddingX}`}>
          <div className="md:grid md:grid-cols-[400px_1fr] lg:grid-cols-[400px_1fr] xmd:gap-5 md:gap-10">
            {/* Static Images Section */}
            <div className="md:grid mobile:hidden xmd:hidden md:grid-cols-[200px_200px] md:gap-2 md:gap-y-0">
              <Image
                src="/images/stack_img_1.png"
                alt="stack1"
                className="object-cover relative bottom-8"
                width={250}
                height={250}
                // objectFit={'cover'}
              />
              <Image
                src="/images/stack_img_2.png"
                alt="stack2"
                className="object-cover"
                width={250}
                height={250}
                // objectFit={'cover'}
              />
              <Image
                src="/images/stack_img_3.png"
                alt="stack3"
                className="object-cover"
                width={250}
                height={250}
                // objectFit={'cover'}
              />
              <Image
                src="/images/stack_img_4.png"
                alt="stack4"
                className="object-cover relative top-1"
                width={250}
                height={250}
                // objectFit={'cover'}
              />
            </div>

            {/* Dynamic Content Section */}
            <div className="md:visible">
              <div className="flex flex-col">
                {home.map((text) => (
                  <Headings
                    type="heading_1"
                    classname="xmd:text-justify xmd:mb-4"
                    key={`heading_1-${text.id}`}
                  >
                    {text.bold_text}
                  </Headings>
                ))}

                <div>
                  {home.map((text) => (
                    <Paragraph
                      type="bodyParagraph"
                      key={`paragraph${text.id}`}
                      classname="xmd:text-justify xmd:mb-[10px] md:mb-0"
                    >
                      {text.light_text}
                    </Paragraph>
                  ))}
                </div>

                <div>
                  {home.map((text, i) => (
                    <Paragraph
                      type="bodyParagraph"
                      key={`paragraph${text.id}`}
                      classname="xmd:text-justify md:pb-0 xmd:pb-0 md:leading-6"
                    >
                      {i === 4 ? text.light_text_1 : ''}
                    </Paragraph>
                  ))}
                </div>

                <div className="grid gap-y-[1px]">
                  {home.map((text) => (
                    <Headings
                      type="heading_2"
                      key={`bold_2--${text.id}`}
                      classname="xmd:pb-4 md:pb-6 text-justify"
                    >
                      {text.bold_text_1}
                    </Headings>
                  ))}
                </div>
              </div>

              {/* Dynamic Image Rendering with Conditional Layout */}
              <div className="xmd:grid xmd:gap-2 mobile:gap-6 mobile:grid-cols-[1fr_1fr] mobile:grid-rows-[1fr_1fr] xmd:grid-cols-[1fr]">
                {purposeHeading?.reasons.map((text, index) => (
                  <Purpose
                    key={`purpose-${text.id}`}
                    iconImage={
                      <div className="relative w-full h-48 grid grid-cols-2 gap-2">
                        {whyImages.map((item) => (
                          <Image
                            key={item.id}
                            src={item.content[index].img}
                            alt={`Purpose Icon ${item.id}`}
                            sizes='md:w-8'
                            className=" rounded-lg absolute"
                          />
                        ))}
                      </div>
                    }

                    heading={<Headings type="heading_2">{text.content}</Headings>}
                    subheading={purposeBody?.reasons[index].content as string}
                  />
                ))}
              </div>

            </div>
          </div>

          <div className={`${whiteSpaces.paddingY}`}>
            {home.map((text) => (
              <Paragraph
                type="bodyParagraph"
                classname="text-justify"
                key={`bodyParagraph${text.id}`}
              >
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
