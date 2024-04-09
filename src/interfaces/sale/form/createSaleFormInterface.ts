import { ISale } from '../saleInterface';

export interface ICreateSaleForm extends Pick<ISale, 'payment_method'> {
  customer_care_id: string;
  customer_name?: string;
  sales_items: any;
}
