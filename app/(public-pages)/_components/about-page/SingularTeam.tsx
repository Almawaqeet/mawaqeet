import { TeamEmptyState } from "@/components/reusables/PackagesEmptyState";
import { about_us_team } from "@/old-pages/contents/about";
import dynamic from "next/dynamic";

const AppHeading = dynamic(() => import('@/components/reusables/AppHeading'))

const SingularTeam = ({ id }: { id: string }) => {
    console.log('Received ID:', id);
    console.log('about_us_team:', about_us_team);
  
    const teamMember = about_us_team.find((itm) => itm.id === id);
    console.log('Found Team Member:', teamMember);
  
    if (!teamMember) return <TeamEmptyState />;
  
    const { fullname, post } = teamMember;
  
    return (
      <section>
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-brand-color mb-4 text-center"
        >
          {fullname}
        </AppHeading>
        <p className="text-lg text-gray-600 text-center">{post}</p>
      </section>
    );
  };

  export default SingularTeam
  