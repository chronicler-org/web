import { ICreateCustomerCareEvaluationFormInterface } from './createCustomerCareEvaluationFormInterface';

export interface IUpdateCustomerCareEvaluationFormInterface
  extends Omit<
    ICreateCustomerCareEvaluationFormInterface,
    'customer_care_id'
  > {}
