import {
  createAvoidances,
  getAvoidances,
} from '@/app/_actions/user-preference-actions';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const avoidances = await getAvoidances();
    console.log('avoidances in route', avoidances);
    return NextResponse.json({ data: avoidances });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const avoidances = await createAvoidances(req.body);
    return NextResponse.json({ data: avoidances });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    // const avoidances = await createAvoidances(req.body);
    // return NextResponse.json({ data: avoidances });
  }
}
