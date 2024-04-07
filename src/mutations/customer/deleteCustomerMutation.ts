/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { customerService } from '@/services/customerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.removeCustomer(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CUSTOMERS] });
      toast.success(`Olá, o cliente foi removido com sucesso!`);
    },
  });
};
