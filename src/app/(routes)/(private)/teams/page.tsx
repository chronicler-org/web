'use client';

import { ITeam } from '@/interfaces';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
  UsersThree,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

const now = new Date();
const createdAt = now;
const updatedAt = now;

const teams: Array<ITeam> = [
  { id: '1', name: 'Loja', createdAt, updatedAt },
  { id: '2', name: 'Virtual', createdAt, updatedAt },
];

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [teamElement, setTeamElement] = useState<ITeam>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleModal = (e?: ITeam) => {
    return () => {
      setTeamElement(e);
      modalRef.current?.showModal();
    };
  };

  const onSubmit = () => {};

  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar equipe'
          htmlFor='search-team'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search-team'
            name='search-team'
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
          aria-label='Cadastrar novo time'
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
              <th>Equipe</th>
            </tr>
          </thead>
          <tbody>
            {(sortAscending ? teams.toReversed() : teams).map((e) => (
              <tr
                key={e.id}
                onClick={handleModal(e)}
                className='hover cursor-pointer'
              >
                <td>{e.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id='team-modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <form
            id='team-form'
            method='post'
            ref={formRef}
            onSubmit={onSubmit}
            className='flex flex-col gap-4'
          >
            <label
              htmlFor='name'
              className='form-control gap-2'
              aria-label='Nome completo'
            >
              <span>Nome da equipe</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <UsersThree size={20} />
                <input
                  id='name'
                  type='text'
                  className='min-w-0 grow'
                  defaultValue={teamElement?.name}
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
              form='team-form'
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
