import { SegregatedTeam } from '@/constants/types';
import { CLIENT_ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TeamProps {
  team: SegregatedTeam;
  theme?: 'light' | 'dark';
}

const Team = ({ theme = 'dark', team }: TeamProps) => {
  const router = useRouter();
  const {
    id = 'Unknown id',
    post = 'Unknown Post',
    fullname = 'Unknown Name',
    company = 'Unknown Company',
    profile = [],
    image = '/placeholder.png',
    view_profile = 'View Profile',
  } = team;

  const postIcons: { [key: string]: string } = {
    'Baba n Madeenah': '★',
    'Ameerul Hajj': '👑',
    'Chief Operating Officer': '💫',
    'Operations Manager': '🌟',
  };

  const postIcon = postIcons[post] || '❓';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.3,
      },
    },
  };

  const themeStyles = {
    light: {
      background: 'bg-white',
      border: 'border-gray-200',
      hoverBorder: 'hover:border-gray-300',
      iconBg: 'bg-gray-50',
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        tertiary: 'text-gray-500',
      },
      badge: 'bg-gray-50',
      button: 'bg-gray-50 hover:bg-gray-100',
    },
    dark: {
      background: 'bg-gray-900',
      border: 'border-gray-700',
      hoverBorder: 'hover:border-gray-600',
      iconBg: 'bg-gray-800',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        tertiary: 'text-gray-400',
      },
      badge: 'bg-gray-800',
      button: 'bg-gray-800 hover:bg-gray-700',
    },
  };

  const styles = themeStyles[theme];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px' }}
      variants={containerVariants}
      className="w-full h-full transform hover:scale-[1.01] transition-all duration-500"
    >
      {/* Image positioned absolutely to overflow */}
      <div className="relative -mb-16 z-10 flex justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={image}
            className="rounded-full border-4 border-white/90 shadow-2xl transform hover:scale-105 transition-all duration-500 object-cover"
            fill
            alt={`${fullname}-image`}
            onError={(e) => {
              e.currentTarget.src = 'error.png';
            }}
          />
        </div>
      </div>

      <div
        className={`${styles.background} p-8 pt-20 rounded-2xl border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl backdrop-blur-sm backdrop-filter`}
      >
        <div className="flex-1 flex flex-col">
          {/* Name and Title Section - Centered */}
          <div className="text-center mb-6">
            <h3
              className={`text-xl md:text-2xl font-bold ${styles.text.primary} mb-2 truncate`}
              title={fullname}
            >
              {fullname}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`${styles.text.primary} text-xl`}>
                {postIcon}
              </span>
              <span
                className={`text-xs md:text-sm font-semibold ${styles.text.tertiary} uppercase tracking-wider`}
              >
                {post}
              </span>
            </div>
            <p
              className={`text-base md:text-lg ${styles.text.secondary} truncate`}
              title={`${company}`}
            >
              {company}
            </p>
          </div>

          {/* Profile Section */}
          <div className="flex-1 min-h-0">
            <div className="h-full overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2">
              {profile.map((item, index) => (
                <div
                  key={`${id}-${index}`}
                  className={`text-sm md:text-base ${styles.text.secondary} p-3 rounded-lg ${styles.iconBg}`}
                >
                  <p className="leading-relaxed line-clamp-4">
                    {item.profile_1}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`w-full py-3 text-sm md:text-base font-semibold ${styles.text.primary} ${styles.button} rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 mt-6`}
            aria-label={`View profile of ${fullname}`}
            onClick={() =>
              router.push(`${CLIENT_ROUTES.PublicPages.about.details(id)}`)
            }
          >
            {view_profile}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
