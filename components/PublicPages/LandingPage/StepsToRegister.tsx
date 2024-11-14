"use client"




import React from 'react';
import { motion } from 'framer-motion';
import AppHeading from '@/Components/Reusables/Ui/AppHeading';
import { whiteSpaces } from '@/OldPage/utilities/GlobalSpaces';

const StepsToRegister = () => {
  const steps = [
    {
      id: 1,
      title: 'Find a Package',
      description: 'Explore our range of Hajj and Umrah packages tailored to different budgets and preferences. Each package includes everything you need for a worry-free spiritual journey.'
    },
    {
      id: 2,
      title: 'Select Payment Plan',
      description: 'Choose your preferred payment method - either full payment or installments. Our flexible options make it convenient for your budget.'
    },
    {
      id: 3,
      title: 'Submit Your Details',
      description: 'Fill out a quick form with your personal and passport details. Our automation helps us handle your booking and personalize your experience.'
    },
    {
      id: 4,
      title: 'Pay For Your Booking',
      description: 'Securely process your payment through our trusted payment gateway. Your booking is confirmed instantly upon successful payment.'
    },
    {
      id: 5,
      title: 'Receive Your Itinerary',
      description: "You'll receive a detailed itinerary with flight schedules, accommodation, and transportation information. You'll also g et a comprehensive guide to help you prepare for your journey."
    },
    {
      id: 6,
      title: 'Begin Your Journey',
      description: 'With everything set, all you need to do is pack your bags. Our support team will be there to support you every step of the way.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className={`w-full ${whiteSpaces?.paddingX} py-4 md:py-16`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center mb-14"
      >
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4"
        >
          Our Booking Process is Hassle Free!
        </AppHeading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {steps?.map((step) => (
          <motion.div
            key={step.id}
            variants={itemVariants}
            className="bg-[#EAE2D9] hover:bg-[#F2EDE8] p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-8 flex items-center justify-center bg-brand-color text-white rounded-full text-sm font-semibold">
                {step.id}
              </span>
              <h3 className="text-lg font-semibold text-brand-color">{step.title}</h3>
            </div>
            <p className="text-brand-color-text text-sm">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StepsToRegister;
