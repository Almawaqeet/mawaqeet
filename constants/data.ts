import { CLIENT_ROUTES } from '@/lib/routes';



interface NavItem {
  title: string;
  url: string;
  icon: string;
  isActive: boolean;
  items: NavItem[];
}

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// team members/management,payment,settings,profile

export const clientDashboardNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.overview,
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
//   {
//     title: 'Customers',
//     url: CLIENT_ROUTES.PrivatePages.clientDashboard.customers,
//     icon: 'user',
//     isActive: false,
//     items: [] // No child items
//   },
//   {
//     title: 'Team Management',
//     url: CLIENT_ROUTES.PrivatePages.clientDashboard.team,
//     icon: 'user',
//     isActive: false,
//     items: [] // No child items
//   },
  {
    title: 'Packages',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.packages,
    icon: 'product',
    isActive: false,
    items: [] // No child items
  },
//   {
//     title: 'Package',
//     url: CLIENT_ROUTES.PrivatePages.clientDashboard.packages,
//     icon: 'userPen',
//     isActive: false,
//     items: [] // No child items
//   },
//   {
//     title: 'Payments',
//     url: CLIENT_ROUTES.PrivatePages.clientDashboard.payment,
//     icon: 'userPen',
//     isActive: false,
//     items: [] // No child items
//   },
  {
    title: 'Profile',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.profile,
    icon: 'userPen',
    isActive: false,
    items: [] // No child items
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
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Users',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.customers,
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Onboarding',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.team,
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Packages',
    url: CLIENT_ROUTES.PrivatePages.adminDashboard.packages,
    icon: 'package',
    isActive: false,
    items: [] // No child items
  },
//   {
//     title: 'Bookings',
//     url: CLIENT_ROUTES.PrivatePages.adminDashboard.packages,
//     icon: 'userPen',
//     isActive: false,
//     items: [] // No child items
//   },
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



export const my_packages = [
    {
  id: 1,
  type: 'HAJJ',
  tier: 'STANDARD',
  cohort: 'HAJJ COHORT 2024',
  price: 'NGN 1,800,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
},
{
  id: 2,
  type: 'HAJJ',
  tier: 'VIP',
  cohort: 'HAJJ COHORT 2024',
  price: 'NGN 2,500,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
},
{
  id: 3,
  type: 'HAJJ',
  tier: 'DELUXE',
  cohort: 'HAJJ COHORT 2024',
  price: 'NGN 3,000,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
},
{
  id: 4,
  type: 'UMRAH',
  tier: 'STANDARD',
  cohort: 'UMRAH COHORT 2024',
  price: 'NGN 1,000,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
},
{
  id: 5,
  type: 'UMRAH',
  tier: 'VIP',
  cohort: 'UMRAH COHORT 2024',
  price: 'NGN 1,400,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
},
{
  id: 6,
  type: 'UMRAH',
  tier: 'DELUXE',
  cohort: 'UMRAH COHORT 2024',
  price: 'NGN 1,800,000.00',
  paymentPlan: 'Payable in installment',
  features: [
    'Luxurious rooms with en-suite bathrooms meticulously designed for your comfort',
    'Unparalleled proximity to the Haram, ensuring a seamless spiritual journey'
  ]
}
];
