import { IAttendantEvaluation } from '../attendantEvaluationInterface';

export interface ICreateAttendantEvaluationForm
  extends Pick<IAttendantEvaluation, 'score' | 'description'> {}
