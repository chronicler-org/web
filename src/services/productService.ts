import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import {
  ICreateProductRequestInterface,
  IUpdateProductRequestInterface,
} from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.PRODUCT}`);
const { post, get, patch, delete: destroy } = api;

export const productService = {
  all: async (query?: string) => {
    const res = await get(`${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (product: ICreateProductRequestInterface) => post('', product),
  update: ({ id, ...rest }: IUpdateProductRequestInterface) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
