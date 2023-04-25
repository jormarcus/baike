import { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { db } from './db';

function getCredentials(isGoogle: boolean) {
  const key = isGoogle ? 'GOOGLE_CLIENT' : 'GITHUB';
  const clientId = process.env[`${key}]_ID`];
  const clientSecret = process.env[`${key}]_SECRET`];

  if (!clientId || !clientSecret) {
    throw new Error(
      `Please provide ${key}_ID and  ${key}_SECRET env variables`
    );
  }

  return {
    clientId,
    clientSecret,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  providers: [
    GithubProvider({
      clientId: getCredentials(false).clientId,
      clientSecret: getCredentials(false).clientSecret,
    }),
    GoogleProvider({
      clientId: getCredentials(true).clientId,
      clientSecret: getCredentials(true).clientSecret,
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await db.get(`user:${token.id}`)) as User | null;

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    redirect() {
      return '/';
    },
  },
};
