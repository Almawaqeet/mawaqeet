import AppHeading from '@/components/reusables/AppHeading'
import { about_main_body } from '@/old-pages/contents/about'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import Paragraph from '@/old-pages/utilities/Paragraph'
import React from 'react'

const page = () => {
    return (
        <section className={`flex min-h-dvh items-center justify-center flex-col py-16 ${whiteSpaces.paddingX}`}>
            <div>
                <AppHeading variant='h1' className=' text-H1-text-color mb-4'>About Us</AppHeading>
            </div>

            <div className=' mb-8'>
                {about_main_body?.map((itm) => (
                    <Paragraph type='global' key={itm.id} classname='text-base sm:text-lg text-brand-color-text mb-8 sm:mb-12 max-w-[1000px] px-2 text-left sm:text-center'>{itm.about_main_content}</Paragraph>
                ))}
            </div>

            <div className='relative overflow-hidden w-full pt-[56.25%]'>
                <iframe className='absolute inset-0 w-full h-full bg-black opacity-35'></iframe>
            </div>

        </section>
    )
}

export default page
