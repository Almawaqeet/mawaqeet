'use client'
import React from 'react'
import Headings from '@/OldPage/utilities/Headings'
import Image, { StaticImageData } from 'next/image'
import Paragraph from '@/OldPage/utilities/Paragraph'
import { about_us_team } from '@/OldPage/contents/about'
import Profile from '@/OldPage/UI/Profile'
import Footer from '@/OldPage/UI/Footer'
import { whiteSpaces } from '@/OldPage/utilities/GlobalSpaces'
import Navbar from '@/components/Reusables/Ui/Navbar'
import { MbisProvider } from '@/OldPage/hooks/useContextProvider'

interface PageProps {
    params: { slug: string | StaticImageData }
}

const Page: React.FC<PageProps> = ({ params }) => {
    const teamMember = about_us_team.find((team) => team.slug === params.slug);

    if (!teamMember) {
        return <div>Team member not found</div>;
    }

    return (
        <MbisProvider>
            <Navbar />
            <section className='max-w-[2000px] m-auto bg-personality xmd:pt-16 lg:pt-0'>
                <main className=' md:pt-0 relative lg:h-screen'>
                    <div key={teamMember.id} className={`xmd:grid lg:grid-cols-[1fr_1fr] xmd:grid-rows-1 lg:items-center lg:gap-16 lg:justify-between  xmd:h-[448px] md:h-[620px]   xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] `}>
                        <div className='xmd:gap-5 flex xmd:flex-col lg:justify-center'>
                            <Headings type='heroHeading' classname='text-white xmd:pt-14'>{teamMember.fullname}</Headings>
                            <Paragraph type='globalBold' classname='text-Bold-1-clamp xmd:font-normal   text-white text-center'>{teamMember.post}</Paragraph>
                        </div>
                        <div className="">
                            <Image src={teamMember.imageProfile} alt={`${teamMember.fullname}'s image`} width={100} height={100} className="object-cover m-auto xmd:absolute lg:static xmd:w-[332px] mobile:w-[400px] md:h-[500px] sm:w-[483px] md:w-[683px] rounded-3xl xmd:left-1/2 transform xmd:-translate-x-1/2 lg:translate-x-0 lg:left-0 xmd:top-1/2 lg:top-0" sizes='w-0' />
                        </div>
                    </div>
                </main>
            </section>

            <Profile key={teamMember.id} team={teamMember} />

            <footer className='xmd:pt-[193px]'><Footer /></footer>
        </MbisProvider>
    );
};

export default Page;
