/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateCustomerCareEvaluationRequestInterface } from '@/interfaces';
import { customerCareService } from '@/services/customerCareService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createCustomerCareEvaluationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCustomerCareEvaluationRequestInterface) =>
      customerCareService.createCustomerCareEvaluation(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMER_CARE_EVALUATIONS],
      });
      toast.success(`Olá, a avaliação do atendimento foi criado com sucesso!`);
    },
  });
};
