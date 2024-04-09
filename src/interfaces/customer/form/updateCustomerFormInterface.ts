import { ICreateCustomerForm } from './createCustomerFormInterface';

export interface IUpdateCustomerFormInterface
  extends Omit<ICreateCustomerForm, 'cpf'> {}
