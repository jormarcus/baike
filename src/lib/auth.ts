import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { getCredentials } from '@/helpers/auth-helper';

import prisma from './prismadb';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: getCredentials('GITHUB').clientId,
      clientSecret: getCredentials('GITHUB').clientSecret,
    }),
    GoogleProvider({
      clientId: getCredentials('GOOGLE_CLIENT').clientId,
      clientSecret: getCredentials('GOOGLE_CLIENT').clientSecret,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isAdmin: token.isAdmin,
          vendorId: token.vendorId,
          stripe_id: token.stripeId,
        },
      };
    },
    redirect() {
      return '/';
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
