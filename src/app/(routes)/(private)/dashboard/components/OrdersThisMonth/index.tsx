'use client';

import Link from 'next/link';
import randomcolor from 'randomcolor';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

import Metric from '@/app/components/Metric';
import { Routes } from '@/enums/routesEnum';
import {
  IApiResponse,
  IProductQuantitySoldVariation,
  ISaleItem,
  ISaleProductSummary,
} from '@/interfaces';

type OrdersThisMonthProps = {
  className?: string;
  summaryProductsSoldResponse: IApiResponse<ISaleProductSummary[]>;
  productQuantitySoldVariation: IProductQuantitySoldVariation;
  saleItems: ISaleItem[];
};

const OrdersThisMonth: FC<OrdersThisMonthProps> = ({
  className,
  saleItems,
  summaryProductsSoldResponse,
  productQuantitySoldVariation,
}) => {
  const summaryProductsSold = summaryProductsSoldResponse.result;
  const summaryTotalProductsSold = summaryProductsSoldResponse.meta.total_count;

  const colors = randomcolor({
    count: summaryProductsSold.length,
    seed: 999,
    format: 'hex',
    luminosity: 'dark',
  });

  const labels = summaryProductsSold.map((summary) => summary.model);
  const quantitiesProductsSold = summaryProductsSold.map(
    (summary) => summary.total_quantity
  );
  return (
    <div className={className}>
      <div className='flex flex-1 flex-col gap-4 lg:flex-row'>
        <div className='flex max-h-fit flex-col gap-2'>
          <Metric
            value={productQuantitySoldVariation.total_current_month}
            rate={productQuantitySoldVariation.percent_variation}
            title={
              summaryTotalProductsSold < 2
                ? 'Produto mais vendidos neste mês'
                : `Os ${summaryTotalProductsSold} Produto mais vendidos neste mês`
            }
          />
          <div className='flex-1'>
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
                labels,
                datasets: [
                  {
                    data: quantitiesProductsSold,
                    borderWidth: 1,
                    backgroundColor: colors,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className='flex flex-1 flex-col rounded-box bg-base-300 p-2'>
          <ul className='menu menu-lg flex-1 rounded-box'>
            <li className='menu-title'>Últimos produtos vendidos</li>
            {saleItems.map(({ product }) => (
              <li key={product.id}>
                <a>{product?.model}</a>
              </li>
            ))}
          </ul>
          <Link
            href={Routes.PRODUCTS}
            prefetch={false}
            className='btn btn-neutral w-full text-lg'
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersThisMonth;
