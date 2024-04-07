/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { attendantService } from '@/services/attendantService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteAttendantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => attendantService.remove(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ATTENDANTS] });
      toast.success(`Olá, o atendente foi removido com sucesso!`);
    },
  });
};
