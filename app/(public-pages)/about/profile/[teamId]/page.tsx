import React from 'react';
import SingularTeam from '@/app/(public-pages)/_components/about-page/SingularTeam';

export default function page ({ params }: { params: { teamId: string } }) {

 return <SingularTeam id={params.teamId} />
}

