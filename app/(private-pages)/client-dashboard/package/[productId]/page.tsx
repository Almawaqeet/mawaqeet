
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import FormCardSkeleton from '@/components/reusables/form-card-skeleton';
import ProductViewPage from '../_components/package-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: { productId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={params.productId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
