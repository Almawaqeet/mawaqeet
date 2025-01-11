'use client';

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaBuilding,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import { FaBoxOpen } from 'react-icons/fa6';
import Link from 'next/link';
import { IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io5';

export const ContactPageSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className={`max-w-7xl mx-auto ${whiteSpaces.paddingX} w-full mb-8`}>
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-10">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Get in touch
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Have questions about our services? We&apos;re here to help. Send
              us a message and we&apos;ll respond as soon as possible.
            </p>
            <div className="mt-2">
              <motion.div
                className="flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaPhone
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>+234 (091) 15653889</p>
                  <p>+966 (563) 776239</p>
                  <p className="mt-1">Mon-Fri 8am to 6pm WAT</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-2 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaEnvelope
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>support@almawaqeet.com</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-2 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p className="mt-1">Oyo State, Nigeria</p>
                </div>
              </motion.div>
              <motion.div
                className="mt-2 flex hover:bg-gray-50 p-4 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaBuilding
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 text-base text-gray-500 mb-4">
                      <p className="text-xl mb-2">Head Office</p>
                      <p>
                        Ansaarus-Sunnah Avenue by Rogunjoye Street, off
                        Lukosi-Simawa,Simawa, Ogun State, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaBoxOpen
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="ml-3 text-base text-gray-500 mb-4">
                      <p className="text-xl mb-2">Branch Offices</p>
                      <div className="flex flex-col gap-2">
                        <li className="list-disc">
                          Ansaarus-Sunnah Avenue by Rogunjoye Street, off
                          Lukosi-Simawa,Simawa, Ogun State, Nigeria.
                        </li>
                        <li className="list-disc">
                          Khubz Bakery & Grills Along Igbe-Olaja Road,
                          Igbe-Laara last, Ikorodu, Lagos State.
                        </li>
                        <li className="list-disc">
                          No.3, Agric Area. Along Old Jebba Road, Off Federal
                          Ministry of Agric, Znago Road, Ilorin, Kwara State.
                        </li>
                        <li className="list-disc">
                          C1&amp; C3 King&apos;s Shopping Mail, Behind Petrocam
                          Filling Station, Old ife Road, Alaki Airport Junction,
                          Ibadan, Oyo State.
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="mt-12 md:mt-0" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Office Hours
            </h2>
            <div className="mt-3">
              <motion.p className="text-lg text-gray-500" whileHover={{ x: 5 }}>
                Monday - Friday: 8:00 AM - 6:00 PM
              </motion.p>
              <motion.p className="text-lg text-gray-500" whileHover={{ x: 5 }}>
                Saturday: 9:00 AM - 1:00 PM
              </motion.p>
              <motion.p className="text-lg text-gray-500" whileHover={{ x: 5 }}>
                Sunday: Closed
              </motion.p>
            </div>
            <div className="mt-9">
              <h3 className="text-lg font-medium text-gray-900">
                Follow us on social media
              </h3>
              <div className="mt-4 flex space-x-6">
                <motion.a
                  href="https://www.facebook.com/people/Al-mawaqeet-Tour/61570372806546/"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Facebook</span>
                  <Link
                    href="https://www.facebook.com/people/Al-mawaqeet-Tour/61570372806546/"
                    target="_blank"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <FaFacebookF
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/almawaqeetcompany254/"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Instagram</span>
                  <Link
                    href="https://www.instagram.com/almawaqeetcompany254/"
                    target="_blank"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Visit our Instagram page"
                  >
                    <FaInstagram
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.a>
                <motion.a
                  href="https://x.com/AlMawaqeet41790"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Twitter</span>
                  <Link
                    href="https://x.com/AlMawaqeet41790"
                    target="_blank"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Visit our Twitter page"
                  >
                    <FaTwitter
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/company/almawaqeet"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <Link
                    href="https://www.linkedin.com/company/almawaqeet"
                    target="_blank"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Visit our Twitter page"
                  >
                    <IoLogoLinkedin
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.a>
                <motion.a
                  href="https://www.youtube.com/@Al-mawaqeetTravelsandTours"
                  className="text-gray-400 hover:text-gray-500"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="sr-only">Youtube</span>
                  <Link
                    href="https://www.youtube.com/@Al-mawaqeetTravelsandTours"
                    target="_blank"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Visit our Twitter page"
                  >
                    <IoLogoYoutube
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
