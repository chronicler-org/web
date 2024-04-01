'use client';

import AverageDailySales from '@/app/components/average-daily-sales';
import SalesThisMonth from '@/app/components/sales-this-month';

const Page = () => {
  return (
    <>
      <h2 className='text-3xl'>Bem vindo, usuário!</h2>
      <section className='grid flex-1 grow grid-cols-1 grid-rows-4 gap-4 py-4 lg:grid-cols-5 lg:grid-rows-2 [&>div]:flex [&>div]:flex-col [&>div]:rounded-xl [&>div]:bg-base-300 [&>div]:p-4'>
        <AverageDailySales className='lg:col-span-2' />
        <SalesThisMonth className='lg:col-span-3' />
        <div className='lg:col-span-3' />
        <div className='lg:col-span-2' />
      </section>
    </>
  );
};

export default Page;
