/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPencil, BsSearch, BsTrash } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import { Badge, Column, Input, Table, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, ISale, ITag } from '@/interfaces';
import { deleteTagMutation } from '@/mutations';
import { displayDate } from '@/utils/displayDateUtil';

import { saleService } from '@/services/saleServce';
import { CreateSaleModal } from '../CreateSaleModal';

type SalesTableProps = {
  initalSalesResponse: IApiResponse<ISale[]>;
};

const { Paragraph, Text } = Typography;

export const SalesTable: FC<SalesTableProps> = ({ initalSalesResponse }) => {
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
      meta: initalSalesResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: salesResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<ISale[]>({
    queryKey: [QueryKeys.TAGS, searchParams],
    initialData: initalSalesResponse,
    queryFn: () => saleService.allSales(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const sales = salesResponse?.result || [];

  // CREATE, DELETE AND EDIT SALE FUNCTIONS AND STATES
  const [isCreateAndEditTagModalOpen, setCreateAndEditTagModalOpen] =
    useState(false);
  const [_, setCurrentTagUpdate] = useState<ITag | null>(null);

  const handleOpenCreateAndEditTagModal = (tag: ITag | null) => () => {
    setCurrentTagUpdate(tag);
    setCreateAndEditTagModalOpen(true);
  };
  const handleCloseCreateAndEditTagModal = () => {
    setCreateAndEditTagModalOpen(false);
    setCurrentTagUpdate(null);
  };

  const { mutate: deleteTagMutate } = deleteTagMutation();
  const handleDeleteTag = async (record: ITag) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir a tag com o nome
          <Text strong>&nbsp;&quot;{record.name}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteTagMutate(record.id);
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
            name='name'
            placeholder='Buscar pelo nome da tag'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      />
      <Card
        title='Vendas'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Venda'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateAndEditTagModal(null)}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table<ISale>
          dataSource={sales}
          rowKey={(record) => record.customer_care.id}
          meta={salesResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
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
            title='Cor'
            key='color'
            dataIndex='color'
            render={(color: String) => <Badge color={color as any} />}
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
            render={(_: any, record: ITag) => (
              <Space size='small'>
                <Tooltip title='Editar Tag'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditTagModal(record)}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Tag'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteTag(record)}
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
      <CreateSaleModal
        isOpen={isCreateAndEditTagModalOpen}
        onRequestClose={handleCloseCreateAndEditTagModal}
      />
    </Space>
  );
};
