import { ReactElement } from "react";

interface PurposeProps {
  heading: string | ReactElement | undefined;
  subheading: string | ReactElement | undefined;
  iconImage: ReactElement | undefined;
  className?: string;
}

const Purpose: React.FC<PurposeProps> = ({
  iconImage,
  heading,
  subheading,
  className = '',
}) => {
  return (
    <div className="border-[0.5px] xmd:py-3 rounded-[8px] xmd:px-5 border-[hsla(0, 0%, 20%, 0.25)] max-h-[270px] md:py-5 transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400] cursor-pointer hover:bg-hover-color group">
      <div className="flex flex-col xmd:gap-4 md:gap-4 lg:gap-5 justify-center items-center font-dejavu">
        <div className="relative xmd:w-[40px] xmd:h-[37.38px] md:w-[59px] md:h-[54.09px] lg:w-[71px] lg:h-[66.09px] rounded-full bg-[#F8F8F8] group-hover:bg-number-color transition-all duration-[0.5s] ease-[cubic-bezier(0.645,0.045,0.355,1)] delay-[400]">
          {iconImage}
        </div>

        <div className="tab_md:text-fz-sm mobile:text-fz-xsm text-center tab_md:leading-[35px] tab_md:tracking-[0.18px] mobile:leading-[4px] mobile:tracking-[0.14px] font-normal font-dejavu group-hover:text-white">
          {heading}
        </div>
        <div className="xmd:text-fz-xsm tab_md:text-fz-xs tab_md:leading-7 mobile:leading-[14px] tracking-[0.1px] font-normal text-center font-dejavu group-hover:text-white">
          <p>{subheading}</p>
        </div>
      </div>
    </div>
  );
};

export default Purpose;