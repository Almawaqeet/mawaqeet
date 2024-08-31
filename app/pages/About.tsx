"use client"
import React from 'react'
import { about_hero, about_main_body,  } from '../contents/about';
import Image from 'next/image';

import SlantDiv from '../UI/SlantDiv';

import TeamContent from '../UI/TeamContent';
import Services from './Services';
import Hero from '../UI/Hero'; // Correct import
import Headings from '../libs/utilities/Headings';
import Paragraph from '../libs/utilities/Paragraph';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';

const About = () => {
  return (
    <>
      <section className="xmd:max-w-[2000px] m-auto pb-6">
        <Hero
          heading={<Headings type={'heroHeading'}>About Us</Headings>}
          subheading={about_hero.map((subhead) => (
            <Headings type={'heading_1'} key={`head-${subhead.id}`}>
              {subhead.hero_content}
            </Headings>
          ))}
          CTA={'Get in touch'}
          subCTA="Book a call"
        />
      </section>

      <section className={`${whiteSpaces.sectionMargin} pb-6`}>
        <SlantDiv className={'xmd:before:w-[60px] '}>
          <Headings type={'sectionName'} classname="text-center">
            About Us
          </Headings>
        </SlantDiv>

        <div className={`${whiteSpaces.paddingX} ${whiteSpaces.paddingY}`}>
          <div className="xmd:gap-5 xmd:grid mobile:grid-cols-1 sm:grid-cols-[1fr_1fr] relative col-reverse items-center ">
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
                  <Paragraph
                    type={'global'}
                    key={`main-${main.id}`}
                    classname="font-normal xmd:text-fz-xsm leading-5 tracking-tight text-justify md:w-11/12 lg:w-9/12 font-dejavu lg:text-fz-mz md:text-fz-sm md:leading-8 lg:leading-[45px]"
                  >
                    {main.about_main_content}
                  </Paragraph>
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

      <section className={`${whiteSpaces.sectionMargin}`}>
        <SlantDiv className={'xmd:before:w-[70px]'}>
          <Headings type={'sectionName'} classname="text-center ">
            Meet Our Team
          </Headings>
        </SlantDiv>

        <main>
          <TeamContent  />
        </main>
      </section>

      <section className={`${whiteSpaces.sectionMargin}`}>
        <main>
          <Services />
        </main>
      </section>
    </>
  );
};

export default About;
