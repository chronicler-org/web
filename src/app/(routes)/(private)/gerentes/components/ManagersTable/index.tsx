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
  DebounceSelect,
  DefaultOptionType,
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
import { IApiMeta, IApiResponse, IManager } from '@/interfaces';
import { deleteManagerMutation } from '@/mutations';
import { managerService } from '@/services/managerService';
import { displayDate } from '@/utils/displayDateUtil';
import { fetchTeamOptions } from '@/utils/fetchTeamOptions';
import { formatCPF } from '@/utils/stringutil';

import { CreateAndEditManagerModal } from '../CreateAndEditManagerModal';

type ManagersTableProps = {
  initalManagersResponse: IApiResponse<IManager[]>;
};

const { Paragraph, Text } = Typography;

export const ManagersTable: FC<ManagersTableProps> = ({
  initalManagersResponse,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });
  const { searchParams, handleChangePagination, handleChangeFilter } =
    usePagination({
      meta: initalManagersResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: managersResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<IManager[]>({
    queryKey: [QueryKeys.MANAGERS, searchParams],
    initialData: initalManagersResponse,
    queryFn: () => managerService.all(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const managers = managersResponse?.result || [];

  // CREATE, DELETE AND EDIT MANAGER FUNCTIONS AND STATES
  const [isCreateAndEditManagerModalOpen, setCreateAndEditManagerModalOpen] =
    useState(false);
  const [currentManagerUpdate, setCurrentManagerUpdate] =
    useState<IManager | null>(null);

  const handleOpenCreateAndEditManagerModal =
    (manager: IManager | null) => () => {
      setCurrentManagerUpdate(manager);
      setCreateAndEditManagerModalOpen(true);
    };
  const handleCloseCreateAndEditManagerModal = () => {
    setCreateAndEditManagerModalOpen(false);
    setCurrentManagerUpdate(null);
  };

  const { mutate: deleteManagerMutate } = deleteManagerMutation();
  const handleDeleteManager = async (record: IManager) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o gerente com o nome
          <Text strong>&nbsp;&quot;{record.name}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteManagerMutate(record.id);
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
              onChange={(newValue: DefaultOptionType) => {
                if (newValue.value) {
                  setValue('team_id', newValue?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
              control={control}
              errors={errors}
            />
          </FormItem>
        </Col>
      </FilterCollapse>

      <Card
        title='Gerentes'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Gerente'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateAndEditManagerModal(null)}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table<IManager>
          dataSource={managers}
          rowKey={(record) => record.id}
          meta={managersResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Paragraph type='secondary' strong>
                  Email:&nbsp;<Text strong>{record.email}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Data de aniversário:&nbsp;
                  <Text strong>
                    {displayDate(new Date(record.birth_date), {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Equipe:&nbsp;
                  <Text strong>{record.team.name}</Text>
                </Paragraph>
                <Paragraph type='secondary' strong>
                  Atualizado em:&nbsp;
                  <Text strong>{displayDate(record.updated_at)}</Text>
                </Paragraph>
              </>
            ),
          }}
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
            title='Criado em'
            key='created_at'
            dataIndex='created_at'
            render={(createdAt: Date) => displayDate(createdAt)}
          />

          <Column
            title='Ações'
            key='acoes'
            render={(_: any, record: IManager) => (
              <Space size='small'>
                <Tooltip title='Editar Manager'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditManagerModal(record)}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Manager'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteManager(record)}
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
      <CreateAndEditManagerModal
        isOpen={isCreateAndEditManagerModalOpen}
        onRequestClose={handleCloseCreateAndEditManagerModal}
        manager={currentManagerUpdate}
      />
    </Space>
  );
};
