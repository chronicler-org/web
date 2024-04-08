import { yupResolver } from '@hookform/resolvers/yup';
import {
  CalendarDots,
  Envelope,
  IdentificationCard,
  User,
} from '@phosphor-icons/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '@/app/components/ui/Modal';
import {
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
  team_id: yup.string().uuid('Campo obrigatório').required('Campo obrigatório'),
  birth_date: yup
    .string()
    .required('Campo obrigatório')
    .min(0, 'Valor mínimo é 0'),
  email: yup
    .string()
    .email('Campo é do tipo e-mail')
    .required('Campo obrigatório'),
});

export const CreateAndEditAttendantModal: FC<
  CreateAndEditAttendantModalProps
> = ({ onRequestClose, isOpen, attendant }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateAttendantForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      cpf: attendant?.cpf,
      name: attendant?.name,
      team_id: attendant?.team?.id,
      team_name: attendant?.team?.name,
      birth_date: attendant?.birth_date.toString(),
      email: attendant?.email,
    },
  });

  const handleCloseModal = () => {
    reset({
      cpf: '',
      name: '',
      team_id: '',
      team_name: '',
      birth_date: '',
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
      birth_date: attendant?.birth_date.toString(),
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
              required
            />
          </div>
        </label>
      </form>
    </Modal>
  );
};
