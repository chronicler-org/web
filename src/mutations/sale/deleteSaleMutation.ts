/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { saleService } from '@/services/saleServce';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteSaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => saleService.removeSale(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SALES] });
      toast.success(`Olá, a venda foi removida com sucesso!`);
    },
  });
};
