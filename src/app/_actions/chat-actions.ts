'use server';

import { formatSafeChat } from '@/helpers/format-dto';
import prisma from '@/lib/prismadb';
import { getCurrentUser } from './user-actions';
import { ChatWithMessages } from '@/types';

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

export async function getChatsByUserId(userId: number, skip = 0, take = 10) {
  const chats = await prisma.chat.findMany({
    where: {
      userId,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        skip: 1, // we want the second message
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });

  return chats.map((chat: ChatWithMessages) =>
    formatSafeChat(
      chat,
      chat.messages && chat.messages.length > 0 ? chat.messages[0]['text'] : ''
    )
  );
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

export async function updateChatTitle(id: number, title: string) {
  const chat = await prisma.chat.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return formatSafeChat(chat);
}
