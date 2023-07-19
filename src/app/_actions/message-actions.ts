'use server';

import prisma from '@/lib/prismadb';
import { formatSafeMessage } from '@/helpers/format-dto';
import { Message } from '@prisma/client';
import { Message as ValidationMessage } from '@/lib/validators/message-validator';
import { extendedPrisma } from '@/prisma/middlware';

export async function getMessages(chatId: number, startIndex: number) {
  const messages = await prisma.message.findMany({
    where: {
      chatId,
    },

    skip: startIndex,
    take: 10,
  });

  return messages.map((message) => formatSafeMessage(message));
}

export async function createMessage(message: ValidationMessage) {
  const newMessage: Message = await extendedPrisma.message.create({
    data: message,
  });

  return formatSafeMessage(newMessage);
}
