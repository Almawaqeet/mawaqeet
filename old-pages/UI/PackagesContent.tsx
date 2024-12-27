'use client';

import React, { useEffect, useState } from 'react';
import Packages from './Packages';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/reusables/carousel';
import Bullet from './Bullet';
import useSlider from '../hooks/useSlider';
import { packages } from '../contents/services';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import { useMbisContext } from '../hooks/useContextProvider';

type packProps = {
  offstyle?: string;
  offheight?: string;
  offcontent?: string;
  offmainheight?: string;
  morestyle?: string;
  prices?: string;
  umrahprices?: string;
  hajj_show?: string;
  umrah_show?: string;
  to: string;
};

const PackagesContent: React.FC<packProps> = ({
  offstyle,
  offcontent,
  offheight,
  offmainheight,
  morestyle,
  prices,
  umrahprices,
  hajj_show,
  umrah_show,
  to,
}) => {
  const { setApi, current } = useSlider();
  const { dispatch } = useMbisContext();

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 1020 : false
  );

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedPackage(index);
    dispatch({ type: 'setSelectedComponent', payload: true });
  };

  // useEffect to handle window resize and update the state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1020);
      };

      // Set initial state
      setIsMobile(window.innerWidth < 1020);

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <section
            className={`  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] ${whiteSpaces.paddingY} xmd:max-w-[2000px] m-auto `}
          >
            <Carousel
              className={` xmd:w-full m-auto grid sm:h-[900px] lg:w-full md:w-full md:h-[870px] lg:h-[800px] ${offheight}`}
              setApi={setApi}
            >
              <CarouselContent>
                {packages.map((pack, idx) => {
                  const {
                    id,
                    package_title,
                    content,
                    conclusion,
                    heading,
                    packagePrices,
                  } = pack;

                  const {
                    package_name,
                    type_installment,
                    type_upfront,
                    week,
                    month,
                    any,
                    amount_upfront_hajj,
                    amount_upfront_umrah,
                  } = packagePrices;

                  const bullets = Object.values(content).filter(
                    Boolean
                  ) as string[];

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
                        offstyle={offstyle}
                        offcontent={offcontent}
                        offmainheight={offmainheight}
                        morestyle={morestyle}
                        prices={prices}
                        umrahprices={umrahprices}
                        hajj_show={hajj_show}
                        umrah_show={umrah_show}
                        package_name={package_name}
                        type_installment={type_installment}
                        type_upfront={type_upfront}
                        week={week}
                        month={month}
                        any={any}
                        hajjupfront={amount_upfront_hajj}
                        umrahupfront={amount_upfront_umrah}
                        isSelected={selectedPackage === idx}
                        handleClick={handleClick}
                        to={to}
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
          const {
            id,
            package_title,
            content,
            conclusion,
            heading,
            packagePrices,
          } = pack;

          const {
            package_name,
            type_installment,
            type_upfront,
            week,
            month,
            any,
            amount_upfront_hajj,
            amount_upfront_umrah,
          } = packagePrices;

          const bullets = Object.values(content).filter(Boolean) as string[];

          return (
            <Packages
              key={`package-${id}`}
              title_intro={heading}
              bullets={bullets}
              title_conclusion={conclusion}
              title_head={package_title}
              index={idx}
              className="md:block"
              offstyle={offstyle}
              offcontent={offcontent}
              offmainheight={offmainheight}
              morestyle={morestyle}
              prices={prices}
              umrahprices={umrahprices}
              hajj_show={hajj_show}
              umrah_show={umrah_show}
              package_name={package_name}
              type_installment={type_installment}
              type_upfront={type_upfront}
              week={week}
              month={month}
              any={any}
              to={to}
              hajjupfront={amount_upfront_hajj}
              umrahupfront={amount_upfront_umrah}
              isSelected={selectedPackage === idx}
              handleClick={handleClick}
            />
          );
        })
      )}
    </>
  );
};

export default PackagesContent;
