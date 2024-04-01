'use client';

import { CaretDown, CaretUp, Minus } from '@phosphor-icons/react';
import { FC } from 'react';

type RateProps = {
  rate?: number;
};

const Rate: FC<RateProps> = ({ rate }) => {
  if (rate === undefined) {
    return <span />;
  }
  if (rate < 0) {
    return (
      <span className='flex items-center rounded  bg-rose-300 p-1 font-bold text-rose-600 dark:bg-rose-200 dark:text-rose-500'>
        <CaretDown />
        {-rate}%
      </span>
    );
  }
  if (rate > 0) {
    return (
      <span className='flex items-center rounded bg-emerald-300 p-1 font-bold text-emerald-600 dark:bg-emerald-200 dark:text-emerald-500'>
        <CaretUp />
        {rate}%
      </span>
    );
  }
  return (
    <span className='flex items-center rounded bg-neutral-300 p-1 font-bold text-neutral-500 dark:bg-neutral-200 dark:text-neutral-500'>
      <Minus />
      {rate}%
    </span>
  );
};

export default Rate;
