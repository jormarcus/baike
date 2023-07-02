import { createChat } from '@/app/_actions/chat-actions';
import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
  const thread = await createChat();
  return NextResponse.json({ data: thread });
}
