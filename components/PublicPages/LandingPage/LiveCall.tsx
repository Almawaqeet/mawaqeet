"use client"
import React from 'react';
import { whiteSpaces } from '@/app/libs/utilities/GlobalSpaces';
import AppHeading from '@/Components/Ui/AppHeading';
import Image from 'next/image';
import { IoMdCall } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";

const LiveCall = () => {
  return (
    <section className={`w-full ${whiteSpaces?.paddingX} py-16 bg-brand-color-subtle`}>
      <div className="max-w-4xl mx-auto text-center">
        <AppHeading variant="h2" className="text-3xl md:text-4xl text-center mb-4">
          Want to Learn More About Us?
        </AppHeading>

        <p className="text-brand-color-text mb-8">
          Do you Need More Information About Our Company and Services? Connect with Our Consultants for a Live Session via the Contact Options Below.
        </p>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="https://img.freepik.com/premium-photo/smiling-muslim-man-wearing-kufi_856987-707.jpg"
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
            Lead consultant, Amwakweet
          </p>

          <div className="flex gap-4">
            {['phone', 'whatsapp', 'email'].map((option) => (
              <button
                key={option}
                className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={() => console.log(`Contact via ${option}`)}
              >
                {option === 'phone' && <IoMdCall className="w-6 h-6 text-brand-color-subtle" />}
                {option === 'whatsapp' && <IoLogoWhatsapp className="w-6 h-6 text-brand-color-subtle" />}
                {option === 'email' && <IoMdMail className="w-6 h-6 text-brand-color-subtle" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCall;
