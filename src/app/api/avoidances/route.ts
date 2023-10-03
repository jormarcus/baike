import { NextResponse } from 'next/server';

import {
  createAvoidances,
  getAvoidances,
} from '@/app/_actions/user-preference-actions';

export async function GET(req: Request, res: Response) {
  const avoidances = await getAvoidances();
  console.log('avoidances in route', avoidances);
  return NextResponse.json({ data: avoidances });
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const avoidances = await createAvoidances(body);
  return NextResponse.json({ data: avoidances });
}

// export async function PUT(req: Request, res: Response) {
//   const body = await req.json();
// const avoidances = await createAvoidances(body);
// return NextResponse.json({ data: avoidances });
// }
