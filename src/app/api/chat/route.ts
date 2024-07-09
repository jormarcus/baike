import { openai } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const messageSchema = z.object({
  message: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = messageSchema.parse(body);

    console.log('Sending message to OpenAI:', message);

    const openAIStream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of openAIStream) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(encoder.encode(content));
          }
          controller.close();
        } catch (error) {
          console.error('Error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    return NextResponse.error();
  }
}

async function saveChatToDatabase(chat: {
  question: string;
  response: string;
}) {
  console.log('Saving chat to database', chat);
  // Implement your database saving logic here
}
