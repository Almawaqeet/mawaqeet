"use client"

import React from 'react';
import { motion } from 'framer-motion'
import AppHeading from '@/components/reusables/AppHeading'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import { Heart, BookOpen, Users } from 'lucide-react'
import { FaPeace } from 'react-icons/fa'

export default function WhyUs() {
    const benefits = [
        {
            id: 1,
            title: "Cleanse your heart and soul",
            description: "Reconnect with Allah (SWT) and let go of life's daily hassles.",
            icon: Heart
        },
        {
            id: 2,
            title: "Hone your faith",
            description: "Learn more about Islam and its important principles.",
            icon: BookOpen
        },
        {
            id: 3,
            title: "Make friends for life",
            description: "Get to know Muslims from every place, all united by faith.",
            icon: Users
        },
        {
            id: 4,
            title: "Find absolute peace",
            description: "Experience the true peace and quiet in Makkah and Madinah.",
            icon: FaPeace
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
        <section className={`w-full ${whiteSpaces?.paddingX} py-4 md:py-16 pt-16 bg-[#1A1A1A]`}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <div className="text-left md:text-center mb-12">
                    <AppHeading
                        variant="h2"
                        className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 text-left md:text-center"
                    >
                        Experience the Divine Journey
                    </AppHeading>
                    <p className="text-gray-400 max-w-2xl md:mx-auto">
                        Have you ever wished to experience the peace and calm of being close to Allah in the
                        holiest cities of Islam, Makkah and Madinah? Experience the life-changing journey of Hajj and Umrah.
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
                            className="bg-[#2A2A2A] p-6 rounded-lg hover:shadow-lg transition-all duration-300 text-left md:text-center group hover:-translate-y-2 border border-gray-700"
                        >
                            <div className="w-20 h-20 mb-4 md:mx-auto flex items-center justify-center">
                                {benefit.icon && <benefit.icon className="w-12 h-12 text-gray-200 group-hover:text-gray-400 transition-colors" />}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-gray-400">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
