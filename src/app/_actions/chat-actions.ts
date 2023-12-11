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

export async function getChatHistory(query: string, skip = 0, take = 10) {
  const user = await getCurrentUser();

  const chats = await prisma.chat.findMany({
    where: {
      userId: user?.id,
      // should i also allow search by message?
      title: {
        contains: query,
        mode: 'insensitive',
      },
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

export async function deleteChatAndMessages(id: number) {
  // Delete all messages associated with the chat
  await prisma.message.deleteMany({
    where: {
      chatId: id,
    },
  });

  // Delete the chat
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

export async function getChatsTotalCount(query: string) {
  const user = await getCurrentUser();

  const totalCount = await prisma.chat.count({
    where: {
      userId: user?.id,
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  return totalCount;
}

export async function getChatsWithCount(query: string, skip = 0, take = 10) {
  const chats = await getChatHistory(query, skip, take);
  const totalCount = await getChatsTotalCount(query);

  return { chats, totalCount };
}
