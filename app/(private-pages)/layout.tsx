import AppSidebar from '@/components/layout/app-sidebar';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes'




export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
}


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
}
