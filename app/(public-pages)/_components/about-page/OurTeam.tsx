'use client';
import AppHeading from '@/components/reusables/AppHeading';
import { about_us_team } from '@/old-pages/contents/about';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import { motion } from 'framer-motion';
import React from 'react';
import Team from './Team';
import TeamCarousel from './TeamCarousel';

const OurTeam = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      className={`w-full ${whiteSpaces?.paddingX} py-16 max-w-7xl mx-auto`}
    >
      <AppHeading
        variant="h2"
        className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-14 text-center"
      >
        Meet Our Team
      </AppHeading>

      <aside>
        <motion.div
          variants={containerVariants}
          className="md:grid md:grid-cols-2 xmd:hidden gap-8"
        >
          {about_us_team.map((team, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-[#F2EDE8] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 xmd:hidden md:block"
              id="team"
            >
              <Team team={team} theme="light" key={idx} />
            </motion.div>
          ))}
        </motion.div>

        <main className="md:hidden">
          <motion.div variants={containerVariants} className="">
            <TeamCarousel />
          </motion.div>
        </main>
      </aside>
    </section>
  );
};

export default OurTeam;
