'use client'
import AppHeading from '@/components/reusables/AppHeading'
import { about_us_team } from '@/old-pages/contents/about'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import React from 'react'
import Team from './Team'
import TeamCarousel from './TeamCarousel'

const OurTeam = () => {
   
    return (
        <section className={`w-full ${whiteSpaces?.paddingX} py-16 max-w-7xl mx-auto`}>
            <AppHeading
                variant="h2"
                className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-14 text-center"
            >
                Meet Our Team
            </AppHeading>

            <aside>
                <main className='md:grid md:grid-cols-2 xmd:hidden gap-6'>
                    {about_us_team.map((team, idx) => (
                        <Team team={team} theme='light' key={idx} />
                    ))}
                </main>

                <main className='md:hidden'>
                   <TeamCarousel />
                </main>
            </aside>
        </section>
    )
}

export default OurTeam