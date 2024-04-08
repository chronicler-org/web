import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, IAttendant } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { AttendantsTable } from './components/AttendantsTable';

export const metadata: Metadata = {
  title: 'Atendentes - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalAttendantsResponse = (await getStaticData<IAttendant[]>(
    `/${EndPoints.ATTENDANT}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<IAttendant[]>;

  return (
    <AttendantsTable initalAttendantsResponse={initalAttendantsResponse} />
  );
};

export default Page;
