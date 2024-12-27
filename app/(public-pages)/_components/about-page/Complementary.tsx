'use client';
import { motion } from 'framer-motion';
import AppHeading from '@/components/reusables/AppHeading';
import { thumbnail } from '@/public/images';
import Image from 'next/image';
import React from 'react';
import { complementary_services } from '@/old-pages/contents/services';

const Complementary = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row items-center justify-between mb-16">
          <AppHeading variant="h2">Complementary Services</AppHeading>
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={thumbnail}
              fill
              alt="thumbnail"
              quality={100}
              className="object-contain"
            />
          </div>
        </header>

        <div className="space-y-20">
          {/* First Tier Section */}
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-brand-color pl-4">
              First Tier: Tours and Seminar
            </h3>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {complementary_services.map(
                (itm) =>
                  itm.id === 'bold' &&
                  itm.highlights.map((boldItem, index) => (
                    <motion.div
                      key={`${boldItem.id}-${index}`}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${index === 2 && 'sm:hidden md:block'}`}
                    >
                      {boldItem.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={boldItem.image}
                            fill
                            alt={boldItem.id}
                            quality={100}
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-color to-transparent mb-6" />

                        {boldItem.highlight && (
                          <h4 className="text-xl font-semibold text-brand-color mb-3">
                            {boldItem.highlight}
                          </h4>
                        )}
                        {boldItem.note && (
                          <p className="text-gray-600 leading-relaxed">
                            {boldItem.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
              )}
            </div>
          </section>

          {/* Second Tier Section */}
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-brand-color pl-4">
              Second Tier: Academics and Admission
            </h3>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {complementary_services.map(
                (itm) =>
                  itm.id === 'complement' &&
                  itm.highlights.map((boldItem, index) => (
                    <motion.div
                      key={`${boldItem.id}-${index}`}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${index === 2 && 'sm:hidden md:block'}`}
                    >
                      {boldItem.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={boldItem.image}
                            fill
                            alt={boldItem.id}
                            quality={100}
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-color to-transparent mb-6" />

                        {boldItem.highlight && (
                          <h4 className="text-xl font-semibold text-brand-color mb-3">
                            {boldItem.highlight}
                          </h4>
                        )}
                        {boldItem.note && (
                          <p className="text-gray-600 leading-relaxed">
                            {boldItem.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Complementary;
