'use client';

import { FC } from 'react';

import Metric from '@/app/components/Metric';

type CustomersThisMonthProps = {
  className?: string;
};

const CustomersThisMonth: FC<CustomersThisMonthProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex flex-col'>
        <Metric value={12} rate={0} title='Novos clientes este mês' />
        <div className='mt-4 flex flex-1 flex-col rounded-box bg-base-300 p-2'>
          <ul className='menu menu-lg flex-1 rounded-box'>
            <li className='menu-title'>Novos clientes</li>
            <li>
              <a>João</a>
            </li>
            <li>
              <a>Carlos</a>
            </li>
            <li>
              <a>Leandra</a>
            </li>
            <li>
              <a>Júlio</a>
            </li>
            <li>
              <a>Fernando</a>
            </li>
            <li>
              <a>Márcia</a>
            </li>
          </ul>
          <button type='button' className='btn btn-neutral w-full text-lg'>
            Ver todos os clientes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersThisMonth;
