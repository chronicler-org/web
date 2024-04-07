import { ITeam } from '../team';

export interface IManager {
  id: string;
  cpf: string;
  name: string;
  email: string;
  team: ITeam;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}
