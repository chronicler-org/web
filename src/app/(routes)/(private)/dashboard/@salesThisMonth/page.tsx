import { format } from 'date-fns';
import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { ITotalValueSold, ITotalValuesSoldVariation } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import SalesThisMonth from '../components/SalesThisMonth';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;
  const currentDate = new Date();

  const firstDayOfMonth = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    1
  );
  const formattedStartDate = format(
    firstDayOfMonth,
    "yyyy-MM-dd'T'HH:mm:ss'Z'"
  );

  currentDate.setDate(currentDate.getDate() + 1);
  const formattedEndDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");

  const [totalValuesSoldResponse, totalValuesSoldVariationResponse] =
    await Promise.all([
      getStaticData<ITotalValueSold[]>(`${EndPoints.TOTAL_VALUES_SOLD}`, {
        search: `start_date=${formattedStartDate}&end_date=${formattedEndDate}&limit=30`,
        authToken: session.authToken,
        cache: 'no-cache',
      }),
      getStaticData<ITotalValuesSoldVariation>(
        `${EndPoints.TOTAL_VALUES_SOLD_VARIATION}`,
        {
          authToken: session.authToken,
          cache: 'no-cache',
        }
      ),
    ]);

  return (
    <SalesThisMonth
      totalValuesSold={totalValuesSoldResponse?.result || []}
      totalValuesSoldVariation={
        totalValuesSoldVariationResponse?.result as ITotalValuesSoldVariation
      }
      className='lg:col-span-5'
    />
  );
};

export default Page;
