/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Plus } from '@phosphor-icons/react';
import { Session } from 'next-auth';
import { FC, useEffect, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';

import { RenderIf } from '@/app/components/RenderIf';
import { Column, Table, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys, UserRole } from '@/enums';
import { useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, IAttendant } from '@/interfaces';
import { deleteAttendantMutation } from '@/mutations';
import { attendantService } from '@/services/attendantService';
import { displayDate } from '@/utils/displayDateUtil';
import { formatCPF } from '@/utils/stringutil';

import { CreateAndEditAttendantModal } from './CreateAndEditAttendantModal';

type AttendantsMyTeamTableProps = {
  session: Session;
  initalAttendantsResponse: IApiResponse<IAttendant[]>;
  onChangePagination: (pagination: number, pageSize: number) => void;
  searchParams: URLSearchParams;
};

const { Paragraph, Text } = Typography;

export const AttendantsMyTeamTable: FC<AttendantsMyTeamTableProps> = ({
  initalAttendantsResponse,
  session,
  onChangePagination,
  searchParams,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  // RESULTS
  const {
    data: attendantsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<IAttendant[]>({
    queryKey: [QueryKeys.ATTENDANTS, searchParams],
    initialData: initalAttendantsResponse,
    queryFn: () => attendantService.all(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const attendants = attendantsResponse?.result || [];

  // CREATE, DELETE AND EDIT ATTENDANT FUNCTIONS AND STATES
  const [
    isCreateAndEditAttendantModalOpen,
    setCreateAndEditAttendantModalOpen,
  ] = useState(false);
  const [currentAttendantUpdate, setCurrentAttendantUpdate] =
    useState<IAttendant | null>(null);

  const handleOpenCreateAndEditAttendantModal =
    (attendant: IAttendant | null) => () => {
      setCurrentAttendantUpdate(attendant);
      setCreateAndEditAttendantModalOpen(true);
    };
  const handleCloseCreateAndEditAttendantModal = () => {
    setCreateAndEditAttendantModalOpen(false);
    setCurrentAttendantUpdate(null);
  };

  const { mutate: deleteAttendantMutate } = deleteAttendantMutation();
  const handleDeleteAttendant = async (record: IAttendant) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o atendente com o nome
          <Text strong>&nbsp;&quot;{record.name}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteAttendantMutate(record.id);
  };

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <>
      <Card
        title='Todos os Atendentes da Minha Equipe'
        bordered={false}
        extra={
          <RenderIf condition={session.role === UserRole.MANAGER}>
            <Tooltip title='Adicionar Atendente'>
              <Button
                htmlType='button'
                size='large'
                onClick={handleOpenCreateAndEditAttendantModal(null)}
              >
                <Plus />
              </Button>
            </Tooltip>
          </RenderIf>
        }
      >
        <Table<IAttendant>
          dataSource={attendants}
          rowKey={(record) => record.id}
          meta={attendantsResponse?.meta as IApiMeta}
          pagination={{
            onChange: onChangePagination,
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
            render={(_: any, record: IAttendant) => (
              <RenderIf condition={session.role === UserRole.MANAGER}>
                <Space size='small'>
                  <Tooltip title='Editar Atendente'>
                    <Button
                      type='primary'
                      htmlType='button'
                      size='middle'
                      onClick={handleOpenCreateAndEditAttendantModal(record)}
                    >
                      <BsPencil />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Excluir Atendente'>
                    <Button
                      type='primary'
                      danger
                      htmlType='button'
                      size='middle'
                      onClick={() => handleDeleteAttendant(record)}
                    >
                      <BsTrash />
                    </Button>
                  </Tooltip>
                </Space>
              </RenderIf>
            )}
          />
        </Table>
      </Card>

      {contextHolder}
      <CreateAndEditAttendantModal
        team={session.user.team}
        isOpen={isCreateAndEditAttendantModalOpen}
        onRequestClose={handleCloseCreateAndEditAttendantModal}
        attendant={currentAttendantUpdate}
      />
    </>
  );
};
