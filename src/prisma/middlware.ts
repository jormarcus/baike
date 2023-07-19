import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const extendedPrisma = prisma.$extends({
  name: 'updateChatUserMessagesCount',
  model: {
    chat: {
      async updateUserMessagesCount({
        model,
        operation,
        args,
        query,
      }: {
        model: any;
        operation: any;
        args: any;
        query: any;
      }) {
        console.log('updateUserMessagesCount: ', args);
        await prisma.chat.update({
          data: { userMessageCount: { increment: 1 } },
          where: { id: args.data['chatId'] },
        });
      },
    },
  },
});
