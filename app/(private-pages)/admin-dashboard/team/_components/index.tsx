'use client';
import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import TeamTable from './table';

export default function TeamListPage() {
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
          <Heading title={`Team`} description="Manage team members" />

          {/* <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />

        {/* <CustomerTable data={nData} totalData={totalUsers} /> */}
        <TeamTable data={data} totalData={data.length} />
      </div>
    </PageContainer>
  );
}
