'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { UsersThree } from '@phosphor-icons/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormItem, Input } from '@/app/components/ui';
import { Modal } from '@/app/components/ui/Modal';
import { ICreateTeamForm, ICreateTeamRequest, ITeam } from '@/interfaces';
import { createTeamMutation, updateTeamMutation } from '@/mutations';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditTeamModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  team?: ITeam | null;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório')
    .min(3, 'O campo deve ter pelo menos 3 caracteres')
    .max(100, 'O campo deve ter no máximo 100 caracteres'),
});

export const CreateAndEditTeamModal: FC<CreateAndEditTeamModalProps> = ({
  onRequestClose,
  isOpen,
  team,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateTeamForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: team?.name,
    },
  });

  const handleCloseModal = () => {
    reset({
      name: '',
    });
    onRequestClose();
  };

  const { mutateAsync: createTeamMutateAsync, isPending: isPendingCreateTeam } =
    createTeamMutation();
  const { mutateAsync: updateTeamMutateAsync, isPending: isPendingUpdateTeam } =
    updateTeamMutation();
  const onSubmit = async (data: ICreateTeamForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateTeamRequest>(data);
      if (!team) await createTeamMutateAsync(object);
      else {
        await updateTeamMutateAsync({
          id: team.id,
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
      name: team?.name || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  return (
    <Modal
      title={`${team ? 'Editar' : 'Criar'} Equipe`}
      open={isOpen}
      confirmLoading={isPendingCreateTeam || isPendingUpdateTeam}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={team ? 'Editar' : 'Criar'}
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Nome da equipe'
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
            addonBefore={<UsersThree size={20} />}
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
