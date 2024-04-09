/* eslint-disable react/no-unstable-nested-components */

'use client';

import { FC, useEffect, useState } from 'react';
import { BsStar } from 'react-icons/bs';

import { Column, Table, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys } from '@/enums';
import { useQueryFactory } from '@/hooks';
import { IApiMeta, IApiResponse, IAttendant } from '@/interfaces';
import { attendantService } from '@/services/attendantService';
import { displayDate } from '@/utils/displayDateUtil';
import { formatCPF } from '@/utils/stringutil';

import { CreateAndEditAttendantEvaluationModal } from './CreateAndEditAttendantEvaluationModal';

type AttendantsWithoutEvaluationTableProps = {
  initalAttendantsResponse: IApiResponse<IAttendant[]>;
  onChangePagination: (pagination: number, pageSize: number) => void;
  searchParams: URLSearchParams;
};

const { Paragraph, Text } = Typography;

export const AttendantsWithoutEvaluationTable: FC<
  AttendantsWithoutEvaluationTableProps
> = ({ initalAttendantsResponse, onChangePagination, searchParams }) => {
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

  // CREATE ATTENDANT EVALUATION FUNCTIONS AND STATES
  const [
    isCreateAttendantEvaluationModalOpen,
    setCreateAttendanEvaluationtModalOpen,
  ] = useState(false);
  const [currentAttendantEvaluated, setCurrentAttendantEvaluated] =
    useState<IAttendant>({} as IAttendant);

  const handleOpenCreateAttendantEvaluationModal =
    (attendant: IAttendant) => () => {
      setCurrentAttendantEvaluated(attendant);
      setCreateAttendanEvaluationtModalOpen(true);
    };
  const handleCloseCreateAttendantEvaluationModal = () => {
    setCreateAttendanEvaluationtModalOpen(false);
  };

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <>
      <Card title='Atendentes Sem a Minha Avaliação' bordered={false}>
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
              <Tooltip title='Avaliar Atendente'>
                <Button
                  type='default'
                  htmlType='button'
                  size='middle'
                  onClick={handleOpenCreateAttendantEvaluationModal(record)}
                >
                  <BsStar />
                </Button>
              </Tooltip>
            )}
          />
        </Table>
      </Card>

      <CreateAndEditAttendantEvaluationModal
        isOpen={isCreateAttendantEvaluationModalOpen}
        onRequestClose={handleCloseCreateAttendantEvaluationModal}
        attendant={currentAttendantEvaluated}
      />
    </>
  );
};
