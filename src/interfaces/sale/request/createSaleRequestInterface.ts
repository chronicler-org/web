import { ICreateSaleFormInterface } from '../form';
import { ISaleItem } from '../saleItemInterface';

export interface ICreateSaleRequestInterface extends ICreateSaleFormInterface {
  sales_items: Pick<ISaleItem, 'product' | 'quantity'>[];
}
