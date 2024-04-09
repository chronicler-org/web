/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateCustomerRequest } from '@/interfaces/customer/request';
import { customerService } from '@/services/customerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCustomerRequest) =>
      customerService.createCustomer(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMERS],
      });
      toast.success(`Olá, o cliente foi adicionado com sucesso!`);
    },
  });
};
