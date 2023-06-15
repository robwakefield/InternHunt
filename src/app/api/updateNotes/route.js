import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const body = await request.json()
  await prisma.evidence.update({
    where: {
      postID_requirementID_studentID: {
        postID: body.postID,
        requirementID: body.requirementID,
        studentID: body.studentID
      }
    },
    data: {
      notes: body.notes
    }
  })
  return NextResponse.json({})
}