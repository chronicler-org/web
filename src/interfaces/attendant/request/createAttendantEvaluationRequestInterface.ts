import { ICreateAttendantEvaluationForm } from '../form';

export interface ICreateAttendantEvaluationRequest
  extends ICreateAttendantEvaluationForm {
  avaluated_id: string;
}
