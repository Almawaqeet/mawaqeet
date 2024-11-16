import React, { useEffect } from 'react';
import { PiGreaterThanLight, PiLessThanLight } from "react-icons/pi";
import { useAppInfo } from '../hooks/useAppInfo';
import BtnGlobal from './BtnGlobal';
import { whiteSpaces } from '../utilities/GlobalSpaces';
import { MbisProvider, useMbisContext } from '../hooks/useContextProvider';
import { useRouter } from 'next/navigation';
import { appForm } from '../contents/payment';
import Link from 'next/link';
import { PaymentPageSteps } from '../registration-form/components/PaymentPage';
import { useValidate } from '../hooks/useValidate';

type AppInfoProps = {
    index: number;
    pageSlug?: string
};

const AppInfoContent: React.FC<AppInfoProps> = ({ index }) => {
    const { selectedNumber, handleNext, handlePrevious, } = useAppInfo()

    return (
        <MbisProvider>
            <section className='xmd:mt-[37px]'>

                {selectedNumber === index && (
                    <div className={`mt-14 w-full  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] m-auto`}>
                        {index === 1 ? (
                            <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
                                <BtnGlobal className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg' onClick={handlePrevious}>
                                    Previous
                                </BtnGlobal>
                                <BtnGlobal className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg' onClick={handleNext}>
                                    <span className='flex gap-2 items-center'>
                                        Next <PiGreaterThanLight />
                                    </span>
                                </BtnGlobal>
                            </span>
                        ) : index === 2 ? (
                            <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
                                <BtnGlobal onClick={handlePrevious} className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    <PiLessThanLight /> Previous
                                </BtnGlobal>
                                <BtnGlobal className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    <span className='flex gap-2 items-center'>
                                        Submit
                                    </span>
                                </BtnGlobal>
                            </span>) : (
                            <>
                                <BtnGlobal onClick={handleNext} className='  bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg m-auto'>
                                    <span className='flex gap-2 items-center'>
                                        Next <PiGreaterThanLight />
                                    </span>
                                </BtnGlobal>
                            </>
                        )}
                    </div>
                )}
            </section>

        </MbisProvider>
    )
}

export default AppInfoContent
