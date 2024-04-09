'use client';

import { Session } from 'next-auth';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';

import { FilterCollapse } from '@/app/components/FilterCollpase';
import { Col, FormItem, Input, Tabs } from '@/app/components/ui';
import { Space } from '@/app/components/ui/Space';
import { UserRole } from '@/enums';
import { usePagination } from '@/hooks';
import { IApiMeta, IApiResponse, IAttendant } from '@/interfaces';

import { AttendantsMyTeamTable } from './AttendantsMyTeamTable';
import { AttendantsWithoutEvaluationTable } from './AttendantsWithoutEvaluationTable';

type MyTeamProps = {
  session: Session;
  initalAttendantsMyTeamResponse: IApiResponse<IAttendant[]>;
};

export const MyTeam: FC<MyTeamProps> = ({
  initalAttendantsMyTeamResponse,
  session,
}) => {
  const { searchParams, handleChangePagination, handleChangeFilter } =
    usePagination({
      meta: initalAttendantsMyTeamResponse?.meta as IApiMeta,
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  });

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
      </FilterCollapse>
      <Tabs
        items={Array.prototype.concat(
          session.role === UserRole.MANAGER
            ? [
                {
                  key: 'all-attendants',
                  label: 'Todos os atendentes',
                  children: (
                    <AttendantsMyTeamTable
                      initalAttendantsResponse={initalAttendantsMyTeamResponse}
                      session={session}
                      searchParams={searchParams}
                      onChangePagination={handleChangePagination}
                    />
                  ),
                },
              ]
            : [],
          session.role === UserRole.ATTENDANT
            ? [
                {
                  key: 'all-attendants-without-avaliation',
                  label: 'Atendentes Sem a Minha avaliação',
                  children: (
                    <AttendantsWithoutEvaluationTable
                      initalAttendantsResponse={initalAttendantsMyTeamResponse}
                      searchParams={searchParams}
                      onChangePagination={handleChangePagination}
                    />
                  ),
                },
              ]
            : []
        )}
      />
    </Space>
  );
};
