import { ICustomerCare } from '../customerCareInterface';

export interface ICreateCustomerCareFormInterface
  extends Pick<ICustomerCare, 'date'> {
  customer_cpf: string;
}
