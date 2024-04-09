import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ICustomerCare } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { CustomerCaresTable } from './components/CustomerCaresTable';

export const metadata: Metadata = {
  title: 'Atendimentos - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalCustomersResponse = (await getStaticData<ICustomerCare[]>(
    `/${EndPoints.CUSTOMER_CARE}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<ICustomerCare[]>;

  return (
    <CustomerCaresTable initalCustomerCaresResponse={initalCustomersResponse} />
  );
};

export default Page;
