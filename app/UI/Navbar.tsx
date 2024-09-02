import React from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Image from 'next/image';


import { brand } from '../contents/navbar';

import BtnGlobal from './BtnGlobal';
import Dropdown from './Dropdown';
import { useMbisContext } from '../libs/hooks/useContextProvider';

import { whiteSpaces } from '../libs/utilities/GlobalSpaces';
import Headings from '../libs/utilities/Headings';

// Define interfaces for the necessary props and state


const Navbar: React.FC = () => {

  const {
    dispatch,
    state:{
    navbar_bar,
    
    activeIndex,
    navItems,
    navbtn,
    dropdown,
    dropdownmobile,
    subNavActiveIndex,
    dropdownItems,
    arrow,
    isActive,}
  } = useMbisContext()
  

  const handleDropdownToggle = () => {
    dispatch({ type: 'toggledropdown', payload:true });
    dispatch({ type: 'toggledropdownmobile', payload:true });
    dispatch({ type: 'togglearrow', payload: true });
  };

  const handleToggleNav = () => {
    dispatch({ type: 'togglenav' });
    dispatch({ type: 'shownav' });
  };

  return (
    <section className="xmd:max-w-[375px] mobile:max-w-[700px] sm:max-w-[900px] lg:max-w-[2000px] tab_md:max-w-[1500px] m-auto relative z-50">
      <nav className={`${whiteSpaces.paddingX} xmd:h-16 lg:h-[80px] tab_md:h-16 drop-shadow-white-ash shadow-md grid my-auto bg-white mobile:right-0 xmd:w-full tab_md:relative xmd:fixed xmd:top-0`}>
        <ul className="flex justify-between items-center font-dejavu lg:gap-12 md:gap-10 text-navbar-clamp font-normal md:leading-5">
          <div>
            <li className="flex gap-2 mobile:gap-3 tab_md:gap-[4px] items-center">
              <Image
              src={'/images/logo.png'}
              className="mobile:w-7 mobile:h-7 lg:w-10 lg:h-10 tab_md:w-8 tab_md:h-7"
                alt="Brand Logo"
                width={28}
                height={28}
               />
               
              {brand.map((itm) => (
                <Headings
                  type="BrandText"
                  key={`itm-${itm.id}`}
                  classname="mobile:text-fz-md"
                >
                  {itm.brand}
                </Headings>
              ))}
            </li>
          </div>

          <div className="flex items-center justify-between lg:gap-12 md:gap-10">
            {navItems.map((item, i) => (
              <li
                key={`nav-${item.id}`}
                onClick={() => {
                  dispatch({ type: 'setActiveIndex', payload: item.id })
                  
                }
                }
                className={`mobile:hidden xmd:hidden tab_md:block hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer ${
                  item.id === activeIndex
                    ? 'text-hover-color'
                    : ' text-[#333333]'
                }`}
              >
                {i === 2 ? (
                  <>
                    <span
                      className="flex gap-[.5px] items-center"
                      onClick={handleDropdownToggle}
                    >
                      {item.content}
                      {arrow ? (
                        <IoIosArrowDown
                          className="md:w-[16px] md:h-[8px] hover:text-hover-color"
                        />
                      ) : (
                        <IoIosArrowUp
                          className="md:w-[16px] md:h-[8px] hover:text-hover-color"
                        />
                      )}
                    </span>
                    {dropdown && (
                      <Dropdown
                        className={`${
                          dropdown
                            ? 'transition-all duration-[1s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[500] translate-y-8'
                            : 'transition-all duration-[1s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[500] translate-y-0'
                        } absolute grid gap-1 pt-4 pb-7 px-4 z-30`}
                      >
                        {dropdownItems.map((itm) => (
                          <ol
                            key={`itm-${itm.id}`}
                            onClick={() => {
                              dispatch({
                                type: 'setSubNavActiveIndex',
                                payload: itm.id,
                              })
                              dispatch({ type: 'toggledropdown', payload:false });
                              dispatch({ type: 'togglearrow', payload:false });
                            }}
                            className={`md:block mobile:hidden text-left hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200] cursor-pointer font-normal text-fz-xss px-7 py-2 items-center font-dejavu ${
                              itm.id === subNavActiveIndex
                                ? 'bg-hover-color text-white hover:text-white'
                                : ' text-[#333333]'
                            }`}
                          >
                            {itm.content}
                          </ol>
                        ))}
                      </Dropdown>
                    )}
                  </>
                ) : (
                  item.content
                )}
              </li>
            ))}

            <BtnGlobal
              onClick={() => dispatch({ type: 'togglenavbtn' })}
              className={`mobile:hidden xmd:hidden tab_md:block text-white font-normal text-navbar-clamp leading-[0.07px] text-center lg:px-4 md:px-4 py-4 transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer hover:bg-hover-color ${
                navbtn ? 'bg-hover-color' : 'bg-logo-color'
              }`}
            >
              Create Account
            </BtnGlobal>
          </div>

          {/* navbar mobile */}
          <li
            className="drop-shadow-white-ash bg-hover-color rounded-[5px] p-1 tab_md:hidden z-20"
            onClick={handleToggleNav}
          >
            {navbar_bar ? (
              <LiaTimesSolid
                className={`transform transition-all duration-220 w-8 h-5 text-white ${
                  navbar_bar ? 'rotate-225 delay-500 ease-in-out' : ''
                } ${isActive ? 'grid m-auto' : ''}`}
              />
            ) : (
              <FaBarsStaggered
                className={`transform transition-all duration-220 w-8 h-5 text-white ${
                  navbar_bar ? 'rotate-225 delay-120 ease-in-out' : ''
                } ${isActive ? 'relative right-1/2' : ''}`}
              />
            )}
          </li>
        </ul>
      </nav>

      {isActive && (
        <div
          className={`fixed z-10 min-h-svh h-screen max-h-[1000px] overflow-y-scroll bg-white drop-shadow-white-ash lg:hidden tab_md:hidden right-0 top-16 xmd:left-[20%] translate-x-0 ${innerHeight > 1000 ? 'overflow-y-scroll': 'overflow-y-hidden'}  ${
            isActive
              ? 'transition-all duration-[1.0s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200] translate-x-0 '
              : '-translate-x-[100%] transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200]'
          }`}
        >
          <ul className="font-dejavu text-fz-xs font-normal gap-4 flex flex-col justify-center items-center relative mt-8">
            {navItems.map((item, i) => (
              <li
                key={`nav-${item.id}`}
                onClick={() =>
                  dispatch({ type: 'setActiveIndex', payload: item.id })
                }
                className={`mobile:block tab_md:hidden hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] p-1 cursor-pointer ${
                  item.id === activeIndex
                    ? 'text-hover-color'
                    : ' text-[#333333]'
                } ${i === 2 && dropdownmobile ? 'pb-40' : ''}`}
              >
                {i === 2 ? (
                  <>
                    <span
                      className="flex gap-[.5px] items-center relative"
                      onClick={handleDropdownToggle}
                    >
                      {item.content}
                      {arrow ? (
                        <IoIosArrowDown
                          className={`md:w-[16px] md:h-[8px] hover:text-hover-color`}
                        />
                      ) : (
                        <IoIosArrowUp
                          className={`md:w-[16px] md:h-[8px] hover:text-hover-color`}
                        />
                      )}
                    </span>

                    {dropdownmobile && (
                      <Dropdown
                      className={`${
                        dropdownmobile
                          ? 'transition-all duration-[1s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[500] translate-y-0'
                          : 'translate-y-[30px]'
                      } tab_md:hidden grid gap-2 pt-2 pb-7 mt-2 px-4 z-30 absolute`}
                    >
                        {dropdownItems.map((itm) => (
                          <ol
                            key={`itm-${itm.id}`}
                            onClick={() => {
                              dispatch({
                                type: 'setSubNavActiveIndex',
                                payload: itm.id,
                              })
                              dispatch({ type: 'toggledropdownmobile', payload:true });
                              dispatch({ type: 'togglearrow', payload: false });
                            }
                            }
                            className={`text-left hover:text-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[200] cursor-pointer font-normal text-fz-xsm px-4 py-2 items-center font-dejavu ${
                              itm.id === subNavActiveIndex
                                ? 'bg-hover-color text-white hover:text-white'
                                : ' text-[#333333]'
                            }`}
                          >
                            {itm.content}
                          </ol>
                        ))}
                      </Dropdown>
                    )}
                  </>
                ) : (
                  item.content
                )}
              </li>
            ))}
            <BtnGlobal
              onClick={() => dispatch({ type: 'togglenavbtn' })}
              className={`text-white font-normal text-fz-xs leading-[0.07px] text-center px-7 transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer hover:bg-hover-color ${
                navbtn ? 'bg-hover-color' : 'bg-logo-color'
              }`}
            >
              Create Account
            </BtnGlobal>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Navbar;
