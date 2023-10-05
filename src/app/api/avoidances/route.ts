import { NextResponse } from 'next/server';

import { getAvoidances } from '@/app/_actions/user-preference-actions';

export async function GET(req: Request, res: Response) {
  const avoidances = await getAvoidances();
  return NextResponse.json({ data: avoidances });
}
