import React, { RefObject, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/reusables/tabs';
import { useTab } from '../hooks/useTab';
import { useMbisContext } from '../hooks/useContextProvider';

const PackageTab = () => {
  const {
    btn1Ref,
    btn2Ref,
    btn3Ref,
    btn4Ref,
    activeBtnServiceId,
    handleButtonClick,
  } = useTab();
  const { state: selectedComponent } = useMbisContext();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTabDisplay, setTabDisplay] =
    useState<RefObject<HTMLButtonElement> | null>(null);

  const renderButton = (
    ref: React.RefObject<HTMLButtonElement>,
    label: string
  ) => (
    <button
      className={`drop-shadow-white-ash md:px-5 md:text-purpose-clamp xmd:text-fz-xsm font-bold md:leading-[50px] tracking-[0.32px] rounded-ee-lg rounded-ss-lg xmd:py-2 xmd:px-2 mobile:px-4 mobile:py-4 mobile:text-fz-sm   ${
        activeBtnServiceId?.current === ref.current
          ? 'bg-hover-color text-white'
          : 'bg-accordion text-[#333333]'
      } transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
      onClick={() => {
        handleButtonClick(ref)();
        setIsActive(false);
        setTabDisplay(ref);
      }}
      ref={ref}
    >
      {label}
    </button>
  );

  return (
    <>
      {selectedComponent && (
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">
              {isTabDisplay === btn1Ref
                ? 'VIP'
                : isTabDisplay === btn2Ref
                  ? 'Delauxe'
                  : isTabDisplay === btn3Ref
                    ? 'Standard'
                    : isTabDisplay === btn4Ref
                      ? 'Saving Scheme'
                      : 'VIP'}
            </TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {isActive && renderButton(btn1Ref, 'VIP')}
            {isActive && renderButton(btn2Ref, 'Delauxe')}
            {isActive && renderButton(btn4Ref, 'Standard')}
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default PackageTab;
