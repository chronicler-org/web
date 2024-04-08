/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateProductRequest } from '@/interfaces';
import { productService } from '@/services/productService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateProductRequest) => productService.update(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      toast.success(`Olá, o produto foi atualizado com sucesso!`);
    },
  });
};
