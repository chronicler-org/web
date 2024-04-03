'use client';

import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { useState } from 'react';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);

  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar atendente'
          htmlFor='search-customer'
          className='input input-bordered flex grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search-customer'
            name='search-customer'
            type='text'
            className='grow'
            placeholder='Buscar atendente (Nome, CPF ou Equipe)'
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
        <button
          aria-label='Cadastrar novo atendente'
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
              <th>Equipes</th>
            </tr>
          </thead>
          <tbody>
            <tr className='hover cursor-pointer'>
              <td>Carlos Adriano</td>
              <td>
                <div className='badge badge-outline'>Virtual</div>
              </td>
            </tr>
            <tr className='hover cursor-pointer'>
              <td>João Mota</td>
              <td>
                <div className='badge badge-outline mr-2'>Virtual</div>
                <div className='badge badge-outline'>Loja</div>
              </td>
            </tr>
            <tr className='hover cursor-pointer'>
              <td>Vanessa Souza</td>
              <td>
                <div className='badge badge-outline'>Loja</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
