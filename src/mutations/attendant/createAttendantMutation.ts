/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateAttendantRequest } from '@/interfaces';
import { attendantService } from '@/services/attendantService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createAttendantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateAttendantRequest) =>
      attendantService.create(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ATTENDANTS] });
      toast.success(`Olá, o atendente foi criado com sucesso!`);
    },
  });
};
