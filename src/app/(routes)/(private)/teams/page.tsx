'use client';

import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
  UsersThree,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

type TeamType = {
  id: number;
  name: string;
};

const teams: Array<TeamType> = [
  { id: 1, name: 'Loja' },
  { id: 2, name: 'Virtual' },
];

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [teamElement, setTeamElement] = useState<TeamType>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModal = (e?: TeamType) => {
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
          htmlFor='search-customer'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search-customer'
            name='search-customer'
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
          aria-label='Cadastrar novo atendente'
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
              <button type='submit' className='btn btn-ghost'>
                Cancelar
              </button>
            </form>
            <button type='submit' form='attendant-form' className='btn'>
              Salvar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;
