/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateSaleRequest } from '@/interfaces';
import { saleService } from '@/services/saleServce';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createSaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateSaleRequest) => saleService.createSale(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SALES] });
      toast.success(`Olá, a venda foi criado com sucesso!`);
    },
  });
};
