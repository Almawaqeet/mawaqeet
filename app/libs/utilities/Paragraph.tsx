import React from 'react';

type ParagraphProps = {
  children: React.ReactNode;
  type: 'bodyParagraph' | 'purposeParagraph' | 'bodyBold' | 'global';
  classname?: string;
  onClick?: () => void;
};

const Paragraph: React.FC<ParagraphProps> = ({ children, type, classname = '', onClick }) => {
  const body_clamp = 'text-body-clamp';
  const purpose_clamp = 'text-purpose-clamp';
  const body_bold_clamp = 'text-Bold-2-clamp';
  const global = 'font-normal';

  const styles = {
    bodyParagraph: `${body_clamp} font-normal sm:leading-8 lg:leading-10 text-center sm:tracking-[0.05px] xmd:leading-5 mobile:tracking-[0.12px] font-dejavu`,
    purposeParagraph: `${purpose_clamp} font-normal leading-[14px] tracking-[0.14px] text-center font-dejavu`,
    bodyBold: `${body_bold_clamp} xmd:font-normal xmd:leading-5 xmd:tracking-[0.12px] md:tracking-[0.18px] text-center text-[#ffffff]`,
    global: `${global}`,
  };

  const className = `${styles[type]} ${classname}`;

  return (
    <p className={className} onClick={onClick}>
      {children}
    </p>
  );
};

export default Paragraph;
