'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Envelope, Key } from '@phosphor-icons/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { IApiError, ILoginCredentialsForm } from '@/interfaces';
import { Routes } from '@/enums/routesEnum';

const schema = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'Necessário no mínimo 8 caractéres'),
});

export const SignInForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginCredentialsForm>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      const errors = JSON.parse(result?.error) as IApiError[];
      errors.forEach((error: any) => {
        toast.error(error?.detail);
      });
      return;
    }

    router.push(`/${Routes.ACCOUNT}`);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='email' className='form-control w-full'>
        <div
          className={`input input-bordered flex items-center gap-2 ${errors.email?.message ? 'input-error text-error' : ''}`}
        >
          <Envelope size={20} />
          <input
            id='email'
            type='email'
            placeholder='E-mail'
            className='min-w-0 grow'
            {...register('email')}
          />
        </div>
        <div className='label text-sm text-error'>{errors.email?.message}</div>
      </label>

      <label htmlFor='password' className='form-control w-full'>
        <div
          className={`input input-bordered flex items-center gap-2 ${errors.password?.message ? 'input-error text-error' : ''}`}
        >
          <Key size={20} />
          <input
            id='password'
            type='password'
            placeholder='Senha'
            className='min-w-0 grow'
            {...register('password')}
          />
        </div>
        <div className='label text-sm text-error'>
          {errors.password?.message}
        </div>
      </label>

      <button
        type='submit'
        className='btn btn-neutral w-full'
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>
  );
};
