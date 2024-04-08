import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, IManager } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { ManagersTable } from './components/ManagersTable';

export const metadata: Metadata = {
  title: 'Gerentes - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalAttendantsResponse = (await getStaticData<IManager[]>(
    `/${EndPoints.MANAGER}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<IManager[]>;

  return <ManagersTable initalManagersResponse={initalAttendantsResponse} />;
};

export default Page;
