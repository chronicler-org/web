import { yupResolver } from '@hookform/resolvers/yup';
import { Envelope, IdentificationCard, User } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BsShieldLock } from 'react-icons/bs';
import * as yup from 'yup';

import { Modal } from '@/app/components/ui/Modal';
import {
  DatePicker,
  DebounceSelect,
  DefaultOptionType,
  FormItem,
  Input,
} from '@/app/components/ui/form';
import {
  IAttendant,
  ICreateAttendantForm,
  ICreateAttendantRequest,
} from '@/interfaces';
import { createAttendantMutation, updateAttendantMutation } from '@/mutations';
import { fetchTeamOptions } from '@/utils/fetchTeamOptions';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditAttendantModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  attendant?: IAttendant | null;
};

dayjs.extend(weekday);
dayjs.extend(localeData);

const dateFormat = 'DD/MM/YYYY';

export const CreateAndEditAttendantModal: FC<
  CreateAndEditAttendantModalProps
> = ({ onRequestClose, isOpen, attendant }) => {
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
    password: yup
      .string()
      .required('Campo obrigatório')
      .min(8, 'O campo deve ter pelo menos 8 caracteres'),
    ...(attendant && {
      team_id: yup
        .string()
        .uuid('Campo obrigatório')
        .required('Campo obrigatório'),
    }),
    birth_date: yup
      .date()
      .required('Campo obrigatório')
      .max(new Date(), 'A data deve ser anterior ou igual ao momento atual'),
    email: yup
      .string()
      .email('Campo é do tipo e-mail')
      .required('Campo obrigatório'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateAttendantForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema as any),
    defaultValues: {
      cpf: attendant?.cpf,
      name: attendant?.name,
      team_id: attendant?.team?.id,
      team_name: attendant?.team?.name,
      birth_date: attendant?.birth_date,
      email: attendant?.email,
    },
  });

  const handleCloseModal = () => {
    reset({
      cpf: '',
      name: '',
      team_id: '',
      team_name: '',
      password: '',
      birth_date: undefined,
      email: '',
    });
    onRequestClose();
  };

  const {
    mutateAsync: createProductMutateAsync,
    isPending: isPendingCreateProduct,
  } = createAttendantMutation();
  const {
    mutateAsync: updateAttendantMutateAsync,
    isPending: isPendingUpdateAttendant,
  } = updateAttendantMutation();
  const onSubmit = async (data: ICreateAttendantForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateAttendantRequest>(data);

      if (!attendant) await createProductMutateAsync(object);
      else {
        await updateAttendantMutateAsync({
          id: attendant.id,
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
      cpf: attendant?.cpf,
      name: attendant?.name,
      team_id: attendant?.team?.id,
      team_name: attendant?.team?.name,
      birth_date: attendant?.birth_date,
      email: attendant?.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendant]);

  return (
    <Modal
      title={`${attendant ? 'Editar' : 'Criar'} Atendete`}
      open={isOpen}
      confirmLoading={isPendingCreateProduct || isPendingUpdateAttendant}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={attendant ? 'Editar' : 'Criar'}
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
          label='Equipe'
          name='team_name'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DebounceSelect<ICreateAttendantForm, any>
            name='team_name'
            size='large'
            showSearch
            fetchOptions={fetchTeamOptions()}
            onChange={(newValue: DefaultOptionType) => {
              if (newValue.value) {
                setValue('team_id', newValue?.value as string, {
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
          label='Data de nascimento'
          name='birth_date'
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DatePicker
            name='birth_date'
            size='large'
            maxDate={dayjs()}
            placeholder='dd/MM/yyyy'
            className='!w-full'
            format={dateFormat}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Senha'
          name='password'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='password'
            size='large'
            type='password'
            required
            addonBefore={<BsShieldLock />}
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
