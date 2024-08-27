import React from 'react';
import BtnGlobal from './BtnGlobal';
import Bullet from './Bullet';

interface PackagesProps<Tdata extends string | number> {
  title_head: Tdata;
  title_intro: Tdata;
  bullets: Tdata[];
  title_conclusion: Tdata;
  className?: string;
  index: number;
}

const Packages = <Tdata extends string | number>({
  title_head,
  title_intro,
  bullets,
  title_conclusion,
  className = '',
  index,
}: PackagesProps<Tdata>) => {
  return (
    <div
      className={`bg-[#F8F8F8] drop-shadow-white-ash xmd:rounded-ee-xl xmd:rounded-ss-xl package flex flex-col xmd:gap-4 relative xmd:py-8 xmd:px-4 group hover:bg-hover-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer ${className}`}
    >
      <h3 className="text-fz-md text-center group-hover:text-accordion">
        {title_head}
      </h3>
      <div className="grid xmd:gap-4 mobile:gap-5">
        <p className="text-team-clamp group-hover:text-accordion">
          {title_intro}
        </p>
        <ul className="flex flex-col gap-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-2 group-hover:text-accordion">
              <Bullet index={idx} /> {bullet}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-team-clamp group-hover:text-accordion">
        {title_conclusion}
      </p>
      <div className="grid m-auto">
        <BtnGlobal
          className={`${
            index === 1 ? 'top-3 relative' : ''
          } rounded-full border-2 border-hover-color bg-white drop-shadow-white-ash shadow-sm hover:bg-number-color hover:border-white px-4 transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]`}
        >
          Select Package
        </BtnGlobal>
      </div>
    </div>
  );
};

export default Packages;
