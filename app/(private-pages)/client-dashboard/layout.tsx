import AppSidebarClient from '@/components/layout/app-sidebar-client';
import { ACCOUNT_TYPES } from '@/constants/generic';
import { checkAuth } from '@/lib/utils';

export default async function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth({ pageType: ACCOUNT_TYPES.USER });

  return (
    <div suppressHydrationWarning={true}>
      <AppSidebarClient>{children}</AppSidebarClient>
    </div>
  );
}
