import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json()
  if (body.requestType == "hasCV") {
    const hasCV = prisma.application.findFirst({
      where: {
        postID_studentID: { postID: body.postID, studentID: body.studentID }
      },
      select: {
        cv: {
          exists: true
        }
      }
    })
    return NextResponse.json(hasCV)

  } else if (body.requestType == "getCV") {
    const cv = prisma.application.findFirst({
      where: {
        postID_studentID: { postID: body.postID, studentID: body.studentID }
      },
      select: {
        cv: true
      }
    })
    return NextResponse.json(cv)
  }

  return NextResponse.error("", 400)
}

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