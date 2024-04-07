/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums/queryKesEnum';
import { IUpdateTagRequestInterface } from '@/interfaces';
import { tagService } from '@/services/tagService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const updateTagMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateTagRequestInterface) => tagService.update(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] });
      toast.success(`Olá, a tag foi atualizado com sucesso!`);
    },
  });
};
