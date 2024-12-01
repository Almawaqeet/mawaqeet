"use client"

import AppHeading from "@/components/reusables/AppHeading"
import { whiteSpaces } from "@/old-pages/utilities/GlobalSpaces"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

export default function MeetTheTeam() {
    const [hoveredMember, setHoveredMember] = useState<number | null>(null)

    const team = [
        {
            name: "John Doe",
            role: "CEO & Founder",
            video: "https://videos.pexels.com/video-files/5935119/5935119-hd_1080_1920_25fps.mp4",
            thumbnail: "/images/team/john-doe.jpg", // Add actual thumbnail path
            bio: "20+ years experience in Hajj and Umrah services"
        },
        {
            name: "Jane Smith",
            role: "Operations Director",
            video: "https://videos.pexels.com/video-files/16182080/16182080-hd_1080_1920_30fps.mp4",
            thumbnail: "/images/team/jane-smith.jpg", // Add actual thumbnail path
            bio: "Expert in pilgrim logistics and coordination"
        }
    ]

    const slideVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <section className={`w-full ${whiteSpaces?.paddingX} py-8 md:py-24`}>
            <div className="max-w-7xl mx-auto">
                <AppHeading
                    variant="h2"
                    className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-16 text-center"
                >
                    Meet The Team Behind Your Journey
                </AppHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {team?.map((member, index) => (
                        <div
                            key={member.name}
                            className="relative"
                            onMouseEnter={() => setHoveredMember(index)}
                            onMouseLeave={() => setHoveredMember(null)}
                        >
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
                                {hoveredMember === index ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={member.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="relative w-full h-full">
                                        {member.thumbnail && (
                                            <Image
                                                src={member.thumbnail}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <p className="text-white font-medium bg-brand-color/80 px-4 py-2 rounded-lg">
                                                Hover to meet {member.name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <AnimatePresence>
                                {hoveredMember === index && (
                                    <motion.div
                                        variants={slideVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl"
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-white/90 font-medium mb-2">
                                            {member.role}
                                        </p>
                                        <p className="text-sm text-white/80">
                                            {member.bio}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
