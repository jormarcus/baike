import { MessageArraySchema } from '@/lib/validators/message-validator';
import { OpenAIStream } from '@/lib/openai-stream';
import { Message } from '@prisma/client';
import { formatMessageDTO } from '@/helpers/format-dto';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const formattedMessages = messages.map(formatMessageDTO);
  const parsedMessages: Message[] = MessageArraySchema.parse(formattedMessages);
  const stream = await OpenAIStream(parsedMessages);
  return new Response(stream);
}
