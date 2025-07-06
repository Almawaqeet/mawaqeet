'use client';
import React from 'react';
import Link from 'next/link';
import { FiFacebook } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5';
import Image from 'next/image';

import { brand } from '@/old-pages/contents/navbar';
import {
  footerContent,
  footerText,
  useful_Links,
} from '@/old-pages/contents/footer';
import Headings from '@/old-pages/utilities/Headings';
import { IoLogoLinkedin } from 'react-icons/io';

const Footer: React.FC = () => {
  return (
    <footer
      className={`bg-black  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] py-12`}
    >
      <div
        className={`max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12`}
      >
        {/* Brand & Description */}
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo1.png"
              alt="Brand Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            {brand.map((itm) => (
              <Headings
                key={`itm-${itm.id}`}
                type="BrandText"
                classname="text-xl text-white font-semibold"
              >
                {itm.brand}
              </Headings>
            ))}
          </Link>

          {footerText.map((text) => (
            <p
              key={`foot-${text.id}`}
              className="text-gray-200 text-sm leading-relaxed"
            >
              {text.text}
            </p>
          ))}
        </div>

        {/* Useful Links */}
        <div className="space-y-8">
          {footerContent.map((cont) => (
            <h3
              key={`${cont.id}-cont`}
              className="text-white font-semibold text-lg"
            >
              {cont.content_2}
            </h3>
          ))}

          <ul className="space-y-4">
            {useful_Links.map((link) =>
              link.usefulLinks.map((itm, i) => (
                <li key={`${itm.id}-itms`}>
                  <Link
                    href={
                      i === 4
                        ? '/#faqs'
                        : `${i === 0 ? '/' : i === 1 ? '/about' : i === 2 ? '/contact' : i === 3 ? '/packages' : '#'}`
                    }
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {itm.content}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-8">
          {footerContent.map((itm) => (
            <h3
              key={`${itm.id}-cont`}
              className="text-white font-semibold text-lg"
            >
              {itm.content_3}
            </h3>
          ))}

          <div className="flex gap-6 items-center">
            <Link
              href="https://www.facebook.com/people/Al-mawaqeet-Tour/61570372806546/"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Visit our Facebook page"
            >
              <FiFacebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://x.com/AlMawaqeet41790"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Visit our Twitter page"
            >
              <BsTwitterX className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.instagram.com/almawaqeetcompany254/"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Visit our Instagram page"
            >
              <IoLogoInstagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/almawaqeet"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Visit our LinkedIn page"
            >
              <IoLogoLinkedin className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.youtube.com/@Al-mawaqeetTravelsandTours"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
              aria-label="Visit our Youtube page"
            >
              <IoLogoYoutube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`max-w-7xl w-full mt-12`}>
        <div className="border-t border-gray-500 opacity-50 mb-6"></div>
        <div className="flex items-center justify-center gap-4 text-gray-200">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="w-px h-4 bg-gray-400"></span>
          <p className="text-sm">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
