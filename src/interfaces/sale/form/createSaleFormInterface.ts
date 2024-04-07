import { ISale } from '../saleInterface';

export interface ICreateSaleFormInterface
  extends Pick<ISale, 'payment_method'> {
  customer_care_id: string;
}
