'use client';

import React from 'react';
import AppButton from '@/components/reusables/AppButton';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import AppHeading from '@/components/reusables/AppHeading';
import { PiBookOpenThin } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import { CLIENT_ROUTES } from '@/lib/routes';
import Partners from '@/app/(public-pages)/_components/landing-page/Partners';

export const HeroSection = () => {
  const router = useRouter();

  const QuoteCard = () => {
    const verses = [
      {
        ref: 'Q2/197',
        text: 'Hajj is [during] well-known months, so whoever has made Hajj obligatory upon himself therein [by entering the state of ihram], there is [to be for him] no sexual relations and no disobedience and no disputing during Hajj.',
      },
      {
        ref: 'Q3/97',
        text: 'And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way.',
      },
      {
        ref: 'Q2/196',
        text: "And complete the Hajj and 'Umrah for Allah. But if you are prevented, then [offer] what can be obtained with ease of sacrificial animals.",
      },
    ];

    const [currentVerseIndex, setCurrentVerseIndex] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [verses.length]);

    return (
      <motion.div className="hidden md:flex flex-col md:flex-row items-center gap-2 xmd:mb-8 sm:mb-4 bg-[#D9CBBA] rounded-full p-2 border-[0.2px] border-brand-color-main hover:scale-105 transition-transform duration-300 w-full md:w-[500px] group">
        <div className="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-2 w-full md:w-auto">
          <PiBookOpenThin className="w-4 h-4 md:w-5 md:h-5 text-[#875929]" />
          <span className="text-xs md:text-sm text-[#875929] font-medium">
            {verses[currentVerseIndex].ref}
          </span>
        </div>
        <motion.div
          key={currentVerseIndex}
          className="relative w-full md:w-auto"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ duration: 0.05, ease: 'easeOut' }}
        >
          <span className="text-xs md:text-sm text-[#665544] line-clamp-1 px-2">
            {verses[currentVerseIndex].text.substring(0, 70)}...
          </span>
          <div className="hidden group-hover:block absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg z-10 max-w-[300px] md:max-w-[400px]">
            <span className="text-xs md:text-sm text-[#665544]">
              {verses[currentVerseIndex].text}
            </span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section
      className={`w-full max-w-[6000px] m-auto ${whiteSpaces?.paddingX} py-4 sm:py-8 md:py-[80px] flex  justify-center`}
    >
      <div className="flex flex-col items-start sm:items-center text-left sm:text-center w-full max-w-[800px]">
        <QuoteCard />

        <div className="w-full">
          <AppHeading
            variant="h1"
            align="left"
            className="w-full mb-4 sm:mb-6 text-brand-color text-2xl sm:text-3xl md:text-4xl sm:text-center"
          >
            We offer flexible payment plans for Hajj and Umrah tours, with great
            support at every step of your pilgrimage.
          </AppHeading>
        </div>

        <p className="text-base sm:text-lg text-brand-color-text mb-8 sm:mb-12 max-w-[700px] px-2 text-left sm:text-center">
          Start your holy journey with us today. We make it easy - pay all at
          once or in smaller payments. Our team will help you every step of the
          way, from planning to completing your pilgrimage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 w-full sm:w-auto px-4">
          <AppButton
            icon={<IoMdArrowRoundForward className="w-4 h-4 sm:w-5 sm:h-5" />}
            onClick={() =>
              router.push(`${CLIENT_ROUTES.PublicPages.onboarding.newUser}`)
            }
            className="w-full sm:w-auto"
          >
            Get Started
          </AppButton>

          <AppButton
            variant="secondary"
            iconPosition="start"
            icon={<FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />}
            onClick={() =>
              router.push(`${CLIENT_ROUTES.PublicPages.about.index}`)
            }
            className="w-full sm:w-auto"
          >
            Learn more
          </AppButton>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-center w-full">
          <FaCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-brand-color" />
          <p className="text-xs font-semibold sm:text-sm text-brand-color text-center">
            Cancel payments anytime!
          </p>
        </div>


      <div className="w-full mt-12">
        <Partners />
      </div>
      </div>
    </section>
  );
};
