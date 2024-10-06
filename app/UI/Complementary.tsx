import React from 'react'
import SlantDiv from './SlantDiv';
import Headings from '../libs/utilities/Headings';
import { complementary_services, complementary_services_intro } from '../contents/services';
import Paragraph from '../libs/utilities/Paragraph';
import ComplementNum from './ComplementNum';
import Image from 'next/image';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const Complementary = () => {
  const Bold = complementary_services.find(bold => bold.id === 'bold')
  const Span = complementary_services.find(span => span.id === 'span')
  const tour_heading = complementary_services.find(bold => bold.id === 'tour-heading')
  const tour_body = complementary_services.find(body => body.id === 'tour-body')
  const complement = complementary_services.find(body => body.id === 'complement')
  const complement_body = complementary_services.find(body => body.id === 'complement-body')

  return (<section className={`${whiteSpaces.paddingY} pb-[150px]`}>
    <main>
      <div className='xmd:pb-8'>
        <SlantDiv className="xmd:before:w-[120px] justify-start">
          <Headings type="sectionName" classname="text-center font-dejavu">
            Complementary services
          </Headings>
        </SlantDiv>
      </div>

      <div className='pb-8 md:grid md:grid-cols-[1fr_1fr] xmd:gap-4'>
        {Bold?.highlights.map((bold, index) => (
          <div className={`grid xmd:grid-cols-[100px_1fr] ${index === 2 && 'col-span-1'}`} key={`dsd${bold.id}`}>
            <ComplementNum position={index + 1} key={`${bold.id}num`} />
            <span className={` items-baseline  `} key={`${bold.id}span`}>
              <Headings type='heading_1' classname='font-bold xmd:leading-7 pb-4 text-heading-clamp tracking-tight font-dejavu w-full' key={`${bold.id}par`}>{bold.highlight}</Headings>
              <Paragraph type='bodyParagraph' classname={`text-left pb-8 ${index === 2 && 'pb-0 '}`} key={`${bold.id}-par`}>{Span?.highlights[index].highlight}</Paragraph>
            </span>
          </div>
        ))}
      </div>

      <div>
        {tour_heading?.highlights.map((tour, index) => (
          <React.Fragment key={`${tour.id}-fragment`}>
            <Headings
              type="heading_1"
              classname={`font-dejavu text-left pb-4 ${index === 0 && 'md:hidden '}`}
            >
              {tour.highlight}
            </Headings>

            {index === 1 && tour_body?.highlights.map((bdy, bdyIndex) => (
              <Paragraph
                key={`${bdy.id}-body-${bdyIndex}`}
                type="bodyParagraph"
                classname="text-left pb-8"
              >
                {bdy.highlight}
              </Paragraph>
            ))}

            <div className='grid md:grid-cols-[1fr_1fr] xmd:gap-4'>
              {index === 1 && complement?.highlights.map((comp, compIndex) => (
                <div key={`${comp.id}--compla`} className='grid xmd:grid-cols-[100px_1fr] '>
                  <ComplementNum position={compIndex + 1} key={`${comp.id}-num`} />
                  <span key={`${comp.id}-complement-${compIndex}`} className='grid '>
                    <Headings
                      type="heading_1"
                     classname='font-bold xmd:leading-7 pb-4 text-heading-clamp tracking-tight font-dejavu w-full'
                    >
                      {comp.highlight}
                    </Headings>
                    <Paragraph
                      key={`${comp.id}-complement-body`}
                      type="bodyParagraph"
                      classname={`text-start  ${compIndex === 3 && 2 ? 'pb-0' : 'pb-8'}`}
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
                className="xmd:pb-8 md:hidden"
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
