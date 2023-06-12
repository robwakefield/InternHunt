import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.requirement.findMany({
    select: {
      postid: true,
      id: true,
      requirementText: true
    }
  })
  return NextResponse.json(listings)
}

export async function PUT(request) {
  const body = await request.json();
  await prisma.requirement.update({
    where: {
      postID_id: { postID: body.postid, id: body.id }
    },
    data: {
      requirementText: body.requirementText
    }
  });
  return NextResponse.json({});
}