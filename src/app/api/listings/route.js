import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findFirst()
  return NextResponse.json(listings)
}

export async function PUT(request) {
  const { description, requirements } = await request.json();
  await prisma.post.update({
    where: {
      id: 1
    },
    data: {
      description: description,
      requirements: requirements
    }
  });
  return NextResponse.json({});
}