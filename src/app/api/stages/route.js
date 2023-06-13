import { prisma } from '../../db/client'
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.application.findMany({
    select: {
      postID: true,
      studentID: true,
      stages: {
        id: true,
        stageText: true
      }
    }
  })
  return NextResponse.json(listings)
}

export async function PUT(request) {
  const body = await request.json();
  await prisma.stage.update({
    where: {
      postID_id: { postID: body.postid, id: body.id }
    },
    data: {
    }
  });
  return NextResponse.json({});
}

export async function POST(request) {
  const body = await request.json();
  await prisma.stage.create({
    data: {
      post: {
        connect: {
          id: body.postID
        }
      }
    }
  });
  return NextResponse.json({});
}
