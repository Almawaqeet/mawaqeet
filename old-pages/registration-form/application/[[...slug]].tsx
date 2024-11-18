'use client'
import { appForm } from '@/old-pages/contents/payment';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import ComplementNum from '@/old-pages/UI/ComplementNum';
import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import PaymentPage, { PaymentPageSteps } from '../components/PaymentPage';
import AppInfoContent from '@/old-pages/UI/AppInfoContent';
import Footer from '@/old-pages/UI/Footer';
import { useAppInfo } from '@/old-pages/hooks/useAppInfo';



type AppFormProps = {
    pageSlug?: string
}


const ApplicationForm = ({ pageSlug }:AppFormProps) => {
    const { selectedComponent, selectedNumber } = useAppInfo();
    return (
        <div>
            <section className='max-w-[2000px] m-auto'>
                <main className={` xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px]`}>

                    <div className='grid justify-stretch xmd:pb-[55px]'>
                        <div className='grid grid-cols-3 xmd:w-full md:w-2/4 justify-center m-auto xmd:items-center'>
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

                {appForm.map((app,i) => (
                    <React.Fragment key={app.id}>
                        <AppInfoContent index={i} pageSlug={pageSlug} />
                    </React.Fragment>
                ))}
            </section>

            <section className='xmd:mt-[152px]'>
                <Footer />
            </section>
        </div>
    );
};

export default ApplicationForm;
