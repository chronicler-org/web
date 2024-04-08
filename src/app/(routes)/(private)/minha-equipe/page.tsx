import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, IAttendant } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { MyTeam } from './components/MyTeam';

export const metadata: Metadata = {
  title: 'Minha Equipe - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalAttendantsMyTeamResponse = (await getStaticData<IAttendant[]>(
    `/${EndPoints.ATTENDANT}`,
    {
      search: `limite=10&pagina=1&order=created_at:DESC&team_id=${session.user.team.id}`,
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<IAttendant[]>;

  return (
    <MyTeam
      initalAttendantsMyTeamResponse={initalAttendantsMyTeamResponse}
      session={session}
    />
  );
};

export default Page;
