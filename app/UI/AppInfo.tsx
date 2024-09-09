import React from 'react';
import Headings from '../libs/utilities/Headings';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Paragraph from '../libs/utilities/Paragraph';
import { appForm } from '../contents/payment';
import { MdArrowRightAlt } from "react-icons/md";


import { useAppInfo } from '../libs/hooks/useAppInfo';
import AppInfoContent from './AppInfoContent';
import Footer from './Footer';
import ComplementNum from './ComplementNum';


const AppInfo = () => {
    const { selectedNumber } = useAppInfo()
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


                    <div className='grid justify-stretch'>
                        <div className='grid grid-cols-3 xmd:w-full md:w-2/4  md:items-start xmd:items-center'>
                            {appForm.map((app, i) => (
                                <div className='w-full' key={app.id}>
                                    <span className='flex relative'>

                                        <ComplementNum
                                            className={`xmd:w-[50px] xmd:h-[50px] m-auto cursor-pointer md:grid md:mx-0 relative ${selectedNumber === i ? 'bg-hover-color text-white transition-all' : 'bg-white border-dotted border-2 border-[#333333]'}`}
                                            position={i + 1}
                                        />


                                        {i !== 2 && (
                                            <MdArrowRightAlt
                                                className='absolute top-1/2 text-[82px] left-3/4 transform -translate-y-1/2 m-auto text-[#A0A8AD] md:left-2/4'

                                            />
                                        )}
                                    </span>

                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {appForm.map((app, i) => (
                    <React.Fragment key={app.id}>
                        <AppInfoContent index={i} />
                    </React.Fragment>
                ))}
            </section>

            <section className='xmd:mt-[152px]'>
                <Footer />
            </section>
        </div>
    );
};

export default AppInfo;
