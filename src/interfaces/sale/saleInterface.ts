import { PaymentMethod, SaleStatus } from '@/enums';
import { ICustomerCare } from '../customerCare';

export interface ISale {
  customer_care: ICustomerCare;
  total_value: number;
  status: SaleStatus;
  payment_method: PaymentMethod;
  created_t: Date;
  updated_at: Date;
}
