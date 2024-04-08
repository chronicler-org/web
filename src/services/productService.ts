import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ICreateProductRequest, IUpdateProductRequest } from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}/${EndPoints.PRODUCT}`);
const { post, get, patch, delete: destroy } = api;

export const productService = {
  all: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  single: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  create: (product: ICreateProductRequest) => post('', product),
  update: ({ id, ...rest }: IUpdateProductRequest) =>
    patch(`/${id}`, { ...rest }),
  remove: (id: string) => destroy(`/${id}`),
};
