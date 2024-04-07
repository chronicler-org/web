/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IManager, IAttendant } from '@/interfaces';

import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: IManager | IAttendant;
    role: UserRole;
    authToken: string;
    expiresIn: Date;
  }
}

import { JWT } from 'next-auth/jwt';
import { UserRole } from '@/enums/user';

declare module 'next-auth/jwt' {
  interface JWT {
    user: IManager | IAttendant;
    role: UserRole;
    authToken: string;
    expiresIn: Date;
  }
}
