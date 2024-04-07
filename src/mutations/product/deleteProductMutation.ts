/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { productService } from '@/services/productService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteArticleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.remove(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      toast.success(`Olá, o produto foi removido com sucesso!`);
    },
  });
};
