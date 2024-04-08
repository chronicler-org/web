import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ITeam } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { TeamsTable } from './components/TeamsTable';

export const metadata: Metadata = {
  title: 'Equipes - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalTeamsResponse = (await getStaticData<ITeam[]>(
    `/${EndPoints.TEAM}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<ITeam[]>;

  return <TeamsTable initalTeamsResponse={initalTeamsResponse} />;
};

export default Page;
