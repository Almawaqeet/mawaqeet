'use client'
import React from 'react'
import Headings from '@/app/libs/utilities/Headings'
import Image, { StaticImageData } from 'next/image'
import Paragraph from '@/app/libs/utilities/Paragraph'
import { about_us_team } from '@/app/contents/about'
import Profile from '@/app/UI/Profile'
import Footer from '@/app/UI/Footer'
import { whiteSpaces } from '@/app/libs/utilities/GlobalSpaces'
import Navbar from '@/app/UI/Navbar'
import { MbisProvider } from '@/app/libs/hooks/useContextProvider'

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
                    <div key={teamMember.id} className={`xmd:grid lg:grid-cols-[1fr_1fr] xmd:grid-rows-1 lg:items-center lg:gap-4 lg:justify-between  xmd:h-[448px] md:h-[620px]  ${whiteSpaces.paddingX} `}>
                        <div className='flex xmd:flex-col lg:justify-center gap-4'>
                            <Headings type='heroHeading' classname='text-white '>{teamMember.fullname}</Headings>
                            <Paragraph type='globalBold' classname='text-Bold-1-clamp xmd:font-normal font-dejavu text-white text-center'>{teamMember.post}</Paragraph>
                        </div>
                        <div className="">
                            <Image src={teamMember.imageProfile} alt={`${teamMember.fullname}'s image`} width={100} height={100} className="object-cover m-auto xmd:absolute lg:static xmd:w-[332px] mobile:w-[400px] md:h-[500px] sm:w-[483px] md:w-[683px] rounded-3xl xmd:left-1/2 transform xmd:-translate-x-1/2 lg:translate-x-0 lg:left-0 xmd:top-1/2 lg:top-0" sizes='w-0' />
                        </div>
                    </div>
                </main>
            </section>

            <Profile key={teamMember.id} team={teamMember} />

            <footer className=''><Footer /></footer>
        </MbisProvider>
    );
};

export default Page;