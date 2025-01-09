'use client';
import React from 'react';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import AppHeading from '@/components/reusables/AppHeading';
import Image from 'next/image';
import { IoMdCall } from 'react-icons/io';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { IoMdMail } from 'react-icons/io';
import {leadconsultantalmawaqeet } from '@/public/images';

const LiveCall = () => {
  return (
    <section
      className={`w-full ${whiteSpaces?.paddingX} px-[10px] py-16 bg-brand-color-subtle`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <AppHeading
          variant="h2"
          className="text-3xl md:text-4xl text-center mb-4"
        >
          Want to Learn More About Us?
        </AppHeading>

        <p className="text-brand-color-text mb-8">
          Do you Need More Information About Our Company and Services? Connect
          with Our Consultants for a Live Session via the Contact Options Below.
        </p>

        <div className="flex flex-col items-center">
          <div className="w-44 h-44 rounded-full overflow-hidden mb-4 bg-brand-color-white">
            <Image
              src={leadconsultantalmawaqeet}
              alt="Lead Consultant"
              className="w-full h-full object-cover rounded-full"
              width={100}
              height={100}
              quality={100}
            />
          </div>

          <h3 className="text-xl font-semibold mb-1">
            Dr. Abdulrahman Abdulilahi
          </h3>

          <p className="text-brand-color-text text-center mb-6">
            Lead consultant, Almwakweet
          </p>

          <div className="flex gap-4">
            {['phone', 'whatsapp', 'email'].map((option) => (
              <button
                key={option}
                className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={() => console.log(`Contact via ${option}`)}
                aria-label={`Contact via ${option}`}
              >
                {option === 'phone' && (
                  <a href='tel:+234 807 445 6704'>
                  <IoMdCall className="w-6 h-6 text-brand-color-subtle" />
                  </a>
                )}
                {option === 'whatsapp' && (
                  <a href="https://wa.me/2348074456704" target="_blank" rel="noopener noreferrer">
                  <IoLogoWhatsapp className="w-6 h-6 text-brand-color-subtle" />
                  </a>
                )}
                {option === 'email' && (
                  <IoMdMail className="w-6 h-6 text-brand-color-subtle" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCall;
