import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ICustomer } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { CustomersTable } from './components/CustomersTable';

export const metadata: Metadata = {
  title: 'Clientes - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalCustomersResponse = (await getStaticData<ICustomer[]>(
    `/${EndPoints.CUSTOMER}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<ICustomer[]>;

  return <CustomersTable initalCustomersResponse={initalCustomersResponse} />;
};

export default Page;
