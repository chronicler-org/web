import { IManager } from '../managerInterface';

export interface ICreateManagerFormInterface
  extends Omit<IManager, 'id' | 'created_at' | 'updated_at'> {}
