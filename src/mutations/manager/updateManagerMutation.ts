/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateManagerRequestInterface } from '@/interfaces';
import { managerService } from '@/services/managerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateManagerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateManagerRequestInterface) =>
      managerService.update(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MANAGERS] });
      toast.success(`Olá, o gerente foi atualizado com sucesso!`);
    },
  });
};
