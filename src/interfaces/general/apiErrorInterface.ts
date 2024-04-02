export interface IApiError {
  errors: { code: string; title: string; detail: string }[];
}
