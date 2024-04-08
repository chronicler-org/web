'use client';

import { ICustomer, ICustomerCare, ITeam } from '@/interfaces';
import {
  MagnifyingGlass,
  Plus,
  SortAscending,
  SortDescending,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { customerCares } from '@/mock/customerCares';
import CustomerCareForm from './components/CustomerCareForm';

const Page = () => {
  const [sortAscending, setSortAscending] = useState<Boolean>(false);
  const [customerCareElement, setCustomerCareElement] =
    useState<ICustomerCare>();
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  const modalRef = useRef<HTMLDialogElement>(null);
  const handleModal = (e?: ICustomerCare) => {
    return () => {
      setCustomerCareElement(e);
      modalRef.current?.showModal();
    };
  };

  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='flex gap-2'>
        <label
          aria-label='Buscar atendimento'
          htmlFor='search'
          className='input input-bordered flex min-w-0 grow items-center gap-2'
        >
          <MagnifyingGlass />
          <input
            id='search'
            name='search'
            type='text'
            className='min-w-0 grow'
            placeholder='Buscar atendimento (Cliente ou Time)'
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
          aria-label='Cadastrar novo atendimento'
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
              <th>Cliente</th>
              <th>Equipe</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {(sortAscending ? customerCares.toReversed() : customerCares).map(
              (e) => (
                <tr
                  key={e.id}
                  onClick={handleModal(e)}
                  className='hover cursor-pointer'
                >
                  <td>{e.customer.name}</td>
                  <td>{e.Team.name}</td>
                  <td>
                    {e.date.toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id='attendant-modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <CustomerCareForm
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            customerCareElement={customerCareElement}
          />
        </div>
      </dialog>
    </div>
  );
};

export default Page;
