import { CLIENT_ROUTES } from '@/lib/routes';



interface NavItem {
  title: string;
  url: string;
  icon: string;
  isActive: boolean;
  items: NavItem[];
}


export const clientDashboardNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.overview,
    icon: 'dashboard',
    isActive: true,
    items: []
  },
  {
    title: 'Packages',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.packages,
    icon: 'package',
    isActive: false,
    items: []
  },
  {
    title: "Wallet",
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.wallet.viewWallet,
    icon: 'billing',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Payments',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.payment,
    icon: 'userPen',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Bookings',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.booking.mainPage,
    icon: 'booking',
    isActive: false,
    items: [] // No child items
  },

  {
    title: 'Profile',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.profile,
    icon: 'userPen',
    isActive: false,
    items: []
  },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen'
  //     },
  //     {
  //       title: 'Login',
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
//   {
//     title: 'Settings',
//     url: '/dashboard/',
//     icon: 'kanban',
//     isActive: false,
//     items: [] // No child items
//   }
];


export const adminDashboardNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.overview,
    icon: 'dashboard',
    isActive: false,
    items: []
  },
  {
    title: 'Users',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.customers,
    icon: 'user',
    isActive: false,
    items: []
  },
  {
    title: 'Onboarding',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.onboarding,
    icon: 'user',
    isActive: false,
    items: []
  },
  {
    title: 'Packages',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.packages,
    icon: 'package',
    isActive: false,
    items: []
  },
  {
    title: 'Bookings',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.bookings.mainPage,
    icon: 'booking',
    isActive: false,
    items: []
  },
//   {
//     title: 'Payments',
//     url: CLIENT_ROUTES.PrivatePages.adminDashboard.payment,
//     icon: 'userPen',
//     isActive: false,
//     items: [] // No child items
//   },
//   {
//     title: 'Profile',
//     url: CLIENT_ROUTES.PrivatePages.adminDashboard.profile,
//     icon: 'userPen',
//     isActive: false,
//     items: [] // No child items
//   },
//   {
//     title: 'Settings',
//     url: '/dashboard/',
//     icon: 'kanban',
//     isActive: false,
//     items: [] // No child items
//   }
];
