/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateAttendantEvaluationRequest } from '@/interfaces';
import { attendantService } from '@/services/attendantService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createAttendantEvaluationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateAttendantEvaluationRequest) =>
      attendantService.createEvaluation(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ATTENDANTS] });
      toast.success(`Olá, a avaliação do atendente foi criado com sucesso!`);
    },
  });
};
