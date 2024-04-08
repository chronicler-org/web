import { IAttendant } from '../attendantInterface';

export interface ICreateAttendantForm
  extends Omit<
    IAttendant,
    'id' | 'created_at' | 'updated_at' | 'team' | 'birth_date'
  > {
  team_id: string;
  team_name?: string;
  password?: string;
  birth_date: Date;
}
