import React from 'react';
import { about_us_team } from '../contents/about';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/Reusables/Ui/carousel';

import Team from './Team';
import Bullet from './Bullet';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import useSlider from '../hooks/useSlider';

const TeamContent: React.FC = ({

}) => {
 const { setApi, current } = useSlider()
  return (
    <section
      className={`  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] ${whiteSpaces.paddingY} xmd:max-w-[2000px] m-auto justify-center`}
    >
      <Carousel
        className="xmd:w-11/12 grid m-auto xmd:h-[560px] sm:h-[550px] md:h-[620px] lg:w-full md:w-full lg:h-[630px]"
        setApi={setApi}
      >
        <CarouselContent className="">
          {about_us_team.map((about, index) => (
            <CarouselItem
              className="xmd:basis-[16rem] mobile:basis-[20rem] sm:basis-1/2 md:basis-2/4 lg:basis-1/3 "
              key={index}
            >
              <Team
                key={`${about.id}--abt`}
                index={index}
                image={about.image}
                fullName={about.fullname}
                post={about.post}
                personality={about.personality}
                view_profile={about.view_profile}
                to={`/about-us/${about.slug}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-hover-color hover:bg-white border-2 border-[#333333] opacity-25 ml-8 z-10" />
        <CarouselNext className="bg-hover-color border-2 border-[#333333] opacity-25  mr-8 hover:bg-white z-10 " />
      </Carousel>

      <div className="flex justify-center gap-2">
        {about_us_team.map((team, i) => (
          <Bullet
            key={`${team.id}-team`}
            className={` ${current === i ? 'bg-hover-color' : 'bg-[#D9D9D9]'} `}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamContent;
