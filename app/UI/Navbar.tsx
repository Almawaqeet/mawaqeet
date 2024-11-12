"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBarsStaggered } from 'react-icons/fa6';
import { LiaTimesSolid } from 'react-icons/lia';
import AppButton from '@/Components/Ui/AppButton';
import { useMbisContext } from '../libs/hooks/useContextProvider';
import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import { brandColors } from '@/Constants/BrandConstants';
import { IoMdArrowRoundForward } from "react-icons/io";
import { LogoProps, DesktopNavLinksProps, NavItem, MobileNavMenuProps, MobileNavListProps, MobileNavItemProps, DispatchAction } from '@/app/types/frontendTypes';




// Logo Component
const Logo: React.FC<LogoProps> = () => (
  <li className="flex gap-2 mobile:gap-3 tab_md:gap-[4px] items-center">
    <Image
      src={'/images/logo.png'}
      className="mobile:w-7 mobile:h-7 lg:w-10 lg:h-10 tab_md:w-8 tab_md:h-7"
      alt="Brand Logo"
      width={28}
      height={28}
    />
  </li>
);

// Desktop Navigation Links Component
const DesktopNavLinks: React.FC<DesktopNavLinksProps> = ({ navItems, activeIndex, dispatch }) => (
  <div className="flex items-center justify-center lg:gap-12 md:gap-10">
    {navItems?.map((item: NavItem) => (
      <li
        key={`nav-${item.id}`}
        onClick={() => {
          dispatch({ type: 'setActiveIndex', payload: item.id });
        }}
        className={`mobile:hidden xmd:hidden tab_md:block hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer ${
          item.id === activeIndex
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

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ isActive, navItems, activeIndex, dispatch, dropdownmobile, arrow, dropdownItems, subNavActiveIndex, navbtn }) => (
  isActive && (
    <div
      className={`fixed z-10 min-h-svh h-screen max-h-[1000px] overflow-y-scroll drop-shadow-white-ash lg:hidden tab_md:hidden right-0 top-16 xmd:left-[20%] translate-x-0 ${
        innerHeight > 1000 ? 'overflow-y-scroll' : 'overflow-y-hidden'
      } ${
        isActive
          ? 'transition-all duration-[1.0s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200] translate-x-0'
          : '-translate-x-[100%] transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200]'
      }`}
    >
      <MobileNavList
        navItems={navItems}
        activeIndex={activeIndex}
        dispatch={dispatch}
        dropdownmobile={dropdownmobile}
        arrow={arrow}
        dropdownItems={dropdownItems}
        subNavActiveIndex={subNavActiveIndex}
        navbtn={navbtn}
      />
    </div>
  )
);

// Mobile Navigation List Component
const MobileNavList: React.FC<MobileNavListProps> = ({ navItems, activeIndex, dispatch, dropdownmobile, arrow, dropdownItems, subNavActiveIndex, navbtn }) => (
  <ul className="text-fz-xs font-normal gap-4 flex flex-col justify-center items-center relative mt-8">
    {navItems?.map((item: NavItem, i: number) => (
      <MobileNavItem
        key={`nav-${item.id}`}
        item={item}
        index={i}
        activeIndex={activeIndex}
        dispatch={dispatch}
        dropdownmobile={dropdownmobile}
        arrow={arrow}
        dropdownItems={dropdownItems}
        subNavActiveIndex={subNavActiveIndex}
      />
    ))}

    <Link href={'/login'}>
      <AppButton
        onClick={() => dispatch({ type: 'togglenavbtn' })}
        className="text-fz-xs"
        icon={<IoMdArrowRoundForward />}
      >
        Get Started
      </AppButton>
    </Link>
  </ul>
);

// Mobile Navigation Item Component
const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, index, activeIndex, dispatch, dropdownmobile}) => (
  <li
    onClick={() => {
      dispatch({ type: 'setActiveIndex', payload: item.id });
      dispatch({ type: 'shownav', payload: false });
    }}
    className={`mobile:block tab_md:hidden hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] p-1 cursor-pointer ${
      item.id === activeIndex
        ? 'text-hover-color font-bold'
        : `text-${brandColors.dark_brown}`
    } ${index === 2 && dropdownmobile ? 'pb-40' : ''}`}
  >
    <Link href={`/${item.id}`}>
      {item.content}
    </Link>
  </li>
);

// Main Navbar Component
const Navbar: React.FC = () => {
  const {
    dispatch,
    state: {
      navbar_bar,
      activeIndex,
      navItems,
      navbtn,
      dropdown,
      dropdownmobile,
      subNavActiveIndex,
      dropdownItems,
      arrow,
      isActive,
    },
  } = useMbisContext();

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleNav = () => {
    dispatch({ type: 'togglenav' });
    dispatch({ type: 'shownav', payload: true });
  };

  return (
    <section className={`xmd:max-w-[375px] mobile:max-w-[700px] sm:max-w-[900px] lg:max-w-[2000px] tab_md:max-w-[1500px] m-auto relative z-50`}>
      <nav className={`${whiteSpaces.paddingX} px-[150px] xmd:h-16 lg:h-[80px] tab_md:h-16 ${hasScrolled ? 'drop-shadow-white-ash shadow-md' : ''} grid my-auto mobile:right-0 xmd:w-full tab_md:relative xmd:fixed xmd:top-0`}>
        <ul className="flex justify-between items-center lg:gap-12 md:gap-10 text-navbar-clamp font-normal md:leading-5">
          <Logo />

          <DesktopNavLinks
            navItems={navItems}
            activeIndex={activeIndex}
            dispatch={dispatch as (action: DispatchAction) => void}
            dropdown={dropdown}
            arrow={arrow}
            dropdownItems={dropdownItems}
            subNavActiveIndex={subNavActiveIndex}
          />

          <div className="flex items-center">
            <Link href={'/login'}>
              <AppButton
                onClick={() => dispatch({ type: 'togglenavbtn' })}
                className="mobile:hidden xmd:hidden tab_md:flex font-bold"
                icon={<IoMdArrowRoundForward className="w-6 h-4" />}
                // loading={true}
              >
                Get Started
              </AppButton>
            </Link>

            <li
              className={`drop-shadow-white-ash bg-${brandColors.dark_brown} rounded-[5px] p-1 tab_md:hidden z-20`}
              onClick={handleToggleNav}
            >
              {navbar_bar ? (
                <LiaTimesSolid
                  className={`transform transition-all duration-220 w-8 h-5 text-${brandColors.white} ${
                    navbar_bar ? 'rotate-225 delay-[500] ease-in-out' : ''
                  } ${isActive ? 'grid m-auto' : ''}`}
                />
              ) : (
                <FaBarsStaggered
                  className={`transform transition-all duration-220 w-8 h-5 text-${brandColors.white} ${
                    navbar_bar ? 'rotate-225 delay-[400] ease-in-out' : ''
                  } ${isActive ? 'relative right-1/2' : ''}`}
                />
              )}
            </li>
          </div>
        </ul>
      </nav>

      <MobileNavMenu
        isActive={isActive}
        navItems={navItems}
        activeIndex={activeIndex}
        dispatch={dispatch as (action: DispatchAction) => void}
        dropdownmobile={dropdownmobile}
        arrow={arrow}
        dropdownItems={dropdownItems}
        subNavActiveIndex={subNavActiveIndex}
        navbtn={navbtn}
      />
    </section>
  );
};

export default Navbar;
