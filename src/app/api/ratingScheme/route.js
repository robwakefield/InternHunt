import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function PUT(request) {
  const body = await request.json()
  await prisma.post.update({
    where: {
      id: body.postID
    },
    data: {
      rating1Text: body.rating1Text,
      rating2Text: body.rating2Text,
      rating3Text: body.rating3Text,
      rating4Text: body.rating4Text,
      rating5Text: body.rating5Text
    }
  })
  return NextResponse.json({})
}
