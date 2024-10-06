import { StaticImageData } from 'next/image'
import React from 'react'
import Paragraph from '../libs/utilities/Paragraph'
import { whiteSpaces } from '../libs/utilities/GlobalSpaces'
import Headings from '../libs/utilities/Headings'

interface TeamMembers {
    id: string,
    image: StaticImageData
    fullname: string,
    personality?: string,
    profile_1: string,
    profile_2: string,
    profile_3: string,
    profile_4?: string,
}

interface ProfileProps {
    team: TeamMembers
}

const Profile: React.FC<ProfileProps> = ({ team }) => {
    const { id, profile_1, profile_2, profile_3, profile_4, personality } = team
    return (
        <div className={`${whiteSpaces.paddingX} xmd:pt-44 sm:pt-60 md:pt-[22rem] lg:pt-20 pb-[150px]`} key={id}>
            <Headings type='sectionName' classname='text-center xmd:pb-11 lg:pb-20 font-dejavu'>{personality}</Headings>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8 font-dejavu text-left lg:pb-12"
            >
                {profile_1}
            </Paragraph>

            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8 lg:pb-12 font-dejavu text-center"
            >
                {profile_2}
            </Paragraph>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 text-center md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8 lg:pb-12 font-dejavu"
            >
                {profile_3}
            </Paragraph>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 text-center md:leading-8 xmd:tracking-[0.16px] text-team-clamp font-dejavu"
            >
                {profile_4}
            </Paragraph>
        </div>
    )
}

export default Profile