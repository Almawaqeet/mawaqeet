// Define types for brand content
type BrandItem = {
  id: string;
  brand: string;
};

// Define types for navbar items
type NavItem = {
  id: string;
  content: string;
};

type NavbarSection = {
  id: string;
  navItems: NavItem[];
};

// Data for brand
export const brand: BrandItem[] = [
  {
    id: 'text',
    brand: 'Al-Mawaqeet',
  },
];

// Data for navbar
export const navbar: NavbarSection[] = [
  {
    id: 'mainNav',
    navItems: [
      {
        id: 'home',
        content: 'Home',
      },
      {
        id: 'about',
        content: 'About Us',
      },
      {
        id: 'services',
        content: 'Services',
      },
      {
        id: 'contact',
        content: 'Contact Us',
      },
      {
        id: 'log',
        content: 'Log In',
      },
    ],
  },
  {
    id: 'subItems',
    navItems: [
      {
        id: 'hajj',
        content: 'Hajj Service',
      },
      {
        id: 'umrah',
        content: 'Umrah Service',
      },
      {
        id: 'saving-scheme',
        content: 'Hajj & Umrah saving scheme',
      },
    ],
  },
];
