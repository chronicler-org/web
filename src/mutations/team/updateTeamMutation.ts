/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateTeamRequestInterface } from '@/interfaces';
import { teamService } from '@/services/teamService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateTeamRequestInterface) => teamService.update(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] });
      toast.success(`Olá, o time foi atualizado com sucesso!`);
    },
  });
};
