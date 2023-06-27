// import prisma from '@/lib/prismadb';
// import { formatSafeMessage } from '@/helpers/format-dto';
import { SafeMessage } from '@/types';

export async function sendMessage(messages: SafeMessage[]) {
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  return response.body;
}

// export async function getMessages(chatId: string, startIndex: number) {
//   const messages = await prisma.message.findMany({
//     where: {
//       chatId: chatId,
//     },

//     skip: startIndex,
//     take: 10,
//   });

//   return messages.map((message) => formatSafeMessage(message));
// }

// export async function createMessage(message: SafeMessage, startIndex = 0) {
//   const newMessage: Message = await prisma.message.create({
//     data: message,
//   });

//   return formatSafeMessage(newMessage);
// }
