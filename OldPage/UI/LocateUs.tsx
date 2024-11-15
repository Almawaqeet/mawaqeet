import React from 'react'
import Image from 'next/image'
import BtnGlobal from './BtnGlobal'
import { IoLocationOutline } from 'react-icons/io5'
import { whiteSpaces } from '../utilities/GlobalSpaces'
import Footer from './Footer'

const LocateUs = () => {
    return (
        <section className={`max-w-[2000px] m-auto flex flex-col`}>
            <main className={` grid md:grid-cols-[1fr_minmax(10px,_20px)_1fr] xmd:grid-cols-1 xmd:gap-8 md:gap-2 lg:gap-8  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] ${whiteSpaces.sectionMargin}`}>
                <div className={`flex flex-row-reverse items-center justify-between bg-[#F9F9F9] mobile:p-10 xmd:px-4 xmd:py-4 md:p-8 lg:p-4 rounded-lg rounded-b-none  xmd:mt-9 md:mt-0`}>

                    <div className="flex flex-col xmd:gap-2 md:gap-8 xmd:pb-4 sm:pb-0">
                        <div className='flex justify-between items-center'>
                            <label className="font-semibold xmd:text-fz-sm leading-8 tracking-[0.81px] text-[#333333]  ">
                                Office Address
                            </label>
                            <div
                                className={`bg-[#FFEFDD]  rounded-full sm:h-[70px] sm:w-[70px] mobile:w-[40px] mobile:h-[40px] xmd:w-[40px] xmd:h-[40px]
                                    md:h-[50px]
                                    md:w-[50px]
                                    relative lg:w-[80px] xl:w-[80px] lg:h-[80px]`}
                            >
                                <IoLocationOutline className="text-hover-color absolute left-1/2 transform -translate-x-1/2 top-1/4 xmd:w-[19.2px] xmd:h-[19.2px]
                                sm:w-[24px]
                                sm:h-[24px]

                                md:w-[22px] md:h-[22px] lg:w-[40px] lg:h-[40px]" />
                            </div>
                        </div>
                        <p className="font-normal xmd:text-fz-xss xmd:leading-6 xmd:tracking-tight mobile:text-fz-xsm md:text-fz-sm md:leading-8 md:tracking-[0.18px] text-justify text-[#333333]   ">
                            MAKTABAT DAARILHADITH SHOP NO 20/21 KOLEOSO PLAZA, KOLAWOLE AREA, SAKI USTADH YUUSUF MURTADAH AL-MUJAHIDUN
                        </p>
                        <div>
                            <BtnGlobal className={`bg-white rounded-lg xmd:px-9 xmd:py-3 md:py-[11px] md:px-[35px] grid m-auto items-baseline drop-shadow-transparent shadow-md`}>
                                <h6
                                    className={`font-normal xmd:text-fz-xss leading-8 tracking-[0.14px] text-center  text-hover-color  `}
                                >
                                    Locate Us
                                </h6>
                            </BtnGlobal>
                        </div>
                    </div>
                </div>

                <div
                    className={` border-[0.1px] w-1/4 m-auto md:w-0 md:h-2/3 md:grid bg-[#87592A] `}
                ></div>
                <div className='live-chat relative'>
                    <Image
                        src={'/images/BasemapImage.png'}
                        layout='responsive'
                        width={100}
                        height={100}
                        className='md:h-full'
                        alt='map'
                    />
                </div>
            </main>
            <footer className={`${whiteSpaces.sectionMargin} xmd:pt-6 sm:pt-16 md:pt-0`}>
                <Footer />
            </footer>
        </section>
    )
}

export default LocateUs
