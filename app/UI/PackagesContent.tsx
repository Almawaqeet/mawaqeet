import React from 'react';
import Packages from './Packages';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Bullet from './Bullet';
import useSlider from '../libs/hooks/useSlider';
import { packages } from '../contents/services';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const PackagesContent: React.FC = () => {
  const { setApi, current } = useSlider();

  const isMobile = window.innerWidth < 1020;

  return (
    <>
      {isMobile ? (
        <>
          <section
            className={` ${whiteSpaces.paddingX} ${whiteSpaces.paddingY} xmd:max-w-[2000px] m-auto `}
          >

            <Carousel className=" xmd:w-full m-auto grid sm:h-[900px] lg:w-full md:w-full md:h-[870px] lg:h-[800px]" setApi={setApi}>
              <CarouselContent >
                {packages.map((pack, idx) => {
                  const { id, package_title, content, conclusion, heading } = pack;
                  const bullets = Object.values(content).filter(Boolean) as string[];

                  return (
                    <CarouselItem
                      className="xmd:basis-[16rem] mobile:basis-[20rem] sm:basis-3/4  md:basis-1/2"
                      key={id}
                    >
                      <Packages
                        key={`package-${id}`}
                        title_intro={heading}
                        bullets={bullets}
                        title_conclusion={conclusion}
                        title_head={package_title}
                        index={idx}
                        className="md:block"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="bg-hover-color hover:bg-white border-2 border-[#333333] opacity-25 ml-8 z-10" />
              <CarouselNext className="bg-hover-color border-2 border-[#333333] opacity-25  mr-8 hover:bg-white z-10" />
            </Carousel>

            <div className="flex justify-center gap-2">
              {packages.map((pack, idx) => (
                <Bullet
                  key={`${pack.id}-bullet`}
                  className={`${current === idx ? 'bg-hover-color' : 'bg-[#D9D9D9]'} `}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        packages.map((pack, idx) => {
          const { id, package_title, content, conclusion, heading } = pack;
          const bullets = Object.values(content).filter(Boolean) as string[];

          return (
            <Packages
              key={`package-${id}`}
              title_intro={heading}
              bullets={bullets}
              title_conclusion={conclusion}
              title_head={package_title}
              index={idx}

            />
          );
        })
      )}

    </>
  );
};

export default PackagesContent;
