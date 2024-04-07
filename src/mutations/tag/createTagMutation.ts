/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QueryKeys } from '@/enums';
import { ICreateTagRequestInterface } from '@/interfaces';
import { tagService } from '@/services/tagService';
import { mutationError } from '@/utils/mutationErrorUtil';

export const createTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTagRequestInterface) => tagService.create(data),
    onError: mutationError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] });
      toast.success(`Olá, a tag foi criado com sucesso!`);
    },
  });
};
