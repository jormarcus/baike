import { recipePrompt } from '@/helpers/prompts/recipePrompt';
import { createAIChat } from '@/lib/ai-stream';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const data = await req.json();
  const messages = data.messages;
  const chatId: number = parseInt(data.chatId);

  messages.unshift({
    role: 'system',
    content: recipePrompt,
  });

  return await createAIChat(messages, chatId);
}
