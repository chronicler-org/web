'use client';

import AverageDailySales from '@/app/components/average-daily-sales';
import CustomersThisMonth from '@/app/components/customers-this-month';
import OrdersThisMonth from '@/app/components/orders-this-month';
import SalesThisMonth from '@/app/components/sales-this-month';

const Page = () => {
  return (
    <>
      <h2 className='text-3xl'>Bem vindo, usuário!</h2>
      <section className='flex flex-1 flex-col gap-4 py-4 lg:grid lg:grid-cols-5 lg:grid-rows-2 [&>div]:flex [&>div]:flex-col [&>div]:rounded-xl [&>div]:bg-base-200 [&>div]:p-4'>
        <AverageDailySales className='lg:col-span-2' />
        <SalesThisMonth className='lg:col-span-3' />
        <OrdersThisMonth className='lg:col-span-3' />
        <CustomersThisMonth className='lg:col-span-2' />
      </section>
    </>
  );
};

export default Page;
