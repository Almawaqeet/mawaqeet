import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ViewPackage from '../_components/view-package';
import ViewPackageSkeleton from '../_components/view-package-skeleton';

export const metadata = {
  title: 'Dashboard : Package View'
};

type PageProps = { params: { packageId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<ViewPackageSkeleton />}>
          <ViewPackage params={params} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
