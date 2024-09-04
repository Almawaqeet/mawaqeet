import React from 'react';
import useAppInfo from '../libs/hooks/useAppInfo'; 
import BtnGlobal from './BtnGlobal';
import Paragraph from '../libs/utilities/Paragraph';
import { appForm } from '../contents/payment';
import Headings from '../libs/utilities/Headings';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const AppInfo = () => {
    const { selectedNumber, selectedComponent, handleNext, handlePrevious } = useAppInfo();

    return (
        <div>
            <section className='max-w-[2000px] m-auto'>
                <main className={`${whiteSpaces.paddingX}`}>
                    <Headings type='global' classname='font-bold xmd:leading-[18px] tracking-tight xmd:pb-3 md:pb-5 lg:pb-8 text-center font-dejavu'>
                        Application Form
                    </Headings>

                    <Paragraph type='global' classname='font-dejavu xmd:text-fz-xss md:text-fz-sm lg:text-fz-md text-center text-[#848484] xmd:pb-[55px] md:pb-[66px]'>
                        Provide all the required Information
                    </Paragraph>

                    <div className='flex xmd:gap-8 md:gap-[50px] xmd:justify-center md:justify-start'>
                        {appForm.map((app, i) => (
                            <div className='flex flex-col' key={app.id}>
                                <div
                                    className={`xmd:px-4 xmd:py-3 rounded-sm cursor-pointer ${selectedNumber === i ? 'bg-hover-color text-white' : 'bg-white'}`}
                                >
                                    <Paragraph type='global' classname={`text-quote-clamp font-normal xmd:text-center md:text-start leading-5 tracking-tight font-dejavu`}>
                                        {app.content}
                                    </Paragraph>
                                </div>

                                {selectedComponent}

                                {selectedNumber === i && (
                                    <div className='mt-4'>
                                        {i > 0 ? (
                                            <span className='flex gap-2'>
                                                <BtnGlobal onClick={handlePrevious} className='font-dejavu bg-blue-500 text-white px-4 py-2 rounded'>
                                                    Previous
                                                </BtnGlobal>
                                                <BtnGlobal onClick={handleNext} className='font-dejavu bg-blue-500 text-white px-4 py-2 rounded'>
                                                    Next
                                                </BtnGlobal>
                                            </span>
                                        ) : (
                                            <button onClick={handleNext} className='font-dejavu bg-blue-500 text-white px-4 py-2 rounded'>
                                                Next
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </section>
        </div>
    );
};

export default AppInfo;
