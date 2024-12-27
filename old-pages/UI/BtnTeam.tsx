import React, { ReactNode } from 'react';

interface BtnTeamProps {
  children: ReactNode;
  onClick: () => void;
}

const BtnTeam: React.FC<BtnTeamProps> = ({ children, onClick }) => {
  return (
    <>
      <button
        className="h-[48px] rounded-[100px] border border-logo-color xl:w-[192px] lg:w-[192px] md:w-[150px] sm:w-[130px] mobile:w-[120px]"
        onClick={onClick}
      >
        <p className="font-normal text-fz-sm leading-5 tracking-wide text-center">
          {children}
        </p>
      </button>
    </>
  );
};

export default BtnTeam;
