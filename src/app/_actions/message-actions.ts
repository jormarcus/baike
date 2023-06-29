import prisma from '@/lib/prismadb';
import { formatSafeMessage } from '@/helpers/format-dto';
import { Message } from '@prisma/client';

export async function getMessages(chatId: string, startIndex: number) {
  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },

    skip: startIndex,
    take: 10,
  });

  return messages.map((message) => formatSafeMessage(message));
}

export async function createMessage(message: Message, chatId: string) {
  const newMessage: Message = await prisma.message.create({
    data: {
      ...message,
      chatId,
    },
  });

  return formatSafeMessage(newMessage);
}
