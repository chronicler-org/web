'use client';

import 'chart.js/auto';
import { FC, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  salesThisMonth: ReactNode;
  ordersThisMonth: ReactNode;
  customersThisMonth: ReactNode;
};

const Layout: FC<LayoutProps> = ({
  children,
  salesThisMonth,
  ordersThisMonth,
  customersThisMonth,
}) => {
  return (
    <>
      {children}
      <section className='flex flex-1 flex-col gap-4 py-4 lg:grid lg:grid-cols-5 lg:grid-rows-2 [&>div]:flex [&>div]:flex-col [&>div]:rounded-xl [&>div]:bg-base-200 [&>div]:p-4'>
        {/* {averageDailySales} */}
        {salesThisMonth}
        {ordersThisMonth}
        {customersThisMonth}
      </section>
    </>
  );
};

export default Layout;
