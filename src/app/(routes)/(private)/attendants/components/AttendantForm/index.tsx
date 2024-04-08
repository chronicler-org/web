import Autocomplete from '@/app/components/Autocomplete';
import { IAttendant, ITeam } from '@/interfaces';
import { teams } from '@/mock/teams';
import {
  CalendarDots,
  Envelope,
  IdentificationCard,
  User,
} from '@phosphor-icons/react';
import { Dispatch, FC, SetStateAction, useRef } from 'react';

type AttendantModalProps = {
  attendantElement?: IAttendant;
  selectedTeam?: ITeam;
  setSelectedTeam: Dispatch<SetStateAction<ITeam | undefined>>;
};

const AttendantForm: FC<AttendantModalProps> = ({
  attendantElement,
  selectedTeam,
  setSelectedTeam,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const chooseTeam = (id: string) => {
    const team = teams.find((team) => team.id === id);
    if (team) {
      setSelectedTeam(team);
    }
  };

  const unchooseTeam = () => {
    setSelectedTeam(undefined);
  };

  return (
    <>
      <form
        ref={formRef}
        id='attendant-form'
        method='post'
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
              name='name'
              type='text'
              className='min-w-0 grow'
              defaultValue={attendantElement?.name}
              required
            />
          </div>
        </label>

        {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
        <label htmlFor='team' className='form-control gap-2'>
          <span>Equipe</span>
          <Autocomplete
            defaultValue={attendantElement?.team.name}
            placeholder='Buscar equipes'
            items={teams.map((team) => ({ name: team.name, id: team.id }))}
            onItemClick={chooseTeam}
            onInputChange={unchooseTeam}
          />
        </label>

        <label htmlFor='cpf' className='form-control gap-2' aria-label='CPF'>
          <span>CPF</span>
          <div className='input input-bordered flex w-full items-center gap-2'>
            <IdentificationCard size={20} />
            <input
              id='cpf'
              name='cpf'
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
              name='email'
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
              id='birth'
              name='birthDate'
              type='date'
              placeholder='dd/MM/yyyy'
              className='min-w-0 grow'
              defaultValue={attendantElement?.birthDate
                .toISOString()
                .substring(0, 10)}
              required
            />
          </div>
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

export default AttendantForm;
