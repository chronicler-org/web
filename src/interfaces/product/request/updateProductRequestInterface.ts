import { IUpdateProductFormInterface } from '../form';

export interface IUpdateProductRequest extends IUpdateProductFormInterface {
  id: string;
}
