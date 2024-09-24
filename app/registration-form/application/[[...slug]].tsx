'use client'
import { appForm } from '@/app/contents/payment';
import { whiteSpaces } from '@/app/libs/utilities/GlobalSpaces';
import ComplementNum from '@/app/UI/ComplementNum';
import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import PaymentPage, { PaymentPageSteps } from '../components/PaymentPage';
import AppInfoContent from '@/app/UI/AppInfoContent';
import Footer from '@/app/UI/Footer';
import { useAppInfo } from '@/app/libs/hooks/useAppInfo';



type AppFormProps = {
    pageSlug?: string
}


const ApplicationForm = ({ pageSlug }:AppFormProps) => {
    const { selectedComponent, selectedNumber } = useAppInfo();
    return (
        <div>
            <section className='max-w-[2000px] m-auto'>
                <main className={`${whiteSpaces.paddingX}`}>

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
