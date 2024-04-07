import { ITeam } from '../teamInterface';

export interface ICreateTeamFormInterface
  extends Omit<ITeam, 'id' | 'created_at' | 'updated_at'> {}
