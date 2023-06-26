import { Message } from '@/lib/validators/message';
import { nanoid } from 'nanoid';

export async function sendMessage(input: string) {
  const message: Message = {
    id: nanoid(),
    isUserMessage: true,
    text: input,
  };
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  return response.body;
}
