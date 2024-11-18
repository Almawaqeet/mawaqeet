import { redirect } from 'next/navigation';
import { CLIENT_ROUTES } from '@/lib/routes';

export default async function Dashboard() {
  // return redirect('/');

  return redirect(CLIENT_ROUTES.PrivatePages.clientDashboard.home);
}
