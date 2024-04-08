/* eslint-disable react/no-unstable-nested-components */

'use client';

import { FC, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

import { Column, Rate, Table, Typography } from '@/app/components/ui';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Modal } from '@/app/components/ui/Modal';
import { Tooltip } from '@/app/components/ui/Tooltip';
import { QueryKeys } from '@/enums';
import { useQueryFactory } from '@/hooks';
import {
  IApiMeta,
  IApiResponse,
  IAttendant,
  IAttendantEvaluation,
} from '@/interfaces';
import { deleteAttendantMutation } from '@/mutations';
import { attendantService } from '@/services/attendantService';
import { displayDate } from '@/utils/displayDateUtil';

type EvaluationAttendantsTableProps = {
  initalEvaluationAttendantsResponse: IApiResponse<IAttendantEvaluation[]>;
  onChangePagination: (pagination: number, pageSize: number) => void;
  searchParams: URLSearchParams;
};

const { Paragraph, Text } = Typography;

export const EvaluationAttendantsTable: FC<EvaluationAttendantsTableProps> = ({
  initalEvaluationAttendantsResponse,
  onChangePagination,
  searchParams,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  // RESULTS
  const {
    data: evaluationAttendantsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryFactory<IAttendantEvaluation[]>({
    queryKey: [QueryKeys.EVALUATION_ATTENDANTS, searchParams],
    initialData: initalEvaluationAttendantsResponse,
    queryFn: () => attendantService.allEvaluations(searchParams.toString()),
  });
  const loading = isRefetching || isLoading;
  const evaluationAttendants = evaluationAttendantsResponse?.result || [];

  const { mutate: deleteAttendantMutate } = deleteAttendantMutation();
  const handleDeleteAttendant = async (record: IAttendantEvaluation) => {
    const confirmed = await modal.confirm({
      title: 'Tem certeza?',
      content: (
        <Paragraph strong={false}>
          Tem certeza que deseja excluir a avaliação do atendimento que
          <Text strong>&nbsp;&quot;{record.avaluator.name}&quot;fez&quot;</Text>
          &quot;para&quot;
          <Text strong>{record.avaluated.name}</Text>?
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
      <Card title='Todos as Avaliações' bordered={false}>
        <Table<IAttendantEvaluation>
          dataSource={evaluationAttendants}
          rowKey={(record) => record.id}
          meta={evaluationAttendantsResponse?.meta as IApiMeta}
          pagination={{
            onChange: onChangePagination,
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowRender: (record) => (
              <Paragraph type='secondary' strong>
                <Text strong>{record.description}</Text>
              </Paragraph>
            ),
          }}
        >
          <Column
            title='Avaliado'
            key='avaluated'
            dataIndex='avaluated'
            render={(avaluated: IAttendant) => avaluated.name}
          />

          <Column
            title='Avaliador'
            key='avaluator'
            dataIndex='avaluator'
            render={(avaluator: IAttendant) => avaluator.name}
          />

          <Column
            title='Nota'
            key='score'
            dataIndex='score'
            render={(score: number) => <Rate disabled defaultValue={score} />}
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
            render={(_: any, record: IAttendantEvaluation) => (
              <Tooltip title='Excluir Avaliação'>
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
            )}
          />
        </Table>
      </Card>

      {contextHolder}
    </>
  );
};
