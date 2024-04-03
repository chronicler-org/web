import Metric from '@/app/components/Metric';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { FC } from 'react';

type SalesThisMonthProps = {
  className?: string;
};

const SalesThisMonth: FC<SalesThisMonthProps> = ({ className }) => {
  return (
    <div className={className}>
      <Metric
        value={1527.56}
        currency='R$'
        rate={2.4}
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
            labels: Array.from(
              { length: new Date(Date.now()).getDate() },
              (
                _,
                i,
                x = new Date(),
                formatter = Intl.DateTimeFormat('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                })
              ) => x.setDate(i + 1) && formatter.format(x)
            ),
            datasets: [
              {
                data: Array.from(
                  { length: new Date(Date.now()).getDate() },
                  (_) => 600 * Math.random()
                ),
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
