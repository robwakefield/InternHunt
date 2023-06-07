import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const body = await request.json()
  await prisma.application.update({
    where: {
      postID_studentID: { postID: body.postID, studentID: body.studentID }
    },
    data: {
      cv: body.cv
    }
  })
  return NextResponse.json({})
}