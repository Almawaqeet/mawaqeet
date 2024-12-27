import React from 'react';
import { FaArrowsDownToPeople } from 'react-icons/fa6';
import Image from 'next/image';

import {
  packages,
  title_intro_hajj,
  umrahCategory,
} from '../contents/services';

import PackagesContent from './PackagesContent';
import UmrahDiv from './UmrahDiv';
import Headings from '../utilities/Headings';

type UmrahProps = {
  image?: string;
};

const UmrahPackage: React.FC<UmrahProps> = ({ image = '' }) => {
  return (
    <>
      <div className="sm:grid sm:grid-cols-[300px_1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_500px] items-center justify-center lg:gap-12 md:gap-10 mobile:gap-2 mt-20">
        <div className="flex flex-col relative">
          {title_intro_hajj.map((title) => (
            <Headings
              type="sectionName"
              classname=" sm:text-left xmd:text-center mb-3 xmd:hidden sm:block  "
              key={`title-${title.id}`}
            >
              {title.intro_1_1}
            </Headings>
          ))}

          {umrahCategory.map((batch) =>
            batch.content.map((category) => (
              <UmrahDiv
                key={`category-${category.id}`}
                umrahbatch={category.umrahbatches}
                icon={<FaArrowsDownToPeople className="text-hover-color " />}
              />
            ))
          )}
        </div>

        <div className={`${image}`}>
          <Image
            src={'/images/umrah.png'}
            alt="umrah-img"
            className={`xmd:hidden sm:block mobile:h-full `}
            height={100}
            width={100}
            layout="responsive"
          />
        </div>
      </div>
      <div className="xmd:pt-4">
        {title_intro_hajj.map((title) => (
          <Headings
            type="heading_1"
            classname="text-left sm:block xmd:hidden sm:pb-4  "
            key={`heading_1-${title.id}`}
          >
            {title.intro_2}
          </Headings>
        ))}
      </div>
      <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
        <PackagesContent
          morestyle="xmd:hidden"
          to="/registration-form/application/step1"
        />
      </div>
    </>
  );
};

export default UmrahPackage;
