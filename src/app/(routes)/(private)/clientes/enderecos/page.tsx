import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ICustomerAddress } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { CustomerAddressesTable } from './components/CustomerAddressesTable';

export const metadata: Metadata = {
  title: 'Endereços dos clientes - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalCustomerAddressesResponse = (await getStaticData<
    ICustomerAddress[]
  >(`/${EndPoints.CUSTOMER_ADDRESS}`, {
    search: 'limite=10&pagina=1&order=created_at:DESC',
    cache: 'no-store',
    authToken: session.authToken,
  })) as IApiResponse<ICustomerAddress[]>;

  return (
    <CustomerAddressesTable
      initalCustomerAddressesResponse={initalCustomerAddressesResponse}
    />
  );
};

export default Page;
