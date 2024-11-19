import React from 'react';

interface UmrahDivProps {
  umrahbatch?: string;
  icon?: React.ReactNode;
  offstyle?: string
  linestyle?: string
}

const UmrahDiv: React.FC<UmrahDivProps> = ({ umrahbatch, icon, offstyle, linestyle }) => {
  return (
    <div className={`rounded-[8px] bg-accordion md:w-full lg:w-3/4 sm:w-full mobile:py-6 md:py-6 lg:py-8 xmd:py-4 px-4 ${offstyle}`}>
      <ul className="flex items-center gap-2">
        <li>{icon}</li>
        <a href="#" className={`text-hover-color underline ${linestyle}`}>
          <li>{umrahbatch}</li>
        </a>
      </ul>
    </div>
  );
};

export default UmrahDiv;
