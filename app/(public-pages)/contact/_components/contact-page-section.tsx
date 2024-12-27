'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const ContactPageSection = () => {
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

  const socialVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Get in touch</h2>
            <p className="mt-3 text-lg text-gray-500">
              Have questions about our services? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
            </p>
            <div className="mt-9">
              <motion.div
                className="flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaPhone className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>+234 (091) 15653889</p>
                  <p className="mt-1">Mon-Fri 8am to 6pm WAT</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-6 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaEnvelope className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>almawaqeettravelsandtours@gmail.com</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-6 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  {/* <p>MAKTABAT DAARILHADITH SHOP NO 20/21 KOLEOSO PLAZA, KOLAWOLE AREA, SAKI USTADH YUUSUF MURTADAH AL-MUJAHIDUN</p> */}
                  <p className="mt-1">Oyo State, Nigeria</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-6 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaBuilding className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>Main Office</p>
                  <p>MAKTABAT DAARILHADITH SHOP NO 20/21 KOLEOSO PLAZA, KOLAWOLE AREA, SAKI USTADH YUUSUF MURTADAH AL-MUJAHIDUN</p>
                  {/* <p className="mt-1">Central Business District</p> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="mt-12 md:mt-0" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Office Hours</h2>
            <div className="mt-3">
              <motion.p
                className="text-lg text-gray-500"
                whileHover={{ x: 5 }}
              >
                Monday - Friday: 8:00 AM - 6:00 PM
              </motion.p>
              <motion.p
                className="text-lg text-gray-500"
                whileHover={{ x: 5 }}
              >
                Saturday: 9:00 AM - 1:00 PM
              </motion.p>
              <motion.p
                className="text-lg text-gray-500"
                whileHover={{ x: 5 }}
              >
                Sunday: Closed
              </motion.p>
            </div>
            <div className="mt-9">
              <h3 className="text-lg font-medium text-gray-900">Follow us on social media</h3>
              <div className="mt-4 flex space-x-6">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebookF className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
