'use client';

import AppHeading from '@/components/reusables/AppHeading';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function MeetTheTeam() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hoveredMember !== null) {
      setShowOverlay(true);
      timeout = setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    } else {
      setShowOverlay(true);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [hoveredMember]);

  const team = [
    {
      name: "Shaykh Abdullah Ma'ruf Oyelekan.",
      role: 'Baba-n-madeenah',
      video:
        'https://gmri7q7qlz.ufs.sh/f/iymw741EWPk0QrGSR6Np5osRHLe8iuyjdmXDVPJCAfU43w01',
      thumbnail: '/images/ceo-image-placeholder.png',
      bio: 'Expert in pilgrim logistics and coordination',
      achievements:
        'Coordinated logistics for 500+ pilgrims annually, developed innovative pilgrim tracking systems',
    },
    {
      name: 'Shaykh Abdul-Hakeem Abdur-Raheem Al-Kutubi.',
      role: 'Ameerul-Hajj',
      video:
        'https://utfs.io/f/iywkFYKVsyRUWtcoj8ZG2a5m6p9AMqPUzI4OujgdSQlcoXnB',
      thumbnail: '/images/ceo.png',
      bio: '20+ years experience in Hajj and Umrah services',
      achievements:
        'Led over 1000+ successful pilgrimages, certified Hajj guide, fluent in Arabic and English',
    },
  ];

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      className={`w-full ${whiteSpaces?.paddingX} py-8 md:py-24 bg-gray-50`}
    >
      <div className="max-w-7xl mx-auto">
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4 text-center"
        >
          Meet Our Distinguished Team
        </AppHeading>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Our leadership team brings decades of combined experience in Hajj and
          Umrah services. With deep knowledge of Islamic traditions and modern
          logistics, they ensure every pilgrim&apos;s journey is spiritually
          fulfilling and seamlessly organized.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team?.map((member, index) => (
            <div
              key={member.name}
              className="relative group"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="aspect-[16/12] md:aspect-video w-full rounded-xl overflow-hidden bg-gray-100 shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                {hoveredMember === index ? (
                  <div className="relative h-full">
                    <video autoPlay loop className="w-full h-full object-cover">
                      <source src={member?.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <AnimatePresence>
                      {showOverlay && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 flex flex-col justify-end"
                        >
                          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                            {member?.name}
                          </h3>
                          <p className="text-sm md:text-base text-white/90 font-medium mb-1 md:mb-2">
                            {member?.role}
                          </p>
                          <p className="text-xs md:text-sm text-white/80 mb-2">
                            {member?.bio}
                          </p>
                          <p className="text-xs md:text-sm text-white/70 italic">
                            {member?.achievements}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {member?.thumbnail && (
                      <>
                        <Image
                          src={member.thumbnail}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={100}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {member?.name}
                      </h3>
                      <p className="text-sm md:text-base text-white/90">
                        {member?.role}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {hoveredMember === index && showOverlay && (
                  <motion.div
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 rounded-xl flex flex-col justify-end md:hidden"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                      {member?.name}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 font-medium mb-1 md:mb-2">
                      {member?.role}
                    </p>
                    <p className="text-xs md:text-sm text-white/80 mb-2">
                      {member?.bio}
                    </p>
                    <p className="text-xs md:text-sm text-white/70 italic">
                      {member?.achievements}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
