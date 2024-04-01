import { IApiMeta } from './api-meta-interface';

export interface IApiResponse<T> {
  result: T;
  meta: IApiMeta;
}
