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
import { ClothingModel, ProductSize, QueryKeys } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, IProduct } from '@/interfaces';
import { deleteProductMutation } from '@/mutations/product';
import { productService } from '@/services/productService';
import { displayDate } from '@/utils/displayDateUtil';

import { CreateAndEditProductModal } from '../CreateAndEditProductModal';

type ProductsTableProps = {
  initalProductsResponse: IApiResponse<IProduct[]>;
};

const { Paragraph, Text } = Typography;

export const ProductsTable: FC<ProductsTableProps> = ({
  initalProductsResponse,
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
      meta: initalProductsResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: productsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<IProduct[]>({
    queryKey: [QueryKeys.PRODUCTS, searchParams],
    initialData: initalProductsResponse,
    queryFn: () => productService.all(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const products = productsResponse?.result || [];

  // CREATE, DELETE AND EDIT PRODUCT FUNCTIONS AND STATES
  const [isCreateAndEditProductModalOpen, setCreateAndEditProductModalOpen] =
    useState(false);
  const [currentProductUpdate, setCurrentProductUpdate] =
    useState<IProduct | null>(null);

  const handleOpenCreateAndEditProductModal =
    (product: IProduct | null) => () => {
      setCurrentProductUpdate(product);
      setCreateAndEditProductModalOpen(true);
    };
  const handleCloseCreateAndEditProductModal = () => {
    setCreateAndEditProductModalOpen(false);
    setCurrentProductUpdate(null);
  };

  const { mutate: deleteProductMutate } = deleteProductMutation();
  const handleDeleteProduct = async (record: IProduct) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o produto com o nome
          <Text strong>&nbsp;&quot;{record.model}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteProductMutate(record.id);
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
            name='fabric'
            placeholder='Buscar pelo tecido'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      >
        <Col span={24} lg={8}>
          <FormItem
            label='Tamanho'
            name='size'
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
        </Col>
        <Col span={24} lg={8}>
          <FormItem
            label='Modelo'
            name='model'
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
        </Col>
      </FilterCollapse>
      <Card
        title='Produtos'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Produto'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateAndEditProductModal(null)}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table
          dataSource={products}
          rowKey={(record) => record._id}
          meta={productsResponse?.meta as IApiMeta}
          pagination={{
            onChange: handleChangePagination,
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
        >
          <Column
            title='Modelo'
            key='model'
            dataIndex='model'
            render={(model: String) => model}
          />
          <Column
            title='Tecido'
            key='fabric'
            dataIndex='fabric'
            render={(fabric: String) => fabric}
          />
          <Column
            title='Tamanho'
            key='size'
            dataIndex='size'
            render={(size: String) => size}
          />

          <Column
            title='Estoque'
            key='stock'
            dataIndex='stock'
            render={(stock: number) => stock}
          />

          <Column
            title='Valor'
            key='value'
            dataIndex='value'
            render={(value: number) =>
              value.toLocaleString('pt-BR', {
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
            render={(_: any, record: IProduct) => (
              <Space size='small'>
                <Tooltip title='Editar Produto'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditProductModal(record)}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Produto'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteProduct(record)}
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
      <CreateAndEditProductModal
        isOpen={isCreateAndEditProductModalOpen}
        onRequestClose={handleCloseCreateAndEditProductModal}
        product={currentProductUpdate}
      />
    </Space>
  );
};
