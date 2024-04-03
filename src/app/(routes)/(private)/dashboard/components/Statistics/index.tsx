'use client';

import AverageDailySales from '../AverageDailySales';
import CustomersThisMonth from '../CustomersThisMonth';
import OrdersThisMonth from '../OrdersThisMonth';
import SalesThisMonth from '../SalesThisMonth';

const Statistics = () => {
  return (
    <section className='flex flex-1 flex-col gap-4 py-4 lg:grid lg:grid-cols-5 lg:grid-rows-2 [&>div]:flex [&>div]:flex-col [&>div]:rounded-xl [&>div]:bg-base-200 [&>div]:p-4'>
      <AverageDailySales className='lg:col-span-2' />
      <SalesThisMonth className='lg:col-span-3' />
      <OrdersThisMonth className='lg:col-span-3' />
      <CustomersThisMonth className='lg:col-span-2' />
    </section>
  );
};

export default Statistics;
