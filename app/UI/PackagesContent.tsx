import React, { useEffect, useState } from 'react';
import Packages from './Packages';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Bullet from './Bullet';
import useSlider from '../libs/hooks/useSlider';
import { packages } from '../contents/services';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { useMbisContext } from '../libs/hooks/useContextProvider';

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

  // State to track whether it's mobile view
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedPackage(index);

    switch (index) {
      case 0:
        return dispatch({ type: 'openVipPackage', payload: true });
      case 1:
        return dispatch({ type: 'openDelauxePackage', payload: true });
      case 2:
        return dispatch({ type: 'openStandardPackage', payload: true });
        default :
        return null
    }

  };

  // useEffect to handle screen size changes using matchMedia API
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1020px)');

    // Handler function to update state
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial state based on the current media query
    setIsMobile(mediaQuery.matches);

    // Add event listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up the event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <section
          className={` ${whiteSpaces.paddingX} ${whiteSpaces.paddingY} xmd:max-w-[2000px] m-auto `}
        >
          <Carousel
            className={`xmd:w-full m-auto grid sm:h-[900px] lg:w-full md:w-full md:h-[870px] lg:h-[800px] ${offheight}`}
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
                    className="xmd:basis-[16rem] mobile:basis-[20rem] sm:basis-3/4 md:basis-1/2"
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
                      // type_installment={type_installment}
                      // type_upfront={type_upfront}
                      week={week}
                      month={month}
                      any={any}
                      // hajjupfront={amount_upfront_hajj}
                      // umrahupfront={amount_upfront_umrah}
                      isSelected={selectedPackage === idx}
                      handleClick={() => handleClick(idx)}
                      to={to}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-hover-color hover:bg-white border-2 border-[#333333] opacity-25 ml-8 z-10" />
            <CarouselNext className="bg-hover-color border-2 border-[#333333] opacity-25 mr-8 hover:bg-white z-10" />
          </Carousel>

          <div className="flex justify-center gap-2">
            {packages.map((pack, idx) => (
              <Bullet
                key={`${pack.id}-bullet`}
                className={`${current === idx ? 'bg-hover-color' : 'bg-[#D9D9D9]'
                  }`}
              />
            ))}
          </div>
        </section>
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
              // type_installment={type_installment}
              // type_upfront={type_upfront}
              week={week}
              month={month}
              any={any}
              to={to}
              // hajjupfront={amount_upfront_hajj}
              // umrahupfront={amount_upfront_umrah}
              isSelected={selectedPackage === idx}
              handleClick={() => handleClick(idx)}
            />
          );
        })
      )}
    </>
  );
};

export default PackagesContent;
