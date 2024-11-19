'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import PackageTable from './table';
import NewPackageDialog from './new-package-dialog';

export default function PackageListingPage() {
  const data = [
    {
      first_name: 'John',
      email: 'john@mail.com',
      country: 'USA',
      address: '123, 4th Street, New',
      gender: 'male',
      plan: 'plan'
    }
  ];
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Package`} description="Manage packages" />

          <NewPackageDialog />
        </div>
        <Separator />

        {/* <CustomerTable data={nData} totalData={totalUsers} /> */}
        <PackageTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
