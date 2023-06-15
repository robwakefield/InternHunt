import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findMany()
  return NextResponse.json(listings)
}

export async function POST(request) {
  const body = await request.json();
  await prisma.post.create({
    data: {
      name: body.name,
      status: "Draft",
      totalPlaces: body.totalPlaces,
      description: ""
    }
  });
  return NextResponse.json({});
}