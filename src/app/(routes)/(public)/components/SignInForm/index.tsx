'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Envelope, Key } from '@phosphor-icons/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { FormItem, Input } from '@/app/components/ui';
import { IApiError, ILoginCredentialsForm } from '@/interfaces';
import { Routes } from '@/enums/routesEnum';

const schema = yup.object().shape({
  email: yup.string().required('Digite o e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Digite a senha')
    .min(8, 'Mínimo de 8 caracteres'),
});

export const SignInForm: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginCredentialsForm>({
    mode: 'onChange',
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
        toast.error(`Olá, eu sou a Fê 👩🏾, ${error?.detail}`);
      });
      return;
    }

    router.push(`/${Routes.ACCOUNT}`);
  });

  return (
    <form onSubmit={onSubmit}>
      <FormItem name='email' required labelCol={{ span: 24 }} errors={errors}>
        <Input
          prefix={<Envelope />}
          name='email'
          size='large'
          placeholder='Email'
          type='text'
          control={control}
          errors={errors}
        />
      </FormItem>

      <FormItem
        name='password'
        required
        labelCol={{ span: 24 }}
        errors={errors}
      >
        <Input
          prefix={<Key />}
          name='password'
          size='large'
          placeholder='Senha'
          type='password'
          control={control}
          errors={errors}
        />
      </FormItem>

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
