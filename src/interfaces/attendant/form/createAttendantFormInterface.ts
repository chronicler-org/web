import { IAttendant } from '../attendantInterface';

export interface ICreateAttendantFormInterface
  extends Omit<IAttendant, 'id' | 'created_at' | 'updated_at'> {}
