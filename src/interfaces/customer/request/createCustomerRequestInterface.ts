import { ICreateCustomerForm } from '../form';

export interface ICreateCustomerRequest extends ICreateCustomerForm {
  tag_ids?: string[];
  address_id: string;
}
