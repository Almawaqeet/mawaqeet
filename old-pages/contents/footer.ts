type FooterContentItem = {
  id: string;
  content_1?: string;
  content_2?: string;
  content_3?: string;
};

type FooterTextItem = {
  id: string;
  text?: string;
  rights?: string;
};

type UsefulLinkItem = {
  id: string;
  content: string;
};

type UsefulLinks = {
  id: string;
  usefulLinks: UsefulLinkItem[];
};

export const footerContent: FooterContentItem[] = [
  {
    id: 'brand',
    content_1: 'Al-Mawaqeet',
  },
  {
    id: 'links',
    content_2: 'Useful Links',
  },
  {
    id: 'Social',
    content_3: 'Social Handles:',
  },
];

export const footerText: FooterTextItem[] = [
  {
    id: 'text',
    text: 'Al-Mawaqeet Travels and Tours stands as a premier Islamic travel agency, committed to delivering unparalleled pilgrimage and educational experiences to travelers in search of spiritual enlightenment and academic exploration. Our dedicated team, comprising erudite Islamic scholars and core professionals, is devoted to ensuring a seamless journey for each traveler, guaranteeing safety, satisfaction, and an experience that will be etched in their memories.',
  },
  {
    id: 'rights',
    rights: 'All rights reserved.',
  },
];

export const useful_Links: UsefulLinks[] = [
  {
    id: 'usefulLinks',
    usefulLinks: [
      {
        id: 'home',
        content: 'Home',
      },
      {
        id: 'about',
        content: 'About Us',
      },
      {
        id: 'contact',
        content: 'Contact Us',
      },
      {
        id: 'Packages',
        content: 'Packages',
      },
      {
        id: 'FAQs',
        content: 'FAQs',
      },
      {
        id: 'Privacy',
        content: 'Privacy Policy',
      },
    ],
  },
];
