import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/reusables/carousel';
import { motion } from 'framer-motion';
import { about_us_team } from '@/old-pages/contents/about';
import useSlider from '@/old-pages/hooks/useSlider';
import Team from './Team';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';

const TeamCarousel = () => {
  const { setApi, current } = useSlider();

  return (
    <section className={`${whiteSpaces.paddingX} max-w-7xl m-auto`}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {about_us_team.map((team) => (
            <CarouselItem key={team.id} className="xmd:basis-full sm:basis-3/4">
              <Team team={team} theme="light" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-[1px] border-[#333333] z-10 ml-8" />
        <CarouselNext className="bg-white border-[1px] border-[#333333] z-10 mr-8" />
      </Carousel>
      <div className="flex justify-center items-center gap-4">
        {about_us_team.map((team, idx) => (
          <li
            key={team.id}
            className={`${current === idx ? 'list-disc text-white text-2xl' : 'list-disc text-[#333333] text-2xl'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamCarousel;
