"use client"
import React from 'react'
import { about_hero, about_main_body, } from '../contents/about';
import Image from 'next/image';

import SlantDiv from '../UI/SlantDiv';

import TeamContent from '../UI/TeamContent';
import Services from '../UI/Services';
import Hero from '../UI/Hero'; 
import Headings from '../libs/utilities/Headings';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { MbisProvider } from '../libs/hooks/useContextProvider';
import Navbar from '../UI/Navbar';

const AboutUsStaticPage = () => {
    return (
        <MbisProvider>
            <Navbar />
            <section className="xmd:max-w-[2000px] m-auto">
                <Hero
                    heading={<Headings type={'heroHeading'}>About Us</Headings>}
                    subheading={about_hero.map((subhead) => (
                        <Headings type={'BrandText'} key={`head-${subhead.id}`} classname='font-dejavu'>
                            {subhead.hero_content}
                        </Headings>
                    ))}
                    CTA={'Get in touch'}
                    subCTA="Explore"
                    to='/contact-us'
                   id='#team'
                />
            </section>

            <section className={`pb-[150px]`}>
                <SlantDiv className={'xmd:before:w-[60px] '}>
                    <Headings type={'sectionName'} classname="text-center font-dejavu">
                        About Us
                    </Headings>
                </SlantDiv>

                <div className={`${whiteSpaces.paddingX} ${whiteSpaces.paddingY}`}>
                    <div className="xmd:gap-4 xmd:grid mobile:grid-cols-1 sm:grid-cols-[1fr_1fr] relative col-reverse items-center ">
                        <div className="sm:absolute sm:w-100 sm:left-1/3 lg:right-0 lg:w-8/12">
                            <div className="sm:bg-[#f7f7f7] rounded-lg sm:drop-shadow-trans-white sm:shadow-sm sm:px-8 sm:py-4 sm:flex sm:items-center sm:justify-between ">
                                <div>
                                    <Image
                                        src={'/images/vector.png'}
                                        className="text-white drop-shadow-white-ash shadow-sm sm:w-[70px] sm:h-[50px] md:h-[100px] md:w-[100px] lg:w-[200px] xmd:hidden sm:block"
                                        alt='vector'
                                        width={70}
                                        height={50}
                                        layout='responsive'
                                    />
                                </div>
                                {about_main_body.map((main) => (
                                    <Headings
                                        type={'BrandText'}
                                        key={`main-${main.id}`}
                                        classname="sm:leading-6 md:leading-8 font-dejavu"
                                    >
                                        {main.about_main_content}
                                    </Headings>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Image
                                src={'/images/about_1.png'}
                                alt='about_1'
                                className="rounded-lg drop-shadow-white-ash shadow-sm xmd:w-full relative -z-10 sm:h-72"
                                width={100}
                                height={72}
                                layout='responsive'
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={`pb-[150px]`} id='team'>
                <SlantDiv className={'xmd:before:w-[70px]'}>
                    <Headings type={'sectionName'} classname="text-center  font-dejavu">
                        Meet Our Team
                    </Headings>
                </SlantDiv>

                <main>
                    <TeamContent />
                </main>
            </section>

            <section className={``} id='service-section'>
                <main>
                    <Services />
                </main>
            </section>
        </MbisProvider>
    );
};

export default AboutUsStaticPage;
