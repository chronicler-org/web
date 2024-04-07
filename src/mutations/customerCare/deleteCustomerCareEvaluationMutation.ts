/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { customerCareService } from '@/services/customerCareService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteCustomerCareEvaluationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      customerCareService.removeCustomerCareEvaluation(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMER_CARE_EVALUATIONS],
      });
      toast.success(`Olá, a avalição do atendimento foi removida com sucesso!`);
    },
  });
};
