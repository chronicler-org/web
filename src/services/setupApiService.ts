import axios, { InternalAxiosRequestConfig } from 'axios';
import { signOut } from 'next-auth/react';
import { parseCookies } from 'nookies';

import { AUTH_TOKEN_NAME } from '@/constants/publicEnv';
import { BASE_URL } from '@/enums/endpointsEnum';
import { IApiError } from '@/interfaces/general';

export const setupApiService = (
  currentBaseUrl = BASE_URL,
  withRefreshToken = true
) => {
  const cookies = parseCookies(undefined);

  const api = axios.create({
    baseURL: currentBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...(withRefreshToken && {
        Authorization: `Bearer ${cookies[AUTH_TOKEN_NAME]}`,
      }),
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

  if (withRefreshToken) {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorApi = error.response?.data as IApiError;
        if (error.response?.status === 401) {
          if (
            errorApi.errors[0].code === 'INVALID_REFRESH_TOKEN' ||
            errorApi.errors[0].code === 'INVALID_TOKEN'
          ) {
            return signOut();
          }
        }
        return Promise.reject(error);
      }
    );
  } else {
    api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  return api;
};
