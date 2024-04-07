/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateCustomerCareEvaluationRequestInterface } from '@/interfaces';
import { customerCareService } from '@/services/customerCareService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateCustomerCareEvaluationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateCustomerCareEvaluationRequestInterface) =>
      customerCareService.updateCustomerCareEvaluation(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] });
      toast.success(
        `Olá, a avalição do atendimento foi atualizada com sucesso!`
      );
    },
  });
};
