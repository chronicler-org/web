import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import {
  ICreateTagRequestInterface,
  IUpdateTagRequestInterface,
} from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.TAG}`);
const { post, get, patch, delete: destroy } = api;

export const tagService = {
  all: async (query?: string) => {
    const res = await get(`${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (tag: ICreateTagRequestInterface) => post('', tag),
  update: ({ id, ...rest }: IUpdateTagRequestInterface) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
