/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateCustomerAddressRequestInterface } from '@/interfaces/customer/request';
import { customerService } from '@/services/customerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateCustomerAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateCustomerAddressRequestInterface) =>
      customerService.updateCustomerAdddress(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMERS_ADDRESSES],
      });
      toast.success(`Olá, o endereço foi atualizada com sucesso!`);
    },
  });
};
