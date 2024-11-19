import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';




export default async function AdminDashboard() {
  return redirect(CLIENT_ROUTES.PrivatePages.adminDashboard.overview);
}
