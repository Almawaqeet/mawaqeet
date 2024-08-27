import React from 'react';
import Packages from './Packages';

// Define types for the props
interface PackageContent {
  id: string;
  package_title: string;
  content: {
    bullet_1?: string;
    bullet_2?: string;
    bullet_3?: string;
    bullet_4?: string;
    bullet_5?: string;
  };
  conclusion: string;
  heading: string;
}

interface PackagesContentProps {
  pack: PackageContent;
  index: number;
}

const PackagesContent: React.FC<PackagesContentProps> = ({ pack, index }) => {
  const { id, package_title, content, conclusion, heading } = pack;
  const { bullet_1, bullet_2, bullet_3, bullet_4, bullet_5 } = content;

  // Filter out any undefined or null bullet points
  const bullets = [bullet_1, bullet_2, bullet_3, bullet_4, bullet_5].filter(
    Boolean
  ) as string[];

  return (
    <Packages
      key={`package-${id}`}
      title_intro={heading}
      bullets={bullets}
      title_conclusion={conclusion}
      title_head={package_title}
      index={index}
    />
  );
};

export default PackagesContent;
