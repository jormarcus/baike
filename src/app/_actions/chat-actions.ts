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

export async function getChatById(id: number) {
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

export async function getChatsById(id: number) {
  const chats = await prisma.chat.findMany({
    where: {
      id,
    },
  });

  return chats.map(formatSafeChat);
}

export async function getChatWithMessagesById(id: number) {
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

export async function deleteChat(id: number) {
  const chat = await prisma.chat.delete({
    where: {
      id,
    },
  });

  return formatSafeChat(chat);
}
