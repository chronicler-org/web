/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { managerService } from '@/services/managerService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => managerService.remove(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MANAGERS] });
      toast.success(`Olá, o gerente foi removido com sucesso!`);
    },
  });
};
