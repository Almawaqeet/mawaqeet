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
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const themeStyles = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            hoverBorder: 'hover:border-gray-300',
            iconBg: 'bg-gray-100',
            text: {
                primary: 'text-gray-900',
                secondary: 'text-gray-600',
                tertiary: 'text-gray-500'
            },
            badge: 'bg-gray-100',
            button: 'hover:bg-gray-100'
        },
        dark: {
            background: 'bg-[#1A1A1A]',
            border: 'border-[#333333]',
            hoverBorder: 'hover:border-[#666666]',
            iconBg: 'bg-[#333333]',
            text: {
                primary: 'text-white',
                secondary: 'text-[#CCCCCC]',
                tertiary: 'text-[#666666]'
            },
            badge: 'bg-[#333333]',
            button: 'hover:bg-[#333333]'
        }
    };

    const styles = themeStyles[theme];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
        >
            <div
                className={`${styles.background} p-6 rounded-lg border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col h-full`}
            >
                <div className="flex-1 relative">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                            <span className={styles.text.primary}>{postIcon}</span>
                        </div>
                        <span className={`text-sm ${styles.text.tertiary} uppercase`}>
                            {post}
                        </span>
                    </div>

                    <h3 className={`text-lg font-semibold ${styles.text.primary} mb-1 truncate`} title={fullname}>
                        {fullname}
                    </h3>
                    <p className={`text-2xl font-bold ${styles.text.primary} mb-4 truncate`} title={`${post}, ${company}`}>
                        {`${post}, ${company}`}
                    </p>

                    <ul className="space-y-4">
                        {profile.map((item, index) => (
                            <li key={`${id}-${index}`} className={`text-sm ${styles.text.secondary} flex items-start gap-2`}>
                                <div className="flex flex-col gap-2">
                                    {
                                        <p key={`${id}+${index}`}>{item.profile_1}</p>

                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <Image
                            src={image}
                            className="absolute md:-right-7 md:-top-9 -top-6 -right-6 rounded-full"
                            width={50}
                            height={50}
                            alt={`${fullname}-image`}
                            onError={(e) => {
                                e.currentTarget.src = "error.png";
                            }}
                        />
                    </div>
                </div>

                <button
                    className={`w-full mt-6 py-2 text-sm font-medium ${styles.text.primary} bg-transparent border ${styles.border} rounded ${styles.button} transition-colors duration-300`}
                    aria-label={`View profile of ${fullname}`}
                    onClick={() => router.push(`${CLIENT_ROUTES.PublicPages.about.details(id)}`)}>
                    {view_profile}
                </button>
            </div>
        </motion.div>
    );
}

export default Team