import { ICreateAttendantForm } from '../form';

export interface ICreateAttendantRequest
  extends Omit<ICreateAttendantForm, 'team_name'> {}
