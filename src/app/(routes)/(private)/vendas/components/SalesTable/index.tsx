/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import {
  Col,
  Column,
  Row,
  Select,
  Table,
  Typography,
} from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys, SaleTransition } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import {
  IApiMeta,
  IApiResponse,
  ICustomerCare,
  ISale,
  ITag,
} from '@/interfaces';
import { deleteSaleMutation, updateSaleMutation } from '@/mutations';
import { saleService } from '@/services/saleServce';
import { displayDate } from '@/utils/displayDateUtil';

import { formatCPF } from '@/utils/stringutil';
import { CreateSaleModal } from '../CreateSaleModal';

type SalesTableProps = {
  initalSalesResponse: IApiResponse<ISale[]>;
};

const { Paragraph, Text } = Typography;

export const SalesTable: FC<SalesTableProps> = ({ initalSalesResponse }) => {
  const [modal, contextHolder] = Modal.useModal();

  const { searchParams, handleChangePagination } = usePagination({
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

  const { mutate: deleteSaleMutate } = deleteSaleMutation();
  const handleDeleteSale = async (record: ISale) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir a venda de
          <Text strong>
            &nbsp;&quot;{record.customer_care.customer.name}&quot;
          </Text>
          ?
        </Paragraph>
      ),
    });
    if (confirmed) deleteSaleMutate(record.customer_care.id);
  };

  const { mutate: updateSaleMutate } = updateSaleMutation();

  const handleUpdateSale = (id: string) => (value: string) => {
    updateSaleMutate({
      id,
      transition: value as any,
    });
  };

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <Space direction='vertical' size='middle'>
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
            title='CPF'
            key='cpf'
            dataIndex='customer_care'
            render={(customer_care: ICustomerCare) =>
              formatCPF(customer_care.customer.cpf)
            }
          />

          <Column
            title='Status'
            key='status'
            dataIndex='status'
            render={(status: String) => status}
          />

          <Column
            title='Forma de Pagamento'
            key='payment_method'
            dataIndex='payment_method'
            render={(payment_method: String) => payment_method}
          />

          <Column
            title='Valor Total'
            key='total_value'
            dataIndex='total_value'
            render={(total_value: number) =>
              total_value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }
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
            render={(_: any, record: ISale) => (
              <Row gutter={[8, 8]}>
                <Col span={24} md={22}>
                  <Tooltip title='Atualizar Status'>
                    <Select
                      name='transition'
                      size='middle'
                      className='!w-full'
                      onChange={handleUpdateSale(record.customer_care.id)}
                      options={Object.entries(SaleTransition).map(
                        ([, label]) => ({
                          label,
                          value: label,
                        })
                      )}
                    />
                  </Tooltip>
                </Col>
                <Col span={24} md={2}>
                  <Tooltip title='Excluir Venda'>
                    <Button
                      type='primary'
                      danger
                      htmlType='button'
                      size='middle'
                      onClick={() => handleDeleteSale(record)}
                    >
                      <BsTrash />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
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
