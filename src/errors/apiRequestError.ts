import { IApiError } from '@/interfaces/general';

export interface IApiRequestError {
  message: string;
  detail: string;
  errors: IApiError[];
  statusCode: number;
}
export class ApiRequestError extends Error {
  constructor(
    private errors: { code: string; title: string; detail: string }[],
    private statusCode: number
  ) {
    super();
    this.message = JSON.stringify({
      message:
        errors.length > 0
          ? this.errors[0].title
          : 'Ocorreu um erro durante a solicitação à API.',
      detail:
        errors.length > 0
          ? this.errors[0].detail
          : 'Ocorreu um erro durante a solicitação à API.',
      errors,
      statusCode,
    });
  }

  public getMessage() {
    return this.message;
  }

  public getErrors() {
    return this.errors;
  }

  public getStatusCode() {
    return this.statusCode;
  }
}
