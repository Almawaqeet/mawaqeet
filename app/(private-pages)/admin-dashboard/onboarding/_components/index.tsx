'use client';


import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import TeamTable from './table';

export default function OnboardingListPage() {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Onboarding users`} description="Manage onboarding users" />
        </div>
        <Separator />
        <TeamTable />
      </div>
    </PageContainer>
  );
}
