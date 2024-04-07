import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import {
  ICreateTeamRequestInterface,
  IUpdateTeamRequestInterface,
} from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.TEAM}`);
const { post, get, patch, delete: destroy } = api;

export const teamService = {
  all: async (query?: string) => {
    const res = await get(`${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (tag: ICreateTeamRequestInterface) => post('', tag),
  update: ({ id, ...rest }: IUpdateTeamRequestInterface) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
