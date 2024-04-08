/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateManagerRequest } from '@/interfaces';
import { managerService } from '@/services/managerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateManagerRequest) => managerService.create(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MANAGERS] });
      toast.success(`Olá, o gerente foi criado com sucesso!`);
    },
  });
};
