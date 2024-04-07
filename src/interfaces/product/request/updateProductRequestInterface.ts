import { IUpdateProductFormInterface } from '../form';

export interface IUpdateProductRequestInterface
  extends IUpdateProductFormInterface {
  id: string;
}
