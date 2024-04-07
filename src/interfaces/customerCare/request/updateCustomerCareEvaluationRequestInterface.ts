import { IUpdateCustomerCareEvaluationFormInterface } from '../form';

export interface IUpdateCustomerCareEvaluationRequestInterface
  extends IUpdateCustomerCareEvaluationFormInterface {
  customer_care_id: string;
}
