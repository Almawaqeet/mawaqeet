// Importing icons
import { StaticImageData } from 'next/image';
import 
  icon_1 from '../../public/images/icon_1.png';
  import 
  icon_2 from '../../public/images/icon_2.png';
  import 
  icon_3 from '../../public/images/icon_3.png';
  import 
  icon_4 from '../../public/images/icon_4.png';

// Define types for home content
type HomeContentItem = {
  id: string;
  heading?: string;
  sub_heading?: string;
  bold_text?: string;
  light_text?: string;
  light_text_1?: string;
  light_text_2?: string;
  bold_text_1?: string;
  bold_text_2?: string;
  light_text_3?: string;
  bold_text_3?: string;
  light_text_4?: string;
};

// Define types for quote
type QuoteItem = {
  id: string;
  quote: string;
};

// Define types for why_hajj_umrah
type WhyReasonsItem = {
  id: string;
  content: string | StaticImageData | undefined;
};

type WhyReasons = {
  id: string;
  reasons: WhyReasonsItem[];
};

// Define types for why_image
type WhyImageItem = {
  id: string;
  content: StaticImageData;
};

// Define types for reach_out_to_us
type ReachOutItem = {
  id: string;
  reachout?: string;
  dedicated?: string;
  motto?: string;
};

// Data for home
export const home: HomeContentItem[] = [
  {
    id: 'heading',
    heading: 'Al-Mawaqeet Travels and Tours',
  },
  {
    id: 'sub-heading',
    sub_heading: 'Your Reliable Companion in adventurous journeys',
  },
  {
    id: 'bold_text',
    bold_text:
      "Ever wished you could walk in the shoes of Prophet Muhammad (PBUH)? Craved the deep peace and calm that comes from being close to Allah (SWT) in the two Islam's holiest cities– Makkah and Madinah?",
  },
  {
    id: 'light_text',
    light_text:
      "This isn't just a trip; it's a life-changing experience. It's your chance to let go of everyday stress and dive deep into the heart of the fifth pillar of Islam– Hajj and its other equivalent, Umrah. Picture the amazing feelings of going around the Kaabah, the joy you feel when you pray at the Prophet's Mosque, and the sense of togetherness when you stand with Muslims from all over the world. Hajj and Umrah are so much more than just religious tasks",
  },
  {
    id: 'light_text_1',
    light_text_1:
      "They're big chances for personal growth and feeling closer to God.",
  },
  {
    id: 'light_text_2',
    light_text_2:
      "We get that planning for such a big trip can feel tricky. That's why we're here to guide you every step of the way. With our Hajj and Umrah Savings Scheme, your fear of gathering the funds at ONCE is removed. Our team of skilled, knowledgeable and committed professionals will make sure your Hajj or Umrah is seamless, rewarding, and one for the books.",
  },
  {
    id: 'bold_text_1',
    bold_text_1: 'They offer you the chance to:',
  },
  {
    id: 'bold_text_2',
    bold_text_2:
      'Embark on a Life-Changing Journey with Al-Mawaqeet’s Hajj & Umrah Packages',
  },
  {
    id: 'light_text_3',
    light_text_3:
      'At Al-Mawaqeet Travels and Tours, we recognize the significance of Hajj or Umrah as a once-in-a-lifetime endeavor for many Muslims. It is a deeply personal and spiritual odyssey that necessitates meticulous planning and preparation. This is why we provide an array of Hajj and Umrah packages, designed to meet your specific needs and financial capabilities, ensuring an experience that is both comfortable and unforgettable.',
  },
  {
    id: 'bold_text_3',
    bold_text_3: 'Our Dedication to Your Spiritual Journey',
  },
  {
    id: 'light_text_4',
    light_text_4:
      'No matter which package you select, we are steadfast in our commitment to delivering outstanding service and ensuring a pilgrimage that is devoid of stress. Our seasoned team will accompany you at every juncture, from the application for visas to the selection of accommodations. Additionally, we offer knowledgeable guides who will impart their spiritual and mundane wisdom, guaranteeing a journey that is both seamless and enriching. You have four mouthwatering packages to choose from:',
  },
];

// Data for quote
export const quote: QuoteItem[] = [
  {
    id: 'quote',
    quote:
      "**Don't put it off. Listen to Allah (SWT)'s call and go on a journey that will change your life. Reach out to us today and let us help you make your spiritual dreams a reality.**",
  },
];

// Data for why_hajj_umrah
export const why_hajj_umrah: WhyReasons[] = [
  {
    id: 'why_heading',
    reasons: [
      {
        id: 'Cleanse',
        content: 'Cleanse your heart and soul',
      },
      {
        id: 'Hone',
        content: 'Hone your faith',
      },
      {
        id: 'friends',
        content: 'Make friends for life',
      },
      {
        id: 'peace',
        content: 'Find absolute peace',
      },
    ],
  },
  {
    id: 'why_body',
    reasons: [
      {
        id: 'Reconnect',
        content:
          "Reconnect with Allah (SWT) and let go of life's daily hassles.",
      },
      {
        id: 'Islam',
        content: 'Learn more about Islam and its important principles.',
      },
      {
        id: 'united',
        content: 'Get to know Muslims from every place, all united by faith.',
      },
      {
        id: 'Makkah',
        content: 'Experience the true peace and quiet in Makkah and Madinah.',
      },
    ],
  },
  {
    id: 'why_image',
    reasons: [
      {
        id: 'img_1',
        content: icon_1,
      },
      {
        id: 'img_2',
        content: icon_2,
      },
      {
        id: 'img_3',
        content: icon_3,
      },
      {
        id: 'img_4',
        content: icon_4,
      },
    ],
  },
];

// Data for reach_out_to_us
export const reach_out_to_us: ReachOutItem[] = [
  {
    id: 'text-1',
    reachout: 'Reach Out to Us',
  },
  {
    id: 'text-2',
    dedicated:
      'We are dedicated to addressing your queries and guiding you through every facet of your journey. Contact us at your earliest convenience to discuss your travel aspirations and let us assist you in realizing your dreams.',
  },
  {
    id: 'text-3',
    motto:
      'Al-Mawaqeet Travels and Tours: Your Gateway to Sacred Journeys and Academic Excellence.',
  },
];
