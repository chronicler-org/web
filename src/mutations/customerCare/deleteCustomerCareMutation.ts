/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { customerCareService } from '@/services/customerCareService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteCustomerCareMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerCareService.removeCustomerCare(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CUSTOMER_CARES] });
      toast.success(`Olá, o atendimento foi removido com sucesso!`);
    },
  });
};
