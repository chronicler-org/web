import { IManager } from '../managerInterface';

export interface ICreateManagerForm
  extends Omit<
    IManager,
    'id' | 'created_at' | 'updated_at' | 'team' | 'birth_date'
  > {
  team_id: string;
  team_name?: string;
  password?: string;
  birth_date: any;
}
