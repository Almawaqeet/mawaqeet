import { StaticImageData } from 'next/image'
import React from 'react'
import Paragraph from '../utilities/Paragraph'
import { whiteSpaces } from '../utilities/GlobalSpaces'
import Headings from '../utilities/Headings'

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
        <div className={`${whiteSpaces.paddingX} xmd:pt-32 mobile:pt-44 sm:pt-64 lg:pt-20`} key={id}>
            <Headings type='sectionName' classname='text-center xmd:pb-11 lg:pb-20  '>{personality}</Headings>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8   text-justify lg:pb-12"
            >
                {profile_1}
            </Paragraph>

            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8 lg:pb-12   text-justify"
            >
                {profile_2}
            </Paragraph>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 text-justify md:leading-8 xmd:tracking-[0.16px] text-team-clamp xmd:pb-8 lg:pb-12  "
            >
                {profile_3}
            </Paragraph>
            <Paragraph
                type="global"
                classname="font-normal xmd:leading-5 text-justify md:leading-8 xmd:tracking-[0.16px] text-team-clamp  "
            >
                {profile_4}
            </Paragraph>
        </div>
    )
}

export default Profile
