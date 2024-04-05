'use client';

import { ITeam } from '@/interfaces';
import {
  CalendarDots,
  Envelope,
  IdentificationCard,
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
  User,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';

type AttendantType = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birth: Date;
  team: ITeam;
};

const now = new Date();
const createdAt = now;
const updatedAt = now;

const attendants: Array<AttendantType> = [
  {
    id: 1,
    name: 'Carlos Adriano',
    email: 'carlosadriano@mail.com',
    cpf: '11111111111',
    birth: new Date(2002, 3, 2),
    team: { id: '1', name: 'Loja', createdAt, updatedAt },
  },
  {
    id: 2,
    name: 'João Mota',
    email: 'joaomota@mail.com',
    cpf: '11111111111',
    birth: new Date(1997, 4, 9),
    team: { id: '1', name: 'Loja', createdAt, updatedAt },
  },
  {
    id: 3,
    name: 'Vanessa Souza',
    email: 'vanessasouza@mail.com',
    cpf: '11111111111',
    birth: new Date(2001, 11, 20),
    team: { id: '2', name: 'Virtual', createdAt, updatedAt },
  },
];

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [attendantElement, setAttendantElement] = useState<AttendantType>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModal = (e?: AttendantType) => {
    return () => {
      setAttendantElement(e);
      modalRef.current?.showModal();
    };
  };

  const onSubmit = () => {};

  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar atendente'
          htmlFor='search-customer'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search-customer'
            name='search-customer'
            type='text'
            className='min-w-0 grow'
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
              <th>Equipe</th>
            </tr>
          </thead>
          <tbody>
            {(sortAscending ? attendants.toReversed() : attendants).map((e) => (
              <tr
                key={e.id}
                onClick={handleModal(e)}
                className='hover cursor-pointer'
              >
                <td>{e.name}</td>
                <td>
                  <div className='badge badge-outline'>{e.team.name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id='attendant-modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <form
            id='attendant-form'
            method='post'
            onSubmit={onSubmit}
            className='flex flex-col gap-4'
          >
            <label
              htmlFor='name'
              className='form-control gap-2'
              aria-label='Nome completo'
            >
              <span>Nome completo</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <User size={20} />
                <input
                  id='name'
                  type='text'
                  className='min-w-0 grow'
                  defaultValue={attendantElement?.name}
                  required
                />
              </div>
            </label>
            <label
              htmlFor='cpf'
              className='form-control gap-2'
              aria-label='CPF'
            >
              <span>CPF</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <IdentificationCard size={20} />
                <input
                  id='cpf'
                  type='text'
                  className='min-w-0 grow'
                  defaultValue={attendantElement?.cpf}
                  readOnly={Boolean(attendantElement?.cpf)}
                  required
                />
              </div>
            </label>
            <label
              htmlFor='email'
              className='form-control gap-2'
              aria-label='E-mail'
            >
              <span>E-mail</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <Envelope size={20} />
                <input
                  id='email'
                  type='email'
                  className='min-w-0 grow'
                  defaultValue={attendantElement?.email}
                  required
                />
              </div>
            </label>
            <label
              className='form-control gap-2'
              htmlFor='brith'
              aria-label='Data de nascimento'
            >
              <span>Data de nascimento</span>
              <div className='input input-bordered flex w-full items-center gap-2'>
                <CalendarDots size={20} />
                <input
                  type='date'
                  id='brith'
                  placeholder='dd/MM/yyyy'
                  className='min-w-0 grow'
                  defaultValue={attendantElement?.birth
                    .toISOString()
                    .substring(0, 10)}
                  required
                />
              </div>
            </label>
            <label htmlFor='team' className='form-control gap-2'>
              <span>Equipe</span>
              <select id='team' className='select select-bordered w-full'>
                <option disabled selected>
                  Equipe
                </option>
                <option>Virtual</option>
                <option>Loja</option>
              </select>
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
