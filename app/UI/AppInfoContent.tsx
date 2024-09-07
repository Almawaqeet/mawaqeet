import React from 'react';
import { PiGreaterThanLight } from "react-icons/pi";
import { useAppInfo } from '../libs/hooks/useAppInfo';
import BtnGlobal from './BtnGlobal';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

type AppInfoProps = {
    index: number;
};

const AppInfoContent: React.FC<AppInfoProps> = ({ index }) => {
    const { selectedComponent, selectedNumber, handleNext, handlePrevious } = useAppInfo()
    return (
        <React.Fragment>
            <section className='xmd:mt-16'>
                <div className='col-span-3'>
                    {selectedNumber === index && selectedComponent}
                </div>

                {selectedNumber === index && (
                    <div className={`mt-14 w-full ${whiteSpaces.paddingX} m-auto`}>
                        {index > 0 ? (
                            <span className='flex gap-2 m-auto xmd:justify-center'>
                                <BtnGlobal onClick={handlePrevious} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    Previous
                                </BtnGlobal>
                                <BtnGlobal onClick={handleNext} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg'>
                                    <span className='flex gap-2 items-center'>
                                        Next <PiGreaterThanLight />
                                    </span>
                                </BtnGlobal>
                            </span>
                        ) : (
                            <BtnGlobal onClick={handleNext} className='font-dejavu bg-[#4B3938] text-white xmd:px-[27px] xmd:py-[10px] rounded-lg m-auto'>
                                <span className='flex gap-2 items-center'>
                                    Next <PiGreaterThanLight />
                                </span>
                            </BtnGlobal>
                        )}
                    </div>
                )}
            </section>
           
        </React.Fragment>
    )
}

export default AppInfoContent