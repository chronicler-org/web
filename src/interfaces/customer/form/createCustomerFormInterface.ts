import { ICustomer } from '../customerInterface';

export interface ICreateCustomerFormInterface
  extends Omit<
    ICustomer,
    'id' | 'created_at' | 'updated_at' | 'address' | 'tags'
  > {}
