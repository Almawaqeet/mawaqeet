"use client"
import React from 'react';
import SlantDiv from '../UI/SlantDiv';

import ServiceTab from '../UI/ServiceTab';

import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';
import Footer from '../UI/Footer';



const Services: React.FC = () => {


  return (
    <section className="relative">
      <main className="xmd:max-w-[575px] mobile:max-w-[1000px] m-auto sm:max-w-[900px] md:max-w-[1200px] lg:max-w-[2000px] mb-4">
        <div className={`${whiteSpaces.paddingX} ${whiteSpaces.sectionMargin}`}>
          <SlantDiv className="xmd:before:w-[60px]">
            <Headings type="sectionName" classname="text-center font-dejavu">
              Our Services
            </Headings>
          </SlantDiv>

          <div >
            <ServiceTab />
          </div>
        </div>
      </main>
      <section className={` ${whiteSpaces.sectionMargin} mt-6`}>
        <Footer />
      </section>
    </section>
  );
};

export default Services;
