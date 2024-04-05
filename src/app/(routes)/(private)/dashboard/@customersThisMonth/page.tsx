import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ICustomer, INewCustomersVariation } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import CustomersThisMonth from '../components/CustomersThisMonth';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [customersResponse, newCustomersVariationResponse] = await Promise.all([
    getStaticData<ICustomer[]>(`${EndPoints.CUSTOMER}`, {
      search: `created_month=${currentMonth}&created_year=${currentYear}&limit=6`,
      authToken: session.authToken,
      cache: 'no-cache',
    }),
    getStaticData<INewCustomersVariation>(
      `${EndPoints.NEW_CUSTOMER_VARIATION}`,
      {
        authToken: session.authToken,
        cache: 'no-cache',
      }
    ),
  ]);

  return (
    <CustomersThisMonth
      className='lg:col-span-2'
      newCustomersVariation={
        newCustomersVariationResponse?.result.percent_variation as number
      }
      customersResponse={customersResponse as IApiResponse<ICustomer[]>}
    />
  );
};

export default Page;
