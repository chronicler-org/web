import axios, { InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

import { AUTH_TOKEN_NAME } from '@/constants/publicEnv';
import { BASE_URL } from '@/enums/endpointsEnum';

export const setupApiService = (currentBaseUrl = BASE_URL) => {
  const cookies = parseCookies(undefined);

  const api = axios.create({
    baseURL: currentBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies[AUTH_TOKEN_NAME]}`,
    },
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (
        (config.method === 'PUT' ||
          config.method === 'PATCH' ||
          config.method === 'POST') &&
        !config.headers['Content-Type']
      ) {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return api;
};
