'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function TableIndexSkelton() {
  return (
    <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-4">
      <Skeleton className="h-10 w-[300px]" />
      <Skeleton className="h-10 w-[200px]" />
      <Skeleton className="h-10 w-[100px]" />
    </div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
