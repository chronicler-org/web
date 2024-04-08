import type {
  TableProps as TableAntdProps,
  TablePaginationConfig as TablePaginationConfigAntd,
} from 'antd';
import { Table as TableAntd } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

import { IApiMeta } from '@/interfaces/general';

import { Pagination, PaginationProps } from '../../Pagination';
import { Space } from '../../Space';

export type TableProps<T> = TableAntdProps<T> & {
  meta?: IApiMeta;
  pagination: PaginationProps;
};

export interface TablePaginationConfig extends TablePaginationConfigAntd {}

export const Table = <T extends AnyObject = any>({
  meta,
  pagination,
  ...props
}: TableProps<T>) => {
  if (meta) {
    const totalResultsAlredyViewed =
      meta.page === meta?.total_pages
        ? meta.total_count
        : meta.page * meta.limit;

    return (
      <Space direction='vertical' size='middle'>
        <TableAntd<T> {...props} pagination={false} />
        <Pagination
          size='default'
          current={meta?.page}
          total={meta?.total_count}
          pageSize={meta.limit}
          responsive
          showTotal={() =>
            `Mostrando ${
              meta.total_count === 0
                ? meta.total_count
                : totalResultsAlredyViewed
            } de ${meta.total_count} resultados`
          }
          {...pagination}
          showQuickJumper={false}
          className='text-right'
        />
      </Space>
    );
  }
  return <TableAntd {...props} />;
};
