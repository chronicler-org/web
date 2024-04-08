import { IAttendant } from './attendantInterface';

export interface IAttendantEvaluation {
  id: string;
  score: number;
  description: string;
  avaluated: IAttendant;
  avaluator: IAttendant;
  created_at: Date;
  updated_at: Date;
}
