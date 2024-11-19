import AppSidebarClient from '@/components/layout/app-sidebar-client';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes'
import { ACCOUNT_TYPES } from "@/constants/generic";




export default function DashboardLayoutClient({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning={true}>
      <AppSidebarClient>{children}</AppSidebarClient>
    </div>
  );
}


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }

  if (session.user.accountType !== ACCOUNT_TYPES.USER) {
    return redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
}
