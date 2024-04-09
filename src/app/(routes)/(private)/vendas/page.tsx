import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ISale } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { SalesTable } from './components/SalesTable';

export const metadata: Metadata = {
  title: 'Vendas - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalSalesResponse = (await getStaticData<ISale[]>(
    `/${EndPoints.SALE}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<ISale[]>;
  return <SalesTable initalSalesResponse={initalSalesResponse} />;
};

export default Page;
