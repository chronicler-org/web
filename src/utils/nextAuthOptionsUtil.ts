import { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

import { AUTH_TOKEN_EXPIRES_IN, AUTH_TOKEN_NAME } from '@/constants/publicEnv';
import { EndPoints } from '@/enums/endpointsEnum';
import { UserRole } from '@/enums/user';
import { IUser } from '@/interfaces';
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
            value: result.auth_token,
            maxAge: AUTH_TOKEN_EXPIRES_IN,
            path: '/',
          });

          const decodedToken: any = jwt.decode(result.auth_token);

          return {
            authToken: result.auth_token,
            expiresIn: result.expires_in,
            ...result.user,
            role: decodedToken?.role as UserRole,
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
      const authToken = cookies().get(AUTH_TOKEN_NAME)?.value as string;
      const decodedToken: any = jwt.decode(authToken);
      const role = decodedToken?.role as UserRole;

      const userResponse = await getStaticData<IUser>(
        role === UserRole.MANAGER
          ? EndPoints.MANAGER_ME
          : EndPoints.ATTENDANT_ME,
        {
          authToken,
          cache: 'no-store',
        }
      );
      session.user = userResponse?.result as IUser;
      session.role = role;
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
