import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Rate } from '@/app/components/ui';
import { Modal } from '@/app/components/ui/Modal';
import { FormItem, TextArea } from '@/app/components/ui/form';
import {
  IAttendant,
  ICreateAttendantEvaluationForm,
  ICreateAttendantEvaluationRequest,
} from '@/interfaces';
import { createAttendantEvaluationMutation } from '@/mutations';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditAttendantEvaluationModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  attendant: IAttendant;
};

const schema = yup.object().shape({
  score: yup
    .number()
    .required('Campo obrigatório')
    .min(0, 'O valor mínimo é 0')
    .max(5, 'O valor máximo é 5'),
  description: yup
    .string()
    .required('Campo obrigatório')
    .min(10, 'O campo deve ter pelo menos 10 caracteres')
    .max(300, 'O campo deve ter no máximo 300 caracteres'),
});

export const CreateAndEditAttendantEvaluationModal: FC<
  CreateAndEditAttendantEvaluationModalProps
> = ({ onRequestClose, isOpen, attendant }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateAttendantEvaluationForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema) as any,
  });

  const handleCloseModal = () => {
    reset({
      description: '',
      score: 0,
    });
    onRequestClose();
  };

  const {
    mutateAsync: createAttendantEvaluationMutateAsync,
    isPending: isPendingCreateAttendantEvaluation,
  } = createAttendantEvaluationMutation();

  const onSubmit = async (data: ICreateAttendantEvaluationForm) => {
    try {
      const object =
        replaceEmptyStringWithNull<ICreateAttendantEvaluationRequest>(data);

      await createAttendantEvaluationMutateAsync({
        ...object,
        avaluated_id: attendant.id,
      });
      handleCloseModal();
    } catch {
      /* Empty */
    }
  };

  return (
    <Modal
      title={`Avaliar do Atendente ${attendant?.name}`}
      open={isOpen}
      confirmLoading={isPendingCreateAttendantEvaluation}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText='Avaliar'
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Descrição'
          name='description'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <TextArea
            name='description'
            size='large'
            rows={6}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem label='Nota' name='score' required errors={errors}>
          <Rate
            name='score'
            defaultValue={0}
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
