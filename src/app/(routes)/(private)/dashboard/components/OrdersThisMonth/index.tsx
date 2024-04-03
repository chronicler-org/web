'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';
import { ChartProps } from 'react-chartjs-2';

import Metric from '@/app/components/Metric';

type OrdersThisMonthProps = {
  className?: string;
};

const Doughnut = dynamic<ChartProps<'doughnut'>>(
  () =>
    import('react-chartjs-2').then((module) => ({
      default: module.Doughnut,
    })),
  {
    ssr: false,
    suspense: true,
  }
);

const OrdersThisMonth: FC<OrdersThisMonthProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex flex-1 flex-col gap-4 lg:flex-row'>
        <div className='flex max-h-fit flex-col gap-2'>
          <Metric value={42.75} rate={2} title='Produtos vendidos neste mês' />
          <div className='flex-1'>
            <Doughnut
              type='doughnut'
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
        <div className='flex flex-1 flex-col rounded-box bg-base-300 p-2'>
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
      </div>
    </div>
  );
};

export default OrdersThisMonth;
