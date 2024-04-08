import { Session, getServerSession } from 'next-auth';
import { Metadata } from 'next';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, IProduct } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { ProductsTable } from './components/ProductsTable';

export const metadata: Metadata = {
  title: 'Produtos - Chronicler',
};

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalProductsResponse = (await getStaticData<IProduct[]>(
    `/${EndPoints.PRODUCT}`,
    {
      search: 'limite=10&pagina=1&order=created_at:DESC',
      cache: 'no-store',
      authToken: session.authToken,
    }
  )) as IApiResponse<IProduct[]>;
  return <ProductsTable initalProductsResponse={initalProductsResponse} />;
};

export default Page;
