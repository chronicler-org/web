'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Envelope, IdentificationCard, User } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  DatePicker,
  DebounceSelect,
  DefaultOptionType,
  FormItem,
  Input,
} from '@/app/components/ui';
import { Modal } from '@/app/components/ui/Modal';
import { ICustomer } from '@/interfaces';
import { ICreateCustomerForm } from '@/interfaces/customer/form';
import { ICreateCustomerRequest } from '@/interfaces/customer/request';
import { createCustomerMutation, updateCustomerMutation } from '@/mutations';
import { fetchCustomerAddressOptions } from '@/utils/fetchTeamOptions';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';
import { BsTelephone } from 'react-icons/bs';

type CreateAndEditCustomerModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  customer?: ICustomer | null;
};

dayjs.extend(weekday);
dayjs.extend(localeData);

const dateFormat = 'YYYY/MM/DD';

const schema = yup.object().shape({
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .length(11, 'O campo deve ter 11 caracteres'),
  name: yup
    .string()
    .required('Campo obrigatório')
    .min(10, 'O campo deve ter pelo menos 10 caracteres')
    .max(50, 'O campo deve ter no máximo 50 caracteres'),
  birth_date: yup
    .date()
    .required('Campo obrigatório')
    .max(new Date(), 'A data deve ser anterior ou igual ao momento atual'),
  email: yup
    .string()
    .email('Campo é do tipo e-mail')
    .required('Campo obrigatório'),
  phone: yup
    .string()
    .required('Campo obrigatório')
    .length(11, 'O campo deve ter 11 caracteres'),
  job: yup
    .string()
    .required('Campo obrigatório')
    .min(5, 'O campo deve ter pelo menos 5 caracteres')
    .max(30, 'O campo deve ter no máximo 30 caracteres'),
  address_id: yup
    .string()
    .uuid('Campo obrigatório')
    .required('Campo obrigatório'),
});

export const CreateAndEditCustomerModal: FC<
  CreateAndEditCustomerModalProps
> = ({ onRequestClose, isOpen, customer }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateCustomerForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...(customer?.birth_date && {
        birth_date: dayjs(customer?.birth_date, dateFormat),
      }),
      name: customer?.name,
      cpf: customer?.cpf,
      email: customer?.email,
      phone: customer?.phone,
      job: customer?.job,
      address_id: customer?.address.id,
      address_name: `${customer?.address.street_name}, ${customer?.address.number}, ${customer?.address.city}, ${customer?.address.estate}`,
    },
  });

  const handleCloseModal = () => {
    reset({
      birth_date: '',
      name: '',
      cpf: '',
      email: '',
      phone: '',
      job: '',
      address_name: '',
      address_id: '',
    });
    onRequestClose();
  };

  const {
    mutateAsync: createCustomerMutateAsync,
    isPending: isPendingCreateCustomer,
  } = createCustomerMutation();
  const {
    mutateAsync: updateCustomerMutateAsync,
    isPending: isPendingUpdateCustomer,
  } = updateCustomerMutation();
  const onSubmit = async (data: ICreateCustomerForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateCustomerRequest>(data);
      if (!customer) await createCustomerMutateAsync(object);
      else {
        await updateCustomerMutateAsync({
          id: customer.cpf,
          ...object,
        });
      }
      handleCloseModal();
    } catch {
      /* Empty */
    }
  };

  useEffect(() => {
    reset({
      ...(customer?.birth_date && {
        birth_date: dayjs(customer?.birth_date, dateFormat),
      }),
      name: customer?.name,
      cpf: customer?.cpf,
      email: customer?.email,
      job: customer?.job,
      phone: customer?.phone,
      address_id: customer?.address.id,
      address_name: `${customer?.address.street_name}, ${customer?.address.number}, ${customer?.address.city}, ${customer?.address.estate}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  return (
    <Modal
      title={`${customer ? 'Editar' : 'Criar'} Cliente`}
      open={isOpen}
      confirmLoading={isPendingCreateCustomer || isPendingUpdateCustomer}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={customer ? 'Editar' : 'Criar'}
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Nome completo'
          name='name'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='name'
            size='large'
            type='text'
            required
            addonBefore={<User />}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Endereço'
          name='address_name'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DebounceSelect<ICreateCustomerForm, any>
            name='address_name'
            size='large'
            showSearch
            fetchOptions={fetchCustomerAddressOptions()}
            onChange={(newValue: DefaultOptionType) => {
              if (newValue.value) {
                setValue('address_id', newValue?.value as string, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='CPF'
          name='cpf'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='cpf'
            size='large'
            type='text'
            required
            addonBefore={<IdentificationCard />}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='E-mail'
          name='email'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='email'
            size='large'
            type='text'
            required
            addonBefore={<Envelope />}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Telefone'
          name='phone'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='phone'
            size='large'
            type='text'
            required
            addonBefore={<BsTelephone />}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Profissão'
          name='job'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='job'
            size='large'
            type='text'
            required
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Data de nascimento'
          name='birth_date'
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DatePicker
            name='birth_date'
            size='large'
            maxDate={dayjs()}
            placeholder={dateFormat}
            className='!w-full'
            format={dateFormat}
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
