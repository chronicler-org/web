import { FC } from 'react';

type PageProps = {
  params: { id: string };
};

const Page: FC<PageProps> = ({ params }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl'>Dados do usuário {params.id}</h1>
      <form className='flex flex-col items-end gap-4 [&_input]:input [&_input]:input-lg [&_input]:input-bordered [&_label]:form-control [&_label]:gap-2'>
        <div className='grid w-full grid-cols-4 gap-6'>
          <label
            htmlFor='name'
            className='col-span-2'
            aria-label='Nome completo'
          >
            <span>Nome completo</span>
            <input id='name' className='w-full' placeholder='Nome completo' />
          </label>
          <label htmlFor='CPF' aria-label='CPF'>
            <span>CPF</span>
            <input id='CPF' className='w-full' placeholder='CPF' disabled />
          </label>
          <div className='flex flex-col gap-2'>
            <span>Gênero</span>
            <select className='select select-bordered select-lg w-full'>
              <option disabled selected>
                Gênero
              </option>
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>
          </div>
          <label htmlFor='CEP' aria-label='CPF'>
            <span>CEP</span>
            <input
              type='number'
              id='CEP'
              className='w-full'
              placeholder='CEP'
            />
          </label>
          <div className='flex flex-col gap-2'>
            <span>Estado</span>
            <select className='select select-bordered select-lg w-full'>
              <option disabled selected>
                Estado
              </option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <span>Cidade</span>
            <select className='select select-bordered select-lg w-full'>
              <option disabled selected>
                Cidade
              </option>
            </select>
          </div>
          <label htmlFor='neighborhood' aria-label='Bairro'>
            <span>Bairro</span>
            <input id='neighborhood' className='w-full' placeholder='Baiirro' />
          </label>
          <label htmlFor='adress' className='col-span-2' aria-label='Endereço'>
            <span>Endereço</span>
            <input id='adress' className='w-full' placeholder='Endereço' />
          </label>
          <label htmlFor='number' aria-label='Número'>
            <span>Número</span>
            <input
              type='number'
              id='number'
              className='w-full'
              placeholder='Número'
            />
          </label>
          <label htmlFor='complement' aria-label='Complemento'>
            <span>Complemento</span>
            <input
              id='complement'
              className='w-full'
              placeholder='Complemento'
            />
          </label>
          <label htmlFor='email' className='col-span-2' aria-label='Email'>
            <span>Email</span>
            <input
              type='email'
              id='email'
              className='w-full'
              placeholder='Email'
            />
          </label>
          <label htmlFor='phone' aria-label='Telefone'>
            <span>Telefone</span>
            <input
              type='tel'
              id='phone'
              className='w-full'
              placeholder='Telefone'
            />
          </label>
          <label htmlFor='brithdate' aria-label='Data de Nascimento'>
            <span>Data de Nascimento</span>
            <input
              type='date'
              id='brithdate'
              className='w-full'
              placeholder='Data de Nascimento'
            />
          </label>
        </div>
        <div className='flex gap-4'>
          <button type='button' className='btn btn-ghost btn-lg'>
            Cancelar
          </button>
          <button type='submit' className='btn btn-neutral btn-lg'>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
