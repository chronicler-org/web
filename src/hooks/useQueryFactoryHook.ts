import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiRequestError } from '@/errors/apiRequestError';
import { IApiError, IApiResponse } from '@/interfaces';

export const useQueryFactory = <T>(
  params: UseQueryOptions<IApiResponse<T>>
): UseQueryResult<IApiResponse<T>> => {
  const data = useQuery<IApiResponse<T>>(params);

  const error = data.error as AxiosError<IApiError>;

  if (data.status === 'error' && !data.isLoading)
    throw new ApiRequestError(
      error.response?.data.errors || [],
      error.response?.status || 0
    );
  return data;
};
