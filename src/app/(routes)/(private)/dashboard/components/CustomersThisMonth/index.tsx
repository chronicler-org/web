'use client';

import Link from 'next/link';
import { FC } from 'react';

import Metric from '@/app/components/Metric';
import { Routes } from '@/enums/routesEnum';
import { IApiResponse, ICustomer } from '@/interfaces';

type CustomersThisMonthProps = {
  className?: string;
  customersResponse: IApiResponse<ICustomer[]>;
  newCustomersVariation: number;
};

const CustomersThisMonth: FC<CustomersThisMonthProps> = ({
  className,
  customersResponse,
  newCustomersVariation,
}) => {
  const { meta, result: customers } = customersResponse;
  return (
    <div className={className}>
      <div className='flex flex-col'>
        <Metric
          value={meta.total_count}
          rate={newCustomersVariation}
          title='Novos clientes este mês'
        />
        <div className='mt-4 flex flex-1 flex-col rounded-box bg-base-300 p-2'>
          <ul className='menu menu-lg flex-1 rounded-box'>
            <li className='menu-title'>Novos clientes</li>
            {customers.map((customer) => (
              <li key={customer.id}>
                <a>{customer.name}</a>
              </li>
            ))}
          </ul>
          <Link
            href={Routes.CUSTOMERS}
            prefetch={false}
            className='btn btn-neutral w-full text-lg'
          >
            Ver todos os clientes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomersThisMonth;
