import { ICustomerAddress } from '../customerAddressInterface';

export interface ICreateCustomerAddressForm
  extends Omit<ICustomerAddress, 'id' | 'created_at' | 'updated_at'> {}
