import { ICustomerAddress } from '../customerAddressInterface';

export interface ICreateCustomerAddressFormInterface
  extends Omit<ICustomerAddress, 'id' | 'created_at' | 'updated_at'> {}
