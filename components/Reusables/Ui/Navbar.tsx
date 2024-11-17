"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBarsStaggered } from 'react-icons/fa6';
import { LiaTimesSolid } from 'react-icons/lia';
import AppButton from '@/components/Reusables/Ui/AppButton';
import { brandColors } from '@/constants/brand-constants';
import { IoMdArrowRoundForward } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';




interface NavItem {
  id: string;
  content: string;
}

// Logo Component
const Logo = () => (
  <Link href="/">
    <motion.li
      className="flex gap-2 mobile:gap-3 tab_md:gap-[4px] items-center group relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={'/images/logo.png'}
        className="mobile:w-7 mobile:h-7 lg:w-10 lg:h-10 tab_md:w-8 tab_md:h-7"
        alt="Brand Logo"
        width={28}
        height={28}
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0, x: -20 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden lg:group-hover:block absolute left-full ml-2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Al-Mawaqeet Travels and Tours
      </motion.div>
    </motion.li>
  </Link>
);

interface DesktopNavLinksProps {
  navItems: NavItem[];
  activeItem: string;
  setActiveItem: (id: string) => void;
}

// Desktop Navigation Links Component
const DesktopNavLinks = ({ navItems, activeItem, setActiveItem }: DesktopNavLinksProps) => (
  <div className="flex items-center justify-center ml-6 lg:gap-12 md:gap-10">
    {navItems?.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveItem(item.id)}
        className={`mobile:hidden xmd:hidden tab_md:block hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer ${
          item.id === activeItem
            ? 'text-hover-color font-bold'
            : `text-${brandColors.dark_brown}`
        }`}
      >
        <Link href={`/${item.id}`}>
          {item.content}
        </Link>
      </li>
    ))}
  </div>
);

interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavMenu = ({ isOpen, navItems, activeItem, setActiveItem, setIsOpen }: MobileNavMenuProps) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed z-10 w-full md:w-[80%] bg-white min-h-svh h-screen max-h-[1000px] overflow-y-scroll drop-shadow-white-ash lg:hidden tab_md:hidden right-0 top-16"
      >
        <motion.ul
          className="text-fz-xs font-normal gap-6 flex flex-col justify-start items-center relative mt-8 p-6"
          initial="closed"
          animate="open"
          variants={{
            open: {
              transition: {
                staggerChildren: 0.1
              }
            },
            closed: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
        >
          {navItems?.map((item) => (
            <motion.li
              key={item.id}
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: 20, opacity: 0 }
              }}
              onClick={() => {
                setActiveItem(item.id);
                setIsOpen(false);
              }}
              className={`mobile:block w-full text-center tab_md:hidden hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] p-3 cursor-pointer border-b border-gray-100 ${
                item.id === activeItem
                  ? 'text-hover-color font-bold'
                  : `text-${brandColors.dark_brown}`
              }`}
            >
              <Link href={`/${item.id}`}>
                {item.content}
              </Link>
            </motion.li>
          ))}

          <motion.div
            variants={{
              open: { y: 0, opacity: 1 },
              closed: { y: 20, opacity: 0 }
            }}
            className="w-full flex justify-center pt-4"
          >
            <Link href={'/login'} className="w-full flex justify-center">
              <AppButton
                className="text-fz-xs w-full"
                icon={<IoMdArrowRoundForward />}
                onClick={() => {router.push('/onboarding/new-user')}}
              >
                Get Started
              </AppButton>
            </Link>
          </motion.div>
        </motion.ul>
      </motion.div>
    )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname === '/' ? '/' : pathname.slice(1));
  const router = useRouter();
  const navItems: NavItem[] = [
    { id: '/', content: 'Home' },
    { id: 'about', content: 'About' },
    { id: 'packages', content: 'Packages' },
    { id: 'contact', content: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active item when pathname changes
  useEffect(() => {
    setActiveItem(pathname === '/' ? '/' : pathname.slice(1));
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <section className={`xmd:max-w-[375px] mobile:max-w-[700px] sm:max-w-[900px] lg:max-w-[2000px] tab_md:max-w-[1500px] m-auto relative z-50`}>
      <nav className={`xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px] xmd:h-16 lg:h-[80px] tab_md:h-16 ${hasScrolled ? 'bg-white drop-shadow-white-ash shadow-md' : ''} grid my-auto fixed top-0 right-0 w-full z-50`}>
        <ul className="flex justify-between items-center lg:gap-12 md:gap-10 text-navbar-clamp font-normal md:leading-5">
          <Logo />

          <DesktopNavLinks
            navItems={navItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          <div className="flex justify-end items-center">
            <Link href={'/onboarding/new-user'}>
              <AppButton
                className="mobile:hidden xmd:hidden tab_md:flex font-bold"
                icon={<IoMdArrowRoundForward className="w-6 h-4" />}
                onClick={() => router.push('/onboarding/new-user')}
              >
                Get Started
              </AppButton>
            </Link>

            <button
              className={`drop-shadow-white-ash bg-${brandColors.dark_brown} flex justify-end rounded-[5px] p-1 tab_md:hidden z-20 mr-[-10px]`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <LiaTimesSolid className={`w-8 h-5 text-${brandColors.white}`} />
              ) : (
                <FaBarsStaggered className={`w-8 h-5 text-${brandColors.white}`} />
              )}
            </button>
          </div>
        </ul>
      </nav>

      <MobileNavMenu
        isOpen={isOpen}
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setIsOpen={setIsOpen}
      />
    </section>
  );
};

export default Navbar;
