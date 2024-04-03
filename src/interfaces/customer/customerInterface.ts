import { ITag } from '../tag';
import { ICustomerAddress } from './customerAddressInterface';

export interface ICustomer {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  birth_date: Date;
  tags: ITag[];
  Address: ICustomerAddress;
  created_at: Date;
  updated_at: Date;
}
