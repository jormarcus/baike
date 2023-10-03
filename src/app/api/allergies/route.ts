import {
  createAllergies,
  getAllergies,
} from '@/app/_actions/user-preference-actions';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const allergies = await getAllergies();
    console.log('allergies in route', allergies);
    return NextResponse.json({ data: allergies });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const allergies = await createAllergies(req.body);
    return NextResponse.json({ data: allergies });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    // const allergies = await createAllergies(req.body);
    // return NextResponse.json({ data: allergies });
  }
}
