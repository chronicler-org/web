import { Card } from '@/app/components/ui/Card';

import { ProductsTable } from './components/ProductsTable';

const Page = () => {
  return (
    <Card title='Produtos'>
      <ProductsTable />
    </Card>
  );
};

export default Page;
