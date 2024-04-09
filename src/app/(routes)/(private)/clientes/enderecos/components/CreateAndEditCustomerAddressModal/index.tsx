import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Col, Row } from '@/app/components/ui';
import { Modal } from '@/app/components/ui/Modal';
import { FormItem, Input, Select, TextArea } from '@/app/components/ui/form';
import { BrazilianStates } from '@/enums';
import { ICustomerAddress } from '@/interfaces';
import { ICreateCustomerAddressForm } from '@/interfaces/customer/form';
import { ICreateCustomerAddressRequest } from '@/interfaces/customer/request';
import {
  createCustomerAddressMutation,
  updateCustomerAddressMutation,
} from '@/mutations';
import { replaceEmptyStringWithNull } from '@/utils/replaceEmptyStringWithNull';

type CreateAndEditCustomerAddressModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  customerAddress?: ICustomerAddress | null;
};

const schema = yup.object().shape({
  cep: yup
    .string()
    .required('Campo obrigatório')
    .length(9, 'O campo deve ter 9 caracteres'),
  city: yup
    .string()
    .required('Campo obrigatório')
    .max(30, 'O campo deve er no máximo 30 caracteres'),
  number: yup
    .string()
    .required('Campo obrigatório')
    .max(20, 'O campo deve ter no máximo 20 caracteres'),
  estate: yup
    .mixed<BrazilianStates>()
    .oneOf(Object.values(BrazilianStates))
    .required('Campo obrigatório'),
  street_name: yup
    .string()
    .required('Campo obrigatório')
    .max(50, 'O campo deve ter no máximo 50 caracteres'),
  complement: yup
    .string()
    .notRequired()
    .max(200, 'O campo deve ter no máximo 200 caracteres'),
  neighborhood: yup
    .string()
    .notRequired()
    .max(30, 'O campo deve ter no máximo 30 caracteres'),
});

export const CreateAndEditCustomerAddressModal: FC<
  CreateAndEditCustomerAddressModalProps
> = ({ onRequestClose, isOpen, customerAddress }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateCustomerAddressForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema) as any,
    defaultValues: {
      cep: customerAddress?.cep,
      city: customerAddress?.city,
      complement: customerAddress?.complement,
      neighborhood: customerAddress?.neighborhood,
      number: customerAddress?.number,
      estate: customerAddress?.estate,
      street_name: customerAddress?.street_name,
    },
  });

  const handleCloseModal = () => {
    reset({
      cep: '',
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      estate: BrazilianStates.AC,
      street_name: '',
    });
    onRequestClose();
  };

  const {
    mutateAsync: createCustomerAddressMutateAsync,
    isPending: isPendingCreateCustomerAddress,
  } = createCustomerAddressMutation();
  const {
    mutateAsync: updateCustomerAddressMutateAsync,
    isPending: isPendingUpdateCustomerAddress,
  } = updateCustomerAddressMutation();
  const onSubmit = async (data: ICreateCustomerAddressForm) => {
    try {
      const object =
        replaceEmptyStringWithNull<ICreateCustomerAddressRequest>(data);

      if (!customerAddress) await createCustomerAddressMutateAsync(object);
      else {
        await updateCustomerAddressMutateAsync({
          id: customerAddress.id,
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
      cep: customerAddress?.cep,
      city: customerAddress?.city,
      complement: customerAddress?.complement,
      neighborhood: customerAddress?.neighborhood,
      number: customerAddress?.number,
      estate: customerAddress?.estate,
      street_name: customerAddress?.street_name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerAddress]);

  return (
    <Modal
      title={`${customerAddress ? 'Editar' : 'Criar'} Endereço`}
      open={isOpen}
      confirmLoading={
        isPendingUpdateCustomerAddress || isPendingCreateCustomerAddress
      }
      onCancel={handleCloseModal}
      onOk={handleSubmit(onSubmit)}
      okText={customerAddress ? 'Editar' : 'Criar'}
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
    >
      <form>
        <FormItem
          label='Rua'
          name='street_name'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='street_name'
            size='large'
            type='text'
            required
            control={control}
            errors={errors}
          />
        </FormItem>
        <FormItem
          label='CEP'
          name='cep'
          required
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <Input
            name='cep'
            size='large'
            type='text'
            required
            control={control}
            errors={errors}
          />
        </FormItem>

        <Row gutter={[24, 24]}>
          <Col span={24} md={8}>
            <FormItem
              label='Estado'
              name='estate'
              required
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <Select
                name='estate'
                size='large'
                options={Object.entries(BrazilianStates).map(([, label]) => ({
                  label,
                  value: label,
                }))}
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
          <Col span={24} md={16}>
            <FormItem
              label='Cidade'
              name='city'
              required
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <Input
                name='city'
                size='large'
                type='text'
                required
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={24} md={16}>
            <FormItem
              label='Bairro'
              name='neighborhood'
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <Input
                name='neighborhood'
                size='large'
                type='text'
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
          <Col span={24} md={8}>
            <FormItem
              label='Número'
              name='number'
              required
              labelCol={{ span: 24 }}
              errors={errors}
            >
              <Input
                name='number'
                size='large'
                type='text'
                required
                control={control}
                errors={errors}
              />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label='Complemento'
          name='complement'
          labelCol={{ span: 24 }}
          errors={errors}
        >
          <TextArea
            name='complement'
            size='large'
            rows={6}
            className='!w-full'
            control={control}
            errors={errors}
          />
        </FormItem>
      </form>
    </Modal>
  );
};
