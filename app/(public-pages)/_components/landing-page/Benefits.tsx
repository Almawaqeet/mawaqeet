'use client';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import AppHeading from '@/components/reusables/AppHeading';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import { icon_2, icon_3, people, vector } from '@/public/images/index';


export default function Benefits() {

  const benefits = [
    {
      icon: vector as StaticImageData,
      title: 'Begin Your Sacred Journey',
      description:
        'Take the first step towards a transformative spiritual experience with our meticulously planned Hajj and Umrah packages, designed to nurture your soul.',
    },
    {
      icon: people as StaticImageData,
      title: 'Navigate with Confidence',
      description:
        'Our experienced team handles everything from visa processing to accommodations, while providing spiritual guidance to enrich your pilgrimage experience.',
    },
    {
      icon: icon_3 as StaticImageData,
      title: 'Journey Your Way',
      description:
        'Whether you prefer luxury or simplicity, our flexible packages adapt to your preferences and budget, ensuring a comfortable and meaningful pilgrimage.',
    },
    {
      icon: icon_2 as StaticImageData,
      title: 'Experience Excellence',
      description:
        'Let our dedicated team and knowledgeable guides elevate your journey, combining spiritual enlightenment with seamless logistics for a truly blessed experience.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={`w-full ${whiteSpaces?.paddingX} py-16`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <AppHeading
            variant="h2"
            className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4 text-center"
          >
            Your Journey to Divine Connection
          </AppHeading>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every Muslim dreams of answering Allah&apos;s call to His sacred
            house. At Al-Mawaqeet Travels and Tours, we make this divine journey
            accessible, comfortable, and profoundly meaningful.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {benefits?.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-[#F2EDE8] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-brand-color/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-color/20 transition-colors">
                <Image src={benefit.icon} height={50} width={50} alt="icons" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
