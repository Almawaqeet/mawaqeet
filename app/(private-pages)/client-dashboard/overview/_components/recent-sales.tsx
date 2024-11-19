import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  const recentSales: any[] = [
    // {
    //   id: 'TX-2024-001',
    //   avatar: '/avatars/01.png',
    //   package: 'Umrah Package - Basic',
    //   amount: '₦500,000.00'
    // },
    // {
    //   id: 'TX-2024-002',
    //   avatar: '/avatars/02.png',
    //   package: 'Hajj Package - Premium',
    //   amount: '₦2,500,000.00'
    // },
    // {
    //   id: 'TX-2024-003',
    //   avatar: '/avatars/03.png',
    //   package: 'Umrah Package - Premium',
    //   amount: '₦750,000.00'
    // },
    // {
    //   id: 'TX-2024-004',
    //   avatar: '/avatars/04.png',
    //   package: 'Hajj Package - Basic',
    //   amount: '₦2,000,000.00'
    // },
    // {
    //   id: 'TX-2024-005',
    //   avatar: '/avatars/05.png',
    //   package: 'Umrah Package - Basic',
    //   amount: '₦500,000.00'
    // }
  ];

  if (!recentSales?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-3">
        <p className="text-sm text-muted-foreground">No recent payments made</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt="Avatar" />
            <AvatarFallback>TX</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.id}</p>
            <p className="text-sm text-muted-foreground">
              {sale.package}
            </p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
