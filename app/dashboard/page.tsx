import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // return redirect('/');

  return redirect('/dashboard/overview');
}
