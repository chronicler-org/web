import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import {
  ICreateCustomerCareEvaluationRequestInterface,
  ICreateCustomerCareRequestInterface,
  IUpdateCustomerCareEvaluationRequestInterface,
} from '@/interfaces';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.CUSTOMER_CARE}`);
const { post, get, delete: destroy, patch } = api;

export const customerCareService = {
  allCustomerCares: async (query?: string) => {
    const res = await get(`?${query || ''}`);
    return res.data;
  },
  singleCustomerCare: async (id: string) => {
    const res = await get(`/${id}`);
    return res.data;
  },
  createCustomerCare: (customerCare: ICreateCustomerCareRequestInterface) =>
    post('', customerCare),
  removeCustomerCare: (id: string) => destroy(`/${id}`),

  allCustomerCareEvaluations: async (query?: string) => {
    const res = await get(`/evaluation${query || ''}`);
    return res.data;
  },
  singleCustomerCareEvaluation: async (customerCareId: string) => {
    const res = await get(`/${customerCareId}/evaluation`);
    return res.data;
  },
  createCustomerCareEvaluation: ({
    customer_care_id,
    ...rest
  }: ICreateCustomerCareEvaluationRequestInterface) =>
    post(`/${customer_care_id}/evaluation`, rest),
  updateCustomerCareEvaluation: ({
    customer_care_id,
    ...rest
  }: IUpdateCustomerCareEvaluationRequestInterface) =>
    patch(`/${customer_care_id}/evaluation`, rest),

  removeCustomerCareEvaluation: (customerCareId: string) =>
    destroy(`/${customerCareId}/evaluation`),
};
