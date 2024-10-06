import { StaticImageData } from 'next/image';
import team1 from '../../public/images/team_1.png';
import team3 from '../../public/images/team_3.png';
import team4 from '../../public/images/team_4.png';

import Maruf from '../../public/images/Rectangle1.png'
import Kutubi from '../../public/images/Rectangle3.png'
import Ramadan from '../../public/images/Rectangle2.png'




interface AboutHero {
  id: string;
  hero_content: string;
}

interface AboutMainBody {
  id: string;
  about_main_content: string;
}

interface AboutUsTeam {
  id: string;
  image: StaticImageData;
  imageProfile: StaticImageData
  fullname: string;
  post: string;
  slug: string
  personality?: string;
  view_profile: string;
  profile_1: string;
  profile_2: string;
  profile_3: string;
  profile_4?: string;
  profile_5?: string;
}

export const about_hero: AboutHero[] = [
  {
    id: 'about_hero',
    hero_content:
      'We are your trusted guide for an unforgettable Hajj experience. We craft transformative pilgrimages that nurture spiritual growth and ignite intellectual curiosity.',
  },
];

export const about_main_body: AboutMainBody[] = [
  {
    id: 'about_main',
    about_main_content:
      'Al-Mawaqeet Travels and Tours is an Islamic travel agency specializing in spiritual pilgrimage and educational experiences, backed by a dedicated team of scholars and professionals.',
  },
];

export const about_us_team: AboutUsTeam[] = [
  {
    id: 'img1',
    slug: 'Shaykh-Abdullah',
    image: team4,
    imageProfile: Maruf, 
    fullname: 'Shaykh Abdullah Ma’ruf Oyelekan',
    post: 'Chief Executive Officer and Managing Director, Al-Mawaqeet Travels and Tours',
    personality: '{Ph.D. (in-view), Islamic Economics and Finance, Islamic University of Madeenah Kingdom of Saudi Arabia}',
    view_profile: 'View Profile',
    profile_1:
      'Shaykh Abdullah Ma’ruf Oyelekan is a distinguished Nigerian scholar currently pursuing a Ph.D. in Islamic Economics and Finance at the prestigious Islamic University of Madeenah in the Kingdom of Saudi Arabia. With over seven years of experience as a Hajj and Umrah guide, Shaykh Abdullah has earned a reputation for his deep knowledge, compassionate leadership, and unwavering commitment to the welfare of pilgrims.',
    profile_2:
      'As the Chief Executive Officer of Al-Mawaqeet Travels and Tours, Shaykh Abdullah has been instrumental in facilitating transformative spiritual journeys for Muslims from around the world. His dedication to ensuring that every pilgrim’s experience is both spiritually enriching and logistically smooth has made him a trusted figure in the field of Islamic travel services. His expertise extends beyond just the technical aspects of guiding; he is known for his ability to provide insightful religious guidance and support, helping pilgrims understand and appreciate the deeper meanings of the rituals they perform.',
    profile_3:
      'Shaykh Abdullah’s academic pursuits and practical experience are complemented by his passion for Islamic teachings and his commitment to serving the Ummah. His work in Islamic Economics and Finance aims to bridge the gap between traditional Islamic principles and contemporary economic challenges, offering innovative solutions that are rooted in Islamic values. He is a sought-after speaker and educator, known for his eloquence and ability to connect with diverse audiences.',
    profile_4:
      'Through his leadership at Al-Mawaqeet Travels and Tours, Shaykh Abdullah continues to make significant contributions to the field of Islamic travel, ensuring that the journeys of Hajj and Umrah are accessible, safe, and spiritually fulfilling for all. His dedication to the welfare of pilgrims and his scholarly achievements make him a prominent and respected figure in the global Islamic community.',
  },
  {
    id: 'img2',
    slug: 'Shaykh-Abdul-Hakeem',
    image: team1,
    imageProfile: Kutubi,
    fullname: 'Shaykh Abdul-Hakeem Abdur-Raheem Al-Kutubi',
    post: 'Chief Managing Director Al-Mawaqeet Travels and Tours',
    personality: '{Director, Abū Hurayrah Islamic Institute, Shimawa, Ogun State, Nigeria}',
    view_profile: 'View Profile',
    profile_1:
      'Shaykh Abdul-Hakeem Abdur-Raheem Al-Kutubi is an esteemed Nigerian scholar and an influential figure in the realm of Islamic da’wah. He serves as the Director of the Abū Hurayrah Islamic Institute in Shimawa, Ogun State, where he has been instrumental in promoting the authentic teachings of Islam. With over a decade of dedication to calling people to the path of pristine Islam, Shaykh Abdul-Hakeem has established himself as a respected authority in Islamic education and outreach.',
    profile_2:
      'As the Managing director of Al-Mawaqeet Travels and Tours, Shaykh Abdul-Hakeem has leveraged his extensive experience spanning more than six years as a Hajj and Umrah guide. His passion for the welfare of pilgrims is evident in his meticulous planning and compassionate leadership, ensuring that each pilgrim’s spiritual journey is fulfilling and stress-free. His deep understanding of the rites and logistics of these sacred journeys has earned him a reputation for excellence and reliability among pilgrims and the wider Muslim community.',
    profile_3:
      'Shaykh Abdul-Hakeem’s efforts extend beyond the confines of his institute. He has been a pivotal figure in numerous da’wah activities across Nigeria, tirelessly working to spread the message of Islam. His lectures, seminars, and workshops are known for their depth of knowledge, clarity, and relevance, touching on various aspects of faith, spirituality, and practical life.',
    profile_4:
      'With a deep commitment to Islamic principles and a passion for community service, Shaykh Abdul-Hakeem Abdur-Raheem Al-Kutubi continues to be a beacon of guidance and inspiration for Muslims in Nigeria and beyond. His unwavering dedication to da’wah and the welfare of pilgrims cements his role as a leading figure in the Islamic community.',
  },
  {
    id: 'img4',
    slug: 'Shaykh-Zahradeen',
    image: team3,
    imageProfile: Ramadan,
    fullname: 'Shaykh Abdullah Zahradeen Abū Ramadan',
    post: 'Chief Operating Officer, Al-Mawaqeet Travels and Tours',
    view_profile: 'View Profile',
    profile_1:
      'Shaykh Abdullah Zahradeen Abū Ramadan is an eminent figure in the field of Hajj and Umrah logistics, with nearly a decade of experience ensuring seamless and spiritually fulfilling pilgrimages. As the Chief Operating Officer of Al-Mawaqeet Travels and Tours, he oversees operations and also leads Rahmaniyyah Travels and Tours, a key subsidiary. His expertise in organizing and managing pilgrimages has made him a trusted guide for countless pilgrims, known for his meticulous planning and compassionate care.',
    profile_2:
      'Beyond his contributions to religious tourism, Shaykh Abdullah is an accomplished entrepreneur involved in the sale of medical equipment and rice production. His ventures reflect a deep commitment to community welfare and economic development, providing essential services and products.',
    profile_3:
      'Shaykh Abdullah’s dedication to the well-being of pilgrims is unparalleled. He is deeply invested in ensuring that each pilgrim’s journey is not only logistically smooth but also spiritually enriching. His dual roles in the medical and agricultural sectors, coupled with his leadership in travel services, showcase his diverse talents and his unwavering commitment to serving the community. Shaykh Abdullah Zahradeen Abū Ramadan stands as a multifaceted leader, devoted to both spiritual guidance and practical service.',
  },
];
