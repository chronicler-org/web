/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillPinMapFill, BsPencil, BsSearch, BsTrash } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import {
  Badge,
  Col,
  Column,
  FormItem,
  Input,
  Table,
  Typography,
} from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, ICustomer, ITag } from '@/interfaces';
import { deleteCustomerMutation } from '@/mutations';
import { customerService } from '@/services/customerService';
import { displayDate } from '@/utils/displayDateUtil';
import { formatCPF } from '@/utils/stringutil';

import { Routes } from '@/enums/routesEnum';
import Link from 'next/link';
import { CreateAndEditCustomerModal } from '../CreateAndEditCustomerModal';

type CustomersTableProps = {
  initalCustomersResponse: IApiResponse<ICustomer[]>;
};

const { Paragraph, Text } = Typography;

export const CustomersTable: FC<CustomersTableProps> = ({
  initalCustomersResponse,
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
      meta: initalCustomersResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: customersResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<ICustomer[]>({
    queryKey: [QueryKeys.CUSTOMERS, searchParams],
    initialData: initalCustomersResponse,
    queryFn: () => customerService.allCustomers(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const customers = customersResponse?.result || [];

  // CREATE, DELETE AND EDIT CUSTOMER FUNCTIONS AND STATES
  const [isCreateAndEditCustomerModalOpen, setCreateAndEditCustomerModalOpen] =
    useState(false);
  const [currentCustomerUpdate, setCurrentCustomerUpdate] =
    useState<ICustomer | null>(null);

  const handleOpenCreateAndEditCustomerModal =
    (customer: ICustomer | null) => () => {
      setCurrentCustomerUpdate(customer);
      setCreateAndEditCustomerModalOpen(true);
    };
  const handleCloseCreateAndEditCustomerModal = () => {
    setCreateAndEditCustomerModalOpen(false);
    setCurrentCustomerUpdate(null);
  };

  const { mutate: deleteCustomerMutate } = deleteCustomerMutation();
  const handleDeleteCustomer = async (record: ICustomer) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o cliente com o nome
          <Text strong>&nbsp;&quot;{record.name}&quot;</Text> e CPF &nbsp;
          <Text strong>&nbsp;&quot;{formatCPF(record.cpf)}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteCustomerMutate(record.cpf);
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
            name='cpf'
            placeholder='Buscar pelo CPF'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      >
        <Col span={24} lg={16}>
          <FormItem
            label='Nome'
            name='name'
            labelCol={{ span: 24 }}
            errors={errors}
          >
            <Input
              name='name'
              placeholder='Buscar pelo nome'
              size='large'
              addonBefore={<BsSearch />}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>

        <Col span={24} lg={8}>
          <FormItem
            label='E-mail'
            name='email'
            labelCol={{ span: 24 }}
            errors={errors}
          >
            <Input
              name='email'
              placeholder='Buscar pela E-mail'
              size='large'
              addonBefore={<BsSearch />}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>
      </FilterCollapse>

      <Card
        title='Clientes'
        bordered={false}
        extra={
          <Space direction='horizontal' size='middle'>
            <Tooltip title='Gerenciar endereços'>
              <Button
                className='!inline-flex !items-center !justify-center'
                size='large'
              >
                <Link href={`/${Routes.CUSTOMERS}/${Routes.CUSTOMER_ADDRESS}`}>
                  <BsFillPinMapFill />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip title='Adicionar Equipe'>
              <Button
                htmlType='button'
                size='large'
                onClick={handleOpenCreateAndEditCustomerModal(null)}
              >
                <Plus />
              </Button>
            </Tooltip>
          </Space>
        }
      >
        <Table<ICustomer>
          dataSource={customers}
          rowKey={(record) => record.id}
          meta={customersResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Paragraph type='secondary' strong>
                  CEP:&nbsp;<Text strong>{record.address.cep || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Número:&nbsp;
                  <Text strong>{record.address.number || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Rua:&nbsp;
                  <Text strong>{record.address.street_name || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Bairro:&nbsp;
                  <Text strong>{record.address.neighborhood || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Cidade:&nbsp;
                  <Text strong>{record.address.city || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Estado:&nbsp;
                  <Text strong>{record.address.estate || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Complemento:&nbsp;
                  <Text strong>{record.address.complement || '-'}</Text>
                </Paragraph>
              </>
            ),
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
        >
          <Column
            title='Nome'
            key='name'
            dataIndex='name'
            render={(name: String) => name}
          />

          <Column
            title='CPF'
            key='cpf'
            dataIndex='cpf'
            render={(cpf: String) => formatCPF(cpf)}
          />

          <Column
            title='E-mail'
            key='email'
            dataIndex='email'
            render={(email: String) => email}
          />

          <Column
            title='Profissão'
            key='job'
            dataIndex='job'
            render={(job: String) => job}
          />

          <Column
            title='Telefone'
            key='phone'
            dataIndex='phone'
            render={(phone: String) => phone}
          />

          <Column
            title='Tags'
            key='tags'
            dataIndex='tags'
            render={(tags: ITag[], record: ICustomer) => {
              return (
                <Space direction='horizontal'>
                  {(tags || []).map((tag) => (
                    <Badge
                      key={`${tag.id}-${record.id}`}
                      color={tag.color}
                      text={tag.name}
                    />
                  ))}
                </Space>
              );
            }}
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
            render={(_: any, record: ICustomer) => (
              <Space size='small'>
                <Tooltip title='Editar Cliente'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditCustomerModal(record)}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Cliente'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteCustomer(record)}
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
      <CreateAndEditCustomerModal
        isOpen={isCreateAndEditCustomerModalOpen}
        onRequestClose={handleCloseCreateAndEditCustomerModal}
        customer={currentCustomerUpdate}
      />
    </Space>
  );
};
