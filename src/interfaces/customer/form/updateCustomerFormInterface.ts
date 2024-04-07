import { ICreateCustomerFormInterface } from './createCustomerFormInterface';

export interface IUpdateCustomerFormInterface
  extends Omit<ICreateCustomerFormInterface, 'cpf'> {}
