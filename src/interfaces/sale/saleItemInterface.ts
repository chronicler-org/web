import { IProduct } from '../product';
import { ISale } from './saleInterface';

export interface ISaleItem {
  sale: ISale;
  product: IProduct;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
