import ViewPackage from '@/app/(private-pages)/admin-dashboard/package/_components/view-package';
import ViewPackageSkeleton from '@/app/(private-pages)/admin-dashboard/package/_components/view-package-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';


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
