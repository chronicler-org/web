import { useState } from 'react';

import { IApiMeta } from '@/interfaces/general';

type UseTablePaginationProps = {
  meta: IApiMeta;
  sortByDefault?: string;
};

export const usePagination = ({
  meta,
  sortByDefault = 'created_at:DESC',
}: UseTablePaginationProps) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    const query = new URLSearchParams();
    query.set('order', sortByDefault);
    if (meta) {
      if (meta.page) query.set('pagina', meta.page.toString());
      if (meta.limit) query.set('limite', meta.limit.toString());
    }

    return query;
  });

  const handleChangePagination = (
    pagination: number,
    pageSize: number
  ): void => {
    const query = new URLSearchParams(searchParams.toString());

    if (pagination) query.set('pagina', pagination.toString());
    setSearchParams(query);
    if (pageSize) query.set('limite', pageSize.toString());
    setSearchParams(query);
  };

  const handleChangeFilter = (object: Record<string, any>): void => {
    const query = new URLSearchParams(searchParams.toString());

    Object.entries(object).forEach(([key, value]) => {
      if (typeof value !== 'undefined') query.set(key, `${value}`);
    });
    setSearchParams(query);
  };

  return {
    handleChangePagination,
    handleChangeFilter,
    searchParams,
  };
};
