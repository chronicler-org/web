/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPencil, BsSearch, BsTrash } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import {
  Col,
  Column,
  FormItem,
  Input,
  Select,
  Table,
  Typography,
} from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { BrazilianStates, QueryKeys } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, ICustomerAddress } from '@/interfaces';
import { deleteCustomerAddressMutation } from '@/mutations';
import { customerService } from '@/services/customerService';
import { displayDate } from '@/utils/displayDateUtil';

import { CreateAndEditCustomerAddressModal } from '../CreateAndEditCustomerAddressModal';

type CustomerAddressesTableProps = {
  initalCustomerAddressesResponse: IApiResponse<ICustomerAddress[]>;
};

const { Paragraph, Text } = Typography;

export const CustomerAddressesTable: FC<CustomerAddressesTableProps> = ({
  initalCustomerAddressesResponse,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });
  const { searchParams, handleChangePagination, handleChangeFilter } =
    usePagination({
      meta: initalCustomerAddressesResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: customerAddressesResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<ICustomerAddress[]>({
    queryKey: [QueryKeys.CUSTOMERS_ADDRESSES, searchParams],
    initialData: initalCustomerAddressesResponse,
    queryFn: () =>
      customerService.allCustomersAddresses(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const customerAddresses = customerAddressesResponse?.result || [];

  // CREATE, DELETE AND EDIT CUSTOMER ADDRESS FUNCTIONS AND STATES
  const [
    isCreateAndEditCustomerAddressModalOpen,
    setCreateAndEditCustomerAddressModalOpen,
  ] = useState(false);
  const [currentCustomerAddressUpdate, setCurrentCustomerAddressUpdate] =
    useState<ICustomerAddress | null>(null);

  const handleOpenCreateAndEditCustomerAddressModal =
    (customerAddress: ICustomerAddress | null) => () => {
      setCurrentCustomerAddressUpdate(customerAddress);
      setCreateAndEditCustomerAddressModalOpen(true);
    };
  const handleCloseCreateAndEditCustomerAddressModal = () => {
    setCreateAndEditCustomerAddressModalOpen(false);
    setCurrentCustomerAddressUpdate(null);
  };

  const { mutate: deleteCustomerAddressMutate } =
    deleteCustomerAddressMutation();
  const handleDeleteCustomerAddress = async (record: ICustomerAddress) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o endereço
          <Text strong>
            &nbsp;&quot;{record.street_name}, {record.city}, {record.estate}
            &quot;
          </Text>
          ?
        </Paragraph>
      ),
    });
    if (confirmed) deleteCustomerAddressMutate(record.id);
  };

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <Space direction='vertical' size='middle'>
      <FilterCollapse
        onHandleSubmit={handleSubmit(handleChangeFilter)}
        inputSearch={
          <Input
            name='street_name'
            placeholder='Buscar pela rua'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      >
        <Col span={24} lg={8}>
          <FormItem
            label='Cidade'
            name='city'
            labelCol={{ span: 24 }}
            errors={errors}
          >
            <Input
              name='city'
              placeholder='Buscar pela cidade'
              size='large'
              addonBefore={<BsSearch />}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>

        <Col span={24} lg={8}>
          <FormItem
            label='CEP'
            name='cep'
            labelCol={{ span: 24 }}
            errors={errors}
          >
            <Input
              name='cep'
              placeholder='Buscar pela CEP'
              size='large'
              addonBefore={<BsSearch />}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>

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
      </FilterCollapse>

      <Card
        title='Endereços'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Endereço'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateAndEditCustomerAddressModal(null)}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table<ICustomerAddress>
          dataSource={customerAddresses}
          rowKey={(record) => record.id}
          meta={customerAddressesResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Paragraph type='secondary' strong>
                  Número:&nbsp;<Text strong>{record.number || '-'}</Text>
                </Paragraph>

                <Paragraph type='secondary' strong>
                  Rua:&nbsp;<Text strong>{record.street_name || '-'}</Text>
                </Paragraph>

                <Paragraph type='secondary' strong>
                  Complemento:&nbsp;
                  <Text strong>{record.complement || '-'}</Text>
                </Paragraph>
              </>
            ),
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
        >
          <Column
            title='CEP'
            key='cep'
            dataIndex='cep'
            render={(cep: String) => cep || '-'}
          />

          <Column
            title='Estaado'
            key='estate'
            dataIndex='estate'
            render={(estate: String) => estate || '-'}
          />

          <Column
            title='Cidade'
            key='city'
            dataIndex='city'
            render={(city: String) => city || '-'}
          />

          <Column
            title='Bairro'
            key='neighborhood'
            dataIndex='neighborhood'
            render={(neighborhood: String) => neighborhood || '-'}
          />

          <Column
            title='Criado em'
            key='created_at'
            dataIndex='created_at'
            render={(createdAt: Date) => displayDate(createdAt)}
          />

          <Column
            title='Ações'
            key='acoes'
            render={(_: any, record: ICustomerAddress) => (
              <Space size='small'>
                <Tooltip title='Editar Endereço'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditCustomerAddressModal(
                      record
                    )}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Endereço'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteCustomerAddress(record)}
                  >
                    <BsTrash />
                  </Button>
                </Tooltip>
              </Space>
            )}
          />
        </Table>
      </Card>

      {contextHolder}
      <CreateAndEditCustomerAddressModal
        isOpen={isCreateAndEditCustomerAddressModalOpen}
        onRequestClose={handleCloseCreateAndEditCustomerAddressModal}
        customerAddress={currentCustomerAddressUpdate}
      />
    </Space>
  );
};
