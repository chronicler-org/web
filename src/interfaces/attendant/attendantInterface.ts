import { ITeam } from '../team';

export interface IAttendant {
  id: string;
  cpf: string;
  name: string;
  email: string;
  team: ITeam;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
