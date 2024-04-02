'use client';

import { Envelope, Key } from '@phosphor-icons/react';
import { FC } from 'react';

export const SignInForm: FC = () => {
  /* const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<ISignInCredentials>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      const errors = JSON.parse(result?.error) as IApiError[];
      errors.forEach((error: any) => {
        toast.error(`Olá, eu sou a Fê 👩🏾, ${error?.detail}`);
      });
      return;
    }

    window.location.reload();
  }); */

  return (
    <form className='flex w-full flex-col gap-4'>
      <label
        htmlFor='email'
        aria-label='Email'
        className='input input-bordered flex items-center gap-2'
      >
        <Envelope weight='fill' className='shrink-0' />
        <input
          id='email'
          type='text'
          className='min-w-0 grow'
          placeholder='Email'
        />
      </label>
      <label
        htmlFor='password'
        aria-label='Senha'
        className='input input-bordered flex items-center gap-2'
      >
        <Key weight='fill' className='shrink-0' />
        <input
          id='password'
          type='text'
          className='min-w-0 grow'
          placeholder='Senha'
        />
      </label>
      <button type='submit' className='btn btn-neutral w-full'>
        Login
      </button>
    </form>
  );
};
