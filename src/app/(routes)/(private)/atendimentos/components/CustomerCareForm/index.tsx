import Autocomplete from '@/app/components/Autocomplete';
import {
  ICustomerCare,
  ICustomer,
  ITeam,
  ICustomerCareEvaluation,
} from '@/interfaces';
import { customers } from '@/mock/customers';
import { teams } from '@/mock/teams';
import { CalendarDots } from '@phosphor-icons/react';
import { Dispatch, FC, SetStateAction, useRef } from 'react';

type CustomerCareProps = {
  customerCareElement?: ICustomerCare;
  customerCareEvaluationElement?: ICustomerCareEvaluation;
  selectedCustomer?: ICustomer;
  setSelectedCustomer: Dispatch<SetStateAction<ICustomer | undefined>>;
  selectedTeam?: ITeam;
  setSelectedTeam: Dispatch<SetStateAction<ITeam | undefined>>;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const CustomerCareForm: FC<CustomerCareProps> = ({
  customerCareElement,
  customerCareEvaluationElement,
  selectedCustomer,
  setSelectedCustomer,
  selectedTeam,
  setSelectedTeam,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={formRef}
        id='attendant-form'
        method='post'
        className='flex flex-col gap-4'
      >
        {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
        <label htmlFor='customer' className='form-control z-10 gap-2'>
          <span>Cliente</span>
          <Autocomplete
            defaultValue={customerCareElement?.customer.name}
            placeholder='Buscar clientes'
            items={customers.map((customer) => ({
              name: customer.name,
              id: customer.id,
            }))}
            onItemClick={(id: string) => {
              const customer = customers.find((customer) => customer.id === id);
              if (customer) setSelectedTeam(customer);
            }}
            onInputChange={() => setSelectedCustomer(undefined)}
          />
        </label>

        {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
        <label htmlFor='team' className='form-control gap-2'>
          <span>Equipe</span>
          <Autocomplete
            defaultValue={customerCareElement?.Team.name}
            placeholder='Buscar equipes'
            items={teams.map((team) => ({ name: team.name, id: team.id }))}
            onItemClick={(id: string) => {
              const team = teams.find((team) => team.id === id);
              if (team) setSelectedTeam(team);
            }}
            onInputChange={() => setSelectedTeam(undefined)}
          />
        </label>

        <label
          className='form-control gap-2'
          htmlFor='date'
          aria-label='Data do atendimento'
        >
          <span>Data do atendimento</span>
          <div className='input input-bordered flex w-full items-center gap-2'>
            <CalendarDots size={20} />
            <input
              id='date'
              name='date'
              type='date'
              placeholder='dd/MM/yyyy'
              className='min-w-0 grow'
              defaultValue={customerCareElement?.date
                .toISOString()
                .substring(0, 10)}
              required
            />
          </div>
        </label>

        <label
          className='form-control gap-2'
          htmlFor='score'
          aria-label='Avaliação'
        >
          <span>Avaliação</span>
          <input
            id='score'
            name='score'
            type='range'
            min='0'
            max='10'
            step='1'
            className='range'
            defaultValue={customerCareEvaluationElement?.score}
            required
          />
          <div className='flex w-full justify-between px-2 text-xs'>
            {Array.from({ length: 11 }).map((_, i) => (
              /* eslint-disable react/no-array-index-key */
              <span key={i}>{i}</span>
            ))}
          </div>
        </label>

        <label
          className='form-control gap-2'
          htmlFor='description'
          aria-label='Observações da avaliação'
        >
          <span>Observações da avaliação</span>
          <textarea
            id='description'
            name='description'
            className='textarea textarea-bordered h-24'
            defaultValue={customerCareEvaluationElement?.description}
            required
          />
        </label>
      </form>

      <div className='modal-action'>
        <form method='dialog'>
          <button
            onClick={() => formRef.current?.reset()}
            type='submit'
            className='btn btn-ghost'
          >
            Cancelar
          </button>
        </form>
        <button
          onClick={() => formRef.current?.reset()}
          type='submit'
          form='attendant-form'
          className='btn'
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default CustomerCareForm;
