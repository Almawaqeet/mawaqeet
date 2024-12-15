// import React from 'react'
// import Footer from './Footer'
// import { whiteSpaces } from '../utilities/GlobalSpaces'
// import { about_us_team } from '../contents/about'
// import Profile from './Profile'
// import Headings from '../utilities/Headings'
// import Image from 'next/image'
// import Paragraph from '../utilities/Paragraph'
// import Navbar from '../../components/reusables/Navbar'

// const TeamProfile: React.FC = () => {
//   return (
//     <React.Fragment>

//       <section className='max-w-[2000px] m-auto'>
//         <Navbar />
//         <main className={` bg-personality bg-cover h-screen`}>
//           {about_us_team.map((team) => (
//             <div key={`${team.id}--team`} className={`grid lg:grid-cols-[200px_1fr] xmd:grid-rows-1 xmd:gap-10 items-center justify-center lg:gap-16 ${whiteSpaces.sectionMargin}  xmd:px-5 px-[20px] sm:px-[16px] md:px-12 lg:px-[150px] xl:px-[150px] 2xl:px-[150px]`}>
//               <div className='xmd:gap-5'>
//                 <Headings type='heroHeading'>{team.fullname}</Headings>
//                 <Paragraph type='globalBold' classname='text-Bold-1-clamp xmd:font-normal  '>{team.personality}</Paragraph>
//               </div>
//               <div className="relative w-full h-64">
//                 <Image src={team.image} alt={`${team.fullname}'s image`} fill className="object-cover" />
//               </div>
//             </div>
//           ))}
//         </main>

//         {about_us_team.map((team) => (
//           <Profile key={team.id} team={team} />
//         ))}
//       </section>
//       <footer><Footer /></footer>
//     </React.Fragment>
//   )
// }

// export default TeamProfile
