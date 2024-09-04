import React from 'react'
import { CiBank } from "react-icons/ci";
import { IoMdCopy } from "react-icons/io";

import { paymentDetails } from '../contents/payment'
import Paragraph from '../libs/utilities/Paragraph'
import BtnGlobal from './BtnGlobal';
import Footer from './Footer';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const PayInfo = () => {
    return (
        <>
            <section className='max-w-[2000px] m-auto'>
                <div className={`${whiteSpaces.paddingX} xmd:pb-[87px] md:pb-[145px]`}>
                    <div className={`bg-[#F8F8F8] drop-shadow-transparent shadow-lg xmd:px-5  `}>
                        <main className='xmd:pt-[17px] md:pt-[58px] '>
                            {paymentDetails.map((details, index) => (
                                <div key={index} className=''>
                                    <Paragraph type='global' classname={`font-dejavu xmd:pb-14 md:pb-20 lg:pb-[99px] tracking-tight ${index === 0 ? 'xmd:text-fz-xsm lg:text-fz-mz md:text-fz-md  xmd:font-bold md:leading-[18px]' : index === 1 ? 'text-center xmd:text-fz-xss leading-3 md:text-fz-md md:leading-[18px]  xmd:font-bold lg:text-fz-mz xmd:pb-7 md:pb-8' : index === 2 ? 'font-normal xmd:text-fz-xss leading-[18px] text-center md:text-fz-md md:leading-[18px] lg:text-fz-mz font-dejavu xmd:pb-7 md:pb-8' : index === 3 ? 'xmd:font-normal  text-hover-color  xmd:text-fz-xs text-center tracking-tight leading-[18px] md:text-fz-md lg:text-fz-mz xmd:pb-7 md:pb-[65px] font-dejavu' : index === 4 ? 'xmd:text-fz-xss leading-[14px]  font-normal font-dejavu tracking-tight md:text-fz-sm lg:text-fz-md text-center' : ''}`}>
                                        {index === 1 ? <span key={`${index}-bank`}>
                                            <CiBank className='text-center xmd:h-[49.84px] xmd:w-[49.5px] md:h-[99.33px] md:w-[98.68px] text-hover-color m-auto xmd:pb-4 md:pb-8' />
                                            {details.content}
                                        </span> : index === 4 ? <span key={`${index}-copy`} className='flex xmd:gap-1 md:gap-5 justify-center items-center flex-row-reverse'>
                                            <IoMdCopy className='text-center xmd:h-5 xmd:w-5 md:h-8 md:w-8 text-hover-color' />
                                            {details.content}
                                        </span> : details.content}
                                    </Paragraph>


                                </div>
                            ))}

                            <div className='m-auto  xmd:pb-14'>
                                <BtnGlobal className='font-dejavu xmd:py-[10px] xmd:px-[78px] md:py-4 md:px-[108px] m-auto text-white text-center rounded-lg bg-[#4B3938]'>Paid</BtnGlobal>
                            </div>
                        </main>


                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </section>
        </>
    )
}

export default PayInfo