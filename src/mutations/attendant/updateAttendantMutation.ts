/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateAttendantRequestInterface } from '@/interfaces';
import { attendantService } from '@/services/attendantService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateAttendantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateAttendantRequestInterface) =>
      attendantService.update(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ATTENDANTS] });
      toast.success(`Olá, o atendente foi atualizado com sucesso!`);
    },
  });
};
