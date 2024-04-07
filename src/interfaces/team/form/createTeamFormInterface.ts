import { ITeam } from '../teamInterface';

export interface ICreateTeamFormInterface
  extends Omit<ITeam, 'id' | 'createdAt' | 'updatedAt'> {}
