import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prismadb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    // this is a direct communication with the database through a server component
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser?.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
