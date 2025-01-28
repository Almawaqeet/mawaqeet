'use client';
import AppHeading from '@/components/reusables/AppHeading';
import { TeamEmptyState } from '@/components/reusables/PackagesEmptyState';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { about_us_team } from '@/old-pages/contents/about';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import { CLIENT_ROUTES } from '@/lib/routes';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';

const SingularTeam = ({ id }: { id: string }) => {
  const router = useRouter();
  const teamMember = about_us_team.find((itm) => itm.id === id);

  if (!teamMember) return <TeamEmptyState />;

  const { fullname, personality, imageProfile, profile } = teamMember;

  return (
    <section className='pt-10'>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="relative min-h-[40rem] sm:min-h-[20rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent z-10" />
        <div className="bg-static-image absolute inset-0 bg-cover bg-center transform scale-105 hover:scale-110 transition-transform duration-1000" />

        <div
          className={`relative z-20 h-full max-w-7xl mx-auto ${whiteSpaces.paddingX}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between h-full py-8 sm:py-16 gap-8 sm:gap-12">
            <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <AppHeading
                  variant="h2"
                  className="text-4xl sm:text-5xl md:text-6xl text-white font-bold drop-shadow-lg"
                >
                  {fullname}
                </AppHeading>
                <p className="text-xl sm:text-2xl text-gray-100 mt-4 sm:mt-6 max-w-2xl leading-relaxed font-light drop-shadow mx-auto md:mx-0">
                  {personality}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 relative group">
                <Image
                  src={imageProfile}
                  fill
                  className="rounded-3xl object-cover shadow-2xl border-4 border-white/30 group-hover:border-white/50 transition-all duration-300 transform group-hover:scale-105"
                  quality={100}
                  alt={fullname}
                  priority
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div
        className={`max-w-7xl mx-auto ${whiteSpaces.paddingX} py-12 sm:py-20`}
      >
        <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {profile.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-white p-6 sm:p-10 duration-300 rounded-xl shadow-md hover:shadow-lg"
            >
              {Object.values(item).map((detail, i) => (
                <p
                  key={i}
                  className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-4 sm:mb-6 last:mb-0"
                >
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push(CLIENT_ROUTES.PublicPages.about.parallel)}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 px-6 sm:px-8 py-3 sm:py-4 bg-brand-color text-white rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 hover:bg-brand-color/90 transition-all duration-300 z-50"
      >
        <FaArrowLeft className="text-lg sm:text-xl" />
        <span className="font-semibold text-base sm:text-lg">Back to Team</span>
      </motion.button>
    </div>
    </section>
  );
};

export default SingularTeam;
