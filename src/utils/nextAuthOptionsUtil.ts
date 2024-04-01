import { AxiosError } from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

import { AUTH_TOKEN_EXPIRES_IN, AUTH_TOKEN_NAME } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { ILoginCredentialsRequest } from '@/interfaces/auth';
import { IApiError } from '@/interfaces/general';
import { authService } from '@/services/authService';

import { getStaticData } from './getStaticDataUtil';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const data: ILoginCredentialsRequest = {
          password: credentials?.password as string,
          email: credentials?.email as string,
        };
        try {
          const {
            data: { result },
          } = await authService.login(data);

          cookies().set({
            name: AUTH_TOKEN_NAME,
            value: result.accessToken,
            maxAge: AUTH_TOKEN_EXPIRES_IN,
            path: '/',
          });

          return {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: result.expiresIn,
            ...result.user,
          };
        } catch (err) {
          if (err instanceof AxiosError) {
            const errors = err.response?.data.errors as IApiError[];
            throw new Error(JSON.stringify(errors));
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) return { ...token, ...user };

      return token;
    },
    async session({ session, token }) {
      const accessToken = cookies().get(AUTH_TOKEN_NAME)?.value;
      const userResponse = await getStaticData<IUser>(`${EndPoints.USERS}/me`, {
        authToken: accessToken,
        cache: 'no-store',
      });

      session.accessToken = token.accessToken;
      session.expiresIn = token.expiresIn;

      session.user = userResponse?.result as IUser;

      return {
        ...session,
        ...token,
      };
    },
  },
  events: {
    async signOut() {
      cookies().delete(AUTH_TOKEN_NAME);
    },
  },
};
