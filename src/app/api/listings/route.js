import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.post.findMany()
  return NextResponse.json(listings)
}

export async function PUT(request) {
  const { description, requirement } = await request.json();
  await prisma.listings.update({
    where: {
      id: 1
    },
    data: {
      description: description,
      requirement: requirement
    }
  });
  return NextResponse.json({});
}