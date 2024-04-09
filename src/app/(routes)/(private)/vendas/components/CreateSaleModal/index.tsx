'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { v4 as uuidV4 } from 'uuid';
import * as yup from 'yup';

import { Col, Divider, Row, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import {
  DebounceSelect,
  DefaultOptionType,
  FormItem,
  Input,
  InputNumber,
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

interface ISaleItem {
  product_id: string;
  quantity: number;
}

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
        product_id: yup
          .string()
          .uuid('Campo obrigatório')
          .required('Campo obrigatório'),
        quantity: yup
          .number()
          .min(1, 'O valor mínimo é de 1')
          .positive('A quantidade deve ser positiva')
          .required('A quantidade é obrigatória'),
      })
    )
    .min(1, 'Pelo menos um item é necessário'),
});

const { Title } = Typography;
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sales_items',
  });

  const handleCloseModal = () => {
    reset({
      sales_items: [],
      customer_care_id: '',
      payment_method: PaymentMethod.CASH,
    });
    onRequestClose();
  };

  const handleAddItem = () => {
    append({ titulo: '', url: '', id: uuidV4() } as any);
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
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
          label='Atendimento de'
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

        <Divider />

        <Title level={5}>Items de venda</Title>

        <Space direction='vertical' size='middle'>
          {fields.map((item, index) => {
            const itemSale = item as unknown as ISaleItem;
            return (
              <Row gutter={[24, 24]} key={itemSale.product_id} align='middle'>
                <Col span={24} md={16}>
                  <FormItem
                    label='Produto'
                    name={`sales_items.${index}.product_id` as any}
                    required
                    labelCol={{ span: 24 }}
                    errors={errors}
                  >
                    <Input
                      name={`sales_items.${index}.product_id` as any}
                      size='large'
                      type='text'
                      required
                      control={control}
                      errors={errors}
                    />
                  </FormItem>
                </Col>
                <Col span={24} md={6}>
                  <FormItem
                    label='Quantidade'
                    name={`sales_items.${index}.quantity` as any}
                    required
                    labelCol={{ span: 24 }}
                    errors={errors}
                  >
                    <InputNumber
                      name={`sales_items.${index}.quantity` as any}
                      size='large'
                      type='text'
                      min={1}
                      required
                      className='!w-full'
                      control={control}
                      errors={errors}
                    />
                  </FormItem>
                </Col>
                <Col span={24} md={2}>
                  <Button
                    htmlType='button'
                    type='primary'
                    disabled={fields.length === 1}
                    danger
                    onClick={() => handleRemoveItem(index)}
                    data-tooltip-id='tooltip-button'
                    data-tooltip-content='Excluir vídeo'
                  >
                    <BsTrash />
                  </Button>
                </Col>
              </Row>
            );
          })}
          <Button
            size='large'
            onClick={handleAddItem}
            type='dashed'
            className='!w-full'
            icon={<BsPlus />}
          >
            Adicionar Produto
          </Button>
        </Space>
      </form>
    </Modal>
  );
};
