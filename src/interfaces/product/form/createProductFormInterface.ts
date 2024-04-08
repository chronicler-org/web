import { IProduct } from '../productInterface';

export interface ICreateProductForm
  extends Omit<IProduct, 'id' | 'created_at' | 'updated_at'> {}
