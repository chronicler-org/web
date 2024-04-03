import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ICustomer } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import CustomersThisMonth from '../components/CustomersThisMonth';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const customersResponse = (await getStaticData<ICustomer[]>(
    `${EndPoints.CUSTOMER}`,
    {
      search: `limit=6`,
      authToken: session.authToken,
    }
  )) as IApiResponse<ICustomer[]>;

  return (
    <CustomersThisMonth
      className='lg:col-span-2'
      customersResponse={customersResponse}
    />
  );
};

export default Page;
