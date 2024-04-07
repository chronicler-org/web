import { IUpdateCustomerFormInterface } from '../form';

export interface IUpdateCustomerRequestInterface
  extends IUpdateCustomerFormInterface {
  id: string;
  tag_ids?: string[];
  address_id: string;
}
