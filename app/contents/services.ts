// Define types for title and intro
type TitleIntroHajj = {
  id: string;
  intro_1?: string;
  intro_1_1?: string;
  intro_2?: string;
  serviceContent?: string;
};

type ComplementaryServicesIntro = {
  id: string;
  intro: string;
};

type SavingScheme = {
  id: string;
  scheme_heading?: string;
  scheme_sub_heading?: string;
  scheme_card_subHeading?: string;
  scheme_card_body?: string;
};

type ComplementaryServicesHighlight = {
  id: string;
  highlight?: string;
  
};

type ComplementaryServices = {
  id: string;
  highlights: ComplementaryServicesHighlight[];
};

type WhyScholarshipGuidanceHeading = {
  id: string;
  heading_content: string;
};

type WhyScholarshipGuidance = {
  id: string;
  why_scholarship_heading: WhyScholarshipGuidanceHeading[];
};


// Data for title and intro
export const title_intro_hajj: TitleIntroHajj[] = [
  {
    id: "hajj-title-1",
    intro_1: "Hajj & Umrah Packages",
  },
  {
    id: "umurah-title-1",
    intro_1_1: "Umrah Services",
  },
  {
    id: "hajj-title-2",
    intro_2: "BOOK FOR YOUR ACCOMMODATION",
  },
  {
    id: "hajj-content-1",
    serviceContent:
      "Our customized Hajj and Umrah packages cater to your specific needs, including visa facilitation, accommodation near Haram, transportation logistics, and knowledgeable guides for a smooth and enriching pilgrimage journey."
  },
];

// Define types for Umrah category
type UmrahCategory = {
  id: string;
  umrahbatches: string;
};

type UmrahCategoryWrapper = {
  content: UmrahCategory[];
};

// Data for Umrah categories
export const umrahCategory: UmrahCategoryWrapper[] = [
  {
    content: [
      {
        id: "first-batch",
        umrahbatches: "September & October Batch",
      },
      {
        id: "second-batch",
        umrahbatches: "Ramadan Batch",
      },
      {
        id: "third-batch",
        umrahbatches: "Jan & Feb Batch",
      },
    ],
  },
];

// Define types for packages
type PackageContent = {
  bullet_1: string;
  bullet_2: string;
  bullet_3: string;
  bullet_4: string;
  bullet_5?: string;
};

type PackagePrices = {
  package_name: string
  type_upfront: string
  type_installment: string
  amount_upfront_hajj: string
  amount_upfront_umrah: string
  week: string;
  month: string;
  any: string;
};


type Upfront = {
  amount: string
}

type Package = {
  id: string;
  package_title: string;
  heading: string;
 packagePrices: PackagePrices
  pricehajjupfront: Upfront
  priceumrahupfront: Upfront
  content: PackageContent;
  conclusion: string;
};

type ScholarshipGuidance = {
  id: string;
  center_text?: string;
  align_text?: string;
};

// Data for packages
export const packages: Package[] = [
  {
    id: "vip package",
    package_title: "VIP Package",
    heading:
      "Indulge in a truly regal experience with our 5-star hotel accommodations, boasting:",

      packagePrices: {
        package_name: 'VIP',
        amount_upfront_umrah: 'Total Package = 4M',
        type_upfront: 'Upfront :',
        amount_upfront_hajj: 'Total Package = 10,000,000',
        type_installment: 'Installment :',
        week: 'Weekly  =  1,000,000',
        month: 'Monthly  =  2,000,000',
        any: 'Any Amount  =  __'
      },

      pricehajjupfront: {
        amount: 'Total Package = 10M'
      },

      priceumrahupfront: {
        amount: 'Total Package = 4M'
      },

    content: {
      bullet_1:
        "Luxurious rooms with en-suite bathrooms meticulously designed for your comfort",
      bullet_2:
        "Unparalleled proximity to the Haram, ensuring a seamless spiritual journey",
      bullet_3:
        "Exclusive access to airport lounges, complete with personalized assistance",
      bullet_4:
        "Private transportation, complete with a dedicated driver at your beck and call",
      bullet_5:
        "Expert guidance from a knowledgeable private guide, tailored to your every need",
    },
    conclusion:
      "Elevate your pilgrimage experience with our premium services, crafted to provide the ultimate in comfort, convenience, and spiritual fulfillment.",
  },
  {
    id: "deluxe package",
    package_title: "Deluxe Package",
    heading:
      "Enjoy a harmonious blend of luxury and affordability with our Deluxe Package, carefully crafted to elevate your pilgrimage experience:",

      packagePrices: {
        package_name: 'Deluxe',
        amount_upfront_umrah: 'Total Package = 2,500,000',
        type_upfront: 'Upfront :',
        amount_upfront_hajj: 'Total Package = 7,000,000',
        type_installment: 'Installment :',
        week: 'Weekly  =  500,000',
        month: 'Monthly  =  1,000,000',
        any: 'Any Amount  =  __'
      },

      pricehajjupfront: {
        amount: 'Total Package = 7M'
      },

      priceumrahupfront: {
        amount: 'Total Package = 2.5M'
      },

    content: {
      bullet_1:
        "4-star hotel lodging, just steps away from the Haram, offering unparalleled proximity",
      bullet_2:
        "Spacious, elegantly furnished rooms, designed to provide a serene and comfortable retreat",
      bullet_3:
        "Collective transportation, fostering a sense of community and connection with fellow pilgrims",
      bullet_4:
        "Expert guidance from a dedicated guide, ensuring a smooth and enriching journey",
    },
    conclusion:
      "Let us take care of every detail, so you can focus on your spiritual growth and connection.",
  },
  {
    id: "standard package",
    package_title: "Standard Package",
    heading:
      "Embark on a spiritual journey with our Standard Package, offering a perfect balance of affordability and comfort:",
      
      packagePrices: {
        package_name: 'Standard',
        amount_upfront_umrah: 'Total Package = 1,500,000',
        type_upfront: 'Upfront :',
        amount_upfront_hajj: 'Total Package = 6,000,000',
        type_installment: 'Installment :',
        week: 'Weekly  =  500,000',
        month: 'Monthly  =  1,000,000',
        any: 'Any Amount  =  __'
      },

      pricehajjupfront: {
        amount: 'Total Package = 6M'
      },

      priceumrahupfront: {
        amount: 'Total Package = 1.5M'
      },

    content: {
      bullet_1:
        "3-star hotel lodging, just a short distance from the Haram (Makkah & Madeenah)",
      bullet_2: "Clean and comfortable rooms, ensuring a peaceful stay",
      bullet_3:
        "Shared transportation, fostering a sense of community and friendship",
      bullet_4:
        "Seasoned group guide, providing expert support and guidance every step of the way",
    },
    conclusion:
      "Experience the ultimate in value and spiritual fulfillment with our Standard Package.",
  },
];


// Data for Hajj & Umrah saving scheme
export const hajj_and_umrah_saving_scheme: SavingScheme[] = [
  {
    id: "scheme-heading",
    scheme_heading: "HAJJ & UMRAH SPECIAL SAVINGS SCHEME",
  },
  {
    id: "scheme-subHeading",
    scheme_sub_heading: "Your journey to Allah begins here.",
  },
  {
    id: "scheme-card-subHeading",
    scheme_card_subHeading: "Fulfill Your Hajj Dream Today!",
  },
  {
    id: "scheme-card-body",
    scheme_card_body:
      "Join Al-Mawaqeet's Hajj and Umrah Savings Scheme for a secure, financially-friendly way to experience the thrill of Hajj and Makkah, ensuring comfort and spiritual fulfillment."
,
  },
];

// Data for complementary services intro
export const complementary_services_intro: ComplementaryServicesIntro[] = [
  {
    id: "intro",
    intro:
      "Our devotion to personalization extends to a wide array of add-on services aimed at enhancing your pilgrimage journey, including:",
  },
];


// Data for complementary services
export const complementary_services: ComplementaryServices[] = [
  {
    id: "bold",
    highlights: [
      {
        id: "Ziyarah",
        highlight: "Ziyarah Tours:",
      },
      {
        id: "Intensive",
        highlight: "Intensive Pre-departure Seminars:",
      },
      {
        id: "Special",
        highlight: "Special Dietary Scheme:",
      },
      
    ],
  },
  {
    id: "span",
    highlights: [
      {
        id: "delve",
        highlight:
          "Delve into the significant historical and religious sites within Makkah and Madinah.",
      },
      {
        id: "Acquire",
        highlight:
          "Acquire essential knowledge and insights to adequately prepare for your Hajj or Umrah.",
      },
      {
        id: "Catering",
        highlight:
          "Catering to specific dietary requirements, especially local and continental cuisine that may be difficult to find within the sphere of Haram, we guarantee a pilgrimage journey that is comfortable for everyone.",
      },
     
    ],
  },
  {
    id: "tour-heading",
    highlights: [
      {
        id: "experience",
        highlight:
          "Join us in creating an unforgettable experience for your Hajj or Umrah journey.",
      },
      {
        id: "Educational",
        highlight:
          "Educational Tours: Embark on a Journey That Combines Academic Inquiry with Cultural Insight",
      },
    ],
  },

  {
    id: "tour-body",
    highlights: [
      {
        id: "Educational",
        highlight:
          "At Al-Mawaqeet Travels & Tours, we present meticulously designed educational tours for students in the application stages of prestigious universities in the Middle East. Our tours extend beyond mere campus visits, offering a comprehensive experience that allows you to:",
      },
    ],
  },

  {
    id: 'complement',
    highlights: [
      {
        id: "Explore",
        highlight: "Explore Superior Universities:",
      },
      {
        id: "interact",
        highlight: "Interact with Faculty and Admission Officers:",
      },
      {
        id: "Engage",
        highlight: "Engage with the Local Culture:",
      },
      {
        id: "relationship",
        highlight: "Build Relationships with Peers:",
      },
    ]
  },

  {
    id: 'complement-body',
    highlights: [
      {
        id: "Visitation",
        highlight:
          "Visit distinguished universities such as Islamic University of Madeenah in Saudi Arabia, Islam University of Kuwait, Hamad Bin Khalifa University in Qatar, Universiti Brunei Darussalam in Brunei, and University of Bahrain in Bahrain.",
      },
      {
        id: "Benefit",
        highlight:
          "Benefit from insightful discussions on academic programs, the application process, and the daily life of a student through interactions with professors and admissions officers.",
      },
      {
        id: "Discover",
        highlight:
          "Discover the essence of the region’s culture through its vibrant cities, historical monuments, and cultural artifacts, enriching your understanding of its profound heritage.",
      },
      {
        id: "Connect",
        highlight:
          "Connect with students from across the globe, sharing your academic ambitions and forging lasting friendships.",
      },
      {
        id: "exceptional",
        highlight:
          "“Our Educational Tours provide an exceptional platform for students to engage with the academic environment of these esteemed institutions, fostering a deeper connection and understanding of the region’s academic excellence.”",
      },
    ]
  }
];



// Data for scholarship guidance
export const scholarship_guidance: ScholarshipGuidance[] = [
  {
    id: "Empowering",
    center_text: "Empowering You to Realize Your Academic Dreams",
  },
  {
    id: "role",
    align_text:
      "Our dedicated team acknowledges the pivotal role scholarships play in realizing your academic aspirations. We provide thorough scholarship guidance, including:",
  },
];


// Data for why scholarship guidance
export const why_scholarship_guidance: WhyScholarshipGuidance[] = [
  {
    id: "why_scholarship_heading",
    why_scholarship_heading: [
      {
        id: "Identifying",
        heading_content: "Identifying Scholarship Opportunities:",
      },
      {
        id: "Application",
        heading_content: "Application Support:",
      },
      {
        id: "Accreditation",
        heading_content: "Accreditation Support for Islamic Schools:",
      },
      {
        id: "Preparation",
        heading_content: "Preparation for Scholarship Interviews:",
      },
    ],
  },
  {
    id: "why_scholarship_body",
    why_scholarship_heading: [
      {
        id: "governmental",
        heading_content:
          "Our assistance extends to research and identification of scholarships from universities, governmental bodies, and international organizations.",
      },
      {
        id: "comprehensive",
        heading_content:
          "We guide you through the application process, ensuring your application is comprehensive and compelling.",
      },
      {
        id: "accredited",
        heading_content:
          "Enhance your chance of bagging scholarships for your students by getting your school accredited to top Middle Eastern universities. Let your top-performing students stand out from the crowd and earn a spot in their universities of choice through our expert accreditation support.",
      },
      {
        id: "confidence",
        heading_content:
          "Gain confidence in addressing scholarship interviews through mock sessions and valuable interview advice.",
      },
    ],
  },
  {
    id: "scholarship-NB",
    why_scholarship_heading: [
      {
        id: "initiative",
        heading_content:
          "NB:- By engaging in our educational tours and scholarship guidance programs, you will significantly benefit your university application endeavors. You will not only demonstrate a genuine passion for studying abroad but also showcase your initiative and dedication to academic excellence.",
      },
    ],
  },
];
