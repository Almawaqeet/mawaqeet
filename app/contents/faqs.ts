type FAQItem = {
  id: string;
  question_1?: string;
  content_1?: string;
  content?: string;
};

type FAQSection = {
  id: string;
  contents: FAQItem[];
};

type FAQSectionOrUndefined = FAQSection | undefined;


export const faqs_1: FAQItem[] = [
  {
    id: 'question-1',
    question_1: 'Why Opt for Al-Mawaqeet Travels and Tours',
  },
];

export const faqs_1_1: FAQItem[] = [
  {
    id: 'paragraph-1',
    content_1:
      'Expertise and Compassion: Our proficient team boasts extensive knowledge and hands-on experience in orchestrating pilgrimages and educational tours. Our commitment is to delivering outstanding service and ensuring a tranquil journey.',
  },
  {
    id: 'paragraph-2',
    content_1:
      'Concentrated on Spirituality: For your Hajj and Umrah, we emphasize your spiritual welfare by furnishing guidance and resources to enrich your pilgrimage journey.',
  },
  {
    id: 'paragraph-3',
    content_1:
      'Academic Endeavors: Our zeal is in promoting students towards their educational milestones. We collaborate with distinguished universities and provide scholarship opportunities.',
  },
  {
    id: 'paragraph-4',
    content_1:
      'Customized Care: Recognizing the uniqueness of each traveler’s needs, we invest significant time to understand your requirements and tailor our services to meet your specifications.',
  },
  {
    id: 'paragraph-5',
    content_1:
      'Affordability: We offer top-tier services at competitive rates, ensuring you get the best value for your investment.',
  },
  {
    id: 'paragraph-6',
    content_1:
      'Flight Reservation: We provide competitively-priced flight reservation services to ensure a comfortable and seamless travel experience to your chosen destination.',
  },
  {
    id: 'paragraph-7',
    content_1:
      'Travel Protection: Journey with assurance. Our range of comprehensive travel insurance solutions safeguards you against unexpected events.',
  },
];

export const faqs: FAQSectionOrUndefined[] = [
  {
    id: 'questions',
    contents: [
      {
        id: 'question_2',
        content: 'What is the Special Hajj and Umrah Savings Scheme?',
      },
      {
        id: 'question_3',
        content: 'What documents are required for Hajj and Umrah?',
      },
      {
        id: 'question_4',
        content: 'How early should I book my Hajj or Umrah package?',
      },
      {
        id: 'question_5',
        content: 'Are there any age restrictions for Hajj and Umrah?',
      },
      {
        id: 'question_6',
        content: 'What kind of accommodation is provided?',
      },
      {
        id: 'question_7',
        content: 'Do you provide guided tours during Hajj and Umrah?',
      },
      {
        id: 'question_8',
        content: 'What measures are in place for health and safety?',
      },
      {
        id: 'question_9',
        content: 'Can I customize my Hajj or Umrah package?',
      },
      {
        id: 'question_10',
        content: 'What is included in the travel insurance?',
      },
      {
        id: 'question_11',
        content: 'How can I contact customer support?',
      },
    ],
  },
  {
    id: 'answers',
    contents: [
      {
        id: 'answer_2',
        content:
          'Our Hajj and Umrah Savings Scheme is your pathway to Makkah and Madinah. Save steadily, watch your dream grow, and experience the thrill of Hajj without financial stress. Your sacred savings are in trusted hands. We prioritize your comfort and spiritual fulfillment.',
      },
      {
        id: 'answer_3',
        content:
          'You will need a valid passport, visa, recent photographs, vaccination certificates, and other identification documents. Our team will assist you in gathering and processing these documents.',
      },
      {
        id: 'question_4',
        content:
          'It is advisable to book at least six months in advance for Hajj and three months for Umrah to ensure availability and to complete all necessary arrangements smoothly. Our Hajj Travel usually falls between October and November/December while Umrah can be anytime of the year especially during the month of Ramadan.',
      },
      {
        id: 'question_5',
        content:
          'While there are no specific age restrictions, all pilgrims should be physically capable of undertaking the journey. Children and elderly pilgrims should be accompanied and may require additional assistance.',
      },
      {
        id: 'question_6',
        content:
          'We offer a range of accommodation options from VIP to Deluxe and Standard luxury, all within close proximity to the Holy sites. All accommodations are clean, comfortable, and equipped with necessary amenities.',
      },
      {
        id: 'question_7',
        content:
          'Yes, our packages include guided tours by experienced and knowledgeable guides who provide historical insights and spiritual guidance to enhance your pilgrimage experience.',
      },
      {
        id: 'question_8',
        content:
          'We prioritize your health and safety with comprehensive medical support, including pre-travel consultations, necessary vaccinations, and on-site medical assistance during your pilgrimage.',
      },
      {
        id: 'question_9',
        content:
          'Absolutely. We offer custom packages tailored to your specific needs and preferences, ensuring a unique and personalized experience.',
      },
      {
        id: 'question_10',
        content:
          'Our travel insurance covers medical emergencies, trip cancellations, lost baggage, and other unforeseen circumstances, providing you with peace of mind during your journey.',
      },
      {
        id: 'question_11',
        content:
          'Our dedicated customer support team is available 24/7 to assist you with any queries or concerns. You can reach us via phone, email, or through our website’s live chat feature.',
      },
    ],
  },
];
