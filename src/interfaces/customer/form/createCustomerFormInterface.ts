import { ICustomer } from '../customerInterface';

export interface ICreateCustomerForm
  extends Omit<
    ICustomer,
    'id' | 'created_at' | 'updated_at' | 'address' | 'tags' | 'birth_date'
  > {
  birth_date: any;
  address_name: string;
  address_id: string;
  tag_ids: any;
}
