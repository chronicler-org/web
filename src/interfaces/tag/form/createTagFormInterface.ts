import { ITag } from '../tagInterface';

export interface ICreateTagFormInterface
  extends Omit<ITag, 'id' | 'createdAt' | 'updatedAt'> {}
