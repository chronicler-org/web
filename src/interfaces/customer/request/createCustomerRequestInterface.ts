import { ICreateCustomerFormInterface } from '../form';

export interface ICreateCustomerRequestInterface
  extends ICreateCustomerFormInterface {
  tag_ids?: string[];
  address_id: string;
}
