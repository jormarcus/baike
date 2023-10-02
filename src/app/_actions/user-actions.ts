'use server';

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
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

export async function updateProfile(data: {
  name: string;
  email: string;
  image: string;
}) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...data,
    },
  });

  console.log('updated user', updatedUser);

  revalidatePath(`/profile/${user.id}`);
}
