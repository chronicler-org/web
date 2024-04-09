/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch, BsTrash } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import {
  Badge,
  Col,
  Column,
  DebounceSelect,
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
import {
  IApiMeta,
  IApiResponse,
  ICustomer,
  ICustomerCare,
  ITeam,
} from '@/interfaces';
import { deleteCustomerCareMutation } from '@/mutations';
import { displayDate } from '@/utils/displayDateUtil';
import { formatCPF } from '@/utils/stringutil';

import { customerCareService } from '@/services/customerCareService';
import { fetchTeamOptions } from '@/utils/fetchTeamOptions';
import { CreateCustomerCareModal } from '../CreateCustomerCareModal';

type CustomerCaresTableProps = {
  initalCustomerCaresResponse: IApiResponse<ICustomerCare[]>;
};

const { Paragraph, Text, Title } = Typography;

export const CustomerCaresTable: FC<CustomerCaresTableProps> = ({
  initalCustomerCaresResponse,
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
      meta: initalCustomerCaresResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: customerCaresResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<ICustomerCare[]>({
    queryKey: [QueryKeys.CUSTOMER_CARES, searchParams],
    initialData: initalCustomerCaresResponse,
    queryFn: () =>
      customerCareService.allCustomerCares(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const customerCares = customerCaresResponse?.result || [];

  // CREATE AND DELETE CUSTOMER CARE FUNCTIONS AND STATES
  const [isCreateCustomerCareModalOpen, setCreateCustomerCareModalOpen] =
    useState(false);

  const handleOpenCreateCustomerCareModal = () => {
    setCreateCustomerCareModalOpen(true);
  };
  const handleCloseCreateCustomerCareModal = () => {
    setCreateCustomerCareModalOpen(false);
  };

  const { mutate: deleteCustomerCareMutate } = deleteCustomerCareMutation();
  const handleDeleteCustomerCare = async (record: ICustomerCare) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o atendimento com o id
          <Text strong>&nbsp;&quot;{record.id}&quot;?</Text>
        </Paragraph>
      ),
    });
    if (confirmed) deleteCustomerCareMutate(record.id);
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
            name='customer_cpf'
            placeholder='Buscar pelo CPF'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      >
        <Col span={24} lg={8}>
          <FormItem
            label='Equipe'
            name='team_id'
            labelCol={{ span: 24 }}
            errors={errors}
          >
            <DebounceSelect<any, any>
              name='team_id'
              size='large'
              showSearch
              fetchOptions={fetchTeamOptions()}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>
      </FilterCollapse>

      <Card
        title='Atendimentos'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Atendimento'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateCustomerCareModal}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table<ICustomerCare>
          dataSource={customerCares}
          rowKey={(record) => record.id}
          meta={customerCaresResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Title level={5}>Cliente</Title>
                <Paragraph type='secondary' strong>
                  CPF:&nbsp;
                  <Text strong>{record.customer.cpf || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Nome:&nbsp;
                  <Text strong>{record.customer.name || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  E-mail:&nbsp;
                  <Text strong>{record.customer.email || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Telefone:&nbsp;
                  <Text strong>{record.customer.phone || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Profissão:&nbsp;
                  <Text strong>{record.customer.job || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Data de aniversário:&nbsp;
                  <Text strong>
                    {displayDate(new Date(record.customer.birth_date))}
                  </Text>
                </Paragraph>

                <Title level={5}>Endereço</Title>
                <Paragraph type='secondary' strong>
                  CEP:&nbsp;
                  <Text strong>{record.customer.address.cep || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Número:&nbsp;
                  <Text strong>{record.customer.address.number || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Rua:&nbsp;
                  <Text strong>
                    {record.customer.address.street_name || '-'}
                  </Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Bairro:&nbsp;
                  <Text strong>
                    {record.customer.address.neighborhood || '-'}
                  </Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Cidade:&nbsp;
                  <Text strong>{record.customer.address.city || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Estado:&nbsp;
                  <Text strong>{record.customer.address.estate || '-'}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Complemento:&nbsp;
                  <Text strong>
                    {record.customer.address.complement || '-'}
                  </Text>
                </Paragraph>
              </>
            ),
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
        >
          <Column
            title='Nome'
            key='customer'
            dataIndex='customer'
            render={(customer: ICustomer) => customer.name}
          />

          <Column
            title='CPF'
            key='customer_cpf'
            dataIndex='customer'
            render={(customer: ICustomer) => formatCPF(customer.cpf)}
          />

          <Column
            title='Equipe'
            key='equipe'
            dataIndex='team'
            render={(team: ITeam) => team.name}
          />

          <Column
            title='Profissão'
            key='job'
            dataIndex='job'
            render={(job: String) => job}
          />

          <Column
            title='Tags'
            key='tags'
            dataIndex='tags'
            render={(customer: ICustomer, record: ICustomer) => {
              return (
                <Space direction='horizontal'>
                  {(customer?.tags || []).map((tag) => (
                    <Badge
                      key={`${tag.id}-${record.cpf}`}
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
            render={(_: any, record: ICustomerCare) => (
              <Space size='small'>
                <Tooltip title='Excluir Atendimento'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteCustomerCare(record)}
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
      <CreateCustomerCareModal
        isOpen={isCreateCustomerCareModalOpen}
        onRequestClose={handleCloseCreateCustomerCareModal}
      />
    </Space>
  );
};
