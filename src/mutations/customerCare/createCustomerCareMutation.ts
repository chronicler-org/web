/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateCustomerCareRequest } from '@/interfaces';
import { customerCareService } from '@/services/customerCareService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createCustomerCareMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCustomerCareRequest) =>
      customerCareService.createCustomerCare(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CUSTOMER_CARES] });
      toast.success(`Olá, o atendimento foi criado com sucesso!`);
    },
  });
};
