import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';

import {
  ICreateCustomerAddressRequest,
  ICreateCustomerRequest,
  IUpdateCustomerAddressRequestInterface,
  IUpdateCustomerRequestInterface,
} from '@/interfaces/customer/request';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}/${EndPoints.CUSTOMER}`);
const { post, get, delete: destroy, patch } = api;

export const customerService = {
  allCustomers: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  singleCustomer: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  createCustomer: (customer: ICreateCustomerRequest) => post('', customer),
  updateCustomer: ({ cpf, ...rest }: IUpdateCustomerRequestInterface) =>
    patch(`/${cpf}`, rest),
  removeCustomer: (id: string) => destroy(`/${id}`),

  allCustomersAddresses: async (query?: string) => {
    const res = await get(`/address?${query || ''}`);
    return res.data;
  },
  singleCustomeAdddress: async (addressId: string) => {
    const res = await get(`/address/${addressId}`);
    return res.data;
  },
  createCustomerAdddress: (customerAddress: ICreateCustomerAddressRequest) =>
    post(`/address`, customerAddress),
  updateCustomerAdddress: ({
    id,
    ...rest
  }: IUpdateCustomerAddressRequestInterface) => patch(`/address/${id}`, rest),
  removeCustomerAdddress: (customerAddressId: string) =>
    destroy(`/address/${customerAddressId}`),
};
