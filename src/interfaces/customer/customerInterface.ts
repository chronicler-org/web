import { ITag } from '../tag';
import { ICustomerAddress } from './customerAddressInterface';

export interface ICustomer {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  birth_date: string;
  tags: ITag[];
  address: ICustomerAddress;
  created_at: Date;
  updated_at: Date;
}
