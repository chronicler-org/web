import { ICreateSaleForm } from '../form';
import { ISaleItem } from '../saleItemInterface';

export interface ICreateSaleRequest extends ICreateSaleForm {
  sales_items: Pick<ISaleItem, 'product' | 'quantity'>[];
}
