import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const body = await request.json()
  console.log(body)
  await prisma.evidence.update({
    where: {
      postID_requirementID_studentID: {
        postID: body.postID,
        requirementID: body.requirementID,
        studentID: body.studentID
      }
    },
    data: {
      rating: body.rating
    }
  })
  return NextResponse.json({})
}
