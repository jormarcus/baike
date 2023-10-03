import { NextResponse } from 'next/server';

import {
  createAllergies,
  getAllergies,
} from '@/app/_actions/user-preference-actions';

export async function GET(req: Request, res: Response) {
  const allergies = await getAllergies();
  console.log('allergies in route', allergies);
  return NextResponse.json({ data: allergies });
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const allergies = await createAllergies(body);
  return NextResponse.json({ data: allergies });
}

export async function PUT(req: Request, res: Response) {
  // const allergies = await createAllergies(req.body);
  // return NextResponse.json({ data: allergies });
}
