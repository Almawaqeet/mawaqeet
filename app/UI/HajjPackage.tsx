import React from 'react'

import { packages, scholarship_guidance, title_intro_hajj, why_scholarship_guidance } from '../contents/services';

import PackagesContent from './PackagesContent';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import Image from 'next/image';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import SlantDiv from './SlantDiv';
import Bullet from './Bullet';

const HajjPackage: React.FC = () => {
  const why_scholarship_heading = why_scholarship_guidance.find(itm => itm.id === 'why_scholarship_heading');
  const why_scholarship_body = why_scholarship_guidance.find(itm => itm.id === 'why_scholarship_body')
  const why_scholarship_NB = why_scholarship_guidance.find(itm => itm.id === 'scholarship-NB')
  return (
    <>

      <div
        className={`sm:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_500px]  lg:gap-12 md:gap-10 mobile:gap-2 sm:gap-4 xmd:w-full sm:grid-cols-[1fr_1fr] items-center mt-20`}
      >
        <div className='flex flex-col '>
          {title_intro_hajj.map((title) => (
            <Headings
              type={'sectionName'}
              classname="sm:text-left  sm:leading-7 sm:mb-4 max-[sm]:text-fz-md mb-2  text-start sm:block font-dejavu"
              key={`title--${title.id}`}
            >
              {title.intro_1}
            </Headings>
          ))}
          <div className=''>
            {title_intro_hajj.map((content) => (
              <Paragraph
                type={'bodyParagraph'}
                classname=" sm:grid text-justify xmd:text-fz-xsm md:text-fz-xs lg:text-fz-md lg:leading-10  xmd:leading-2  md:leading-4 sm:tracking-tighter font-dejavu xmd:w-3/4 sm:w-full items-center"
                key={`content--${content.id}`}
              >
                {content.serviceContent}
              </Paragraph>
            ))}
          </div>
        </div>
        <div>
          <Image
            src='/images/hajj.png'
            alt='hajj-img'
            className={`mobile:h-full mt-11 xmd:pb-[71px]`}
            height={100}
            width={100}
            layout='responsive'
          />
        </div>
      </div>
      <div className="">
        {title_intro_hajj.map((title) => (
          <Headings
            type={'heading_1'}
            classname="text-left font-dejavu xmd:pb-8"
            key={`heading_1--${title.id}`}
          >
            {title.intro_2}
          </Headings>
        ))}
      </div>
      <div className={`grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]`}>

        <PackagesContent />

      </div>

      <div className={`${whiteSpaces.paddingY}`}>
        <div className='xmd:pb-11'>
          <SlantDiv className="xmd:before:w-[100px]">
            <Headings type="sectionName" classname="text-center font-dejavu pb-2">
              Scholarship Guidance
            </Headings>
          </SlantDiv>
        </div>

        {scholarship_guidance.map(sch => (
          <>
            <Paragraph type='bodyParagraph' classname={`text-center xmd:pb-0`} key={`${sch.id}fhfhg`}>{sch.center_text}</Paragraph>
            <Paragraph type='bodyParagraph' classname={`text-justify xmd:pb-8`} key={`${sch.id}fhf`}>{sch.align_text}</Paragraph>
          </>
        ))}

        <div className='sm:grid sm:grid-cols-[1fr_1fr]  xmd:gap-8 md:gap-16'>
          {why_scholarship_heading?.why_scholarship_heading.map((itm, index) => (
            < React.Fragment>
              <div className='' key={`${itm.id}${index}`}>
                <div>
                  <span className='flex xmd:gap-4 md:gap-1' key={`${itm.id}-hi`}>
                    <Bullet className='md:w-2'/>
                    <Paragraph type='globalBold' classname='font-bold xmd:leading-5 text-body-clamp tracking-tight font-dejavu w-full pb-1' key={`${itm.id}-par`}>{itm.heading_content}</Paragraph>
                  </span>
                  <Paragraph type='bodyParagraph' classname={`text-justify`} key={`${itm.id}-par`}>{why_scholarship_body?.why_scholarship_heading[index].heading_content}</Paragraph>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {why_scholarship_NB?.why_scholarship_heading.map(itm => (
          <Paragraph type='globalBold' classname='font-bold xmd:leading-5 text-body-clamp tracking-tight font-dejavu w-full italic mt-6' key={`${itm.id}===`}>{itm.heading_content}</Paragraph>
        ))}
      </div>
    </>
  );
};

export default HajjPackage;
