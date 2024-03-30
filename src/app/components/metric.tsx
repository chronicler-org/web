'use client';

import { FC } from 'react';
import Rate from './rate';

type MetricProps = {
  value?: number;
  title: string;
  currency?: string;
  rate?: number;
};

const Metric: FC<MetricProps> = ({ value, title, currency, rate }) => {
  if (value === undefined) {
    return <span className='text-2xl'>{title}</span>;
  }

  return (
    <div>
      <div className='flex items-center gap-2'>
        <span className='text-3xl font-bold opacity-70'>{currency}</span>
        <span className='text-6xl font-bold'>
          {value.toLocaleString(
            'pt-BR',
            currency && value < 999.99
              ? {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              : { notation: 'compact', maximumFractionDigits: 2 }
          )}
        </span>
        <Rate rate={rate} />
      </div>
      <span className='text-xl'>{title}</span>
    </div>
  );
};

export default Metric;
