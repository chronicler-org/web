'use client';

import { ClothingModel, Size } from '@/enums/product';
import { IProduct } from '@/interfaces';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

const now = new Date();
const createdAt = now;
const updatedAt = now;

const mockup: Array<IProduct> = [
  {
    id: '1',
    model: ClothingModel.Dress,
    size: Size.SizeGG,
    value: 350.0,
    fabric: 'Linho',
    stock: 20,
    createdAt,
    updatedAt,
  },
  {
    id: '2',
    model: ClothingModel.Pants,
    size: Size.SizeG,
    value: 170.0,
    fabric: 'Jeans',
    stock: 200,
    createdAt,
    updatedAt,
  },
  {
    id: '3',
    model: ClothingModel.Underwear,
    size: Size.SizeP,
    value: 70.0,
    fabric: 'Elastano',
    stock: 50,
    createdAt,
    updatedAt,
  },
  {
    id: '4',
    model: ClothingModel.Shirt,
    size: Size.SizeGG,
    value: 120.0,
    fabric: 'Algodão',
    stock: 40,
    createdAt,
    updatedAt,
  },
];

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [element, setElement] = useState<IProduct>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleModal = (e?: IProduct) => {
    return () => {
      setElement(e);
      modalRef.current?.showModal();
    };
  };

  const onSubmit = () => {};

  return (
    <div className='flex flex-1 flex-col gap-2'>
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
          onClick={handleModal()}
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
            {(sortAscending ? mockup.toReversed() : mockup).map((e) => (
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

      <dialog
        ref={modalRef}
        id='modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <form
            id='form'
            method='post'
            onSubmit={onSubmit}
            ref={formRef}
            className='flex flex-col gap-4'
          >
            <label
              htmlFor='model'
              className='form-control grow gap-2'
              aria-label='Modelo'
            >
              <span>Modelo</span>
              <select id='model' className='select select-bordered w-full'>
                <option aria-label='Modelo' disabled selected />
                {Object.values(ClothingModel).map((e) => (
                  <option key={e} selected={e === element?.model}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor='fabric'
              className='form-control gap-2'
              aria-label='Tecido'
            >
              <span>Tecido</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <input
                  id='fabric'
                  type='text'
                  className='min-w-0 grow'
                  defaultValue={element?.fabric}
                  required
                />
              </div>
            </label>
            <label
              htmlFor='size'
              className='form-control grow gap-2'
              aria-label='Tamanho'
            >
              <span>Tamanho</span>
              <select id='size' className='select select-bordered w-full'>
                <option aria-label='Tamanho' disabled selected />
                {Object.values(Size).map((e) => (
                  <option key={e} selected={e === element?.size}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor='stock'
              className='form-control gap-2'
              aria-label='Unidades'
            >
              <span>Unidades</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <input
                  id='stock'
                  type='number'
                  className='min-w-0 grow'
                  defaultValue={element?.stock}
                  required
                />
              </div>
            </label>
            <label
              htmlFor='value'
              className='form-control gap-2'
              aria-label='Valor'
            >
              <span>Valor</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <input
                  id='value'
                  type='number'
                  className='min-w-0 grow'
                  defaultValue={element?.value}
                  required
                />
              </div>
            </label>
          </form>
          <div className='modal-action'>
            <form method='dialog'>
              <button
                type='submit'
                className='btn btn-ghost'
                onClick={() => formRef.current?.reset()}
              >
                Cancelar
              </button>
            </form>
            <button
              type='submit'
              form='form'
              className='btn'
              onClick={() => formRef.current?.reset()}
            >
              Salvar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;
