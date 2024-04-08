'use client';

import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { useState } from 'react';

import { IProduct } from '@/interfaces';

import { CreateAndEditProductModal } from '../CreateAndEditProductModal';

export const ProductsTable = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);

  // CREATE AND EDIT PRODUCT FUNCTIONS AND STATES
  const [isCreateAndEditProductModalOpen, setCreateAndEditProductModalOpen] =
    useState(false);
  const [currentProductUpdate, setCurrentProductUpdate] =
    useState<IProduct | null>(null);

  const handleOpenCreateAndEditProductyModal =
    (product: IProduct | null) => () => {
      setCurrentProductUpdate(product);
      setCreateAndEditProductModalOpen(true);
    };
  const handleCloseCreateAndEditProductModal = () => {
    setCreateAndEditProductModalOpen(false);
    setCurrentProductUpdate(null);
  };

  return (
    <>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar'
          htmlFor='search'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search'
            name='search'
            type='text'
            className='min-w-0 grow'
            placeholder='Buscar'
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
          aria-label='Cadastrar'
          type='button'
          className='btn btn-square btn-outline text-xl'
          onClick={handleOpenCreateAndEditProductyModal(null)}
        >
          <Plus />
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Tecido</th>
              <th>Tamanho</th>
              <th>Unidades</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {(sortAscending ? [].toReversed() : []).map((e) => (
              <tr
                key={e.id}
                onClick={handleModal(e)}
                className='hover cursor-pointer'
              >
                <td>{e.model}</td>
                <td>{e.fabric}</td>
                <td>{e.size}</td>
                <td>{e.stock}</td>
                <td>
                  {e.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateAndEditProductModal
        isOpen={isCreateAndEditProductModalOpen}
        onRequestClose={handleCloseCreateAndEditProductModal}
        product={currentProductUpdate}
      />
    </>
  );
};
