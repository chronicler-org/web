/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { teamService } from '@/services/teamService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const deleteTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamService.remove(id),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TEAMS] });
      toast.success(`Olá, o time foi removido com sucesso!`);
    },
  });
};
