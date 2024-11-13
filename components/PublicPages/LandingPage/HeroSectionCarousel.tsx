"use client"
import React from 'react';
import Image from 'next/image';
import { whiteSpaces } from '@/app/libs/utilities/GlobalSpaces';

const HeroSectionCarousel = () => {
  const images = [
    {
      id: 1,
      src: '/images/hero/crowd1.jpg',
      alt: 'Large crowd at holy site'
    },
    {
      id: 2,
      src: '/images/hero/kaaba1.jpg',
      alt: 'Holy Kaaba exterior view'
    },
    {
      id: 3,
      src: '/images/hero/tawaf1.jpg',
      alt: 'Pilgrims performing Tawaf'
    },
    {
      id: 4,
      src: '/images/hero/masjid1.jpg',
      alt: 'Masjid al-Haram exterior'
    },
    {
      id: 5,
      src: '/images/hero/crowd2.jpg',
      alt: 'Aerial view of gathering'
    }
  ];

  return (
    <section className={`${whiteSpaces.paddingX} relative overflow-hidden`}>
      <div className="flex gap-4 justify-center items-center">
        {images?.map((image) => (
          <div
            key={image.id}
            className="relative w-[200px] h-[300px] overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSectionCarousel;
