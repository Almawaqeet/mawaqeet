import AppSidebarAdmin from '@/components/layout/app-sidebar-admin';
import { ACCOUNT_TYPES } from '@/constants/generic';
import { checkAuth } from '@/lib/utils';

export default async function DashboardLayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth({ pageType: ACCOUNT_TYPES.ADMIN });

  return <AppSidebarAdmin>{children}</AppSidebarAdmin>;
}
