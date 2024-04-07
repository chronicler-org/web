import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';

import {
  ICreateCustomerAddressRequestInterface,
  ICreateCustomerRequestInterface,
  IUpdateCustomerAddressRequestInterface,
  IUpdateCustomerRequestInterface,
} from '@/interfaces/customer/request';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.CUSTOMER}`);
const { post, get, delete: destroy, patch } = api;

export const customerService = {
  allCustomers: async (query?: string) => {
    const res = await get(`${query || ''}`);
    return res.data;
  },
  singleCustomer: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  createCustomer: (customer: ICreateCustomerRequestInterface) =>
    post('', customer),
  updateCustomer: ({ id, ...rest }: IUpdateCustomerRequestInterface) =>
    patch(`/${id}`, rest),
  removeCustomer: (id: string) => destroy(`/${id}`),

  allCustomersAddresses: async (query?: string) => {
    const res = await get(`/address${query || ''}`);
    return res.data;
  },
  singleCustomeAdddress: async (addressId: string) => {
    const res = await get(`/address/${addressId}`);
    return res.data;
  },
  createCustomerAdddress: (
    customerAddress: ICreateCustomerAddressRequestInterface
  ) => post(`/address`, customerAddress),
  updateCustomerAdddress: ({
    id,
    ...rest
  }: IUpdateCustomerAddressRequestInterface) => patch(`/address/${id}`, rest),
  removeCustomerAdddress: (customerAddressId: string) =>
    destroy(`/address/${customerAddressId}`),
};
