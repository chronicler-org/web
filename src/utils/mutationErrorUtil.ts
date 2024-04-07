import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { IApiError } from '@/interfaces';

export const mutationError = (error: AxiosError<IApiError>) => {
  const errors = error.response?.data.errors || [];

  // eslint-disable-next-line no-restricted-syntax
  for (const error of errors) {
    toast.error(error.detail);
  }
};
