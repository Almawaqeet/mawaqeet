import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import PackageListingPage from './_components/package-listing';

type pageProps = {
  searchParams: SearchParams;
};

export default function PackagesPage({ searchParams }: pageProps) {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Packages"
            description="Manage Hajj and Umrah packages"
          />
          <Link
            href="/admin-dashboard/package/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <PackageListingPage />
      </div>
    </PageContainer>
  );
}
