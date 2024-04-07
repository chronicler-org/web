import { ICustomerCareEvaluation } from '../customerCareEvaluationInterface';

export interface ICreateCustomerCareEvaluationFormInterface
  extends Pick<ICustomerCareEvaluation, 'score' | 'description'> {
  customer_care_id: string;
}
