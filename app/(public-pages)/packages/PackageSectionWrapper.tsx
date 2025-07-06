'use client';

import dynamic from 'next/dynamic';

const PackageSection = dynamic(
  () => import('@/app/(public-pages)/_components/packages-page/PackageSection'),
  { ssr: false }
);

export default function PackageSectionWrapper() {
  return <PackageSection />;
}
