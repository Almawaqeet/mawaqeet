import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image"

import BtnGlobal from "./BtnGlobal";
import Headings from "../libs/utilities/Headings";
import Paragraph from "../libs/utilities/Paragraph";
import Link from "next/link";


interface TeamProps {
  index: number;
  fullName: string;
  post: string;
  to: string,
  personality?: string;
  view_profile: string;
  image: StaticImageData;
}

const Team: React.FC<TeamProps> = ({
  index,
  fullName,
  post,
  personality,
  view_profile,
  image,
  to
}) => {

  return (
    <div>
      <div className="relative xmd:rounded-ee-2xl xmd:rounded-ss-2xl xmd:h-[480px] sm:h-[480px] md:h-[550px] bg-accordion mb-1 top-[70px] pt-[96px] xmd:px-8 mobile:px-6 border border-logo-color hover:border-white drop-shadow-white-ash transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer hover:bg-hover-color group">
        <div className="flex flex-col gap-8">
          <Headings
            type="quoteText"
            classname="xmd:leading-2 md:leading-8 xmd:tracking-[0.16px] text-center justify-center text-inherit group-hover:text-white"
          >
            {fullName}
          </Headings>

          <Paragraph
            type="global"
            classname="font-normal xmd:leading-5 md:leading-8 text-center xmd:tracking-[0.16px] text-team-clamp group-hover:text-white"
          >
            {post}
          </Paragraph>

          <Paragraph
            type="global"
            classname="font-normal xmd:leading-5 md:leading-8 text-center xmd:tracking-[0.16px] text-team-clamp group-hover:text-white"

          >
            {personality}
          </Paragraph>

          <div className="grid m-auto">
            <Link href={to} passHref>
              <BtnGlobal
                className={`${index === 1
                    ? "xmd:relative xmd:top-5 mobile:top-10 lg:top-0"
                    : ""
                  } ${index === 2
                    ? "xmd:relative xmd:top-5 mobile:top-10 md:top-8 lg:top-16"
                    : ""
                  } ${index === 3
                    ? "xmd:relative xmd:top-[5rem] mobile:top-24 sm:top-24 md:top-24"
                    : ""
                  } ${index === 0 ? "mobile:top-0 xmd:relative md:top-0" : ""
                  } xmd:rounded-[20px] drop-shadow-trans-white border-2 border-[#4b3938] xmd:px-6 xmd:py-3 group-hover:border-white`}

              >
                <Paragraph
                  type="global"
                  classname="xmd:text-fz-xss xmd:leading-4 xmd:tracking-[0.07px] text-center group-hover:text-white"
                >
                  {view_profile}
                </Paragraph>
              </BtnGlobal>
            </Link>
          </div>

          <div>
            <Image
              src={image}
              className="absolute xmd:w-[102.44px] xmd:h-[102.44px] md:h-[140px] md:w-[140px] md:-top-[70px] xmd:-top-[50px] left-1/2 transform -translate-x-1/2"
              alt="image-team"
              width={102.44}
              height={102.44}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
