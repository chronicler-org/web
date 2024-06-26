import { IUpdateCustomerFormInterface } from '../form';

export interface IUpdateCustomerRequestInterface
  extends IUpdateCustomerFormInterface {
  cpf: string;
  id: string;
  tag_ids?: string[];
  address_id: string;
}
