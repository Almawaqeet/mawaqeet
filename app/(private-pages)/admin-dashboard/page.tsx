import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';




export default async function Page() {
  return redirect(CLIENT_ROUTES.PrivatePages.adminDashboard.overview);
}
