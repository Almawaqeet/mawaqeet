'use client'
import React from 'react'
import Headings from '../utilities/Headings'
import Contact from '../UI/Contact'
import { whiteSpaces } from '../utilities/GlobalSpaces'
import Footer from '../UI/Footer'
import { MbisProvider } from '../hooks/useContextProvider'
import Navbar from '../../components/reusables/Navbar'

const ContactUs: React.FC = () => {
    return (
        <MbisProvider>
            <Navbar />
            <section className=' max-w-[2000px]  m-auto relative lg:pb-96 md:pb-[40rem] sm:pb-[46rem] xmd:pb-[50rem]'>
                <main className='bg-personality bg-contain bg-blend-normal  md:pb-0'>
                    <main className='  h-screen m-auto flex items-center justify-center flex-col '>
                        <Headings type='heroHeading' classname='text-white  xmd:pb-3 text-center'>Contact Us</Headings>
                        <Headings type='heading_1' classname='text-white text-center'>Contact us using any of the medium below</Headings>
                    </main>
                </main>

                <main className='w-3/4 xmd:mt-14 md:mt-0'>
                    <Contact
                        bgColor='bg-white'
                        bgRound='bg-[#FFEFDD]'
                        textColor='text-hover-color'
                        btnColor='text-white drop-shadow-transparent shadow-lg'
                        lineColor='bg-[#87592A]'
                        headingColor='text-[#333333]'
                        position='xmd:absolute xmd:left-1/2 xmd:transform xmd:-translate-x-1/2 md:-mt-44'
                    />
                </main>


            </section>
            <footer className={`${whiteSpaces.sectionMargin} md:pt-6 xmd:pt-12 relative`}>
                <Footer />
            </footer>
        </MbisProvider>
    )
}

export default ContactUs
