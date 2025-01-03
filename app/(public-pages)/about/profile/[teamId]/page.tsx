import React from 'react';
import SingularTeam from '@/app/(public-pages)/_components/about-page/SingularTeam';
import { about_us_team } from '@/old-pages/contents/about';
import { Metadata } from 'next';

export default function TeamMemberPage({
  params,
}: {
  params: { teamId: string };
}) {
  return <SingularTeam id={params.teamId} />;
}

export async function generateMetadata({
  params,
}: {
  params: { teamId: string };
}): Promise<Metadata> {
  const teamMember = about_us_team.find((itm) => itm.id === params.teamId);

  const title = teamMember?.fullname
    ? `${teamMember.fullname} | Al-Mawaqeet Travels Team`
    : 'Team Member | Al-Mawaqeet Travels';

  const description =
    teamMember?.personality ??
    'Meet our dedicated team member at Al-Mawaqeet Travels, committed to providing exceptional Hajj and Umrah services.';

  return {
    title,
    description,
    keywords: [
      'al-mawaqeet team',
      'hajj and umrah experts',
      'islamic travel specialists',
      'nigerian travel agency team',
      'muslim pilgrimage guides',
    ].join(', '),
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://almawaqeet.com/about/profile/${params.teamId}`,
    },
  };
}
