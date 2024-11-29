'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function TableIndexSkelton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
