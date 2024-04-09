import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '@/app/components/ui/Modal';
import {
  DatePicker,
  DebounceSelect,
  DefaultOptionType,
  FormItem,
} from '@/app/components/ui/form';
import {
  ICreateCustomerCareForm,
  ICreateCustomerCareRequest,
} from '@/interfaces';
import { createCustomerCareMutation } from '@/mutations';
import { fetchCustomerOptions } from '@/utils/fetchTeamOptions';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateCustomerCareModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
};

dayjs.extend(weekday);
dayjs.extend(localeData);

const dateFormat = 'YYYY/MM/DD';

const schema = yup.object().shape({
  date: yup
    .date()
    .required('Campo obrigatório')
    .max(new Date(), 'A data deve ser anterior ou igual ao momento atual'),
  customer_cpf: yup
    .string()
    .required('Campo obrigatório')
    .length(11, 'O campo deve ter 11 caracteres'),
});

export const CreateCustomerCareModal: FC<CreateCustomerCareModalProps> = ({
  onRequestClose,
  isOpen,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateCustomerCareForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      customer_cpf: '',
      date: '',
      customer_name: '',
    },
  });

  const handleCloseModal = () => {
    reset({
      customer_cpf: '',
      date: '',
      customer_name: '',
    });
    onRequestClose();
  };

  const {
    mutateAsync: createCustomerCareMutateAsync,
    isPending: isPendingCreateCustomerCare,
  } = createCustomerCareMutation();
  const onSubmit = async (data: ICreateCustomerCareForm) => {
    try {
      const object =
        replaceEmptyStringWithNull<ICreateCustomerCareRequest>(data);

      createCustomerCareMutateAsync(object);
      handleCloseModal();
    } catch {
      /* Empty */
    }
  };

  return (
    <Modal
      title='Criar Atendimento'
      open={isOpen}
      confirmLoading={isPendingCreateCustomerCare}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText='Criar'
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Cliente'
          name='customer_name'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DebounceSelect<ICreateCustomerCareForm, any>
            name='customer_name'
            size='large'
            showSearch
            onChange={(newValue: DefaultOptionType) => {
              if (newValue.value) {
                setValue('customer_cpf', newValue?.value as string, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
              if (newValue.label) {
                setValue('customer_name', newValue?.value as string, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            fetchOptions={fetchCustomerOptions()}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Data'
          name='date'
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DatePicker
            name='date'
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
