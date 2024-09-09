import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { useTab } from '../libs/hooks/useTab';
import PackagesContent from './PackagesContent';
import { apptype } from '../contents/payment';
import { umrahCategory } from '../contents/services';
import UmrahDiv from './UmrahDiv';


const Step2: React.FC = () => {
  const { btn1Ref, btn2Ref, showPackage, activeBtnServiceId, handleButtonClick, dispatch } = useTab();

  const [isSelected, setSelected] = useState<number | boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedPackage(index);
  };
  

  const handleRadioClick = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    if (btn1Ref.current) {
      dispatch({ type: 'setactiveBtnService', payload: btn1Ref });
      dispatch({ type: 'setshowpackage', payload: btn1Ref });
      setSelected(0)
    }
  }, [dispatch, btn1Ref]);

  // Function to render buttons
  const renderButton = (
    ref: RefObject<HTMLButtonElement>,
    label: string
  ) => (
    <button
      className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg mobile:px-4 mobile:py-4 xmd:px-6 xmd:py-3 rounded-sm cursor-pointer mobile:text-fz-sm font-dejavu
        ${activeBtnServiceId?.current === ref.current
          ? 'bg-hover-color text-white'
          : 'bg-accordion text-[#333333]'
        } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
      onClick={handleButtonClick(ref)}
      ref={ref}
    >
      {label}
    </button>
  );

  return (
    <section className=''>
      <main className={`${whiteSpaces.paddingX} `}>
        <Paragraph
          type='globalBold'
          classname='text-Bold-1-clamp font-bold tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu'
        >
          Select Package
        </Paragraph>

        {/* Render buttons */}
        <div className={`grid grid-cols-2 md:justify-start md:w-2/4 xmd:gap-4 xmd:pb-16`}>
          {renderButton(btn1Ref, 'Saving Scheme')}
          {renderButton(btn2Ref, 'Upfront Payment')}
        </div>

        {/* Render radio inputs for apptype */}
        <div className='flex xmd:gap-9'>
          {apptype.map((typ, index) => (
            <span key={`${typ.id}-span`} className='flex xmd:gap-5'>
              <input
                className={`xmd:w-[18px] xmd:h-[18px] rounded-full border-[1px] border-[#848484] ${isSelected === index ? 'radiostyle' : ''}`}
                type='radio'
                checked={isSelected === index}
                onClick={() => handleRadioClick(index)}
              />
              <Paragraph type='global'
                key={`${typ.id}-typ`}
                classname='text-Bold-1-clamp font-normal tracking-tight leading-[18px] text-inherit xmd:pb-8 font-dejavu'
              >
                {typ.content}
              </Paragraph>
            </span>
          ))}
        </div>

        {/* Render selected package content based on button or radio input */}
        {showPackage === btn1Ref && activeBtnServiceId === btn1Ref && isSelected === 0 ? (
          <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
            <PackagesContent offstyle='hidden' offheight='xmd:h-[900px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' hajjupfront='hidden' umrahupfront='hidden' />
          </div>
        ) : isSelected === 1 ? (
          <>

            {umrahCategory.map((batch) =>
              batch.content.map((category, index) => (
                <div key={index} className='flex xmd:gap-4 items-center'>
                  <input
                    className={`xmd:w-[18px] xmd:h-[18px] rounded-full border-[1px] grid justify-start border-[#848484] ${isSelected ? 'radiostyle' : ''
                      }`}
                    type='checkbox'
                    checked={selectedPackage === index}
                    onClick={() => handleClick(index)}
                  />
                  <UmrahDiv
                    key={`category-${category.id}`}
                    umrahbatch={category.umrahbatches}
                    offstyle='xmd:bg-inherit'
                    linestyle='xmd:text-inherit no-underline'
                  />
                </div>
              ))
            )}

            <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
              <PackagesContent offstyle='hidden' offheight='xmd:h-[900px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' hajjupfront='xmd:hidden'  installment='xmd:hidden' />
            </div>

          </>
        ) : showPackage === btn2Ref && activeBtnServiceId === btn2Ref ? (
          <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
          <PackagesContent offstyle='hidden' offheight='xmd:h-[900px] sm:h-[600px] md:h-[650px] lg:min-h-[500px]' installment='xmd:hidden' umrahupfront='xmd:hidden' />
        </div>
        ) : null}
      </main>
    </section>
  );
};

export default Step2;
