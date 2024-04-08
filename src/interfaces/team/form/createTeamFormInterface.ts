import { ITeam } from '../teamInterface';

export interface ICreateTeamForm
  extends Omit<ITeam, 'id' | 'created_at' | 'updated_at'> {}
