/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateSaleRequestInterface } from '@/interfaces';
import { saleService } from '@/services/saleServce';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateSaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateSaleRequestInterface) =>
      saleService.updateSale(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SALES] });
      toast.success(`Olá, a venda foi atualizado com sucesso!`);
    },
  });
};
