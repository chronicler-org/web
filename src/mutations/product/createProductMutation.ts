/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateProductRequestInterface } from '@/interfaces';
import { productService } from '@/services/productService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateProductRequestInterface) =>
      productService.create(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      toast.success(`Olá, o produto foi criado com sucesso!`);
    },
  });
};
