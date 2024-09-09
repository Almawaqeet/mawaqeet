import React, { useEffect, useState } from 'react';
import Packages from './Packages';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Bullet from './Bullet';
import useSlider from '../libs/hooks/useSlider';
import { packages } from '../contents/services';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

type packProps = {
  offstyle?: string
  offheight?: string
  morestyle?: string
  installment?: string
  hajjupfront?: string
  umrahupfront?: string
}

const PackagesContent: React.FC<packProps> = ({ offstyle, offheight, morestyle, installment, hajjupfront, umrahupfront }) => {
  const { setApi, current } = useSlider();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1020);

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedPackage(index);
  };

  // useEffect to handle window resize and update the state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1020);
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <section
            className={` ${whiteSpaces.paddingX} ${whiteSpaces.paddingY} xmd:max-w-[2000px] m-auto `}
          >

            <Carousel className={` xmd:w-full m-auto grid sm:h-[900px] lg:w-full md:w-full md:h-[870px] lg:h-[800px] ${offheight}`} setApi={setApi}>
              <CarouselContent >
                {packages.map((pack, idx) => {
                  const { id, package_title, content, conclusion, heading, pricehajjinstallment, pricehajjupfront, priceumrahupfront } = pack;
                  const { packs, week, any, month } = pricehajjinstallment
                  const { amount: hajjUpfrontAmount } = pricehajjupfront;
                  const { amount: umrahUpfrontAmount } = priceumrahupfront;

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
                        offstyle={offstyle}
                        offheight={offheight}
                        morestyle={morestyle}
                        installment={installment}
                        hajjupfront={hajjupfront}
                        umrahupfront={umrahupfront}
                        pack={packs}
                        month={month}
                        week={week}
                        hajjamount={hajjUpfrontAmount}
                        umrahamount={umrahUpfrontAmount}
                        any={any}
                        isSelected={selectedPackage === idx}
                        handleClick={handleClick}
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
          const { id, package_title, content, conclusion, heading, pricehajjinstallment, pricehajjupfront, priceumrahupfront } = pack;
          const { packs, week, any, month } = pricehajjinstallment
          const { amount: hajjUpfrontAmount } = pricehajjupfront;
          const { amount: umrahUpfrontAmount } = priceumrahupfront;
          const bullets = Object.values(content).filter(Boolean) as string[];

          return (
            <Packages
              key={`package-${id}`}
              title_intro={heading}
              bullets={bullets}
              title_conclusion={conclusion}
              title_head={package_title}
              index={idx}
              offstyle={offstyle}
              offheight={offheight}
              morestyle={morestyle}
              hajjupfront={hajjupfront}
              umrahupfront={umrahupfront}
              installment={installment}
              pack={packs}
              month={month}
              week={week}
              hajjamount={hajjUpfrontAmount}
              umrahamount={umrahUpfrontAmount}
              any={any}
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
