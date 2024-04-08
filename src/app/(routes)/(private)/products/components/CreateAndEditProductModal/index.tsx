'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Col, Row } from '@/app/components/ui';
import { Modal } from '@/app/components/ui/Modal';
import { FormItem, Input, InputNumber, Select } from '@/app/components/ui/form';
import { ClothingModel, ProductSize } from '@/enums/product';
import {
  ICreateProductForm,
  ICreateProductRequest,
  IProduct,
} from '@/interfaces';
import { createProductMutation, updateProductMutation } from '@/mutations';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditProductModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  product?: IProduct | null;
};

const schema = yup.object().shape({
  model: yup
    .mixed<ClothingModel>()
    .oneOf(Object.values(ClothingModel))
    .required('Campo obrigatório'),
  size: yup
    .mixed<ProductSize>()
    .oneOf(Object.values(ProductSize))
    .required('Campo obrigatório'),
  value: yup.number().required('Campo obrigatório').min(0, 'Valor mínimo é 0'),
  fabric: yup
    .string()
    .required('Campo obrigatório')
    .min(2, 'O campo deve ter pelo menos 24 caracteres'),
  stock: yup.number().required('Campo obrigatório').min(0, 'Valor mínimo é 0'),
});

export const CreateAndEditProductModal: FC<CreateAndEditProductModalProps> = ({
  isOpen,
  onRequestClose,
  product,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateProductForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      fabric: product?.fabric,
      model: product?.model,
      size: product?.size,
      stock: product?.stock,
      value: product?.value,
    },
  });

  const handleCloseModal = () => {
    reset({
      fabric: '',
      model: ClothingModel.DRESS,
      size: ProductSize.PP,
      stock: undefined,
      value: undefined,
    });
    onRequestClose();
  };

  const {
    mutateAsync: createProductMutateAsync,
    isPending: isPendingCreateProduct,
  } = createProductMutation();
  const {
    mutateAsync: updateProductMutateAsync,
    isPending: isPendingUpdateProduct,
  } = updateProductMutation();
  const onSubmit = async (data: ICreateProductForm) => {
    try {
      const object = replaceEmptyStringWithNull<ICreateProductRequest>(data);
      if (!product) await createProductMutateAsync(object);
      else {
        await updateProductMutateAsync({
          id: product.id,
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
      fabric: product?.fabric,
      model: product?.model,
      size: product?.size,
      stock: product?.stock,
      value: product?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Modal
      title='Criar Produto'
      open={isOpen}
      confirmLoading={isPendingCreateProduct || isPendingUpdateProduct}
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={`${product ? 'Editar' : 'Criar'} Produto`}
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Modelo'
          name='model'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Select
            name='model'
            size='large'
            options={Object.entries(ClothingModel).map(([, label]) => ({
              label,
              value: label,
            }))}
            control={control}
            errors={errors}
          />
        </FormItem>
        <FormItem
          label='Tecido'
          name='fabric'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='fabric'
            size='large'
            type='text'
            required
            control={control}
            errors={errors}
          />
        </FormItem>

        <FormItem
          label='Tamanho'
          name='size'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Select
            name='size'
            size='large'
            options={Object.entries(ProductSize).map(([, label]) => ({
              label,
              value: label,
            }))}
            control={control}
            errors={errors}
          />
        </FormItem>

        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <FormItem
              label='Unidades'
              name='stock'
              required
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <InputNumber
                name='stock'
                size='large'
                type='text'
                min={0}
                required
                className='!w-full'
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
          <Col span={24} md={12}>
            <FormItem
              label='Valor'
              name='value'
              required
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <InputNumber
                name='value'
                size='large'
                type='text'
                addonBefore='R$'
                min={0}
                required
                className='!w-full'
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};
