import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';

interface HeadingsProps {
  children: React.ReactNode | StaticImageData | null;
  type: 'BrandText' | 'heroHeading' | 'heading_1' | 'heading_2' | 'quoteText' | 'schemeText' | 'sectionName';
  classname?: string;
}

const Headings: React.FC<HeadingsProps> = ({ children, type, classname }) => {
  const Brand_clamp = 'text-brand-clamp';
  const Hero_clamp = 'text-hero-clamp';
  const sectionClamp = 'text-heading-clamp';
  const Bold_1_clamp = 'text-Bold-1-clamp';
  const Bold_2_clamp = 'text-Bold-2-clamp';
  const quote = 'text-quote-clamp';
  const scheme = 'text-scheme-clamp';

  const styles = {
    BrandText: `${Brand_clamp} font-sahur-ramadan font-normal mobile:leading-5 sm:leading-10`,
    heroHeading: `${Hero_clamp} font-bold mobile:leading-8 md:leading-10 tracking-wide text-center font-dejavu`,
    heading_1: `${Bold_1_clamp} font-bold tracking-tight mobile:leading-5 md:leading-10 font-dejavu`,
    sectionName: `${sectionClamp} font-bold xmd:tracking-[0.18px]`,
    heading_2: `${Bold_2_clamp} font-bold tracking-wide mobile:leading-[14px] sm:leading-[20px] font-dejavu`,
    quoteText: `${quote} font-bold tracking-wide mobile:leading-5 sm:leading-6 md:leading-10 text-left font-dejavu`,
    schemeText: `${scheme} font-bold mobile:tracking-normal text-white sm:tracking-[1.6px] mobile:leading-8 md:leading-12 text-center font-dejavu`,
  };

  const renderContent = () => {
    if(!children) return null
    if (typeof children === 'object' && 'src' in children) {
      // If the child is an image, render it as an Image component
      return <Image src={children} alt="" className={classname} />;
    } else {
      // Otherwise, render the content as text or other React nodes
      return <span className={classname}>{children}</span>;
    }
  };

  switch (type) {
    case 'BrandText':
      return <h3 className={styles[type]}>{renderContent()}</h3>;

    case 'heroHeading':
      return <h1 className={styles[type]}>{renderContent()}</h1>;

    case 'heading_1':
      return <h3 className={styles[type]}>{renderContent()}</h3>;

    case 'heading_2':
      return <h4 className={styles[type]}>{renderContent()}</h4>;

    case 'quoteText':
      return <h3 className={styles[type]}>{renderContent()}</h3>;

    case 'schemeText':
      return <h2 className={styles[type]}>{renderContent()}</h2>;

    case 'sectionName':
      return <h4 className={styles[type]}>{renderContent()}</h4>;

    default:
      return null;
  }
};

export default Headings;
