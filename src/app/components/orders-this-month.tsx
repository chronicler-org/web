'use client';

import Metric from '@/app/components/metric';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { FC } from 'react';

type OrdersThisMonthProps = {
  className?: string;
};

const OrdersThisMonth: FC<OrdersThisMonthProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-3 lg:flex-row'>
        <div className='order-3 flex flex-col rounded-box bg-base-300 p-2 sm:order-2 sm:row-span-3'>
          <ul className='menu menu-lg flex-1 rounded-box'>
            <li className='menu-title'>Últimos produtos vendidos</li>
            <li>
              <a>Camisa X</a>
            </li>
            <li>
              <a>Camisa Y</a>
            </li>
            <li>
              <a>Meia Z</a>
            </li>
            <li>
              <a>Bermuda W</a>
            </li>
          </ul>
          <button type='button' className='btn btn-neutral w-full text-lg'>
            Ver todos os produtos
          </button>
        </div>
        <div className='order-1'>
          <Metric value={42.75} rate={2} title='Produtos vendidos neste mês' />
        </div>
        <div className='order-2 row-span-2 max-h-fit sm:order-3'>
          <Doughnut
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    label: (context) =>
                      `${context.parsed} unidade${context.parsed !== 1 ? 's' : ''}`,
                  },
                },
              },
            }}
            data={{
              labels: [
                'Cueca',
                'Bermuda',
                'Camisa',
                'Meia',
                'Camiseta',
                'Vestido',
                'Calça',
              ],
              datasets: [
                {
                  data: [1, 4, 3, 5, 2, 4, 3],
                  borderWidth: 1,
                  backgroundColor: [
                    '#22c55e',
                    '#06b6d4',
                    '#6366f1',
                    '#f43f5e',
                    '#f97316',
                    '#84cc16',
                    '#a855f7',
                    '#ec4899',
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersThisMonth;
