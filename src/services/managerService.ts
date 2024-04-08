import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ICreateManagerRequest, IUpdateManagerRequest } from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}/${EndPoints.MANAGER}`);
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
  create: (manager: ICreateManagerRequest) => post('', manager),
  update: ({ id, ...rest }: IUpdateManagerRequest) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
