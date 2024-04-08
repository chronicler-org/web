'use client';

import { IAttendant, ITeam } from '@/interfaces';
import { attendants } from '@/mock/attendants';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import AttendantForm from './components/AttendantForm';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [attendantElement, setAttendantElement] = useState<IAttendant>();
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();

  const modalRef = useRef<HTMLDialogElement>(null);
  const handleModal = (e?: IAttendant) => {
    return () => {
      setAttendantElement(e);
      setSelectedTeam(e ? e.team : undefined);
      modalRef.current?.showModal();
    };
  };

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
                  <div className='badge badge-outline p-4'>{e.team.name}</div>
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
          <AttendantForm
            selectedTeam={selectedTeam}
            attendantElement={attendantElement}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
      </dialog>
    </div>
  );
};

export default Page;
