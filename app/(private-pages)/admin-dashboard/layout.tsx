import AppSidebarAdmin from '@/components/layout/app-sidebar-admin';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes'
import { ACCOUNT_TYPES } from "@/constants/generic";




export default function DashboardLayoutAdmin({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning={true}>
      <AppSidebarAdmin>{children}</AppSidebarAdmin>
    </div>
  );
}


export async function getServerSideProps(context: any) {
  const session = await getSession(context);


  if (!session) {
    return redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }

  if (session.user.accountType !== ACCOUNT_TYPES.ADMIN) {
    return redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
}
