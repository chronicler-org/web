import { API_URL } from '@/constants/publicEnv';

export const BASE_URL = `${API_URL}`;

export enum EndPoints {
  AUTH = '/auth',
  AUTH_LOGIN = '/auth/login',

  MANAGER = '/manager',
  MANAGER_ME = '/manager/me',

  ATTENDANT = '/attendant',
  ATTENDANT_ME = '/attendant/me',
}
