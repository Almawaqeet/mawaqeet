import React from 'react';
import { PiGreaterThanLight, PiLessThanLight } from "react-icons/pi";
import { useAppInfo } from '../libs/hooks/useAppInfo';
import BtnGlobal from './BtnGlobal';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { MbisProvider } from '../libs/hooks/useContextProvider';

type AppInfoProps = {
    index: number;
};

const AppInfoContent: React.FC<AppInfoProps> = ({ index }) => {
    const { selectedComponent, selectedNumber, handleNext, handlePrevious } = useAppInfo()
    return (
        <MbisProvider>
            <section className='xmd:mt-16'>
                <div className='col-span-3'>
                    {selectedNumber === index && selectedComponent}
                </div>

                {selectedNumber === index && (
                    <div className={`mt-14 w-full ${whiteSpaces.paddingX} m-auto`}>
                        {index === 1 ? (
                            <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
                                <BtnGlobal onClick={handlePrevious} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    Previous
                                </BtnGlobal>
                                <BtnGlobal onClick={handleNext} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    <span className='flex gap-2 items-center'>
                                        Next <PiGreaterThanLight />
                                    </span>
                                </BtnGlobal>
                            </span>
                        ) : index === 2 ? ( 
                        <span className='flex gap-2 m-auto xmd:justify-center md:justify-end'>
                            <BtnGlobal onClick={handlePrevious} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                            <PiLessThanLight /> Previous 
                            </BtnGlobal>
                            <BtnGlobal onClick={handleNext} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                <span className='flex gap-2 items-center'>
                                    Submit
                                </span>
                            </BtnGlobal>
                        </span>) : (
                            <BtnGlobal onClick={handleNext} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg m-auto'>
                                <span className='flex gap-2 items-center'>
                                    Next <PiGreaterThanLight />
                                </span>
                            </BtnGlobal>
                        )}
                    </div>
                )}
            </section>

        </MbisProvider>
    )
}

export default AppInfoContent