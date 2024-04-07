import { API_URL } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ILoginCredentialsRequest } from '@/interfaces/auth';

import { setupApiService } from './setupApiService';

const api = setupApiService(`${API_URL}${EndPoints.AUTH}`);
const { post } = api;

export const authService = {
  login: (credentials: ILoginCredentialsRequest) =>
    post(EndPoints.AUTH_LOGIN, credentials),
};
