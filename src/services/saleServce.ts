import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ICreateSaleRequest, IUpdateSaleRequestInterface } from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}/${EndPoints.SALE}`);
const { post, get, delete: destroy, patch } = api;

export const saleService = {
  allSales: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  singleSale: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  createSale: (sale: ICreateSaleRequest) => post('/', sale),
  updateSale: ({ id, ...rest }: IUpdateSaleRequestInterface) =>
    patch(`/${id}`, rest),
  removeSale: (id: string) => destroy(`/${id}`),

  allSaleItems: async (query?: string) => {
    const res = await get(`/item${query || ''}`);
    return res.data;
  },
};
