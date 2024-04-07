import { ITag } from '../tagInterface';

export interface ICreateTagFormInterface
  extends Omit<ITag, 'id' | 'created_at' | 'updated_at'> {}
