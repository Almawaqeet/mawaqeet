'use client';

import dynamic from 'next/dynamic';

const SingularPackage = dynamic(
  () => import('@/app/(public-pages)/_components/packages-page/SingularPackage'),
  {
    loading: () => <div>Loading...</div>
  }
);


interface SingularPackageWrapperProps {
  id: string;
}

export default function SingularPackageWrapper({
  id,
}: SingularPackageWrapperProps) {
  return <SingularPackage id={id} />;
}
