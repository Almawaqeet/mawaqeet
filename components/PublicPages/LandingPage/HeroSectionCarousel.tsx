"use client"
import React from 'react';
import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from 'framer-motion';

const HeroSectionCarousel = () => {
  const images = [
    {
      id: 2,
      src: 'https://images.pexels.com/photos/12607981/pexels-photo-12607981.jpeg',
      alt: 'Holy Kaaba exterior view'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/2767864/pexels-photo-2767864.jpeg',
      alt: 'Aerial view of gathering'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/20184064/pexels-photo-20184064/free-photo-of-man-kneeling-and-pilgrims-walking-at-great-mosque-in-mecca.jpeg',
      alt: 'Pilgrims performing Tawaf'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/20184065/pexels-photo-20184065/free-photo-of-great-mosque-in-mecca.jpeg',
      alt: 'Masjid al-Haram exterior'
    },
    {
      id: 1,
      src: 'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg',
      alt: 'Large crowd at holy site'
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden py-4 mb-8 sm:py-8 sm:mb-16"
    >
      {/* Mobile View */}
      <div className="md:hidden">
        <motion.div
          className="relative h-[400px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover shadow-lg transition-all duration-500 hover:shadow-2xl w-full"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          centerMode={true}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative h-[500px] mx-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: (index === 0 || index === Math.floor(images.length / 2) || index === images.length - 1) ? 0.9 : 1.05,
                rotateY: 5,
                filter: "brightness(1.1)"
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover rounded-lg shadow-lg transition-all duration-500
                  ${(index === 0 || index === Math.floor(images.length / 2) || index === images.length - 1)
                    ? 'md:scale-75'
                    : ''} hover:shadow-2xl w-full`}
                sizes="(max-width: 1200px) 50vw, 33vw"
                priority={index === 1}
              />
            </motion.div>
          ))}
        </Carousel>
      </div>
    </motion.section>
  );
};

export default HeroSectionCarousel;
