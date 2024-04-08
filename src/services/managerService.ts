import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import {
  ICreateManagerRequestInterface,
  IUpdateManagerRequestInterface,
} from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.MANAGER}`);
const { post, get, patch, delete: destroy } = api;

export const managerService = {
  all: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (manager: ICreateManagerRequestInterface) => post('', manager),
  update: ({ id, ...rest }: IUpdateManagerRequestInterface) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
