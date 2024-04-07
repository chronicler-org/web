import { ICustomer } from '../customer/customerInterface';
import { ICustomerCare } from './customerCareInterface';

export interface ICustomerCareEvaluation {
  id: string;
  score: string;
  description: string;
  customerCare: ICustomerCare;
  customer: ICustomer;
  created_at: Date;
  updated_at: Date;
}
