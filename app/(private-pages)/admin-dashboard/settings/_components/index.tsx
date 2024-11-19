'use client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import React from 'react';

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Settings`} description="Manage your settings" />
          {/* <NewTaskDialog /> */}
        </div>
        {/* <KanbanBoard /> */}
      </div>
    </PageContainer>
  );
}
