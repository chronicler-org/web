'use client';

import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
  Funnel,
} from '@phosphor-icons/react';
import { useState } from 'react';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(true);
  const [UFs] = useState(['SE', 'BA', 'AC', 'RS']);
  const [tags] = useState(['Black Friday', 'Premium', 'Hot Lead', 'Cold Lead']);
  const [periods] = useState([
    'Último dia',
    'Última semana',
    'Último mês',
    'Último ano',
  ]);

  return (
    <div className='drawer drawer-end flex gap-2'>
      <input
        id='customer-filter-menu'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='z-10 overflow-y-auto max-md:drawer-side'>
        {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
        <label
          htmlFor='customer-filter-menu'
          aria-label='Fechar menu de filtro'
          className='drawer-overlay'
        />
        <ul className='menu h-dvh w-80 bg-base-300 p-4 md:h-full md:w-64 md:rounded-box'>
          <li>
            <h2 className='menu-title'>UF</h2>
            <ul>
              {UFs.map((e) => (
                <li key={e}>
                  <label htmlFor={e} className='cursor-pointer'>
                    <input
                      id={e}
                      type='checkbox'
                      className='checkbox checkbox-sm'
                    />
                    <span className='label-text'>{e}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h2 className='menu-title'>Período</h2>
            <ul>
              {periods.map((e) => (
                <li key={e}>
                  <label htmlFor={e} className='cursor-pointer'>
                    <input
                      id={e}
                      type='radio'
                      className='radio radio-sm'
                      name='period'
                    />
                    <span className='label-text'>{e}</span>
                  </label>
                </li>
              ))}
              <li>
                <label htmlFor='Desde sempre' className='cursor-pointer'>
                  <input
                    id='Desde sempre'
                    type='radio'
                    className='radio radio-sm'
                    name='period'
                    defaultChecked
                  />
                  <span className='label-text'>Desde sempre</span>
                </label>
              </li>
            </ul>
          </li>
          <li>
            <h2 className='menu-title'>Tags</h2>
            <ul>
              {tags.map((e) => (
                <li key={e}>
                  <label htmlFor={e} className='cursor-pointer'>
                    <input
                      id={e}
                      type='checkbox'
                      className='checkbox checkbox-sm'
                    />
                    <span className='label-text'>{e}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className='drawer-content flex-1'>
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex gap-2'>
            <label
              aria-label='Buscar cliente'
              htmlFor='search-customer'
              className='input input-bordered flex grow items-center gap-2'
            >
              <MagnifyingGlass />
              <input
                id='search-customer'
                name='search-customer'
                type='text'
                className='grow'
                placeholder='Buscar cliente (Nome ou CPF)'
              />
            </label>
            <button
              aria-label='Ordenar por'
              type='button'
              className='btn btn-square btn-outline text-xl'
              onClick={() => setSortAscending(!sortAscending)}
            >
              {sortAscending ? <SortAscending /> : <SortDescending />}
            </button>
            <label
              htmlFor='customer-filter-menu'
              aria-label='Abrir menu de filtro'
              className='btn btn-square btn-outline drawer-button text-xl md:hidden'
            >
              <Funnel />
            </label>
            <button
              aria-label='Cadastrar novo cliente'
              type='button'
              className='btn btn-square btn-outline text-xl'
            >
              <Plus />
            </button>
          </div>
          <div className='overflow-x-auto'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr className='hover cursor-pointer'>
                  <td>Carlos Adriano</td>
                  <td>
                    <div className='badge badge-info'>{tags[0]}</div>
                  </td>
                </tr>
                <tr className='hover cursor-pointer'>
                  <td>João Mota</td>
                  <td>
                    <div className='badge badge-primary mr-2'>{tags[1]}</div>
                    <div className='badge badge-error'>{tags[2]}</div>
                  </td>
                </tr>
                <tr className='hover cursor-pointer'>
                  <td>Vanessa Souza</td>
                  <td>
                    <div className='badge badge-secondary'>{tags[3]}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
