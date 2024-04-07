'use client';

import { FC } from 'react';
import { Line } from 'react-chartjs-2';

import Metric from '@/app/components/Metric';
import { ITotalValueSold, ITotalValuesSoldVariation } from '@/interfaces';

type SalesThisMonthProps = {
  className?: string;
  totalValuesSold: ITotalValueSold[];
  totalValuesSoldVariation: ITotalValuesSoldVariation;
};

const SalesThisMonth: FC<SalesThisMonthProps> = ({
  className,
  totalValuesSold,
  totalValuesSoldVariation,
}) => {
  const labels = totalValuesSold.map(({ sale_date }) => {
    const formatter = Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
    });

    return formatter.format(new Date(sale_date));
  });
  const data = totalValuesSold.map(({ total_value }) => total_value);
  return (
    <div className={className}>
      <Metric
        value={totalValuesSoldVariation.total_current_month}
        currency='R$'
        rate={totalValuesSoldVariation.percent_variation}
        title='Valor vendido no mês'
      />
      <div className='flex-1'>
        <Line
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
                  stepSize: 100,
                  callback: (value) =>
                    value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }),
                },
              },
              x: {
                ticks: {
                  stepSize: 10,
                },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor: '#22c55e',
                borderColor: '#22c55e',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default SalesThisMonth;
