'use client';

import { useGetRecentOnboardingUsers } from '@/api/services/onboarding';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentSales() {
  const { data, isLoading } = useGetRecentOnboardingUsers();

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full bg-white" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-[200px] bg-white" />
              <Skeleton className="h-4 w-[150px] bg-white" />
            </div>
            <div className="ml-auto">
              <Skeleton className="h-6 w-[80px] rounded-full bg-white" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data?.map((user) => (
        <div key={user.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto">
            <span
              className={`rounded-full px-2 py-1 text-xs ${
                user?.onboarding_fee_payment_check === true
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {user.onboarding_fee_payment_check ? 'COMPLETED' : 'PENDING'}
            </span>
          </div>
        </div>
      ))}

      {!data?.length && (
        <div className="text-center text-sm text-muted-foreground">
          No recent onboarding users found
        </div>
      )}
    </div>
  );
}
