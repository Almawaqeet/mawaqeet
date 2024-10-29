import React, { RefObject, useEffect, useState } from 'react';
import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { useTab } from '../libs/hooks/useTab';
import PackagesContent from './PackagesContent';
import { umrahCategory } from '../contents/services';
import UmrahDiv from './UmrahDiv';
import Headings from '../libs/utilities/Headings';
import BtnGlobal from './BtnGlobal';
import { PiGreaterThanLight } from 'react-icons/pi';
import { useAppInfo } from '../libs/hooks/useAppInfo';
import { useMbisContext } from '../libs/hooks/useContextProvider';
import VipPackageModal from './VipPackageModal';
import DelauxePackageModal from './DelauxePackageModal';
import StandardPackageModal from './StandardPackageModal';

const Step2: React.FC = () => {
  const {
    btn1Ref,
    btn2Ref,
    showPackage,
    activeBtnServiceId,
    handleButtonClick,
    dispatch,
  } = useTab();

  const { handleNext, handlePrevious } = useAppInfo();
  const [isShowPackage, setShowPackage] = useState<number | null>(null);


  const handleClick = (index: number) => {
    setShowPackage(index);
  };

  useEffect(() => {
    if (btn1Ref.current) {
      dispatch({ type: 'setactiveBtnService', payload: btn1Ref });
      dispatch({ type: 'setshowpackage', payload: btn1Ref });
    }
  }, [dispatch, btn1Ref]);

  // Function to render buttons
  const renderButton = (ref: RefObject<HTMLButtonElement>, label: string) => (
    <button
      className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg mobile:px-4 mobile:py-4 xmd:px-6 xmd:py-3 rounded-sm cursor-pointer mobile:text-fz-sm font-dejavu
        ${
          activeBtnServiceId?.current === ref.current
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
    <section className="">
      <main className={`${whiteSpaces.paddingX} `}>
        <Headings
          type="global"
          classname="font-bold xmd:leading-[18px] tracking-tight xmd:pb-3 md:pb-5 lg:pb-8 text-center font-dejavu"
        >
          Select your Package
        </Headings>

        <Paragraph
          type="global"
          classname="font-dejavu xmd:text-fz-xss md:text-fz-sm lg:text-fz-md text-center text-[#848484] xmd:pb-[55px] md:pb-[66px]"
        >
          Select the package you are going for.
        </Paragraph>

        {/* Render buttons */}
        <div className={`grid grid-cols-2 m-auto md:w-2/4 xmd:gap-4 xmd:pb-16`}>
          {renderButton(btn1Ref, 'Hajj Package')}
          {renderButton(btn2Ref, 'Umrah Package')}
        </div>

        {showPackage === btn1Ref && activeBtnServiceId === btn1Ref ? (
          <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
            <PackagesContent
              offcontent="hidden"
              offheight="xmd:h-[1220px] sm:h-[1220px] md:h-[1020px] lg:h-[700px]"
              offmainheight="xmd:min-h-[1200px] md:min-h-[1000px] lg:min-h-[900px]"
              umrah_show="hidden"
              to=""
            />
          </div>
        ) : btn2Ref ? (
          <>
            {umrahCategory.map((batch) =>
              batch.content.map((category, index) => (
                <div key={index} className="flex xmd:gap-4 items-center">
                  <input
                    className={`xmd:w-[18px] xmd:h-[18px]  border-[1px] grid justify-start border-[#848484] ${
                      isShowPackage === index ? 'checkstyle relative' : ''
                    }`}
                    type="checkbox"
                    checked={isShowPackage === index}
                    onClick={() => handleClick(index)}
                  />
                  <UmrahDiv
                    key={`category-${category.id}`}
                    umrahbatch={category.umrahbatches}
                    offstyle="xmd:bg-inherit"
                    linestyle="xmd:text-inherit no-underline"
                  />
                </div>
              ))
            )}

            <div className="grid xmd:grid-cols-1 items-center xmd:gap-8 mobile:grid-flow-row w-full lg:grid-cols-[1fr_1fr_1fr]">
              <PackagesContent
                offcontent="hidden"
                offheight="xmd:h-[1120px] sm:h-[1000px] md:h-[650px] lg:h-[800px]"
                offmainheight="xmd:min-h-[1100px] lg:min-h-[900px]"
                hajj_show="hidden"
                to=""
              />
            </div>
          </>
        ) : null}

        <div className={`mt-14 w-full ${whiteSpaces.paddingX} m-auto`}>
          {' '}
          <span className="flex gap-2 m-auto xmd:justify-center md:justify-end">
            <BtnGlobal
              className="font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg"
              onClick={handlePrevious}
            >
              Previous
            </BtnGlobal>
            <BtnGlobal
              className="font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg"
              onClick={handleNext}
            >
              <span className="flex gap-2 items-center">
                Next <PiGreaterThanLight />
              </span>
            </BtnGlobal>
          </span>
        </div>

        <VipPackageModal />
        <DelauxePackageModal />
        <StandardPackageModal />
      </main>
    </section>
  );
};

export default Step2;
