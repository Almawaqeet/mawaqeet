import React from 'react';

interface GuidanceProps {
  heading: string;
  body: string;
}

const Guidance: React.FC<GuidanceProps> = ({ heading, body }) => {
  return (
    <div className="flex flex-col gap-[17px]">
      <h3 className="text-fz-md font-bold leading-[40px]">{heading}</h3>
      <p className="font-normal text-fz-md leading-[40px]">{body}</p>
    </div>
  );
};

export default Guidance;
