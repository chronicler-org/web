import { IProduct } from '../productInterface';

export interface ICreateProductFormInterface
  extends Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'> {}
