import React from 'react';
import Image from 'next/image';
import { home, why_hajj_umrah, whyImages } from '../contents/home';
import Hero from './Hero';
import Purpose from './Purpose';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { useMbisContext } from '../libs/hooks/useContextProvider';
import LearnModal from './LearnModal';

const HomeV1 = () => {
  const { dispatch } = useMbisContext();
  const handleOpen = () => {
    dispatch({ type: 'openModal', payload: true });
  };

  // Find content from home.js
  const purposeHeading = why_hajj_umrah.find(
    (content) => content.id === 'why_heading'
  );

  const purposeBody = why_hajj_umrah.find(
    (content) => content.id === 'why_body'
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
          <Headings
            type="BrandText"
            key={`subText${subText.id}`}
            classname="font-dejavu"
          >
            {subText.sub_heading}
          </Headings>
        ))}
        CTA="Get Started"
        subCTA="Learn More"
        to="/registration-form"
        id=""
        handleOpen={handleOpen}
      />

      <LearnModal />

      <section
        className={`xmd:max-w-[375px] mobile:max-w-[700px] m-auto md:max-w-[1500px] lg:max-w-[2000px] mb-[150px]`}
      >
        <main className={`${whiteSpaces.paddingX}`}>
          <div className="md:grid lg:grid-cols-[1fr_1fr] md:gap-8  md:items-center">
            {/* Static Images Section */}
            <div className="lg:grid md:hidden mobile:hidden xmd:hidden relative lg:grid-cols-[1fr_1fr] xmd:gap-x-2">
              <Image
                src="/images/stack_img_1.png"
                alt="stack1"
                className="object-cover relative"
                width={400}
                height={500}
              />
              <Image
                src="/images/stack_img_2.png"
                alt="stack2"
                className="object-cover"
                width={400}
                height={500}
              />
              <Image
                src="/images/stack_img_3.png"
                alt="stack3"
                className="object-cover relative"
                width={400}
                height={500}
              />

              <Image
                src="/images/stack_img_4.png"
                alt="stack4"
                className="object-cover relative"
                width={400}
                height={500}
              />
            </div>

            {/* Dynamic Content Section */}
            <div className="md:grid md:grid-cols-[1fr_1fr] lg:block w-full md:gap-6 items-center">
              <div className="">
                {home.map((text) => (
                  <Headings
                    type="heading_1"
                    classname="xmd:text-left xmd:mb-4"
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
                      classname="xmd:text-left "
                    >
                      {text.light_text}
                    </Paragraph>
                  ))}
                </div>
              </div>

              {/* Dynamic Image Rendering with Conditional Layout */}
              <div className="xmd:grid xmd:gap-2 mobile:gap-6 md:gap-2 mobile:grid-cols-[1fr_1fr] mobile:grid-rows-[1fr_1fr] xmd:grid-cols-[1fr] xmd:mt-4 lg:mt-8">
                {purposeHeading?.reasons.map((text, index) => (
                  <Purpose
                    key={`purpose-${text.id}`}
                    iconImage={
                      <div className="">
                        {whyImages.map((item) => (
                          <Image
                            key={item.id}
                            src={item.content[index].img}
                            alt={`Purpose Icon ${item.id}`}
                            sizes="md:w-8"
                            className=" rounded-lg absolute"
                          />
                        ))}
                      </div>
                    }
                    heading={
                      <Headings type="sectionName" classname="xmd:leading-7">
                        {text.content}
                      </Headings>
                    }
                    subheading={purposeBody?.reasons[index].content as string}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default HomeV1;
