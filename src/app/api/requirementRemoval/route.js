import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

//DELETE in /api/requirements just does not work for some reason?
export async function PUT(request) {
  const body = await request.json();
  await prisma.requirement.delete({
    where: {
      postID_id: { postID: body.postid, id: body.id }
    }
  });
  return NextResponse.json({});
}