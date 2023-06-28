'use server';

import { formatSafeChat } from '@/helpers/format-dto';
import prisma from '@/lib/prismadb';
import { getCurrentUser } from './user-actions';

export async function createChat() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Something went wrong.');
  }

  const newChat = await prisma.chat.create({
    data: {
      title: 'New chat',
      userId: user.id,
    },
  });

  return formatSafeChat(newChat);
}

export async function getChatById(id: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });

  if (!chat) {
    throw new Error('Something went wrong.');
  }

  return formatSafeChat(chat);
}

export async function getChatWithMessagesById(id: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });

  if (!chat) {
    throw new Error('Something went wrong.');
  }

  return formatSafeChat(chat);
}

export async function deleteChat(id: string) {
  const chat = await prisma.chat.delete({
    where: {
      id,
    },
  });

  return formatSafeChat(chat);
}
