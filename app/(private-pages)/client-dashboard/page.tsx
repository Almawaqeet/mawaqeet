import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';

export default async function ClientDashboard() {
  return redirect(CLIENT_ROUTES.PrivatePages.clientDashboard.overview);
}
