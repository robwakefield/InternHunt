import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findMany()
  return NextResponse.json(listings)
}

export async function POST(request) {
  const body = await request.json();
  const existingIds = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  let newId = 1;
  while (existingIds.find((post) => post.id === newId)) {
    newId++;
  }

  await prisma.post.create({
    data: {
      id: newId,
      name: body.name,
      status: "Draft",
      totalPlaces: body.totalPlaces,
      description: ""
    }
  });
  return NextResponse.json({});
}