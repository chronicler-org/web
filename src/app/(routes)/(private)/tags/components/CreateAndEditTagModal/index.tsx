'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '@/app/components/ui/Modal';
import { ColorPicker, FormItem, Input } from '@/app/components/ui/form';
import { ICreateTagForm, ICreateTagRequest, ITag } from '@/interfaces';
import { createTagMutation, updateTagMutation } from '@/mutations';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditTagModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  tag?: ITag | null;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório')
    .min(3, 'O campo deve ter pelo menos 3 caracteres')
    .max(20, 'O campo deve ter no máximo 20 caracteres'),
  color: yup
    .string()
    .required('Campo obrigatório')
    .length(7, 'O campo deve ter 7 caracteres'),
});

export const CreateAndEditTagModal: FC<CreateAndEditTagModalProps> = ({
  isOpen,
  onRequestClose,
  tag,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateTagForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      color: tag?.color,
      name: tag?.name,
    },
  });

  const handleCloseModal = () => {
    reset({
      color: '',
      name: '',
    });
    onRequestClose();
  };

  const { mutateAsync: createTagMutateAsync, isPending: isPendingCreateTag } =
    createTagMutation();
  const { mutateAsync: updateTagMutateAsync, isPending: isPendingUpdateTag } =
    updateTagMutation();
  const onSubmit = async (data: ICreateTagForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateTagRequest>(data);
      if (!tag) await createTagMutateAsync(object);
      else {
        await updateTagMutateAsync({
          id: tag.id,
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
      color: tag?.color || '',
      name: tag?.name || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return (
    <Modal
      title={`${tag ? 'Editar' : 'Criar'} Tag`}
      open={isOpen}
      confirmLoading={isPendingCreateTag || isPendingUpdateTag}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={tag ? 'Editar' : 'Criar'}
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Nome da Tag'
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
            control={control}
            errors={errors}
          />
        </FormItem>
        <FormItem
          label='Cor'
          name='color'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <ColorPicker
            name='color'
            size='large'
            format='hex'
            defaultFormat='hex'
            allowClear
            showText
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
