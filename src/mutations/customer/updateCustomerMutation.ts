/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateCustomerRequestInterface } from '@/interfaces/customer/request';
import { customerService } from '@/services/customerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateCustomerRequestInterface) =>
      customerService.updateCustomer(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CUSTOMERS] });
      toast.success(`Olá, o cliente foi atualizada com sucesso!`);
    },
  });
};
