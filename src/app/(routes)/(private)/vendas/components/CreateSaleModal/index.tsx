'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Modal } from '@/app/components/ui/Modal';
import {
  ColorPicker,
  DebounceSelect,
  DefaultOptionType,
  FormItem,
  Select,
} from '@/app/components/ui/form';
import { PaymentMethod } from '@/enums';
import { ICreateSaleForm, ICreateSaleRequest } from '@/interfaces';
import { createSaleMutation } from '@/mutations';
import { fetchCustomerCaresOptions } from '@/utils/fetchTeamOptions';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditTagModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
};

const schema = yup.object().shape({
  payment_method: yup
    .mixed<PaymentMethod>()
    .oneOf(Object.values(PaymentMethod))
    .required('Campo obrigatório'),
  customer_care_id: yup
    .string()
    .uuid('Campo obrigatório')
    .required('Campo obrigatório'),
  sales_items: yup
    .array()
    .of(
      yup.object().shape({
        product_id: yup.string().required('Campo obrigatório'),
        quantity: yup
          .number()
          .min(1, 'O valor mínimo é de 1')
          .positive('A quantidade deve ser positiva')
          .required('A quantidade é obrigatória'),
      })
    )
    .min(1, 'Pelo menos um item é necessário'),
});

export const CreateSaleModal: FC<CreateAndEditTagModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ICreateSaleForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema) as any,
  });

  const handleCloseModal = () => {
    reset({
      sales_items: [],
      customer_care_id: '',
      payment_method: PaymentMethod.CASH,
    });
    onRequestClose();
  };

  const { mutateAsync: createSaleMutateAsync, isPending: isPendingCreateSale } =
    createSaleMutation();
  const onSubmit = async (data: ICreateSaleForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateSaleRequest>(data);
      await createSaleMutateAsync(object);
      handleCloseModal();
    } catch {
      /* Empty */
    }
  };

  return (
    <Modal
      title='Criar Venda'
      open={isOpen}
      confirmLoading={isPendingCreateSale}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText='criar'
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      width={900}
    >
      <form>
        <FormItem
          label='Cliente'
          name='customer_name_cpf'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <DebounceSelect<ICreateSaleForm, any>
            name='customer_name'
            size='large'
            showSearch
            onChange={(newValue: DefaultOptionType) => {
              if (newValue.value) {
                setValue('customer_care_id', newValue?.value as string, {
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
            fetchOptions={fetchCustomerCaresOptions()}
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Forma de Pagamento'
          name='payment_method'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Select
            name='payment_method'
            size='large'
            options={Object.entries(PaymentMethod).map(([, label]) => ({
              label,
              value: label,
            }))}
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
