'use client';

import Metric from '@/app/components/metric';
import 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

const Page = () => {
  return (
    <>
      <h2 className='text-3xl'>Bem vindo, usuário!</h2>
      <section className='grid flex-1 grow grid-cols-1 grid-rows-4 gap-4 py-4 lg:grid-cols-5 lg:grid-rows-2 [&>div]:flex [&>div]:flex-col [&>div]:rounded-xl [&>div]:bg-base-300 [&>div]:p-4'>
        {/* Vendas diárias */}
        <div className='lg:col-span-2'>
          <Metric
            value={42.75}
            currency='R$'
            rate={-4.2}
            title='Vendas médias diárias'
          />
          <div className='flex-1'>
            <Bar
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
        {/* Valor arrecadado */}
        <div className='lg:col-span-3'>
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
        {/* Produtos vendidos */}
        <div className='lg:col-span-3' />
        {/* Novos clientes */}
        <div className='lg:col-span-2' />
      </section>
    </>
  );
};

export default Page;
