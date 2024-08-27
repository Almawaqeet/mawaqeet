import React from 'react'

import { packages, title_intro_hajj } from '../contents/services';

import PackagesContent from './PackagesContent';
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import Image from 'next/image';

const HajjPackage:React.FC  = () => {
  return (
    <>
      <div
        className={`sm:grid sm:grid-cols-[300px_1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_500px] items-center lg:gap-12 md:gap-10 mobile:gap-2 `}
      >
        <div>
          {title_intro_hajj.map((title) => (
            <Headings
              type={'sectionName'}
              classname="sm:text-left xmd:text-center sm:leading-7 sm:mb-4 max-[sm]:text-fz-md mb-2  xmd:hidden sm:block"
              key={`title--${title.id}`}
            >
              {title.intro_1}
            </Headings>
          ))}
          {title_intro_hajj.map((content) => (
            <Paragraph
              type={'bodyParagraph'}
              classname="xmd:hidden sm:grid text-team-clamp lg:leading-[40px] sm:tracking-tighter"
              key={`content--${content.id}`}
            >
              {content.serviceContent}
            </Paragraph>
          ))}
        </div>
        <div>
          <Image
          src='/images/hajj.png'
          alt='hajj-img'
          className={`xmd:hidden sm:block mobile:h-full`}
          height={100}
          width={0}
           />
        </div>
      </div>
      <div className="">
        {title_intro_hajj.map((title) => (
          <Headings
            type={'heading_1'}
            classname="text-left sm:block xmd:hidden  sm:pb-4"
            key={`heading_1--${title.id}`}
          >
            {title.intro_2}
          </Headings>
        ))}
      </div>
      <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
        {packages.map((pack, i) => (
          <div
            key={`container-${i}`}
            className={`${i === 0 && 'md:col-span-2 lg:col-span-1'} ${
              i === 2 && ' md:col-auto'
            } ${i === 1 && 'mobile:w-full'}`}
          >
            <PackagesContent pack={pack} key={`pack-${pack.id}`} index={i} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HajjPackage;
