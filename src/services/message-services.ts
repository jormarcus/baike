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
