import React from 'react'
import SlantDiv from './SlantDiv';
import Headings from '../utilities/Headings';
import { complementary_services, complementary_services_intro } from '../contents/services';
import Paragraph from '../utilities/Paragraph';
import ComplementNum from './ComplementNum';
import Image from 'next/image';

const Complementary = () => {
  const Bold = complementary_services.find(bold => bold.id === 'bold')
  const Span = complementary_services.find(span => span.id === 'span')
  const tour_heading = complementary_services.find(bold => bold.id === 'tour-heading')
  const tour_body = complementary_services.find(body => body.id === 'tour-body')
  const complement = complementary_services.find(body => body.id === 'complement')
  const complement_body = complementary_services.find(body => body.id === 'complement-body')

  return (<section className={`mt-20 `}>
    <main>
      <div className='xmd:pb-11'>
        <SlantDiv className="xmd:before:w-[120px] justify-start">
          <Headings type="sectionName" classname="text-center  ">
            Complementary services
          </Headings>
        </SlantDiv>
      </div>

      {complementary_services_intro.map((head) => (
        <Paragraph type='bodyParagraph' classname='text-center ' key={`${head.id}fhfhg`}>{head.intro}</Paragraph>
      ))}

      <div className='pb-20 md:grid md:grid-cols-[1fr_1fr] md:gap-8'>
        {Bold?.highlights.map((bold, index) => (
          <div className={`grid xmd:grid-cols-[30px_1fr] xmd:gap-6 xmd:pb-11 lg:gap-16 ${index === 2 && 'col-span-2'}`} key={`dsd${bold.id}`}>
            <ComplementNum position={index + 1} key={`${bold.id}num`} />
            <span className={` items-baseline  ${index !== 0 ? 'block text-justify' : 'grid xmd:grid-cols-[90px_1fr] mobile:grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] md:block'}`} key={`${bold.id}span`}>
              <Paragraph type='globalBold' classname='font-bold xmd:leading-5 text-body-clamp tracking-tight   w-full' key={`${bold.id}par`}>{bold.highlight}</Paragraph>
              <Paragraph type='bodyParagraph' classname={`text-justify`} key={`${bold.id}-par`}>{Span?.highlights[index].highlight}</Paragraph>
            </span>
          </div>
        ))}
      </div>

      <div>
        {tour_heading?.highlights.map((tour, index) => (
          <React.Fragment key={`${tour.id}-fragment`}>
            <Paragraph
              type="globalBold"
              classname={`  font-bold xmd:text-fz-xs md:text-fz-sm lg:text-fz-md xmd:leading-5 tracking-tight text-center xmd:pb-9 ${index === 0 && 'md:hidden'}`}
            >
              {tour.highlight}
            </Paragraph>

            {index === 1 && tour_body?.highlights.map((bdy, bdyIndex) => (
              <Paragraph
                key={`${bdy.id}-body-${bdyIndex}`}
                type="bodyParagraph"
                classname="text-justify pb-[55px]"
              >
                {bdy.highlight}
              </Paragraph>
            ))}

            <div className='grid md:grid-cols-[1fr_1fr] md:gap-4'>
              {index === 1 && complement?.highlights.map((comp, compIndex) => (
                <div key={`${comp.id}--compla`} className='grid xmd:grid-cols-[50px_1fr] lg:gap-16'>
                  <ComplementNum position={compIndex + 1} key={`${comp.id}-num`} />
                  <span key={`${comp.id}-complement-${compIndex}`} className='grid '>
                    <Paragraph
                      type="globalBold"
                      classname="  font-bold xmd:text-fz-xs xmd:leading-5 md:text-fz-sm pb-2 tracking-tight text-start"
                    >
                      {comp.highlight}
                    </Paragraph>
                    <Paragraph
                      key={`${comp.id}-complement-body`}
                      type="bodyParagraph"
                      classname={`text-start xmd:pb-11 ${compIndex === 3 && 'md:pb-11'}`}
                    >
                      {complement_body?.highlights[compIndex]?.highlight}
                    </Paragraph>
                  </span>
                </div>
              ))}
            </div>

            {index === 0 && (
              <Image
                src="/images/complementary.png"
                layout="responsive"
                width={100}
                height={100}
                alt="complementary"
                className="xmd:pb-9 md:hidden"
                key={`${tour.id}===`}
              />
            )}
          </React.Fragment>
        ))}

      </div>
    </main>
  </section>);
};

export default Complementary;
