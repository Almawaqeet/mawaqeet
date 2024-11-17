
import React, { ReactElement } from 'react'
import Image from 'next/image';

import { useValidate } from '@/OldPage/hooks/useValidate';
import { MbisProvider } from '@/OldPage/hooks/useContextProvider';
import Navbar from '../../../components/Reusables/Ui/Navbar'
import { whiteSpaces } from '@/OldPage/utilities/GlobalSpaces'
import Headings from '@/OldPage/utilities/Headings'
import Paragraph from '@/OldPage/utilities/Paragraph'
import Footer from '../Footer';



interface FormInterfaceProps {
    heading: string
    sub_heading: string
    children: ReactElement
    mainImage?: string
    layout?: string
    logoImage?: string
}

const FormInterface = ({ heading, sub_heading, children, mainImage, logoImage, layout }: FormInterfaceProps) => {
    return (
        <MbisProvider>
            <Navbar />
            <section className='max-w-[2000px] m-auto '>
                <main className={`${layout} items-center`}>
                    <div className='relative'>
                        <Image
                            src={'/images/regImg.png'}
                            alt='reg-img'
                            height={100}
                            width={100}
                            layout='responsive'
                            className={`md:block xmd:hidden object-contain min-h-dvh min-w-full ${mainImage}`}
                        />
                        <Image
                            src={'/logo.png'}
                            alt='reg-img'
                            height={80}
                            width={80}
                            //   layout='responsive'
                            className={`lg:block xmd:hidden object-contain absolute lg:bottom-5 right-5 md:bottom-auto opacity-50 ${logoImage}`}
                        />
                    </div>

                    <div className={`${whiteSpaces.sectionMargin}  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:pt-16 md:pt-4 xl:mt-16 lg:mt-8`}>
                        <Headings
                            type='global'
                            classname=' text-inherit xmd:pb-4 font-bold   leading-[18px] tracking-tight text-account-clamp'
                        >{heading}</Headings>

                        <Paragraph
                            type='global'
                            classname='text-Bold-1-clamp text-inherit xmd:pb-10  xl:pb-[5.5rem] lg:pb-[2.5rem] md:pb-[1.5rem] tracking-tight font-normal  '
                        >{sub_heading}</Paragraph>

                        {children}
                    </div>

                </main>
                <footer className='mt-24 md:mt-2'>
                    <Footer />
                </footer>
            </section>
        </MbisProvider>
    )
}

export default FormInterface
