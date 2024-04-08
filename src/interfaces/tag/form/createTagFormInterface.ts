import { ITag } from '../tagInterface';

export interface ICreateTagForm
  extends Omit<ITag, 'id' | 'created_at' | 'updated_at'> {}
