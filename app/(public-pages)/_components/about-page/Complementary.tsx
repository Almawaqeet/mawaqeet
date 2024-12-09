'use client'
import { motion } from 'framer-motion';
import AppHeading from '@/components/reusables/AppHeading'
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces'
import { thumbnail } from '@/public/images'
import Image from 'next/image'
import React from 'react'
import { complementary_services } from '@/old-pages/contents/services';

const Complementary = () => {
    return (
        <section className={`w-full ${whiteSpaces?.paddingX} py-8 md:py-24 bg-gray-50 `}>
            <div className='max-w-7xl mx-auto'>
                <main className="text-center mb-14 w-full flex  items-center justify-between">
                    <AppHeading
                        variant="h2"
                        className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4 text-center"
                    >
                        Complementary Services
                    </AppHeading>
                    <div className="flex items-center justify-center">
                        <Image src={thumbnail} width={50} height={50} alt='thumnail' quality={100} />
                    </div>
                </main>

                <aside className='flex flex-col gap-16'>
                    <div>
                        <p className="text-start text-gray-700 max-w-2xl mb-6 text-2xl font-bold">
                            First Tier: Tours and Seminar
                        </p>

                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {complementary_services.map((itm) =>
                                itm.id === "bold" &&
                                itm.highlights.map((boldItem, index) => (
                                    <motion.div
                                        key={`${boldItem.id}-${index}`}
                                        whileHover={{ scale: 1.02 }}
                                        className={`bg-[#F9F4EF] hover:bg-[#F4EEE9] p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${index === 2 && 'sm:hidden md:block'}`}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Image Section */}
                                            {boldItem.image && (
                                                <div className="w-full">
                                                    <Image
                                                        src={boldItem.image}
                                                        width={150}
                                                        height={150}
                                                        alt={boldItem.id}
                                                        quality={100}
                                                        className="rounded-lg object-cover w-full"
                                                    />
                                                </div>
                                            )}

                                            {/* Divider */}
                                            <div className="border-t-2 border-brand-color w-full my-4"></div>

                                            {/* Content Section */}
                                            <div className="text-center">
                                                {boldItem.highlight && (
                                                    <h3 className="text-xl font-semibold text-brand-color mb-2">
                                                        {boldItem.highlight}
                                                    </h3>
                                                )}
                                                {boldItem.note && (
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {boldItem.note}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    <div>

                    <p className="text-start text-gray-700 max-w-2xl mb-6 text-2xl font-bold">
                            Second Tier: Academics and Admission
                        </p>

                        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {complementary_services.map((itm, index) =>
                                itm.id === "complement" &&
                                itm.highlights.map((boldItem, index) => (
                                    <motion.div
                                        key={`${boldItem.id}-${index}`}
                                        whileHover={{ scale: 1.02 }}
                                        className={`bg-[#F9F4EF] hover:bg-[#F4EEE9] p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${index === 2 && 'sm:hidden md:block'}`}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Image Section */}
                                            {boldItem.image && (
                                                <div className="w-full">
                                                    <Image
                                                        src={boldItem.image}
                                                        width={150}
                                                        height={150}
                                                        alt={boldItem.id}
                                                        quality={100}
                                                        className="rounded-lg object-cover w-full"
                                                    />
                                                </div>
                                            )}

                                            {/* Divider */}
                                            <div className="border-t-2 border-brand-color w-full my-4"></div>

                                            {/* Content Section */}
                                            <div className="text-center">
                                                {boldItem.highlight && (
                                                    <h3 className="text-xl font-semibold text-brand-color mb-2">
                                                        {boldItem.highlight}
                                                    </h3>
                                                )}
                                                {boldItem.note && (
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {boldItem.note}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default Complementary