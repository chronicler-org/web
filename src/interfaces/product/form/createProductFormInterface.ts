import { IProduct } from '../productInterface';

export interface ICreateProductFormInterface
  extends Omit<IProduct, 'id' | 'created_at' | 'updated_at'> {}
