'use client';
import AppHeading from "@/components/reusables/AppHeading";
import { TeamEmptyState } from "@/components/reusables/PackagesEmptyState";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { about_us_team } from "@/old-pages/contents/about";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { CLIENT_ROUTES } from "@/lib/routes";

const SingularTeam = ({ id }: { id: string }) => {
  const teamMember = about_us_team.find((itm) => itm.id === id);

  if (!teamMember) return <TeamEmptyState />;

  const { fullname, personality, imageProfile, profile } = teamMember;

  const router = useRouter();

  return (
    <section className="mb-8">
      {/* Header Section */}
      <aside className="bg-static-image md:block xmd:flex justify-center items-center xmd:h-80 md:h-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <main className="grid md:grid-cols-[1fr_300px] sm:grid-cols-1 py-12 gap-8 h-full px-4">
            <div className="flex flex-col gap-4">
              <AppHeading
                variant="h2"
                className="text-3xl md:text-4xl text-white font-bold"
              >
                {fullname}
              </AppHeading>
              <p className="text-lg text-gray-300">{personality}</p>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={imageProfile}
                height={200}
                width={200}
                className="rounded-lg object-cover shadow-lg"
                quality={100}
                alt={id}
              />
            </div>
          </main>
        </div>
      </aside>

      {/* Profile Details */}
      <div className="max-w-7xl mx-auto space-y-6 px-4 mt-8">
        {profile.map((item, index) => (
          <div key={index} className="bg-gray-50 shadow-md rounded-lg p-4">
            {Object.values(item).map((detail, i) => (
              <p key={i} className="text-brand-color-text text-base leading-relaxed">
                {detail}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push(CLIENT_ROUTES.PublicPages.about.index)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-brand-color rounded-full shadow-md flex items-center justify-center cursor-pointer"
      >
        <FaArrowLeft className="text-white text-2xl" />
      </motion.div>
    </section>
  );
};

export default SingularTeam;
