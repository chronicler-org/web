import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import {
  IApiResponse,
  IProductQuantitySoldVariation,
  ISaleProductSummary,
} from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { SaleStatus } from '@/enums';
import OrdersThisMonth from '../components/OrdersThisMonth';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [summaryProductsSoldResponse, productQuantitySoldVariationResponse] =
    await Promise.all([
      getStaticData<ISaleProductSummary[]>(
        `${EndPoints.SALE_PRODUCTS_SUMMARY}`,
        {
          search: `created_month=${currentMonth}&created_year=${currentYear}&limit=7&status=${SaleStatus.PURCHASE_COMPLETED}`,
          authToken: session.authToken,
          cache: 'no-cache',
        }
      ),
      getStaticData<IProductQuantitySoldVariation>(
        `${EndPoints.PRODUCT_QUANTITY_SOLD_VARIATION}`,
        {
          authToken: session.authToken,
          cache: 'no-cache',
        }
      ),
    ]);

  return (
    <OrdersThisMonth
      className='lg:col-span-3'
      summaryProductsSoldResponse={
        summaryProductsSoldResponse as IApiResponse<ISaleProductSummary[]>
      }
      productQuantitySoldVariation={
        productQuantitySoldVariationResponse?.result as IProductQuantitySoldVariation
      }
    />
  );
};

export default Page;
