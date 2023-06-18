import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

//DELETE just does not work for some reason?
export async function PUT(request) {
  const body = await request.json();
  await prisma.requirement.deleteMany({
    where: {
      postID: body.id
    }
  });
  await prisma.post.delete({
    where: {
      id: body.id
    }
  });
  return NextResponse.json({});
}