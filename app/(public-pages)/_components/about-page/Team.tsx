import { SegregatedTeam } from '@/constants/types';
import { CLIENT_ROUTES } from '@/lib/routes';
import Image from 'next/image';
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';
import React from 'react'

interface TeamProps {
    team: SegregatedTeam
    theme?: 'light' | 'dark';
}

const Team = ({ theme = "dark", team }: TeamProps) => {
    const router = useRouter()
    const {
        id = 'Unknown id',
        post = "Unknown Post",
        fullname = "Unknown Name",
        company = "Unknown Company",
        profile = [],
        image = "/placeholder.png",
        view_profile = "View Profile",
    } = team;

    const postIcons: { [key: string]: string } = {
        "Baba n Madeenah": "★",
        "Ameerul Hajj": "👑",
        "Chief Operating Officer": "💫",
        "Operations Manager": "🌟",
    };

    const postIcon = postIcons[post] || "❓";

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.3
            }
        }
    }

    const themeStyles = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            hoverBorder: 'hover:border-gray-300',
            iconBg: 'bg-gray-50',
            text: {
                primary: 'text-gray-900',
                secondary: 'text-gray-700',
                tertiary: 'text-gray-500'
            },
            badge: 'bg-gray-50',
            button: 'bg-gray-50 hover:bg-gray-100'
        },
        dark: {
            background: 'bg-gray-900',
            border: 'border-gray-700',
            hoverBorder: 'hover:border-gray-600',
            iconBg: 'bg-gray-800',
            text: {
                primary: 'text-white',
                secondary: 'text-gray-300',
                tertiary: 'text-gray-400'
            },
            badge: 'bg-gray-800',
            button: 'bg-gray-800 hover:bg-gray-700'
        }
    };

    const styles = themeStyles[theme];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto transform hover:scale-[1.01] transition-all duration-500 h-full"
        >
            <div
                className={`${styles.background} p-8 rounded-2xl border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col h-full shadow-xl hover:shadow-2xl backdrop-blur-sm backdrop-filter`}
            >
                <div className="flex-1 relative flex flex-col">
                    {/* Team Member Image - Moved to top center */}
                    <div className="flex justify-center -mt-16 mb-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <Image
                                src={image}
                                className="rounded-full border-4 border-white/90 shadow-2xl transform hover:scale-105 transition-all duration-500 object-cover"
                                fill
                                alt={`${fullname}-image`}
                                onError={(e) => {
                                    e.currentTarget.src = "error.png";
                                }}
                            />
                        </div>
                    </div>

                    {/* Name and Title Section - Centered */}
                    <div className="text-center mb-8 flex-shrink-0">
                        <h3 className={`text-2xl font-bold ${styles.text.primary} mb-2 truncate hover:text-clip transition-all duration-300`} title={fullname}>
                            {fullname}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className={`${styles.text.primary} text-2xl`}>{postIcon}</span>
                            <span className={`text-sm font-semibold ${styles.text.tertiary} uppercase tracking-wider`}>
                                {post}
                            </span>
                        </div>
                        <p className={`text-lg ${styles.text.secondary} truncate hover:text-clip transition-all duration-300`} title={`${company}`}>
                            {company}
                        </p>
                    </div>

                    {/* Profile Section */}
                    <div className="space-y-4 mb-8 flex-1">
                        {profile.map((item, index) => (
                            <div key={`${id}-${index}`} className={`text-base ${styles.text.secondary} p-4 rounded-lg ${styles.iconBg}`}>
                                <p className="leading-relaxed">
                                    {item.profile_1}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={`w-full py-4 text-base font-semibold ${styles.text.primary} ${styles.button} rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 mt-auto`}
                    aria-label={`View profile of ${fullname}`}
                    onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.about.details(id)}`)}>
                    {view_profile}
                </button>
            </div>
        </motion.div>
    );
}

export default Team
