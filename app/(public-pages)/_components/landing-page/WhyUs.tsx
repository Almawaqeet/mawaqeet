"use client"

import React from 'react';
import { motion } from 'framer-motion'
import AppHeading from '@/components/reusables/AppHeading'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import { icon_1, icon_2, icon_3, icon_4 } from '@/public/images';
import Image, { StaticImageData } from 'next/image';

export default function WhyUs() {
    const benefits = [
        {
            id: 1,
            title: "Cleanse your heart and soul",
            description: "Reconnect with Allah (SWT) and let go of life's daily hassles.",
            icon: icon_1 as StaticImageData
        },
        {
            id: 2,
            title: "Hone your faith",
            description: "Learn more about Islam and its important principles.",
            icon: icon_2 as StaticImageData
        },
        {
            id: 3,
            title: "Make friends for life",
            description: "Get to know Muslims from every place, all united by faith.",
            icon: icon_3 as StaticImageData
        },
        {
            id: 4,
            title: "Find absolute peace",
            description: "Experience the true peace and quiet in Makkah and Madinah.",
            icon: icon_4 as StaticImageData
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section className={`w-full bg-[#1A1A1A] py-16 ${whiteSpaces.paddingX}`}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <div className="mb-12">
                    <AppHeading
                        variant="h2"
                        className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 font-bold text-left"
                    >
                        Experience the Divine Journey
                    </AppHeading>
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed text-left">
                        Have you ever wished to experience the peace and calm of being close to Allah in the
                        holiest cities of Islam, Makkah and Madinah? Experience the life-changing journey of Hajj and Umrah, the fifth pillar of Islam. Enjoy the joy of prayer at the Prophet&apos;s Mosque and the sense of togetherness with Muslims worldwide. They&apos;re big chances for personal growth and feeling closer to God.
                    </p>
                    <p className="text-gray-400 text-xl font-medium text-left">
                        They offer you the chance to:
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {benefits?.map((benefit) => (
                        <motion.div
                            key={benefit.id}
                            variants={itemVariants}
                            className="bg-[#2A2A2A] p-8 rounded-xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-700/50"
                        >
                            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gray-800/50 rounded-full">
                                {benefit.icon && (
                                    <Image
                                        src={benefit.icon}
                                        width={40}
                                        height={40}
                                        alt={benefit.title}
                                        quality={100}
                                        className="w-12 h-12 text-gray-200 group-hover:scale-110 transition-transform duration-300 object-contain"
                                    />
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-200 mb-4 group-hover:text-white transition-colors text-left">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed text-left">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
