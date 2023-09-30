import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { ChatGPTMessage } from '@/types';
import { functions } from '@/app/api/chat/functions';
import { createDBMessage } from './db';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge (from vercel's instructions)
// IMPORTANT!!! prisma doesnt work with server actions when runtime is set to edge
// Error: PrismaClient is unable to be run in the browser.
export const runtime = 'edge';

export async function createAIChat(messages: ChatGPTMessage[], chatId: number) {
  const intialResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages,
    temperature: 0.2,
    // functions are too slow. Removing them and sending ai responses as markdown
    // functions,
    // function_call: 'auto',
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(/* finalResponse || */ intialResponse, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      const formattedMessages = messages.map((message: ChatGPTMessage) => {
        return {
          text: message.content,
          isUserMessage: message.role === 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
          chatId,
        };
      });
      await createDBMessage(formattedMessages[formattedMessages.length - 1]);
    },
    onToken: async (token: string) => {
      // This callback is called for each token in the stream
      // You can use this to debug the stream or save the tokens to your database
      // console.log(token);
    },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      const message = {
        text: completion,
        isUserMessage: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        chatId,
      };

      await createDBMessage(message);
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
