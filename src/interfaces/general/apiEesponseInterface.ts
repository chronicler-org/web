import { IApiMeta } from './apiMetaInterface';

export interface IApiResponse<T> {
  result: T;
  meta: IApiMeta;
}
