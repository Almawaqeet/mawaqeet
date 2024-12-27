'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa6';

const InlineNavigation = () => {
  const [showNavigate, setShowNavigate] = useState<boolean>(false);

  const handleScroll = () => {
    setShowNavigate(false);
  };

  useEffect(() => {
    const handleScrollDown = () => {
      const screenHeight = window.scrollY;

      if (screenHeight >= 16) {
        setShowNavigate(true);
      } else {
        setShowNavigate(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScrollDown);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScrollDown);
    };
  }, []);

  const scrollinToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    handleScroll();
  };

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollinToTop}
        className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 px-3 sm:px-4 py-3 sm:py-4 bg-brand-color text-white rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 hover:bg-brand-color/90 transition-all duration-300 z-50 ${
          showNavigate
            ? 'transform translate-y-0'
            : 'transform -translate-y-[1000rem] transition-all duration-1000'
        }`}
      >
        <FaArrowUp className="text-lg sm:text-xl" />
      </motion.div>
    </div>
  );
};

export default InlineNavigation;
