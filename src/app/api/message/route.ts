import {
  Message,
  MessageArraySchema,
} from '@/lib/validators/message-validator';
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/lib/openai-stream';
import { recipePrompt } from '@/helpers/prompts/recipePrompt';
import { formatDBMessage } from '@/helpers/messages-helper';

export async function POST(req: Request) {
  const request = await req.json();
  const messages = request.messages;

  const dbMessages: Message[] = messages.map(formatDBMessage);

  const parsedMessages = MessageArraySchema.parse(dbMessages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? 'user' : 'system',
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: 'system',
    content: recipePrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
