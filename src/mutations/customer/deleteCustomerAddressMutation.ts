/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { customerService } from '@/services/customerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteCustomerAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.removeCustomerAdddress(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMERS_ADDRESSES],
      });
      toast.success(`Olá, o endereço foi removida com sucesso!`);
    },
  });
};
