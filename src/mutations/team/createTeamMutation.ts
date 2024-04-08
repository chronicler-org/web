/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateTeamRequest } from '@/interfaces';
import { teamService } from '@/services/teamService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTeamRequest) => teamService.create(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TEAMS] });
      toast.success(`Olá, o time foi criado com sucesso!`);
    },
  });
};
