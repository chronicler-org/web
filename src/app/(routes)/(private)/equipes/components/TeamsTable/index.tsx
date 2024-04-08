'use client';

import { Plus } from '@phosphor-icons/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPencil, BsSearch, BsTrash } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import { Column, Input, Table, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Space } from '@/app/components/ui/Space';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys } from '@/enums';
import { usePagination, useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, ITeam } from '@/interfaces';
import { deleteTeamMutation } from '@/mutations';
import { teamService } from '@/services/teamService';
import { displayDate } from '@/utils/displayDateUtil';

import { CreateAndEditTeamModal } from '../CreateAndEditTeamModal';

type TeamsTableProps = {
  initalTeamsResponse: IApiResponse<ITeam[]>;
};

const { Paragraph, Text } = Typography;

export const TeamsTable: FC<TeamsTableProps> = ({ initalTeamsResponse }) => {
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
      meta: initalTeamsResponse?.meta as IApiMeta,
    });

  // RESULTS
  const {
    data: teamsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<ITeam[]>({
    queryKey: [QueryKeys.TEAMS, searchParams],
    initialData: initalTeamsResponse,
    queryFn: () => teamService.all(`${searchParams.toString()}`),
  });
  const loading = isRefetching || isLoading;
  const teams = teamsResponse?.result || [];

  // CREATE, DELETE AND EDIT TEAM FUNCTIONS AND STATES
  const [isCreateAndEditTeamModalOpen, setCreateAndEditTeamModalOpen] =
    useState(false);
  const [currentTeamUpdate, setCurrentTeamUpdate] = useState<ITeam | null>(
    null
  );

  const handleOpenCreateAndEditTeamModal = (team: ITeam | null) => () => {
    setCurrentTeamUpdate(team);
    setCreateAndEditTeamModalOpen(true);
  };
  const handleCloseCreateAndEditTeamModal = () => {
    setCreateAndEditTeamModalOpen(false);
    setCurrentTeamUpdate(null);
  };

  const { mutate: deleteTeamMutate } = deleteTeamMutation();
  const handleDeleteTeam = async (record: ITeam) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir o time com o nome
          <Text strong>&nbsp;&quot;{record.name}&quot;</Text>?
        </Paragraph>
      ),
    });
    if (confirmed) deleteTeamMutate(record.id);
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
            placeholder='Buscar pelo nome'
            size='large'
            addonBefore={<BsSearch />}
            control={control}
            errors={errors}
          />
        }
      />

      <Card
        title='Equipes'
        bordered={false}
        extra={
          <Tooltip title='Adicionar Equipe'>
            <Button
              htmlType='button'
              size='large'
              onClick={handleOpenCreateAndEditTeamModal(null)}
            >
              <Plus />
            </Button>
          </Tooltip>
        }
      >
        <Table<ITeam>
          dataSource={teams}
          rowKey={(record) => record.id}
          meta={teamsResponse?.meta as IApiMeta}
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
            title='Criado em'
            key='created_at'
            dataIndex='created_at'
            render={(createdAt: Date) => displayDate(createdAt)}
          />

          <Column
            title='Ações'
            key='acoes'
            render={(_: any, record: ITeam) => (
              <Space size='small'>
                <Tooltip title='Editar Equipe'>
                  <Button
                    type='primary'
                    htmlType='button'
                    size='middle'
                    onClick={handleOpenCreateAndEditTeamModal(record)}
                  >
                    <BsPencil />
                  </Button>
                </Tooltip>
                <Tooltip title='Excluir Equipe'>
                  <Button
                    type='primary'
                    danger
                    htmlType='button'
                    size='middle'
                    onClick={() => handleDeleteTeam(record)}
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
      <CreateAndEditTeamModal
        isOpen={isCreateAndEditTeamModalOpen}
        onRequestClose={handleCloseCreateAndEditTeamModal}
        team={currentTeamUpdate}
      />
    </Space>
  );
};
