import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ICreateAttendantRequest, IUpdateAttendantRequest } from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}/${EndPoints.ATTENDANT}`);
const { post, get, patch, delete: destroy } = api;

export const attendantService = {
  all: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (manager: ICreateAttendantRequest) => post('', manager),
  update: ({ id, ...rest }: IUpdateAttendantRequest) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
