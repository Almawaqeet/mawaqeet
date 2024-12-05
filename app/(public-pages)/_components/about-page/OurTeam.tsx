import AppHeading from '@/components/reusables/AppHeading'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import React from 'react'

const OurTeam = () => {
    return (
        <section className={`w-full ${whiteSpaces?.paddingX} py-16 max-w-7xl mx-auto`}>
            <AppHeading
                variant="h2"
                className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4 text-center"
            >
                Meet Our Team
            </AppHeading>

            <aside>

            </aside>
        </section>
    )
}

export default OurTeam