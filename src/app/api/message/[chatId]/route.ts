import { getMessages } from '@/app/_actions/message-actions';
import { SafeMessage } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    if (!params.chatId) {
      return new NextResponse('Chat id is required', { status: 400 });
    }

    const messages: SafeMessage[] = await getMessages(
      parseInt(params.chatId),
      0
    );

    return NextResponse.json(messages);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
