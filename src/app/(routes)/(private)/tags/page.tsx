'use client';

import { ITag } from '@/interfaces';
import {
  Eyedropper,
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
  Tag,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

const now = new Date();
const createdAt = now;
const updatedAt = now;

const tags: Array<ITag> = [
  { id: '1', color: '#FF00FF', name: 'Black Friday', createdAt, updatedAt },
  { id: '2', color: '#FF4444', name: 'Hot Lead', createdAt, updatedAt },
  { id: '3', color: '#3311FF', name: 'Premium', createdAt, updatedAt },
  { id: '4', color: '#44AAB2', name: 'Cold Lead', createdAt, updatedAt },
];

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [tagElement, setTagElement] = useState<ITag>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleModal = (e?: ITag) => {
    return () => {
      setTagElement(e);
      modalRef.current?.showModal();
    };
  };

  const onSubmit = () => {};

  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar tag'
          htmlFor='search-tag'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search-tag'
            name='search-tag'
            type='text'
            className='min-w-0 grow'
            placeholder='Buscar equipe'
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
          aria-label='Cadastrar nova tag'
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
              <th>Nome</th>
              <th>Cor</th>
            </tr>
          </thead>
          <tbody>
            {(sortAscending ? tags.toReversed() : tags).map((e) => (
              <tr
                key={e.id}
                onClick={handleModal(e)}
                className='hover cursor-pointer'
              >
                <td>{e.name}</td>
                <td aria-label='Cor da tag'>
                  <span style={{ background: e.color }} className='badge' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id='tag-modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <form
            id='tag-form'
            method='post'
            onSubmit={onSubmit}
            ref={formRef}
            className='flex gap-4'
          >
            <label
              htmlFor='name'
              className='form-control grow gap-2'
              aria-label='Nome da tag'
            >
              <span>Nome da tag</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <Tag size={20} />
                <input
                  id='name'
                  type='text'
                  className='min-w-0 grow'
                  defaultValue={tagElement?.name}
                  required
                />
              </div>
            </label>
            <label
              htmlFor='color'
              className='form-control shrink gap-2'
              aria-label='Nome da tag'
            >
              <span>Cor</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <Eyedropper size={20} />
                <input
                  id='color'
                  type='color'
                  className='min-w-0 grow'
                  defaultValue={tagElement?.color}
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
              form='tag-form'
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
