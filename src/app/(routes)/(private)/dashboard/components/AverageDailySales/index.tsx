'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';
import { ChartProps } from 'react-chartjs-2';

import Metric from '@/app/components/Metric';

type AverageDailySalesProps = {
  className?: string;
};

const Bar = dynamic<ChartProps<'bar'>>(
  () =>
    import('react-chartjs-2').then((module) => ({
      default: module.Bar,
    })),
  {
    ssr: false,
    suspense: true,
  }
);

const AverageDailySales: FC<AverageDailySalesProps> = ({ className }) => {
  return (
    <div className={className}>
      <Metric
        value={42.75}
        currency='R$'
        rate={-4.2}
        title='Vendas médias diárias'
      />
      <div className='flex-1'>
        <Bar
          type='bar'
          className='mt-4'
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                displayColors: false,
                callbacks: {
                  label: (context) =>
                    context.parsed.y.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }),
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  stepSize: 2,
                  callback: (value) =>
                    value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }),
                },
              },
            },
          }}
          data={{
            labels: Array.from({ length: 7 }, (_, i) =>
              new Intl.DateTimeFormat('pt-BR', {
                month: 'short',
                day: 'numeric',
              }).format(new Date(Date.now() - i * 24 * 60 * 60 * 1000))
            ).reverse(),
            datasets: [
              {
                data: [1.5, 4.5, 3, 5, 2, 4, 3.1],
                backgroundColor: '#22c55e',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default AverageDailySales;
